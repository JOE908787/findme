export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      missing_persons: {
        Row: {
          id: string
          full_name: string
          age: number
          gender: 'Male' | 'Female' | 'Other'
          region: string
          last_seen_location: string
          date_missing: string
          contact_number: string
          status: 'missing' | 'found'
          photo_url: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          age: number
          gender: 'Male' | 'Female' | 'Other'
          region: string
          last_seen_location: string
          date_missing: string
          contact_number: string
          status?: 'missing' | 'found'
          photo_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          age?: number
          gender?: 'Male' | 'Female' | 'Other'
          region?: string
          last_seen_location?: string
          date_missing?: string
          contact_number?: string
          status?: 'missing' | 'found'
          photo_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type MissingPerson = Database['public']['Tables']['missing_persons']['Row'];
export type MissingPersonInsert = Database['public']['Tables']['missing_persons']['Insert'];
export type MissingPersonUpdate = Database['public']['Tables']['missing_persons']['Update'];
