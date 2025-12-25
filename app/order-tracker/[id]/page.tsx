"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Clock, MapPin, Phone, Star } from "lucide-react"
import Link from "next/link"
import "leaflet/dist/leaflet.css"

const OPENROUTE_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjYxZDBmNjM1ZTNhMzQ5ZjdhMzY0MzNkZjdiOTAxYjZlIiwiaCI6Im11cm11cjY0In0="

export default function OrderTrackerPage() {
  const [status, setStatus] = useState<"preparing" | "delivering">("preparing")
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([])
  const [distance, setDistance] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [isMapReady, setIsMapReady] = useState(false)
  const [userLocationAcquired, setUserLocationAcquired] = useState(false)
  
  // Use refs for locations that don't change to avoid dependency issues
  const userLocationRef = useRef<[number, number]>([12.9716, 77.6412])
  const restaurantLocationRef = useRef<[number, number]>([12.9352, 77.6245])
  const driverLocationRef = useRef<[number, number]>([12.9352, 77.6245])
  
  const mapRef = useRef<any>(null)
  const mapInstanceRef = useRef<any>(null)
  const driverMarkerRef = useRef<any>(null)
  const restaurantMarkerRef = useRef<any>(null)
  const userMarkerRef = useRef<any>(null)
  const routeProgressRef = useRef(0)

  useEffect(() => {
    if (!userLocationAcquired) return
    
    let L: any = null
    
    const initMap = async () => {
      if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
        try {
          // Dynamically import Leaflet only on client-side
          L = (await import("leaflet")).default
          
          const map = L.map(mapRef.current, {
            center: userLocationRef.current,
            zoom: 13,
            zoomControl: true,
            scrollWheelZoom: true
          })

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
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
          restaurantMarkerRef.current = L.marker(restaurantLocationRef.current, { icon: restaurantIcon })
            .addTo(map)
            .bindPopup("<b>Restaurant</b><br>Preparing your order")

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
          userMarkerRef.current = L.marker(userLocationRef.current, { icon: userIcon }).addTo(map).bindPopup("<b>Your Location</b>")

          mapInstanceRef.current = map
          setIsMapReady(true)
          
          // Force map to refresh after a short delay
          setTimeout(() => {
            map.invalidateSize()
          }, 100)
        } catch (error) {
          console.error("Error initializing map:", error)
        }
      }
    }
    
    initMap()

    // Cleanup function to remove map when component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [userLocationAcquired])

  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current) return
    
    const fetchRoute = async () => {
      try {
        const L = (await import("leaflet")).default
        
        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${OPENROUTE_API_KEY}&start=${restaurantLocationRef.current[1]},${restaurantLocationRef.current[0]}&end=${userLocationRef.current[1]},${userLocationRef.current[0]}`,
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
          L.polyline(coords, {
            color: "#ce1126",
            weight: 4,
            opacity: 0.7,
            dashArray: "10, 10",
          }).addTo(mapInstanceRef.current)

          mapInstanceRef.current.fitBounds(L.latLngBounds(coords))
        }
      } catch (error) {
        console.error("Error fetching route:", error)
      }
    }

    fetchRoute()
  }, [isMapReady])

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

        driverLocationRef.current = [lat, lng]

        if (typeof window !== "undefined" && mapInstanceRef.current) {
          if (driverMarkerRef.current) {
            driverMarkerRef.current.setLatLng([lat, lng])
          } else {
            const driverIcon = L.divIcon({
              className: "custom-marker",
              html: `<div class="relative">
                      <div class="relative w-12 h-12">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <!-- Shadow -->
                          <ellipse cx="24" cy="42" rx="18" ry="3" fill="#000000" opacity="0.15"/>
                          
                          <!-- Scooter top view -->
                          <g transform="translate(24, 20)">
                            <!-- Rear wheel -->
                            <circle cx="-10" cy="6" r="4" fill="#1F2937" stroke="#111827" stroke-width="1.2"/>
                            <circle cx="-10" cy="6" r="2" fill="#374151"/>
                            
                            <!-- Front wheel -->
                            <circle cx="10" cy="6" r="4" fill="#1F2937" stroke="#111827" stroke-width="1.2"/>
                            <circle cx="10" cy="6" r="2" fill="#374151"/>
                            
                            <!-- Scooter body -->
                            <path d="M -10 6 Q -10 0 0 -2 Q 10 0 10 6" fill="#ce1126" stroke="#991B1B" stroke-width="1.5"/>
                            <rect x="-8" y="-2" width="16" height="8" rx="2" fill="#DC2626"/>
                            
                            <!-- Seat -->
                            <ellipse cx="0" cy="0" rx="6" ry="4" fill="#1F2937"/>
                            <ellipse cx="0" cy="0" rx="4" ry="2.5" fill="#374151"/>
                            
                            <!-- Handlebar -->
                            <rect x="-2" y="-8" width="4" height="6" rx="1" fill="#4B5563"/>
                            <rect x="-4" y="-9" width="8" height="2" rx="1" fill="#6B7280"/>
                            
                            <!-- Delivery box on back -->
                            <g transform="translate(0, 10)">
                              <rect x="-6" y="-4" width="12" height="8" rx="1.5" fill="#ce1126" stroke="#991B1B" stroke-width="1.2"/>
                              <rect x="-5" y="-3" width="10" height="6" rx="1" fill="#DC2626"/>
                              <path d="M -3 0 L 0 -2 L 3 0" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                              <circle cx="0" cy="1" r="1" fill="white"/>
                            </g>
                            
                            <!-- Direction indicator (front light) -->
                            <circle cx="0" cy="-10" r="1.5" fill="#FDE047" opacity="0.9"/>
                          </g>
                        </svg>
                      </div>
                      <div class="absolute -top-9 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ce1126] to-red-600 text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-lg whitespace-nowrap border border-white/20">
                        🏍️ Ramesh
                      </div>
                     </div>`,
              iconSize: [48, 48],
              iconAnchor: [24, 36],
            })
            driverMarkerRef.current = L.marker([lat, lng], { icon: driverIcon }).addTo(mapInstanceRef.current)
          }
        }
      }, 100)

      return () => clearInterval(animateDriver)
    }
  }, [status, routeCoordinates])

  // Get user's real location first
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [position.coords.latitude, position.coords.longitude]
          userLocationRef.current = newLocation
          
          // Place restaurant within 10km of user - random direction
          const angle = Math.random() * 2 * Math.PI
          const distanceKm = Math.random() * 8 + 2 // 2-10 km
          const latOffset = (distanceKm / 111.32) * Math.cos(angle) // 111.32 km per degree latitude
          const lngOffset = (distanceKm / (111.32 * Math.cos(newLocation[0] * Math.PI / 180))) * Math.sin(angle)
          
          restaurantLocationRef.current = [
            newLocation[0] + latOffset,
            newLocation[1] + lngOffset
          ]
          driverLocationRef.current = restaurantLocationRef.current
          
          console.log("User location acquired:", newLocation)
          console.log("Restaurant placed at:", restaurantLocationRef.current, `(${distanceKm.toFixed(1)}km away)`)
          setUserLocationAcquired(true)
        },
        (error) => {
          console.log("Using default Bangalore location", error)
          setUserLocationAcquired(true)
        },
      )
    } else {
      setUserLocationAcquired(true)
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
