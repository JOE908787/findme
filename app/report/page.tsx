'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

export default function ReportPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    gender: '',
    region: '',
    last_seen_location: '',
    date_missing: '',
    contact_number: '',
    description: '',
    relationship: '',
    relationship_other: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the "relationship_other" when relationship changes to non-Other
    if (name === 'relationship' && value !== 'Other') {
      setFormData((prev) => ({ ...prev, relationship_other: '' }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto = async () => {
    if (!photoFile) return null;

    const formData = new FormData();
    formData.append('file', photoFile);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload photo');
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate relationship_other when "Other" is selected
      if (formData.relationship === 'Other' && !formData.relationship_other.trim()) {
        setError('Please specify your relationship to the missing person');
        setLoading(false);
        return;
      }
      let photoUrl = null;
      if (photoFile) {
        photoUrl = await uploadPhoto();
      }

      const response = await fetch('/api/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          photo_url: photoUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.error || 'Failed to submit report'
        );
        setLoading(false);
        return;
      }

      const data = await response.json();
      setSuccess(true);

      setTimeout(() => {
        router.push(`/person/${data.id}`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your missing person report has been successfully submitted. Redirecting...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Report a Missing Person
            </h1>
            <p className="text-gray-600 mb-8">
              Please provide as much detail as possible to help us spread the word
            </p>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    max="150"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter age"
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange('gender', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="region">Region *</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => handleSelectChange('region', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {KENYA_REGIONS.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date_missing">Date Missing *</Label>
                  <Input
                    id="date_missing"
                    name="date_missing"
                    type="date"
                    value={formData.date_missing}
                    onChange={handleInputChange}
                    required
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="contact_number">Contact Number *</Label>
                  <Input
                    id="contact_number"
                    name="contact_number"
                    type="tel"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    required
                    placeholder="+254 XXX XXX XXX"
                  />
                </div>
 
                <div>
                  <Label htmlFor="relationship">Your Relationship to Missing Person</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) => handleSelectChange('relationship', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Sibling">Sibling</SelectItem>
                      <SelectItem value="Relative">Relative</SelectItem>
                      <SelectItem value="Friend">Friend</SelectItem>
                      <SelectItem value="Spouse">Spouse</SelectItem>
                      <SelectItem value="Child">Child</SelectItem>
                      <SelectItem value="Guardian">Guardian</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Employer">Employer</SelectItem>
                      <SelectItem value="Neighbor">Neighbor</SelectItem>
                      <SelectItem value="Authority/Police">Authority/Police</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.relationship === 'Other' && (
                <div>
                  <Label htmlFor="relationship_other">Please specify relationship *</Label>
                  <Input
                    id="relationship_other"
                    name="relationship_other"
                    value={formData.relationship_other}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Cousin, Family Friend"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="last_seen_location">Last Seen Location *</Label>
                <Input
                  id="last_seen_location"
                  name="last_seen_location"
                  value={formData.last_seen_location}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter the last known location"
                />
              </div>

              <div>
                <Label htmlFor="description">Additional Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Any additional details that might help (clothing, distinguishing features, etc.)"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="photo">Photo</Label>
                <div className="mt-2">
                  {photoPreview ? (
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full max-w-sm h-64 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setPhotoFile(null);
                          setPhotoPreview(null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      <input
                        id="photo"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Report'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
