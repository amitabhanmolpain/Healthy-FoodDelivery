"use client"

import { useState } from "react"
import { ShoppingBag, DollarSign, Plus, Utensils, Clock, ChefHat, LogOut, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "menu" | "orders">("overview")
  const router = useRouter()

  const handleSignOut = () => {
    // Logic to clear auth would go here
    router.push("/business/login")
  }

  // Mock Data
  const stats = [
    { label: "Total Earnings", value: "₹1,24,500", icon: DollarSign, color: "bg-green-500" },
    { label: "Total Orders", value: "1,432", icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Active Items", value: "12", icon: Utensils, color: "bg-orange-500" },
  ]

  const liveOrders = [
    {
      id: "#ORD-9921",
      items: ["Spicy Tofu Stir Fry", "Green Detox Juice"],
      total: "₹510",
      status: "Preparing",
      time: "2 min ago",
    },
    { id: "#ORD-9922", items: ["Grilled Chicken Harvest"], total: "₹1402", status: "Ready", time: "5 min ago" },
    { id: "#ORD-9923", items: ["Keto Avocado Burger"], total: "₹1317", status: "New", time: "Just now" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-[#ce1126]">
            <ChefHat size={28} />
            <span className="font-black text-xl text-gray-900">
              Kitchen<span className="text-[#ce1126]">Portal</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "overview" ? "bg-[#ce1126] text-white shadow-lg shadow-red-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <BarChartIcon size={20} /> Overview
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "orders" ? "bg-[#ce1126] text-white shadow-lg shadow-red-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <ShoppingBag size={20} /> Live Orders
          </button>
          <button
            onClick={() => setActiveTab("menu")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "menu" ? "bg-[#ce1126] text-white shadow-lg shadow-red-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Utensils size={20} /> Menu Manager
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-all cursor-pointer border border-red-100 shadow-sm"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-8 py-4 flex justify-between items-center shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "menu" && "Menu Management"}
            {activeTab === "orders" && "Live Orders"}
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSignOut}
              className="md:hidden p-2 text-red-600 hover:bg-red-50 rounded-full"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">GreenLeaf Kitchen</p>
                <p className="text-xs text-gray-500">ID: #GL-8821</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-[#ce1126] font-bold">
                GL
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Stats Grid */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg shadow-opacity-20`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Area */}
            <div className="lg:col-span-2 space-y-8">
              {activeTab === "menu" ? (
                <div className="bg-white rounded-3xl border border-gray-200 p-8 animate-in fade-in">
                  {/* ... existing menu form code ... */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Add New Item</h2>
                    <button className="text-[#ce1126] text-sm font-bold hover:underline">Bulk Upload</button>
                  </div>
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Item Name</label>
                        <input
                          type="text"
                          className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-red-100 outline-none"
                          placeholder="e.g. Vegan Buddha Bowl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                        <input
                          type="number"
                          className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-red-100 outline-none"
                          placeholder="299"
                        />
                      </div>
                    </div>
                    {/* ... rest of form ... */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                      <textarea
                        className="w-full p-3 rounded-xl border bg-gray-50 h-24"
                        placeholder="Describe ingredients and taste..."
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                        <select className="w-full p-3 rounded-xl border bg-gray-50">
                          <option>Vegan</option>
                          <option>High Protein</option>
                          <option>Keto</option>
                          <option>Dessert</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Image</label>
                        <div className="w-full p-3 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer">
                          <Plus size={20} className="mr-2" /> Upload Photo
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all">
                      Publish Item
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-gray-200 p-6 animate-in fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Revenue Analytics</h2>
                    <select className="text-sm border-none bg-gray-100 rounded-lg px-3 py-1 font-bold text-gray-600 outline-none">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="h-64 bg-gray-50 rounded-2xl flex items-end justify-between p-6 gap-2">
                    {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                      <div
                        key={i}
                        className="w-full bg-red-200 rounded-t-lg relative group hover:bg-[#ce1126] transition-colors cursor-pointer"
                        style={{ height: `${h}%` }}
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          ₹{h * 150}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Live Orders Sidebar - Always visible or enhanced */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sticky top-28 shadow-lg shadow-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                    Incoming
                  </h2>
                  <span className="bg-red-100 text-[#ce1126] text-xs font-bold px-2 py-1 rounded-full">3 New</span>
                </div>

                <div className="space-y-4">
                  {liveOrders.map((order, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all bg-white group cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-mono text-xs font-bold text-gray-500">{order.id}</span>
                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                          <Clock size={12} /> {order.time}
                        </span>
                      </div>
                      <div className="space-y-1 mb-3">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm font-bold text-gray-800 line-clamp-1">
                            {item}
                          </p>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <span className="font-black text-[#ce1126]">{order.total}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === "New"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "Preparing"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BarChartIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}
