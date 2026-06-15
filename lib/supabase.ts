import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// export a mutable binding and assign below to avoid conditional export syntax
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let supabase: any;

if (!supabaseUrl || !supabaseAnonKey || !/^https?:\/\//i.test(supabaseUrl)) {
  console.error("❌ Supabase environment variables are missing or invalid. Using mock stub.");

  const errResult = { data: null, error: { message: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' }, count: 0 };

  // A lightweight, chainable stub that mirrors the supabase JS method chains used in this app.
  const chainable: any = {
    select: (..._args: any[]) => chainable,
    order: (..._args: any[]) => chainable,
    eq: (..._args: any[]) => chainable,
    or: (..._args: any[]) => chainable,
    limit: (..._args: any[]) => chainable,
    range: async (..._args: any[]) => errResult,
  };

  let insertRows: any = null; // capture rows for mock insert
  const fromStub = () => {
    const mockInsert = (_rows: any) => {
      insertRows = _rows;
      return {
        select: () => ({
          single: async () => {
            // Return a mock success with a unique ID for testing
            const mockId = `mock-${Date.now()}`;
            const mockData = Array.isArray(_rows) ? { id: mockId, ...(_rows[0] || {}) } : { id: mockId };
            return { data: mockData, error: null };
          },
        }),
      };
    };

    return {
      select: (..._args: any[]) => chainable,
      insert: mockInsert,
      update: async () => errResult,
      delete: async () => errResult,
    };
  };

  const storageFromStub = () => ({
    upload: async () => errResult,
    getPublicUrl: () => ({
      data: { publicUrl: '' },
    }),
  });

  supabase = {
    from: fromStub,
    storage: {
      from: storageFromStub,
    },
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}
