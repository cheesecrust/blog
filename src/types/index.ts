import type { Database } from './database'

// Database types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Example entity type
export type Item = Tables<'items'>

// Auth types
export interface AuthUser {
  id: string
  email: string
}
