"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Phone, Star, Navigation } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function OrderTrackerPage() {
  const [status, setStatus] = useState<"preparing" | "delivering">("preparing")
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const [driverProgress, setDriverProgress] = useState(0)

  // Provided API key for reference
  const MAP_API_KEY =
    "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjYxZDBmNjM1ZTNhMzQ5ZjdhMzY0MzNkZjdiOTAxYjZlIiwiaCI6Im11cm11cjY0In0="

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          console.log("[v0] User location acquired")
        },
        (error) => {
          console.log("[v0] Could not get location, using default", error)
        },
      )
    }

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    // Simulate status change
    const statusTimer = setTimeout(() => {
      setStatus("delivering")
    }, 5000)

    const driverLoop = setInterval(() => {
      setDriverProgress((prev) => (prev + 0.5) % 100)
    }, 100)

    return () => {
      clearInterval(timer)
      clearTimeout(statusTimer)
      clearInterval(driverLoop)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 shadow-sm z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="font-black text-2xl tracking-tight">
            Pure<span className="text-[#ce1126]">Plate</span>
          </Link>
          <div className="text-sm font-bold text-gray-500">Order #8829-XJ</div>
        </div>
      </header>

      <div className="flex-1 relative flex flex-col md:flex-row">
        {/* Map Area */}
        <div className="flex-1 bg-gray-200 relative min-h-[500px] md:min-h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[#e5e7eb]">
            {/* Map Tiles Simulation */}
            <div className="w-full h-full bg-[url('/bangalore-city-map-streets.jpg')] bg-cover bg-center opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"></div>

            {/* Grid overlay for map feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {/* Path Line */}
              <path
                id="delivery-path"
                d="M 300 300 Q 500 500 700 400"
                fill="none"
                stroke="#ce1126"
                strokeWidth="6"
                strokeDasharray="12 6"
                className="opacity-50"
              />
            </svg>

            {/* Restaurant Marker */}
            <div className="absolute top-[300px] left-[300px] -translate-x-1/2 -translate-y-1/2 z-20 group">
              <div className="bg-white p-2 rounded-full shadow-xl border-2 border-gray-900 group-hover:scale-110 transition-transform">
                <div className="bg-gray-900 p-2 rounded-full text-white">
                  <span className="font-bold text-xs">REST</span>
                </div>
              </div>
              <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Koramangala 4th Block
              </div>
            </div>

            {/* User Location Marker */}
            <div className="absolute top-[400px] left-[700px] -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 w-16 h-16 -ml-3 -mt-3"></div>
                <div className="bg-white p-2 rounded-full shadow-xl border-2 border-blue-500 z-10 relative">
                  <div className="bg-blue-500 p-2 rounded-full text-white">
                    <Navigation size={20} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded shadow-md text-xs font-bold whitespace-nowrap z-50 border border-gray-200 text-gray-800">
                  {userLocation ? "Indiranagar (Your Location)" : "Indiranagar (Delivery)"}
                </div>
              </div>
            </div>

            {status === "delivering" && (
              <motion.div
                className="absolute z-30"
                initial={{ top: "300px", left: "300px" }}
                animate={{
                  top: ["300px", "450px", "400px"],
                  left: ["300px", "500px", "700px"],
                }}
                transition={{
                  duration: 20,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-[#ce1126] text-white p-2 rounded-full shadow-2xl border-2 border-white z-20 relative transform scale-110">
                    {/* Scooter Icon simulation */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="18.5" cy="17.5" r="3.5" />
                      <circle cx="5.5" cy="17.5" r="3.5" />
                      <path d="M15 6h2.5a2.5 2.5 0 1 1 0 5H7.817a2.5 2.5 0 0 1-2.317-1.745L5 8.75" />
                      <path d="M15 6h-3V4.5a2.5 2.5 0 0 0-5 0V6" />
                      <path d="M15 6l-2.58 7.74" />
                    </svg>
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-2 py-1 rounded-lg text-[10px] font-bold shadow-lg whitespace-nowrap border border-gray-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Ramesh • KA 01 EQ 2211
                  </div>
                </div>
              </motion.div>
            )}

            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-2 py-1 text-[10px] text-gray-500 rounded flex flex-col items-end">
              <span>Bangalore, KA</span>
              <span>API Key Active: ...murmur64</span>
            </div>

            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm border border-gray-200">
              <div className="text-xs font-bold text-gray-500 uppercase">Distance</div>
              <div className="text-sm font-black text-gray-900">4.2 km</div>
            </div>
          </div>
        </div>

        {/* Status Panel */}
        <div className="w-full md:w-[400px] bg-white shadow-2xl z-20 p-6 flex flex-col h-[50vh] md:h-auto overflow-y-auto border-l border-gray-200">
          {/* ... existing status code ... */}
          {/* Re-implementing the panel for completeness with the new colors */}
          <div className="mb-8 text-center">
            {status === "preparing" ? (
              <>
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <div className="absolute inset-0 border-4 border-orange-100 rounded-full animate-spin border-t-orange-500"></div>
                  <Clock size={32} className="text-orange-500" />
                </div>
                <h1 className="text-2xl font-black text-gray-900 mb-1">Preparing Your Order</h1>
                <p className="text-sm text-gray-500">Kitchen is busy crafting your meal</p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <MapPin size={32} className="text-[#ce1126]" fill="currentColor" />
                </div>
                <h1 className="text-2xl font-black text-gray-900 mb-1">Out for Delivery</h1>
                <p className="text-sm text-gray-500">Rider is moving to your location</p>
              </>
            )}

            <div className="mt-6 bg-gray-900 text-white rounded-xl p-4 shadow-xl">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Time</div>
              <div className="text-4xl font-black font-mono tracking-wider">{formatTime(timeLeft)}</div>
            </div>
          </div>

          <div className="space-y-6 flex-1 px-2">
            {/* Timeline */}
            <div className="space-y-6 relative pl-4 border-l-2 border-gray-100 ml-2">
              {/* Timeline items similar to before but updated */}
              <div className="relative pl-6">
                <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white"></div>
                <h4 className="font-bold text-sm">Order Confirmed</h4>
                <p className="text-xs text-gray-400">10:42 AM</p>
              </div>
              <div className="relative pl-6">
                <div
                  className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full ring-4 ring-white ${status === "preparing" || status === "delivering" ? "bg-green-500" : "bg-gray-300"}`}
                ></div>
                <h4 className="font-bold text-sm">Preparing</h4>
                {status === "preparing" && (
                  <span className="text-xs text-orange-500 font-bold animate-pulse">Live</span>
                )}
              </div>
              <div className="relative pl-6">
                <div
                  className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full ring-4 ring-white ${status === "delivering" ? "bg-green-500" : "bg-gray-300"}`}
                ></div>
                <h4 className="font-bold text-sm">Out for Delivery</h4>
                {status === "delivering" && (
                  <span className="text-xs text-[#ce1126] font-bold animate-pulse">Live</span>
                )}
              </div>
            </div>

            {/* Driver Card */}
            {status === "delivering" && (
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5">
                <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                  <img src="/placeholder.svg?height=40&width=40" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-900">Ramesh Kumar</div>
                  <div className="flex items-center text-[10px] text-gray-500">
                    <Star size={10} className="text-yellow-400 fill-current mr-1" />
                    4.9 • Scooter
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">
                    <Phone size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/"
            className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-bold text-center hover:bg-gray-200 transition-colors mt-6 text-sm"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  )
}
