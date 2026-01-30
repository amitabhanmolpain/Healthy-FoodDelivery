"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { api } from "@/services/api"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  preferences?: {
    vegan?: boolean
    glutenFree?: boolean
    allergies?: string[]
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (e: string, p: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check local storage on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, pass: string) => {
    const res = await api.auth.login(email, pass)
    setUser(res.user)
    localStorage.setItem("user", JSON.stringify(res.user))
    localStorage.setItem("token", res.token)
  }

  const register = async (data: any) => {
    const res = await api.auth.register(data)
    setUser(res.user)
    localStorage.setItem("user", JSON.stringify(res.user))
    localStorage.setItem("token", res.token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
