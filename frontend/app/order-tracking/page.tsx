"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, CheckCircle, ChefHat, Truck, Home } from "lucide-react"
import Link from "next/link"

export default function OrderTrackingPage() {
  const [status, setStatus] = useState<"preparing" | "delivering">("preparing")
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds for prep
  const [deliveryTime, setDeliveryTime] = useState(10) // 10 mins for delivery

  // Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          if (status === "preparing") {
            setStatus("delivering")
            return 10 * 60 // 10 minutes for delivery
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // For demo purposes, switch quickly after 5 seconds if user wants to see map
    const demoTimeout = setTimeout(() => {
      if (status === "preparing") {
        setStatus("delivering")
        setTimeLeft(10 * 60)
      }
    }, 8000)

    return () => {
      clearInterval(timer)
      clearTimeout(demoTimeout)
    }
  }, [status])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Provided API Key for context (visual only since we are simulating)
  const MAP_API_KEY =
    "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjYxZDBmNjM1ZTNhMzQ5ZjdhMzY0MzNkZjdiOTAxYjZlIiwiaCI6Im11cm11cjY0In0="

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar Minimal */}
      <div className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="font-black text-xl tracking-tight">
          Pure<span className="text-red-600">Plate</span>
        </Link>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          Live Tracking
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* Left Panel: Status & Timer */}
        <div className="w-full lg:w-1/3 bg-white p-8 border-r border-gray-200 z-10 flex flex-col shadow-xl">
          <div className="mb-8">
            <h1 className="text-3xl font-black mb-2 text-gray-900">Order #8821</h1>
            <p className="text-gray-500">
              Estimated Arrival: <span className="text-gray-900 font-bold">1:15 PM</span>
            </p>
          </div>

          <div className="space-y-8 flex-1">
            {/* Progress Steps */}
            <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              <div className={`relative ${status === "preparing" ? "opacity-100" : "opacity-100"}`}>
                <div
                  className={`absolute -left-8 p-1.5 rounded-full ${status === "preparing" ? "bg-red-600 text-white ring-4 ring-red-100" : "bg-green-500 text-white"}`}
                >
                  {status === "preparing" ? (
                    <Clock size={16} className="animate-spin-slow" />
                  ) : (
                    <CheckCircle size={16} />
                  )}
                </div>
                <h3 className={`font-bold text-lg ${status === "preparing" ? "text-red-600" : "text-gray-900"}`}>
                  Preparing your meal
                </h3>
                <p className="text-sm text-gray-500">Chef Mario is crafting your salad</p>
              </div>

              <div className={`relative ${status === "delivering" ? "opacity-100" : "opacity-50"}`}>
                <div
                  className={`absolute -left-8 p-1.5 rounded-full ${status === "delivering" ? "bg-red-600 text-white ring-4 ring-red-100" : "bg-gray-200 text-gray-400"}`}
                >
                  <Truck size={16} />
                </div>
                <h3 className={`font-bold text-lg ${status === "delivering" ? "text-red-600" : "text-gray-900"}`}>
                  Out for Delivery
                </h3>
                <p className="text-sm text-gray-500">Rider is on the way</p>
              </div>

              <div className="relative opacity-50">
                <div className="absolute -left-8 p-1.5 rounded-full bg-gray-200 text-gray-400">
                  <Home size={16} />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Delivered</h3>
                <p className="text-sm text-gray-500">Enjoy your meal!</p>
              </div>
            </div>

            {/* Big Timer */}
            <div className="bg-gray-900 rounded-3xl p-8 text-center text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="relative z-10">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {status === "preparing" ? "Ready In" : "Arriving In"}
                </div>
                <div className="text-7xl font-black tabular-nums tracking-tighter">{formatTime(timeLeft)}</div>
                <div className="mt-4 flex justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex items-center gap-4">
              <img src="/placeholder.svg?height=50&width=50" className="w-12 h-12 rounded-full bg-gray-200" />
              <div>
                <p className="font-bold">Contact Support</p>
                <p className="text-xs text-gray-500">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Map Simulation */}
        <div className="flex-1 bg-gray-200 relative overflow-hidden">
          {/* Mock Map Image */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=1000&text=Map+View')] bg-cover opacity-50 grayscale"></div>

          {/* Map UI simulation */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" style={{ filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.3))" }}>
              {/* Simplified path for demo */}
              <path
                d="M 200 200 Q 400 300 600 500"
                fill="none"
                stroke="#ef4444"
                strokeWidth="5"
                strokeDasharray="10 5"
                className="animate-[dash_10s_linear_infinite]"
              />
              <circle cx="200" cy="200" r="10" fill="#ef4444" />
              <circle cx="600" cy="500" r="10" fill="#22c55e" />
            </svg>
          </div>

          {/* Markers */}
          <motion.div
            className="absolute top-[20%] left-[20%] transform -translate-x-1/2 -translate-y-1/2"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <div className="bg-white p-3 rounded-xl shadow-xl flex items-center gap-2">
              <ChefHat size={20} className="text-red-600" />
              <span className="font-bold text-xs">Kitchen</span>
            </div>
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white mx-auto"></div>
          </motion.div>

          <motion.div className="absolute bottom-[40%] right-[30%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-black text-white p-3 rounded-xl shadow-xl flex items-center gap-2">
              <Home size={20} />
              <span className="font-bold text-xs">Home</span>
            </div>
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black mx-auto"></div>
          </motion.div>

          {/* Rider Icon (Moving) */}
          {status === "delivering" && (
            <motion.div
              className="absolute top-[20%] left-[20%] z-20"
              animate={{
                top: ["20%", "60%"],
                left: ["20%", "70%"],
              }}
              transition={{ duration: 10, ease: "linear" }}
            >
              <div className="bg-red-600 text-white p-2 rounded-full shadow-lg border-2 border-white ring-4 ring-red-500/30">
                <Truck size={24} />
              </div>
            </motion.div>
          )}

          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] text-gray-500 shadow-sm border border-gray-200">
            Map Data © Simulated | API Key: ...murmur64
          </div>
        </div>
      </div>
    </div>
  )
}
