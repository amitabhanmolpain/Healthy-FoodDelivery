"use client"

import { useParams, useRouter } from "next/navigation"
import { MEALS_DB } from "@/lib/mock-data"
import { useCart } from "@/context/CartContext"
import { ArrowLeft, Clock, Flame, Star, ShoppingCart, Check, Info } from "lucide-react"
import MealCard from "@/components/ui/MealCard"
import { motion } from "framer-motion"

export default function MealDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()

  const meal = MEALS_DB.find((m) => m.id === params.id)

  if (!meal) {
    return <div className="p-20 text-center">Meal not found</div>
  }

  // Get random suggested meals (excluding current)
  const suggestedMeals = MEALS_DB.filter((m) => m.id !== meal.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white sticky top-0 z-30 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg truncate">{meal.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[400px] lg:h-[500px]"
          >
            <img src={meal.image || "/placeholder.svg"} alt={meal.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-current" /> 4.9 (120+)
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${meal.category === "Veg" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {meal.category === "Veg" ? "Vegetarian" : "Non-Vegetarian"}
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Clock size={12} /> 25-30 mins
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 text-balance">{meal.name}</h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
                A chef-crafted masterpiece featuring premium ingredients sourced directly from verified organic farms.
              </p>
            </div>

            <div className="flex items-end gap-4 pb-6 border-b border-gray-100">
              <span className="text-5xl font-black text-red-600">₹{Math.floor(meal.price * 85)}</span>
              <span className="text-gray-400 text-lg line-through mb-2">₹{Math.floor(meal.price * 85 * 1.2)}</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold mb-3">20% OFF</span>
            </div>

            {/* Ingredients & Nutrition */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Info size={18} className="text-red-500" /> What's Inside?
                </h3>
                <div className="flex flex-wrap gap-2">
                  {meal.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="bg-gray-50 text-gray-600 px-2 py-1 rounded-md text-sm border border-gray-200"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Flame size={18} className="text-orange-500" /> Nutrition
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Calories</span>
                    <span className="font-bold">{meal.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Protein</span>
                    <span className="font-bold">{meal.protein}g</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                addItem(meal)
                // Optional: Show toast
              }}
              className="w-full bg-red-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 active:scale-95"
            >
              <ShoppingCart size={24} /> Add to Order
            </button>

            <div className="flex items-center gap-4 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <Check className="text-green-500 shrink-0" size={20} />
              <span>Free delivery on orders above ₹499. Arrives hot in premium packaging.</span>
            </div>
          </motion.div>
        </div>

        {/* Suggestions */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {suggestedMeals.map((m) => (
              <MealCard key={m.id} meal={m} onMealClick={() => router.push(`/menu/${m.id}`)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
