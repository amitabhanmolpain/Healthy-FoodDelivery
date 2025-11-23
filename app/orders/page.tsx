"use client"

import { useState, useEffect } from "react"
import { api } from "@/services/api"
import { Package, Clock, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    // Simulate fetching orders
    api.orders
      .getHistory()
      .then(setOrders)
      .finally(() => setLoading(false))
  }, [])

  if (!user) {
    return (
      <div className="p-20 text-center">
        <Link href="/auth/login" className="text-primary underline">
          Log in
        </Link>{" "}
        to view orders.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-primary-foreground">Order History</h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-3xl shadow-sm border border-border group transition-all hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                      <Package size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{order.id}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock size={14} /> {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle size={12} /> {order.status}
                    </span>
                    <span className="font-bold text-xl">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-[#F5F8F5] p-4 rounded-xl mb-4">
                  <p className="text-xs text-muted-foreground uppercase mb-2 font-bold">Items</p>
                  <ul className="space-y-1">
                    {order.items.map((item: any, idx: number) => (
                      <li key={idx} className="text-sm flex justify-between">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">${item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end gap-3">
                  <button className="text-sm font-semibold text-muted-foreground hover:text-foreground px-4 py-2">
                    View Receipt
                  </button>
                  <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                    Smart Reorder <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
