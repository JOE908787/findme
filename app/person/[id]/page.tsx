'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Phone, User, ArrowLeft, AlertCircle } from 'lucide-react';
import { MissingPerson } from '@/lib/database.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PersonDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [person, setPerson] = useState<MissingPerson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchPersonDetails();
    }
  }, [params.id]);

  const fetchPersonDetails = async () => {
    try {
      const response = await fetch(`/api/persons/${params.id}`);

      if (!response.ok) {
        throw new Error('Person not found');
      }

      const data = await response.json();
      setPerson(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load person details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Person Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The person you are looking for does not exist.'}</p>
            <Button onClick={() => router.push('/search')}>
              Back to Search
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="overflow-hidden">
                <div className="relative h-96 bg-gray-100">
                  {person.photo_url ? (
                    <img
                      src={person.photo_url}
                      alt={person.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <User className="w-32 h-32 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={person.status === 'missing' ? 'destructive' : 'default'}
                      className="text-lg px-4 py-2"
                    >
                      {person.status === 'missing' ? 'Missing' : 'Found'}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">{person.full_name}</CardTitle>
                  <p className="text-xl text-gray-600">
                    {person.age} years old • {person.gender}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Last Seen Location</p>
                        <p className="text-gray-900">{person.last_seen_location}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Region</p>
                        <p className="text-gray-900">{person.region}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Date Missing</p>
                        <p className="text-gray-900">
                          {new Date(person.date_missing).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Contact Number</p>
                        <a
                          href={`tel:${person.contact_number}`}
                          className="text-gray-900 hover:text-red-600 font-medium"
                        >
                          {person.contact_number}
                        </a>
                      </div>
                    </div>
                  </div>

                  {person.description && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium mb-2">
                        Additional Information
                      </p>
                      <p className="text-gray-900 whitespace-pre-wrap">{person.description}</p>
                    </div>
                  )}

                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="font-bold text-red-900 mb-2">Have Information?</h3>
                    <p className="text-red-800 mb-4">
                      If you have any information about {person.full_name}, please contact the
                      number above immediately.
                    </p>
                    <a href={`tel:${person.contact_number}`}>
                      <Button className="bg-red-600 hover:bg-red-700 w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Contact Number
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Report created on{' '}
                    {new Date(person.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <div className="flex gap-4">
                    <Link href="/report" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Report Another Person
                      </Button>
                    </Link>
                    <Link href="/search" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Search Database
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
