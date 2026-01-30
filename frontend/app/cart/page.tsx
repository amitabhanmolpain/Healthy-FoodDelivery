"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"
import { Trash2, Plus, Minus, ArrowRight, Heart } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, nutrition, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6 text-muted-foreground">
          <Heart size={40} />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your plate is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any healthy meals yet.</p>
        <Link
          href="/menu"
          className="bg-red-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-red-700 transition-all"
        >
          Start Ordering
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Order</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex gap-4 items-center"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover bg-gray-100"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <Link href={`/meal/${item.slug}`} className="font-bold text-lg hover:text-red-600">
                      {item.name}
                    </Link>
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{item.calories} kcal • High Protein</p>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-red-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-semibold w-4 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-red-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-lg">
                      ₹{(Math.floor(item.price * 85) * item.quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="text-sm text-red-500 hover:underline px-2">
              Clear Cart
            </button>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:w-96 space-y-6">
            {/* Nutrition Analyzer */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Nutrition Analyzer</h3>
                <div
                  className={`px-2 py-1 rounded text-xs font-bold ${nutrition.healthyScore > 80 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                >
                  Score: {nutrition.healthyScore}/100
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Calories</span>
                  <span className="font-semibold">{nutrition.calories}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full rounded-full" style={{ width: "60%" }}></div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                  <div className="bg-orange-50 p-2 rounded-lg">
                    <span className="block font-bold text-orange-700">{nutrition.protein}g</span>
                    <span className="text-orange-600/70">Protein</span>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <span className="block font-bold text-blue-700">{nutrition.carbs}g</span>
                    <span className="text-blue-600/70">Carbs</span>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded-lg">
                    <span className="block font-bold text-yellow-700">{nutrition.fats}g</span>
                    <span className="text-yellow-600/70">Fats</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total & Checkout */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{Math.floor(totalPrice * 85).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span>₹49</span>
                </div>
                <div className="flex justify-between font-bold text-xl pt-2 text-gray-900">
                  <span>Total</span>
                  <span>₹{(Math.floor(totalPrice * 85) + 49).toFixed(0)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-center shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
