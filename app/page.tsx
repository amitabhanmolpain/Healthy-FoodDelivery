"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck, QrCode, Check, Clock, Star } from "lucide-react"
import { MEALS_DB } from "@/lib/mock-data"
import MealCard from "@/components/ui/MealCard"
import { useState } from "react"
import AuthModal from "@/components/ui/AuthModal"
import Footer from "@/components/layout/Footer"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const PLANS = [
  {
    name: "Starter",
    price: 999, // INR
    meals: 6,
    features: ["Select any 6 meals", "Free Delivery", "Pause anytime"],
    recommended: false,
  },
  {
    name: "Lifestyle",
    price: 1899, // INR
    meals: 12,
    features: ["Select any 12 meals", "Priority Delivery", "Free Diet Consultation", "10% off Add-ons"],
    recommended: true,
  },
  {
    name: "All-In",
    price: 3499, // INR
    meals: 24,
    features: ["Full month supply (Mon-Sat)", "Free Delivery", "Quarterly Lab Tour", "Concierge Support"],
    recommended: false,
  },
]

export default function LandingPage() {
  const featuredMeals = MEALS_DB.slice(0, 4)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const { user } = useAuth()
  const router = useRouter()

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const handleMealClick = (meal: any) => {
    if (!user) {
      openAuthModal("login")
    } else {
      router.push(`/menu/${meal.id}`)
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-white via-gray-50 to-red-50 pt-32 pb-32 overflow-hidden">
          {/* Background Blobs */}
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-red-100/50 rounded-full blur-[100px] mix-blend-multiply animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[100px] mix-blend-multiply animate-pulse"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 space-y-8 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-bold border border-red-100 shadow-sm">
                  <ShieldCheck size={18} />
                  <span>100% Verified Organic Sources</span>
                </div>
                <h1 className="text-5xl lg:text-8xl font-black tracking-tight text-gray-900 text-balance leading-[0.9]">
                  Eat Pure.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ce1126] to-red-600">
                    Live Better.
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 text-balance leading-relaxed">
                  The only food delivery service that provides lab reports for every ingredient. Authentic flavors, zero
                  adulteration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                  <button
                    onClick={() => openAuthModal("login")}
                    className="bg-[#ce1126] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 flex items-center justify-center gap-3 group"
                  >
                    Start Ordering <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <Link
                    href="/about/sourcing"
                    className="bg-white text-gray-900 border-2 border-gray-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center shadow-sm hover:shadow-lg"
                  >
                    How It Works
                  </Link>
                </div>

                {/* Stats */}
                <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-80">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-gray-900">50k+</span>
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Happy Eaters</span>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-gray-900">4.9</span>
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                      Rating <Star size={12} fill="currentColor" className="text-yellow-400" />
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 relative w-full max-w-lg lg:max-w-xl"
              >
                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img
                    src="/healthy-gourmet-salad-bowl.jpg"
                    alt="Gourmet Food"
                    className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                  />
                  {/* Floating badge */}
                  <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce duration-[3000ms]">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">30 Min Delivery</p>
                      <p className="text-xs text-gray-500">Fresh to your door</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section (Red Background) */}
        <section className="py-24 bg-brand-red text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#ce1126] to-red-700 opacity-90"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-7xl font-black mb-8 text-balance tracking-tight">
                Ready to Experience <br />
                Great Food?
              </h2>
              <p className="text-xl text-red-100 mb-12 max-w-2xl mx-auto text-balance font-medium leading-relaxed">
                Don't compromise on your health. Join thousands of satisfied customers enjoying gourmet meals delivered
                fresh daily.
              </p>
              <button
                onClick={() => openAuthModal("signup")}
                className="bg-white text-[#ce1126] px-12 py-6 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-105 hover:-translate-y-1 cursor-pointer"
              >
                Get Started Now
              </button>
            </motion.div>
          </div>
        </section>

        {/* Featured Menu */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-end mb-12"
            >
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-3">Today's Specials</h2>
                <p className="text-gray-500 text-lg">Handpicked by our expert chefs</p>
              </div>
              <button
                onClick={() => (user ? router.push("/menu") : openAuthModal("login"))}
                className="text-red-600 font-bold text-lg hover:underline flex items-center gap-2 hover:gap-3 transition-all"
              >
                View Full Menu <ArrowRight size={20} />
              </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredMeals.map((meal, index) => (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MealCard meal={meal} onMealClick={() => handleMealClick(meal)} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Transparency Section - Know What You Eat (Red Background) */}
        <section className="py-24 bg-brand-red text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#ce1126] to-red-700 opacity-90"></div>
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <img
              src="/food-science-laboratory.jpg"
              alt="Lab testing"
              className="w-full h-full object-cover grayscale"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 space-y-8"
              >
                <div className="inline-block bg-white text-red-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                  Transparency
                </div>
                <h2 className="text-4xl lg:text-6xl font-black leading-tight">
                  Know What You Eat.
                  <br />
                  <span className="text-red-200">Scan Your Food.</span>
                </h2>
                <p className="text-xl text-red-100 leading-relaxed">
                  We believe in total transparency. Every meal comes with a QR code that reveals the entire journey of
                  your food.
                </p>

                <div className="flex gap-6 pt-4">
                  <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer group">
                    <div className="bg-white p-2 rounded-lg text-[#ce1126] group-hover:scale-110 transition-transform">
                      <QrCode size={32} />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Scan to Verify</p>
                      <p className="text-sm text-red-100">See lab reports instantly</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="flex-1 relative">
                {/* Scanner Phone Mockup */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative mx-auto border-gray-900 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden transform hover:-rotate-1 transition-transform"
                >
                  <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                  <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                  <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                    <img
                      src="/food-scanner-app-interface.jpg"
                      alt="Scanner App"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-56 h-56 border-2 border-[#ce1126] rounded-3xl relative animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)] bg-black/10 backdrop-blur-sm">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#ce1126] -mt-1 -ml-1 rounded-tl-lg"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#ce1126] -mt-1 -mr-1 rounded-tr-lg"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#ce1126] -mb-1 -ml-1 rounded-bl-lg"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#ce1126] -mb-1 -mr-1 rounded-br-lg"></div>
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#ce1126] shadow-[0_0_15px_rgba(239,68,68,1)]"></div>

                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 backdrop-blur px-4 py-1.5 rounded-full text-white text-xs font-bold border border-white/10">
                          Detecting Organic Markers...
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Plans Section (Swapped to be last before footer) */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-4xl font-black text-gray-900 mb-4">Simple, Flexible Plans</h2>
              <p className="text-gray-500 text-lg">
                Commit to clean eating and save up to 20%. Cancel or pause anytime.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {PLANS.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-white rounded-3xl p-8 border ${plan.recommended ? "border-red-600 shadow-2xl scale-105 z-10 ring-4 ring-red-600/10" : "border-gray-200 shadow-sm"} flex flex-col hover:shadow-xl transition-shadow duration-300`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-md">
                      Best Value
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-extrabold text-gray-900">₹{plan.price}</span>
                      <span className="text-gray-400">/week</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{plan.meals} meals per week</p>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="bg-red-100 p-1 rounded-full text-[#ce1126] shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 rounded-xl font-bold transition-all ${plan.recommended ? "bg-[#ce1126] text-white hover:bg-red-700 shadow-lg shadow-red-200" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}
                  >
                    Choose {plan.name}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </>
  )
}
