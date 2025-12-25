"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Utensils, Loader2, CheckCircle, Upload } from "lucide-react"
import Link from "next/link"

export default function BusinessSignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "restaurant",
    cuisine: "",
    // Owner Information
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    // Business Address
    street: "",
    city: "",
    state: "",
    pincode: "",
    // Business Details
    fssaiNumber: "",
    gstNumber: "",
    bankAccountNumber: "",
    ifscCode: "",
    // Password
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Mock signup process
    setTimeout(() => {
      router.push("/business/dashboard")
    }, 2000)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center text-white">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
            <Utensils size={32} />
          </div>
          <h1 className="text-3xl font-bold">Join PurePlate</h1>
          <p className="text-red-100 mt-2">Partner with us and grow your food business</p>

          {/* Progress Steps */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= s ? "bg-white text-red-600" : "bg-white/20 text-white/60"
                  }`}
                >
                  {step > s ? <CheckCircle size={16} /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-8 h-1 mx-1 rounded-full transition-all ${
                      step > s ? "bg-white" : "bg-white/20"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Business Information */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Business Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    placeholder="e.g., Healthy Kitchen"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    required
                  >
                    <option value="restaurant">Restaurant</option>
                    <option value="cloud_kitchen">Cloud Kitchen</option>
                    <option value="cafe">Cafe</option>
                    <option value="home_kitchen">Home Kitchen</option>
                    <option value="catering">Catering Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type *</label>
                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    placeholder="e.g., North Indian, South Indian, Continental"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Owner Information */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Owner Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Business Address & Legal Details */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Business Address & Legal Details</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    placeholder="Street, Building, Floor"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                      placeholder="State"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    placeholder="110001"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">FSSAI License Number *</label>
                  <input
                    type="text"
                    name="fssaiNumber"
                    value={formData.fssaiNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    placeholder="14 digit FSSAI number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Number (Optional)</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    placeholder="GST Number"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Bank Details & Password */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Bank Details & Security</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Number *</label>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    placeholder="Account number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code *</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                    placeholder="IFSC Code"
                    required
                  />
                </div>

                <div className="border-t border-gray-200 pt-5 mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Create Password</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                      placeholder="Create a strong password"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                  <p className="font-medium mb-1">📋 Documents Required (Upload after registration):</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>FSSAI License Certificate</li>
                    <li>Bank Account Proof (Cancelled Cheque)</li>
                    <li>GST Certificate (if applicable)</li>
                    <li>Owner ID Proof (Aadhaar/PAN)</li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Submitting...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already a partner?{" "}
              <Link href="/business/login" className="text-red-600 font-bold hover:underline">
                Sign in
              </Link>
            </p>
            <Link href="/" className="block mt-4 text-sm text-gray-400 hover:text-gray-600">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
