'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import PersonCard from '@/components/PersonCard';
import { MissingPerson } from '@/lib/database.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const KENYA_REGIONS = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
  'Thika',
  'Malindi',
  'Kitale',
  'Garissa',
  'Kakamega',
  'Other',
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [persons, setPersons] = useState<MissingPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [gender, setGender] = useState('all');
  const [region, setRegion] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  useEffect(() => {
    fetchPersons();
  }, [searchQuery, gender, region, status, page]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, gender, region, status]);

  const fetchPersons = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('query', searchQuery);
      if (gender !== 'all') params.append('gender', gender);
      if (region !== 'all') params.append('region', region);
      if (status !== 'all') params.append('status', status);
      params.append('page', page.toString());
      params.append('pageSize', pageSize.toString());

      const response = await fetch(`/api/persons?${params.toString()}`);
      const result = await response.json();
      setPersons(result.data ?? []);
      setTotalCount(result.meta?.total ?? 0);
    } catch (error) {
      console.error('Error fetching persons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPersons();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setGender('all');
    setRegion('all');
    setStatus('all');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Search Missing Persons</h1>
            <p className="text-gray-600 mb-6">
              Use filters below to search our database of missing persons
            </p>

            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Gender
                </label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Region
                </label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {KENYA_REGIONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="missing">Missing</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? 'Searching...' : `Found ${persons.length} result${persons.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : persons.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {persons.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
            {totalCount > pageSize && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                <p className="text-gray-600">
                  Showing {persons.length} of {totalCount} result{totalCount !== 1 ? 's' : ''} (Page {page} of {totalPages})
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    disabled={page >= totalPages}
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">
              No results found. Try adjusting your search filters.
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
