"use client"

import { useState, useEffect, useRef } from "react"
import { Clock, MapPin, Phone, Star } from "lucide-react"
import Link from "next/link"
import L from "leaflet"

const OPENROUTE_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjYxZDBmNjM1ZTNhMzQ5ZjdhMzY0MzNkZjdiOTAxYjZlIiwiaCI6Im11cm11cjY0In0="

export default function OrderTrackerPage() {
  const [status, setStatus] = useState<"preparing" | "delivering">("preparing")
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [userLocation, setUserLocation] = useState<[number, number]>([12.9716, 77.6412]) // Default: Bangalore Indiranagar
  const [restaurantLocation] = useState<[number, number]>([12.9352, 77.6245]) // Koramangala
  const [driverLocation, setDriverLocation] = useState<[number, number]>(restaurantLocation)
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([])
  const [distance, setDistance] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const mapRef = useRef<any>(null)
  const mapInstanceRef = useRef<any>(null)
  const driverMarkerRef = useRef<any>(null)
  const routeProgressRef = useRef(0)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const map = L.map(mapRef.current).setView([12.9539, 77.6309], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map)

      // Restaurant marker
      const restaurantIcon = L.divIcon({
        className: "custom-marker",
        html: `<div class="bg-white p-2 rounded-full shadow-xl border-2 border-gray-900">
                <div class="bg-gray-900 p-2 rounded-full text-white text-xs font-bold">REST</div>
               </div>`,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      })
      L.marker(restaurantLocation, { icon: restaurantIcon })
        .addTo(map)
        .bindPopup("<b>Restaurant</b><br>Koramangala 4th Block")

      // User location marker
      const userIcon = L.divIcon({
        className: "custom-marker",
        html: `<div class="relative">
                <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 w-12 h-12"></div>
                <div class="bg-white p-2 rounded-full shadow-xl border-2 border-blue-500 relative z-10">
                  <div class="bg-blue-500 p-2 rounded-full text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                    </svg>
                  </div>
                </div>
               </div>`,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      })
      L.marker(userLocation, { icon: userIcon }).addTo(map).bindPopup("<b>Your Location</b><br>Indiranagar")

      mapInstanceRef.current = map
    }
  }, [])

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${OPENROUTE_API_KEY}&start=${restaurantLocation[1]},${restaurantLocation[0]}&end=${userLocation[1]},${userLocation[0]}`,
        )
        const data = await response.json()

        if (data.features && data.features[0]) {
          const coords = data.features[0].geometry.coordinates.map(
            (coord: number[]) => [coord[1], coord[0]] as [number, number],
          )
          setRouteCoordinates(coords)
          setDistance((data.features[0].properties.segments[0].distance / 1000).toFixed(1) as any)
          setDuration(Math.ceil(data.features[0].properties.segments[0].duration / 60))

          // Draw route on map
          if (typeof window !== "undefined" && mapInstanceRef.current) {
            L.polyline(coords, {
              color: "#ce1126",
              weight: 4,
              opacity: 0.7,
              dashArray: "10, 10",
            }).addTo(mapInstanceRef.current)

            mapInstanceRef.current.fitBounds(L.latLngBounds(coords))
          }
        }
      } catch (error) {
        console.error("[v0] Error fetching route:", error)
      }
    }

    fetchRoute()
  }, [restaurantLocation, userLocation])

  useEffect(() => {
    if (status === "delivering" && routeCoordinates.length > 0) {
      const animateDriver = setInterval(() => {
        routeProgressRef.current += 0.3
        if (routeProgressRef.current >= routeCoordinates.length) {
          routeProgressRef.current = 0
        }

        const currentIndex = Math.floor(routeProgressRef.current)
        const nextIndex = Math.min(currentIndex + 1, routeCoordinates.length - 1)
        const fraction = routeProgressRef.current - currentIndex

        const lat =
          routeCoordinates[currentIndex][0] +
          (routeCoordinates[nextIndex][0] - routeCoordinates[currentIndex][0]) * fraction
        const lng =
          routeCoordinates[currentIndex][1] +
          (routeCoordinates[nextIndex][1] - routeCoordinates[currentIndex][1]) * fraction

        setDriverLocation([lat, lng])

        if (typeof window !== "undefined" && mapInstanceRef.current) {
          if (driverMarkerRef.current) {
            driverMarkerRef.current.setLatLng([lat, lng])
          } else {
            const driverIcon = L.divIcon({
              className: "custom-marker",
              html: `<div class="relative">
                      <div class="bg-[#ce1126] text-white p-2 rounded-full shadow-2xl border-2 border-white transform scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="18.5" cy="17.5" r="3.5"/>
                          <circle cx="5.5" cy="17.5" r="3.5"/>
                          <path d="M15 6h2.5a2.5 2.5 0 1 1 0 5H7.817a2.5 2.5 0 0 1-2.317-1.745L5 8.75"/>
                        </svg>
                      </div>
                      <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-2 py-1 rounded text-xs font-bold shadow whitespace-nowrap">
                        Ramesh • KA 01 EQ 2211
                      </div>
                     </div>`,
              iconSize: [40, 40],
              iconAnchor: [20, 20],
            })
            driverMarkerRef.current = L.marker([lat, lng], { icon: driverIcon }).addTo(mapInstanceRef.current)
          }
        }
      }, 100)

      return () => clearInterval(animateDriver)
    }
  }, [status, routeCoordinates])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [position.coords.latitude, position.coords.longitude]
          setUserLocation(newLocation)
          console.log("[v0] User location acquired:", newLocation)
        },
        (error) => {
          console.log("[v0] Using default Bangalore location", error)
        },
      )
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    const statusTimer = setTimeout(() => {
      setStatus("delivering")
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(statusTimer)
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
        <div className="flex-1 bg-gray-200 relative min-h-[500px] md:min-h-screen">
          <div ref={mapRef} className="w-full h-full z-0"></div>

          {/* Map Info Overlay */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-lg z-10">
            <div className="text-xs text-gray-500">Powered by OpenRouteService</div>
          </div>

          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-3 rounded-xl shadow-lg border border-gray-100 z-10">
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">Distance</div>
            <div className="text-2xl font-black text-gray-900">{distance} km</div>
            {duration > 0 && <div className="text-xs text-gray-500 mt-1">{duration} min away</div>}
          </div>
        </div>

        {/* Status Panel */}
        <div className="w-full md:w-[400px] bg-white shadow-2xl z-20 p-6 flex flex-col h-[50vh] md:h-auto overflow-y-auto border-l border-gray-200">
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
            <div className="space-y-6 relative pl-4 border-l-2 border-gray-100 ml-2">
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

            {status === "delivering" && (
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                  <img src="/placeholder.svg?height=40&width=40" alt="Driver" className="w-full h-full object-cover" />
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
