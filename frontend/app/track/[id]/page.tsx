"use client"

import { useParams } from "next/navigation"
import { MapPin, CheckCircle, Truck, Package, Clock } from "lucide-react"

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params.id

  // Mock Timeline Data
  const timeline = [
    { status: "Order Placed", time: "10:30 AM", active: true, icon: Package },
    { status: "Preparing", time: "10:45 AM", active: true, icon: Clock },
    { status: "Quality Check", time: "11:10 AM", active: true, icon: CheckCircle },
    { status: "Out for Delivery", time: "11:30 AM", active: true, icon: Truck },
    { status: "Delivered", time: "Est. 12:00 PM", active: false, icon: MapPin },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Map Placeholder Header */}
          <div className="h-48 bg-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-muted-foreground font-bold tracking-widest text-sm uppercase">
                Live Map Placeholder
              </span>
            </div>
            {/* Courier Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Truck size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-sm">Courier: Michael</p>
                <p className="text-xs text-muted-foreground">Toyota Prius • License 4X882</p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-bold text-primary">15 mins away</p>
                <button className="text-xs font-bold uppercase text-muted-foreground hover:text-foreground">
                  Call Driver
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-8 border-b pb-6">
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">Order #{orderId}</h1>
                <p className="text-muted-foreground text-sm">Arriving Today by 12:15 PM</p>
              </div>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-sm">On The Way</span>
            </div>

            {/* Timeline */}
            <div className="relative pl-8 border-l-2 border-dashed border-gray-200 space-y-12 my-8">
              {timeline.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-[41px] w-6 h-6 rounded-full border-4 border-white flex items-center justify-center ${step.active ? "bg-primary shadow-lg shadow-primary/30" : "bg-gray-300"}`}
                    >
                      {step.active && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>

                    <div className={`flex items-center justify-between ${step.active ? "opacity-100" : "opacity-50"}`}>
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl ${step.active ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}
                        >
                          <Icon size={24} />
                        </div>
                        <div>
                          <p
                            className={`font-bold text-lg ${step.active ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {step.status}
                          </p>
                          {step.active && <p className="text-sm text-green-600 font-medium">Completed</p>}
                        </div>
                      </div>
                      <span className="font-mono text-sm font-medium text-muted-foreground">{step.time}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
