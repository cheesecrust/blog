import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'

interface UseCrudOptions<T> {
  tableName: string
  orderBy?: keyof T
  ascending?: boolean
  filter?: Record<string, unknown>
}

interface UseCrudReturn<T> {
  data: T[]
  loading: boolean
  error: PostgrestError | null
  create: (item: Partial<T>) => Promise<T | null>
  update: (id: string, item: Partial<T>) => Promise<T | null>
  remove: (id: string) => Promise<boolean>
  refetch: () => Promise<void>
}

export function useCrud<T extends { id: string }>({
  tableName,
  orderBy = 'created_at' as keyof T,
  ascending = false,
  filter,
}: UseCrudOptions<T>): UseCrudReturn<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from(tableName).select('*')

      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      query = query.order(orderBy as string, { ascending })

      const { data: fetchedData, error: fetchError } = await query

      if (fetchError) {
        setError(fetchError)
      } else {
        setData((fetchedData as T[]) || [])
      }
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }, [tableName, orderBy, ascending, filter])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const create = async (item: Partial<T>): Promise<T | null> => {
    try {
      const { data: newItem, error: createError } = await supabase
        .from(tableName)
        .insert(item as never)
        .select()
        .single()

      if (createError) {
        setError(createError)
        return null
      }

      setData((prev) => [...prev, newItem as T])
      return newItem as T
    } catch (err) {
      console.error('Error creating item:', err)
      return null
    }
  }

  const update = async (id: string, item: Partial<T>): Promise<T | null> => {
    try {
      const { data: updatedItem, error: updateError } = await supabase
        .from(tableName)
        .update(item as never)
        .eq('id', id)
        .select()
        .single()

      if (updateError) {
        setError(updateError)
        return null
      }

      setData((prev) =>
        prev.map((existingItem) =>
          existingItem.id === id ? (updatedItem as T) : existingItem
        )
      )
      return updatedItem as T
    } catch (err) {
      console.error('Error updating item:', err)
      return null
    }
  }

  const remove = async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)

      if (deleteError) {
        setError(deleteError)
        return false
      }

      setData((prev) => prev.filter((item) => item.id !== id))
      return true
    } catch (err) {
      console.error('Error deleting item:', err)
      return false
    }
  }

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    refetch: fetchData,
  }
}
