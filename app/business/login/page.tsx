"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Utensils, Loader2 } from "lucide-react"
import Link from "next/link"

export default function BusinessLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Mock business login
    setTimeout(() => {
      router.push("/business/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-red-600 p-8 text-center text-white">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
            <Utensils size={32} />
          </div>
          <h1 className="text-2xl font-bold">Partner Portal</h1>
          <p className="text-red-100 mt-2">Manage your kitchen, orders, and menu.</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                placeholder="kitchen@example.com"
                defaultValue="kitchen@pureplate.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                defaultValue="password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Access Dashboard"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Not a partner yet?{" "}
              <Link href="#" className="text-red-600 font-bold hover:underline">
                Apply to join
              </Link>
            </p>
            <Link href="/" className="block mt-6 text-sm text-gray-400 hover:text-gray-600">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
