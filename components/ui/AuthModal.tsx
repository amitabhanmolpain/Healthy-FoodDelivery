"use client"

import type React from "react"
import { useState } from "react"
import { X, Upload, Mail, Lock, User } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "login" | "signup"
}

export default function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [email, setEmail] = useState("user@example.com")
  const [password, setPassword] = useState("password")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, register } = useAuth()
  const router = useRouter()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (mode === "login") {
        await login(email, password)
        router.push("/menu")
        onClose()
      } else {
        if (password !== confirmPassword) {
          setError("Passwords don't match")
          setIsLoading(false)
          return
        }
        await register({ name, email, password, confirmPassword })
        router.push("/menu")
        onClose()
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {mode === "login" ? "Welcome Back" : "Join PurePlate"}
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              {mode === "login" ? "Enter your details to access your account" : "Start your journey to great food"}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm text-center font-bold border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "signup" && (
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-primary/30 cursor-pointer hover:bg-gray-200 transition-colors">
                  <Upload size={20} />
                  <span className="text-[10px] mt-1">Photo</span>
                </div>
              </div>
            )}

            {mode === "signup" && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#ce1126] focus:border-transparent outline-none transition-all font-medium"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#ce1126] focus:border-transparent outline-none transition-all font-medium"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#ce1126] focus:border-transparent outline-none transition-all font-medium"
                required
              />
            </div>

            {mode === "signup" && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#ce1126] focus:border-transparent outline-none transition-all font-medium"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#ce1126] text-white font-black py-4 rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-8 text-lg relative z-20 cursor-pointer"
            >
              {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login")
                setError("")
              }}
              className="text-[#ce1126] font-bold hover:underline"
            >
              {mode === "login" ? "Sign Up" : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
