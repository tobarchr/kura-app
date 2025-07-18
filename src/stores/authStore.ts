import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'
import type { Session, User, AuthError } from '@supabase/supabase-js'

// A helper function to check if the error is an AuthError
function isAuthError(error: unknown): error is AuthError {
  return typeof error === 'object' && error !== null && 'message' in error
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    session: null as Session | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async handleLogin(credentials: {
      email: string
      password?: string
      provider?: 'google' | 'github'
    }) {
      this.loading = true
      this.error = null
      try {
        if (credentials.provider) {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: credentials.provider,
          })
          if (error) throw error
        } else if (credentials.password) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })
          if (error) throw error
          this.user = data.user
          this.session = data.session
        } else {
          throw new Error('Password is required for email login.')
        }
      } catch (err: unknown) {
        // Use unknown for better type safety
        if (isAuthError(err)) {
          this.error = err.message
          console.error('Login Error:', err.message)
        } else if (err instanceof Error) {
          this.error = err.message
          console.error('Login Error:', err.message)
        } else {
          this.error = 'An unknown error occurred.'
          console.error('Login Error:', err)
        }
      } finally {
        this.loading = false
      }
    },

    async handleSignup(credentials: {
      email: string
      password?: string
      first_name: string
      last_name: string
      phone_number?: string
      provider?: 'google' | 'github'
    }) {
      this.loading = true
      this.error = null
      try {
        if (credentials.provider) {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: credentials.provider,
          })
          if (error) throw error
        } else if (credentials.password) {
          const { data, error } = await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
            first_name: credentials.first_name,
            last_name: credentials.last_name,
            phone: credentials.phone_number,
          })
          if (error) throw error
          this.user = data.user
          this.session = data.session
          // Note: You might want to show a "Check your email for confirmation" message
        } else {
          throw new Error('Password is required for email signup.')
        }
      } catch (err: unknown) {
        // Use unknown for better type safety
        if (isAuthError(err)) {
          this.error = err.message
          console.error('Signup Error:', err.message)
        } else if (err instanceof Error) {
          this.error = err.message
          console.error('Signup Error:', err.message)
        } else {
          this.error = 'An unknown error occurred.'
          console.error('Signup Error:', err)
        }
      } finally {
        this.loading = false
      }
    },

    async handleLogout() {
      this.loading = true
      this.error = null
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.user = null
        this.session = null
      } catch (err: unknown) {
        // Use unknown for better type safety
        if (isAuthError(err)) {
          this.error = err.message
          console.error('Logout Error:', err.message)
        } else if (err instanceof Error) {
          this.error = err.message
          console.error('Logout Error:', err.message)
        } else {
          this.error = 'An unknown error occurred.'
          console.error('Logout Error:', err)
        }
      } finally {
        this.loading = false
      }
    },

    // Action to check for an existing session
    async checkSession() {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        this.session = data.session
        this.user = data.session.user
      }
    },
  },
  getters: {
    isLoggedIn: (state): boolean => !!state.user,
  },
})
