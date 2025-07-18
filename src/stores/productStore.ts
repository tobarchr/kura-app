import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'
import type { PostgrestError } from '@supabase/supabase-js'

// Define a type for our product structure
export interface Product {
  id: number
  created_at: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  is_subscription_box: boolean
}

// A helper function to check if the error is a PostgrestError
function isPostgrestError(error: unknown): error is PostgrestError {
  return typeof error === 'object' && error !== null && 'message' in error && 'code' in error
}

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true })

        if (error) throw error

        // It's safer to provide a fallback in case data is null
        this.products = data || []
      } catch (err: unknown) {
        // Use unknown for better type safety
        if (isPostgrestError(err)) {
          this.error = `Error ${err.code}: ${err.message}`
          console.error('Error fetching products:', err.message)
        } else if (err instanceof Error) {
          this.error = err.message
          console.error('Error fetching products:', err.message)
        } else {
          this.error = 'An unknown error occurred while fetching products.'
          console.error('Error fetching products:', err)
        }
      } finally {
        this.loading = false
      }
    },
  },
})
