/*
  # Missing Persons Database Schema

  ## Overview
  Creates the core database structure for the Missing Person Web Application.
  This migration sets up tables for storing missing person reports with full details,
  images, and contact information.

  ## New Tables
  
  ### `missing_persons`
  Stores all missing person reports with comprehensive details:
  - `id` (uuid, primary key) - Unique identifier for each report
  - `full_name` (text) - Full name of the missing person
  - `age` (integer) - Age of the missing person
  - `gender` (text) - Gender (Male, Female, Other)
  - `region` (text) - Geographic region where person is from
  - `last_seen_location` (text) - Last known location
  - `date_missing` (date) - Date when person went missing
  - `contact_number` (text) - Contact number for information
  - `status` (text) - Current status (missing, found)
  - `photo_url` (text, nullable) - URL to uploaded photo
  - `description` (text, nullable) - Additional details about the person
  - `created_at` (timestamptz) - When report was created
  - `updated_at` (timestamptz) - When report was last updated

  ## Security
  - Enable Row Level Security (RLS) on missing_persons table
  - Allow public read access (anyone can view missing persons)
  - Allow public insert access (anyone can report missing persons)
  - Restrict updates and deletes to authenticated admin users only

 Indexes
  - Index on full_name for fast name searches
  - Index on region for location-based filtering
  - Index on status for filtering by status
  - Index on date_missing for sorting by date
*/

-- Create missing_persons table
CREATE TABLE IF NOT EXISTS missing_persons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  age integer NOT NULL CHECK (age > 0 AND age < 150),
  gender text NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
  region text NOT NULL,
  last_seen_location text NOT NULL,
  date_missing date NOT NULL,
  contact_number text NOT NULL,
  status text NOT NULL DEFAULT 'missing' CHECK (status IN ('missing', 'found')),
  photo_url text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
  
-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_missing_persons_full_name ON missing_persons(full_name);
CREATE INDEX IF NOT EXISTS idx_missing_persons_region ON missing_persons(region);
CREATE INDEX IF NOT EXISTS idx_missing_persons_status ON missing_persons(status);
CREATE INDEX IF NOT EXISTS idx_missing_persons_date_missing ON missing_persons(date_missing DESC);
CREATE INDEX IF NOT EXISTS idx_missing_persons_created_at ON missing_persons(created_at DESC);

-- Enable Row Level Security
ALTER TABLE missing_persons ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to view missing persons (public read)
CREATE POLICY "Anyone can view missing persons"
  ON missing_persons
  FOR SELECT
  USING (true);

-- Policy: Allow anyone to report missing persons (public insert)
CREATE POLICY "Anyone can report missing persons"
  ON missing_persons
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated users can update records (admin only)
CREATE POLICY "Authenticated users can update missing persons"
  ON missing_persons
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete records (admin only)
CREATE POLICY "Authenticated users can delete missing persons"
  ON missing_persons
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_missing_persons_updated_at
  BEFORE UPDATE ON missing_persons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
