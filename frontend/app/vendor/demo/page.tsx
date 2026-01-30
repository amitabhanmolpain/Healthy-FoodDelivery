"use client"

import { useState } from "react"
import { Plus, Package, Users, BarChart3 } from "lucide-react"

export default function VendorDemoPage() {
  // Mock Vendor Dashboard for the "Vendor Demo Screen" requirement
  const [activeTab, setActiveTab] = useState("inventory")

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-foreground">Vendor Portal</h1>
            <p className="text-muted-foreground">Manage your farm inventory and lot tracking.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-primary">GreenLeaf Family Farms</span>
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
              GL
            </div>
          </div>
        </div>

        {/* Mock Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Lots</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl text-green-600">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Items Sold (Week)</p>
                <p className="text-2xl font-bold">1,450</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold">4.9/5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden min-h-[500px]">
          <div className="border-b px-8 py-4 flex gap-8">
            <button
              onClick={() => setActiveTab("inventory")}
              className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === "inventory" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              Inventory & Lots
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === "add" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              Add New Harvest
            </button>
          </div>

          <div className="p-8">
            {activeTab === "inventory" ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-sm text-muted-foreground">
                    <th className="pb-4 font-medium">Lot ID</th>
                    <th className="pb-4 font-medium">Item Name</th>
                    <th className="pb-4 font-medium">Harvest Date</th>
                    <th className="pb-4 font-medium">Quantity (kg)</th>
                    <th className="pb-4 font-medium">Lab Status</th>
                    <th className="pb-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { id: "L-9921", name: "Organic Spinach", date: "2023-11-20", qty: 450, status: "Verified" },
                    { id: "L-9922", name: "Kale", date: "2023-11-21", qty: 200, status: "Pending" },
                    { id: "L-9923", name: "Carrots", date: "2023-11-19", qty: 800, status: "Verified" },
                  ].map((row) => (
                    <tr key={row.id} className="group hover:bg-secondary/30">
                      <td className="py-4 font-mono text-xs">{row.id}</td>
                      <td className="py-4 font-medium">{row.name}</td>
                      <td className="py-4 text-sm">{row.date}</td>
                      <td className="py-4 text-sm">{row.qty}</td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${row.status === "Verified" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-primary text-sm font-semibold hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="max-w-xl">
                <h3 className="font-bold text-lg mb-4">Register New Harvest Lot</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase">Crop Name</label>
                      <input
                        type="text"
                        className="w-full p-3 rounded-xl border bg-gray-50"
                        placeholder="e.g. Romaine Lettuce"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase">
                        Harvest Date
                      </label>
                      <input type="date" className="w-full p-3 rounded-xl border bg-gray-50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase">
                      Field Location
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-xl border bg-gray-50"
                      placeholder="GPS Coords or Field ID"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase">
                      Lab Sample ID
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-xl border bg-gray-50"
                      placeholder="Scan sample barcode..."
                    />
                  </div>
                  <button className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2">
                    <Plus size={20} /> Register Lot
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
