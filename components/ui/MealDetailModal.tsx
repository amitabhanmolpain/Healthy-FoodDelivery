"use client"

import { X, Dumbbell, Flame } from "lucide-react"
import type { Meal } from "@/lib/mock-data"
import { useCart } from "@/context/CartContext"

interface MealDetailModalProps {
  isOpen: boolean
  onClose: () => void
  meal: Meal | null
}

export default function MealDetailModal({ isOpen, onClose, meal }: MealDetailModalProps) {
  const { addItem } = useCart()

  if (!isOpen || !meal) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
          <img src={meal.image || "/placeholder.svg"} alt={meal.name} className="w-full h-full object-cover" />
          {meal.discount && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold shadow-lg">
              {meal.discount}% OFF
            </div>
          )}
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto bg-white">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-bold text-red-600 uppercase tracking-wider">{meal.restaurantName}</span>
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${meal.isVeg ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}
            >
              <div className={`w-2 h-2 rounded-full ${meal.isVeg ? "bg-green-600" : "bg-red-600"}`}></div>
              {meal.isVeg ? "VEG" : "NON-VEG"}
            </div>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mb-4 leading-tight">{meal.name}</h2>

          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Flame size={16} className="text-orange-500" />
              <span className="text-sm font-semibold text-gray-700">{meal.calories} kcal</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Dumbbell size={16} className="text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">{meal.protein}g Protein</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">What is it made of?</h3>
              <p className="text-gray-600 leading-relaxed">{meal.detailedDescription}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {meal.ingredientsList?.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm border border-gray-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400 block mb-1">Price per meal</span>
              <span className="text-3xl font-black text-gray-900">₹{Math.floor(meal.price * 85)}</span>
            </div>
            <button
              onClick={() => {
                addItem(meal)
                onClose()
              }}
              className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200 hover:shadow-red-300 hover:-translate-y-0.5 transform"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
