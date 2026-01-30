"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock API call
    setTimeout(() => setSubmitted(true), 1000)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F9FAFB] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-border text-center">
        {!submitted ? (
          <>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Mail size={32} />
            </div>
            <h1 className="text-2xl font-bold text-primary-foreground mb-2">Reset Password</h1>
            <p className="text-muted-foreground mb-8 text-sm">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border bg-secondary/30 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-center"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                Send Reset Link
              </button>
            </form>

            <div className="mt-8">
              <Link
                href="/auth/login"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <Mail size={32} />
            </div>
            <h2 className="text-2xl font-bold text-primary-foreground mb-2">Check your email</h2>
            <p className="text-muted-foreground mb-8 text-sm">
              We've sent a password reset link to <span className="font-bold text-foreground">{email}</span>
            </p>

            <button onClick={() => setSubmitted(false)} className="text-primary font-bold hover:underline">
              Resend Link
            </button>

            <div className="mt-8 border-t pt-6">
              <Link
                href="/auth/login"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
