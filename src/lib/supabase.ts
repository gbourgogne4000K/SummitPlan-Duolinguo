import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      trips: {
        Row: {
          id: string
          created_at: string
          name: string
          type: 'voyage' | 'ascension'
          start_date: string
          end_date: string
          description: string | null
          status: 'planification' | 'en_cours' | 'termine'
          user_id: string
        }
        Insert: Omit<Database['public']['Tables']['trips']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['trips']['Insert']>
      }
      summits: {
        Row: {
          id: string
          trip_id: string
          name: string
          altitude: number
          coordinates_lat: number | null
          coordinates_lng: number | null
          summit_date: string | null
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['summits']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['summits']['Insert']>
      }
      daily_stages: {
        Row: {
          id: string
          trip_id: string
          day_number: number
          date: string
          location: string
          altitude: number | null
          coordinates_lat: number | null
          coordinates_lng: number | null
          activities: string | null
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['daily_stages']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['daily_stages']['Insert']>
      }
      equipment: {
        Row: {
          id: string
          trip_id: string
          name: string
          category: 'vetement' | 'materiel_montagne' | 'camping' | 'electronique' | 'autre'
          weight_grams: number | null
          luggage: 'sac_a_dos' | 'valise' | 'bagage_main' | null
          packed: boolean
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['equipment']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['equipment']['Insert']>
      }
      acclimatization_sessions: {
        Row: {
          id: string
          trip_id: string
          date: string
          duration_hours: number
          altitude_simulated: number | null
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['acclimatization_sessions']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['acclimatization_sessions']['Insert']>
      }
      transport_tickets: {
        Row: {
          id: string
          trip_id: string
          type: 'avion' | 'train' | 'bus' | 'autre'
          order_number: number
          departure: string
          arrival: string
          departure_time: string
          arrival_time: string | null
          booking_reference: string | null
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['transport_tickets']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['transport_tickets']['Insert']>
      }
      expenses: {
        Row: {
          id: string
          trip_id: string
          date: string
          description: string
          amount: number
          currency: string
          category: 'transport' | 'hebergement' | 'nourriture' | 'materiel' | 'activite' | 'autre'
          exchange_rate: number | null
          amount_home_currency: number | null
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['expenses']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['expenses']['Insert']>
      }
    }
  }
}
