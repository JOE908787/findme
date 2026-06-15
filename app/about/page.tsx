'use client';

import { motion } from 'framer-motion';
import { Heart, Search, Users, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">About FindThem</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Our mission is to help reunite families by providing a central platform to report
              and search for missing persons in Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Mission</h2>
          <Card className="mb-12">
            <CardContent className="pt-6">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                FindThem is a community-driven platform dedicated to helping families find their
                missing loved ones. We understand the pain and uncertainty that comes with a
                missing person case, and we are committed to providing a tool that can help
                spread awareness and facilitate the search process.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every second counts when someone goes missing. Our platform allows anyone to
                quickly report a missing person and share their information with the community,
                increasing the chances of a safe reunion.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div whileHover={{ y: -5 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle>Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Family members or friends can quickly report a missing person with photos
                    and details.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle>Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Community members can search the database using various filters to help
                    identify missing persons.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle>Verify</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    If you recognize someone, contact the provided number to help verify their
                    identity and location.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle>Reunite</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Help bring families back together by sharing information and staying
                    vigilant.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Us</h2>
          <Card className="mb-12">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:info@findthem.co.ke"
                      className="text-red-600 hover:text-red-700"
                    >
                      info@findthem.co.ke
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                    <a
                      href="tel:+254748040161"
                      className="text-red-600 hover:text-red-700"
                    >
                      +254 748040161
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-bold text-red-900 mb-2">Emergency Contact</h3>
                <p className="text-red-800 mb-4">
                  If you have urgent information about a missing person, please contact the
                  Kenya Police Service immediately:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Call 911 (Police)
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Call 112 (Emergency)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Help Make a Difference</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every share, every search, and every report helps bring hope to families. Join us
              in making Kenya safer by staying vigilant and spreading awareness.
            </p>
            {/* Donate CTA */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Support our work</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Your donation helps us maintain the platform, run outreach, and verify reports so
              we can reunite more families. Any amount helps — thank you for your support.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
              <a
                href="https://example.com/donate"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donate to FindThem"
              >
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Heart className="w-4 h-4 mr-2" />
                  Donate
                </Button>
              </a>

              <a
                href="https://example.com/findthem.zip"
                download
                className="inline-flex"
                aria-label="Download FindThem app source"
              >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Download App
                </Button>
              </a>

              <Link href="/report">
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  Report Missing Person
                </Button>
              </Link>

              <Link href="/search">
                <Button size="lg" variant="outline">
                  Search Database
                </Button>
              </Link>
            </div>

            <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg border border-gray-200 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Download the app package</h3>
              <p className="text-gray-600 mb-6">
                Click the button below to download the source package or installer file.
                Replace the URL with your actual release ZIP or installer link.
              </p>
              <a
                href="https://example.com/findthem.zip"
                download
                className="inline-flex"
                aria-label="Download FindThem app package"
              >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Download App Package
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
