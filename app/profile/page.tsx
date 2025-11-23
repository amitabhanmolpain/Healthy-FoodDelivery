"use client"

import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { Settings, CreditCard, MapPin, Heart, Clock, LogOut, Package } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-4">Please log in to view your profile</h2>
        <Link href="/auth/login" className="bg-primary text-white px-6 py-2 rounded-xl">
          Log In
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary-foreground">My Profile</h1>
          <button onClick={logout} className="text-red-500 hover:text-red-600 flex items-center gap-2 font-medium">
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-border text-center mb-6">
              <img
                src={user.avatar || "/placeholder.svg"}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-secondary"
              />
              <h2 className="font-bold text-lg truncate">{user.name}</h2>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            </div>

            <nav className="space-y-1">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 bg-white text-primary rounded-xl font-medium shadow-sm ring-1 ring-primary/10"
              >
                <Settings size={18} /> Preferences
              </Link>
              <Link
                href="/orders"
                className="flex items-center gap-3 px-4 py-3 hover:bg-white text-muted-foreground hover:text-foreground rounded-xl transition-all"
              >
                <Package size={18} /> Order History
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 hover:bg-white text-muted-foreground hover:text-foreground rounded-xl transition-all"
              >
                <MapPin size={18} /> Addresses
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 hover:bg-white text-muted-foreground hover:text-foreground rounded-xl transition-all"
              >
                <CreditCard size={18} /> Payment Methods
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            {/* Dietary Preferences */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-border">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Heart size={20} className="text-primary" /> Dietary Preferences
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">I follow these diets:</label>
                  <div className="flex flex-wrap gap-3">
                    {["Vegan", "Vegetarian", "Keto", "Paleo", "Gluten-Free"].map((diet) => (
                      <button
                        key={diet}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${user.preferences?.vegan && diet === "Vegan" ? "bg-primary text-white border-primary" : "hover:bg-secondary bg-white"}`}
                      >
                        {diet}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Allergies (We'll warn you):</label>
                  <div className="flex flex-wrap gap-3">
                    {["Nuts", "Dairy", "Shellfish", "Soy", "Eggs"].map((allergy) => (
                      <button
                        key={allergy}
                        className="px-4 py-2 rounded-full border bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-sm font-medium transition-colors"
                      >
                        {allergy}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders Stub */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Clock size={20} className="text-primary" /> Recent Orders
                </h3>
                <Link href="/orders" className="text-sm text-primary font-medium hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                <div className="border rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-lg text-green-700 font-bold text-xs uppercase">
                      Delivered
                    </div>
                    <div>
                      <p className="font-bold text-sm">Order #ORD-9921</p>
                      <p className="text-xs text-muted-foreground">Oct 15, 2023 • 2 Items</p>
                    </div>
                  </div>
                  <button className="text-sm font-semibold text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
