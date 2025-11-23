"use client"

import type React from "react"
import type { Meal } from "@/lib/mock-data"
import { Star, ShoppingCart, Dumbbell } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/hooks/use-toast"

export default function MealCard({ meal, onMealClick }: { meal: Meal; onMealClick?: (meal: Meal) => void }) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent bubbling if clicking specific actions
    if ((e.target as HTMLElement).closest("button")) return

    if (onMealClick) {
      onMealClick(meal)
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-red-100 transition-all duration-300 flex flex-col h-full cursor-pointer relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={meal.image || "/placeholder.svg"}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Discount Badge */}
        {meal.discount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm z-10">
            {meal.discount}% OFF
          </div>
        )}

        {/* Add to Cart Button - Changed from Plus to ShoppingCart */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            addItem(meal)
            toast({
              title: "Added to cart",
              description: `${meal.name} is now in your cart.`,
              duration: 2000,
            })
          }}
          className="absolute bottom-3 right-3 bg-white p-2.5 rounded-full shadow-lg text-gray-700 hover:bg-red-600 hover:text-white transition-colors transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-20"
          aria-label="Add to cart"
        >
          <ShoppingCart size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Restaurant Name & Rating */}
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide truncate max-w-[70%]">
            {meal.restaurantName || "PurePlate Kitchen"}
          </span>
          <div className="flex items-center text-yellow-500 text-xs font-bold gap-1">
            <Star size={12} fill="currentColor" />
            <span>{meal.rating}</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
          {meal.name}
        </h3>

        {/* Removed Description as requested */}
        {/* <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{meal.description}</p> */}

        {/* Protein Badge */}
        <div className="flex items-center gap-2 mb-4 mt-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
            <Dumbbell size={14} className="text-blue-500" />
            <span>{meal.protein}g Protein</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-gray-100">
          <div className="flex items-baseline gap-2">
            {/* Ensure Rupee symbol is used */}
            <span className="font-bold text-lg text-gray-900">₹{Math.floor(meal.price * 85)}</span>
            {meal.discount && (
              <span className="text-xs text-gray-400 line-through">
                ₹{Math.floor(meal.price * 85 * (1 + meal.discount / 100))}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
