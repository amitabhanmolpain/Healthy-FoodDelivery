"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Clock, ShieldCheck, MapPin } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Redirect to the order tracker page with a dummy ID
      router.push("/order-tracker/12345")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold">
            <ArrowLeft size={20} /> Back to Cart
          </Link>
          <div className="font-black text-2xl tracking-tight">Checkout</div>
          <div className="w-24"></div> {/* Spacer */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            {/* Delivery Address */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <MapPin size={16} />
                </div>
                Delivery Address
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <CreditCard size={16} />
                </div>
                Payment Method
              </h2>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="p-4 border-2 border-red-600 bg-red-50/50 rounded-xl flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-4 border-red-600"></div>
                    <span className="font-bold text-gray-900">Credit / Debit Card</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-mono"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-mono"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-red-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isProcessing ? <>Processing Payment...</> : <>Pay ₹2,499</>}
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <ShieldCheck size={16} /> Secure 256-bit SSL Encrypted Payment
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-red-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 py-2">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                    <img
                      src="/super-green-quinoa-bowl.jpg"
                      alt="Mediterranean Bowl"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900">Mediterranean Bowl</div>
                    <div className="text-sm text-gray-500">Qty: 2</div>
                  </div>
                  <div className="font-bold shrink-0">₹1,198</div>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                    <img
                      src="/healthy-buddha-bowl-colorful-ingredients.jpg"
                      alt="Quinoa Power Salad"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900">Quinoa Power Salad</div>
                    <div className="text-sm text-gray-500">Qty: 1</div>
                  </div>
                  <div className="font-bold shrink-0">₹599</div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹1,797</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>₹702</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-gray-900 pt-4">
                  <span>Total</span>
                  <span>₹2,499</span>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 p-4 rounded-xl flex items-start gap-3 text-blue-700 text-sm">
                <Clock size={18} className="mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block">Estimated Delivery Time</span>
                  30-45 Minutes after order confirmation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
