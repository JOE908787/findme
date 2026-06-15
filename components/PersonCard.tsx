'use client';

import { MissingPerson } from '@/lib/database.types';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './ui/badge';

interface PersonCardProps {
  person: MissingPerson;
}

export default function PersonCard({ person }: PersonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/person/${person.id}`}>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
          <div className="relative h-64 bg-gray-100">
            {person.photo_url ? (
              <img
                src={person.photo_url}
                alt={person.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <User className="w-24 h-24 text-gray-400" />
              </div>
            )}
            <div className="absolute top-3 right-3">
              <Badge
                variant={person.status === 'missing' ? 'destructive' : 'default'}
                className="shadow-lg"
              >
                {person.status === 'missing' ? 'Missing' : 'Found'}
              </Badge>
            </div>
          </div>

          <div className="p-5 space-y-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {person.full_name}
              </h3>
              <p className="text-sm text-gray-600">
                {person.age} years old • {person.gender}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                <span className="truncate">{person.last_seen_location}</span>
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                <span>
                  {new Date(person.date_missing).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                <span>{person.contact_number}</span>
              </div>
            </div>

            {person.description && (
              <p className="text-sm text-gray-600 line-clamp-2 pt-2 border-t">
                {person.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
