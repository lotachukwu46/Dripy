import { create } from 'zustand'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  league: 'bronze' | 'silver' | 'gold' | 'diamond' | 'platinum'
  isVerified: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  verifyEmail: (token: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true })
    // Mock login - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    set({
      user: {
        id: '1',
        email,
        name: 'Test User',
        role: 'user',
        league: 'bronze',
        isVerified: true
      },
      isAuthenticated: true,
      isLoading: false
    })
  },

  register: async (email, password, name) => {
    set({ isLoading: true })
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1000))
    set({ isLoading: false })
    // In real app, would redirect to verify-email
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  verifyEmail: async (token) => {
    // Mock verification
    await new Promise(resolve => setTimeout(resolve, 1000))
  },

  forgotPassword: async (email) => {
    // Mock forgot password
    await new Promise(resolve => setTimeout(resolve, 1000))
  },

  resetPassword: async (token, password) => {
    // Mock reset password
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}))