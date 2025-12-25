"use client"

import { useState, useEffect, useRef } from "react"
import { Clock, MapPin, Phone, Star, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import "leaflet/dist/leaflet.css"
import { useToast } from "@/hooks/use-toast"

const OPENROUTE_API_KEY = process.env.NEXT_PUBLIC_OPENROUTE_API_KEY || 
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjYxZDBmNjM1ZTNhMzQ5ZjdhMzY0MzNkZjdiOTAxYjZlIiwiaCI6Im11cm11cjY0In0="

export default function OrderTrackerPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [status, setStatus] = useState<"preparing" | "delivering" | "delivered">("preparing")
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([])
  const [distance, setDistance] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [isMapReady, setIsMapReady] = useState(false)
  const [userLocationAcquired, setUserLocationAcquired] = useState(false)
  const [driverSpeed, setDriverSpeed] = useState<number>(0)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [stopTimer, setStopTimer] = useState(false)
  
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
  
  // Store traffic data in refs instead of window object
  const trafficSegmentsRef = useRef<boolean[]>([])
  const segmentSizeRef = useRef<number>(1)
  
  // Store route layers for cleanup
  const routeLayersRef = useRef<any[]>([])

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
            html: `<div class="relative">
                    <div class="bg-white rounded-2xl shadow-2xl p-3 border-2 border-orange-500">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 10c0-1.1-.9-2-2-2h-1V7c0-1.1-.9-2-2-2h-2V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v1H5c-1.1 0-2 .9-2 2v1H2c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8z" fill="#FCD34D"/>
                        <ellipse cx="12" cy="7" rx="6" ry="2" fill="#F59E0B"/>
                        <path d="M4 12h16v6c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-6z" fill="#F97316"/>
                        <path d="M6 13h12v2H6z" fill="#EA580C"/>
                        <circle cx="9" cy="10" r="0.5" fill="#DC2626"/>
                        <circle cx="12" cy="9.5" r="0.5" fill="#DC2626"/>
                        <circle cx="15" cy="10" r="0.5" fill="#DC2626"/>
                      </svg>
                    </div>
                    <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                  </div>`,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
          })
          restaurantMarkerRef.current = L.marker(restaurantLocationRef.current, { icon: restaurantIcon })
            .addTo(map)
            .bindPopup("<b>Restaurant</b><br>Preparing your order")

          // User location marker
          const userIcon = L.divIcon({
            className: "custom-marker",
            html: `<div class="relative">
                    <div class="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 w-14 h-14"></div>
                    <div class="bg-white rounded-2xl shadow-2xl p-3 border-2 border-green-500 relative z-10">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#22C55E"/>
                        <path d="M10 14h4v6h-4z" fill="#16A34A"/>
                      </svg>
                    </div>
                    <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                  </div>`,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
          })
          userMarkerRef.current = L.marker(userLocationRef.current, { icon: userIcon }).addTo(map).bindPopup("<b>Your Location</b>")

          map.whenReady(() => {
            mapInstanceRef.current = map
            setIsMapReady(true)
            
            // Force map to refresh after a short delay, once the map is ready
            setTimeout(() => {
              map.invalidateSize()
            }, 100)
          })
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
          
          // Use actual duration from API or fallback to 2 minutes
          const apiDurationSeconds = data.features[0].properties.segments?.[0]?.duration
          const durationInMinutes =
            typeof apiDurationSeconds === "number" && apiDurationSeconds > 0
              ? Math.ceil(apiDurationSeconds / 60)
              : 2 // Fallback to 2 minutes if API duration is unavailable
          setDuration(durationInMinutes)

          // Remove old route layers before drawing new ones
          routeLayersRef.current.forEach(layer => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.removeLayer(layer)
            }
          })
          routeLayersRef.current = []

          // Draw route with traffic simulation (random segments) and store traffic info
          const segmentSize = Math.ceil(coords.length / 10)
          const trafficSegments: boolean[] = []
          
          for (let i = 0; i < coords.length - segmentSize; i += segmentSize) {
            const segmentCoords = coords.slice(i, i + segmentSize)
            const hasTraffic = Math.random() > 0.6 // 40% chance of traffic
            trafficSegments.push(hasTraffic)
            
            const polyline = L.polyline(segmentCoords, {
              color: hasTraffic ? "#DC2626" : "#22C55E",
              weight: 6,
              opacity: 0.8,
            }).addTo(mapInstanceRef.current)
            
            routeLayersRef.current.push(polyline)
          }
          
          // Store traffic info in refs instead of window object
          trafficSegmentsRef.current = trafficSegments
          segmentSizeRef.current = segmentSize

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
      // Animation duration: 2 minutes = 120,000ms
      const totalDurationMs = 120000
      const intervalMs = 100
      const totalSteps = totalDurationMs / intervalMs // 1200 steps
      const increment = routeCoordinates.length / totalSteps // Distance to cover per step
      
      const animateDriver = setInterval(() => {
        // Stop when reaching destination
        if (routeProgressRef.current >= routeCoordinates.length - 1) {
          routeProgressRef.current = routeCoordinates.length - 1
          clearInterval(animateDriver)
          
          // Place driver at exact destination
          const finalLat = routeCoordinates[routeCoordinates.length - 1][0]
          const finalLng = routeCoordinates[routeCoordinates.length - 1][1]
          driverLocationRef.current = [finalLat, finalLng]
          
          if (driverMarkerRef.current) {
            driverMarkerRef.current.setLatLng([finalLat, finalLng])
          }
          
          // Trigger delivery complete
          setStatus("delivered")
          setStopTimer(true)
          setDriverSpeed(0)
          toast({
            title: "Driver Reached! 🎉",
            description: "Your delivery partner has arrived at your location.",
          })
          setTimeout(() => setShowConfirmation(true), 1000)
          return
        }

        routeProgressRef.current += increment

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
        
        // Calculate realistic speed based on traffic (15-60 km/h for scooter)
        let speed: number

        if (
          Array.isArray(trafficSegmentsRef.current) &&
          trafficSegmentsRef.current.length > 0
        ) {
          const trafficSegments = trafficSegmentsRef.current
          const segmentSize = segmentSizeRef.current
          const currentSegment = Math.floor(currentIndex / segmentSize)
          const hasTraffic = Boolean(trafficSegments[currentSegment])
          
          // Scooter speeds: 15-25 km/h in traffic (red), 35-55 km/h in clear roads (green)
          const baseSpeed = hasTraffic ? 15 + Math.random() * 10 : 35 + Math.random() * 20
          // Add slight variation for realism
          speed = Math.round(baseSpeed + (Math.random() - 0.5) * 5)
        } else {
          // Fallback speed when traffic data is unavailable
          const fallbackBaseSpeed = 25 + Math.random() * 15 // 25-40 km/h
          speed = Math.round(fallbackBaseSpeed + (Math.random() - 0.5) * 5)
        }
        
        setDriverSpeed(Math.min(Math.max(speed, 15), 60)) // Keep between 15-60 km/h

        if (typeof window !== "undefined" && mapInstanceRef.current) {
          if (driverMarkerRef.current) {
            driverMarkerRef.current.setLatLng([lat, lng])
          } else {
            const driverIcon = L.divIcon({
              className: "custom-marker",
              html: `<div class="relative">
                      <div class="bg-[#ce1126] rounded-full shadow-2xl p-3 border-4 border-white">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g transform="translate(12, 12)">
                            <!-- Scooter simplified icon -->
                            <circle cx="-5" cy="4" r="2.5" fill="white" stroke="white" stroke-width="0.5"/>
                            <circle cx="5" cy="4" r="2.5" fill="white" stroke="white" stroke-width="0.5"/>
                            <path d="M -5 4 L -2 -2 L 3 -2 L 5 4" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="0" cy="-3" r="2" fill="white"/>
                            <path d="M -2 -2 L -2 -5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M 3 -2 L 3 -4" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                          </g>
                        </svg>
                      </div>
                      <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl whitespace-nowrap">
                        Ramesh • KA 01 EQ 2211
                        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                      </div>
                     </div>`,
              iconSize: [48, 48],
              iconAnchor: [24, 24],
            })
            driverMarkerRef.current = L.marker([lat, lng], { icon: driverIcon }).addTo(mapInstanceRef.current)
          }
        }
      }, 100)

      return () => clearInterval(animateDriver)
    }
  }, [status, routeCoordinates, toast])

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
          
          // Correct distance calculation formula
          // 111.32 km per degree latitude (constant)
          // For longitude, it varies by latitude: 111.32 * cos(latitude)
          const latOffset = (distanceKm / 111.32) * Math.cos(angle)
          const lngOffset = (distanceKm / (111.32 * Math.cos(newLocation[0] * Math.PI / 180))) * Math.sin(angle)
          
          restaurantLocationRef.current = [
            newLocation[0] + latOffset,
            newLocation[1] + lngOffset
          ]
          driverLocationRef.current = restaurantLocationRef.current
          
          setUserLocationAcquired(true)
        },
        (error) => {
          console.error("Using default Bangalore location. Geolocation error:", error)
          toast({
            variant: "destructive",
            title: "Location access unavailable",
            description: "Showing estimates from a default location instead.",
          })
          setUserLocationAcquired(true)
        },
      )
    } else {
      toast({
        variant: "destructive",
        title: "Location not supported",
        description: "Your browser does not support location access. Showing default estimates.",
      })
      setUserLocationAcquired(true)
    }
  }, [toast])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!stopTimer) {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
      }
    }, 1000)

    const statusTimer = setTimeout(() => {
      // Transition to delivering without resetting the countdown,
      // so total time (preparing + delivering) remains consistent.
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
          <div className="text-sm font-bold text-gray-500">Order #{params.id}</div>
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
          
          {status === "delivering" && driverSpeed > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ce1126] to-red-600 text-white px-4 py-3 rounded-xl shadow-lg z-10">
              <div className="text-xs font-bold uppercase mb-1">Driver Speed</div>
              <div className="text-2xl font-black font-mono">{driverSpeed} km/h</div>
            </div>
          )}
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
            ) : status === "delivering" ? (
              <>
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <MapPin size={32} className="text-[#ce1126]" fill="currentColor" />
                </div>
                <h1 className="text-2xl font-black text-gray-900 mb-1">Out for Delivery</h1>
                <p className="text-sm text-gray-500">Rider is moving to your location</p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h1 className="text-2xl font-black text-gray-900 mb-1">Delivered</h1>
                <p className="text-sm text-gray-500">Your order has been delivered</p>
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
                  className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full ring-4 ring-white ${status === "preparing" || status === "delivering" || status === "delivered" ? "bg-green-500" : "bg-gray-300"}`}
                ></div>
                <h4 className="font-bold text-sm">Preparing</h4>
                {status === "preparing" && (
                  <span className="text-xs text-orange-500 font-bold animate-pulse">Live</span>
                )}
              </div>
              <div className="relative pl-6">
                <div
                  className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full ring-4 ring-white ${status === "delivering" || status === "delivered" ? "bg-green-500" : "bg-gray-300"}`}
                ></div>
                <h4 className="font-bold text-sm">Out for Delivery</h4>
                {status === "delivering" && (
                  <span className="text-xs text-[#ce1126] font-bold animate-pulse">Live</span>
                )}
              </div>
              <div className="relative pl-6">
                <div
                  className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full ring-4 ring-white ${status === "delivered" ? "bg-green-500" : "bg-gray-300"}`}
                ></div>
                <h4 className="font-bold text-sm">Delivered</h4>
                {status === "delivered" && (
                  <span className="text-xs text-green-500 font-bold animate-pulse">Completed</span>
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
      
      {/* Delivery Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={56} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">Delivery Complete!</h2>
            <p className="text-gray-600 mb-6">
              Your driver <span className="font-bold">Ramesh • KA 01 EQ 2211</span> has reached your location.
              Please collect your order.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="text-sm text-gray-500 mb-1">Order Number</div>
              <div className="text-2xl font-bold text-gray-900">#{params.id}</div>
            </div>
            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-gradient-to-r from-[#ce1126] to-red-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Confirm Receipt
            </button>
            <Link href="/" className="block mt-3 text-sm text-gray-500 hover:text-gray-700">
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
