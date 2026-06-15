import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const gender = searchParams.get('gender');
    const region = searchParams.get('region');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || limit || '25', 10);
    const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
    const safePageSize = Number.isNaN(pageSize) || pageSize < 1 ? 25 : Math.min(pageSize, 100);

    let supabaseQuery = supabase
      .from('missing_persons')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (query) {
      supabaseQuery = supabaseQuery.or(`full_name.ilike.%${query}%,last_seen_location.ilike.%${query}%`);
    }

    if (gender && gender !== 'all') {
      supabaseQuery = supabaseQuery.eq('gender', gender);
    }

    if (region && region !== 'all') {
      supabaseQuery = supabaseQuery.eq('region', region);
    }

    if (status && status !== 'all') {
      supabaseQuery = supabaseQuery.eq('status', status);
    }

    const from = (safePage - 1) * safePageSize;
    const to = from + safePageSize - 1;
    const { data, error, count } = await supabaseQuery.range(from, to);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: data || [],
      meta: {
        page: safePage,
        pageSize: safePageSize,
        total: count ?? 0,
        totalPages: safePageSize > 0 ? Math.ceil((count ?? 0) / safePageSize) : 1,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch missing persons' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check for duplicate report
    const { data: existingPersons, error: checkError } = await supabase
      .from('missing_persons')
      .select('*')
      .ilike('full_name', body.full_name)
      .eq('age', body.age)
      .eq('gender', body.gender)
      .eq('status', 'missing');

    if (checkError) {
      return NextResponse.json({ error: checkError.message }, { status: 500 });
    }

    if (existingPersons && existingPersons.length > 0) {
      return NextResponse.json(
        { error: 'This person has already been reported as missing', isDuplicate: true },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from('missing_persons')
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to create missing person report' },
      { status: 500 }
    );
  }
}
