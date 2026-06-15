'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PersonCard from '@/components/PersonCard';
import { MissingPerson } from '@/lib/database.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [latestPersons, setLatestPersons] = useState<MissingPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchLatestPersons();
  }, []);

  const fetchLatestPersons = async () => {
    try {
      const response = await fetch('/api/persons?limit=6');
      const result = await response.json();
      setLatestPersons(result.data ?? result);
    } catch (error) {
      console.error('Error fetching latest persons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Help Find Missing Persons in Kenya
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-3xl mx-auto">
              Every second counts. Search our database or report a missing person to help reunite families.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 text-lg bg-white text-gray-900"
                />
                <Button type="submit" size="lg" className="h-14 px-8 bg-white text-red-600 hover:bg-gray-100">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Latest Missing Persons
            </h2>
            <p className="text-gray-600">
              Recently reported cases that need your attention
            </p>
          </div>
          <Link href="/search">
            <Button variant="outline" className="hidden md:flex items-center">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : latestPersons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPersons.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">No missing persons reported yet</p>
            <Link href="/report">
              <Button size="lg">Report Missing Person</Button>
            </Link>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/report">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Report a Missing Person
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Search Database</h3>
              <p className="text-gray-600">
                Search our comprehensive database of missing persons by name, location, or other details.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Report Missing</h3>
              <p className="text-gray-600">
                Quickly report a missing person with details and photos to help spread awareness.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reunite Families</h3>
              <p className="text-gray-600">
                Help reunite families by sharing information and staying vigilant in your community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
