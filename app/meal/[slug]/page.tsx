"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { api } from "@/services/api"
import type { Meal } from "@/lib/mock-data"
import { useCart } from "@/context/CartContext"
import TraceabilityModal from "@/components/provenance/TraceabilityModal"
import { Star, Shield, Info, Minus, Plus, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function MealDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [meal, setMeal] = useState<Meal | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (params.slug) {
      api.meals
        .getBySlug(params.slug as string)
        .then(setMeal)
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [params.slug])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!meal) return <div className="min-h-screen flex items-center justify-center">Meal not found</div>

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(meal)
    }
    // Simple toast could go here
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumb - simple */}
      <div className="container mx-auto px-4 py-4 text-sm text-muted-foreground">
        <Link href="/menu" className="hover:text-primary">
          Menu
        </Link>{" "}
        / <span className="text-foreground">{meal.name}</span>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 relative group">
              <img src={meal.image || "/placeholder.svg"} alt={meal.name} className="w-full h-full object-cover" />
              {meal.badges.includes("Zero-Adulteration") && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-primary shadow-lg flex items-center gap-2 hover:bg-white transition-colors"
                >
                  <Shield size={16} /> Verified Pure
                </button>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {meal.images.length > 0
                ? meal.images.map((img, i) => (
                    <div
                      key={i}
                      className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer border-2 border-transparent hover:border-primary"
                    >
                      <img src={img || "/placeholder.svg"} className="w-full h-full object-cover" />
                    </div>
                  ))
                : null}
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {meal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-bold text-muted-foreground bg-secondary px-2 py-1 rounded-md uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-primary-foreground mb-4">{meal.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center text-yellow-400 gap-1">
                  <Star fill="currentColor" size={18} />
                  <span className="font-bold text-foreground">{meal.rating}</span>
                  <span className="text-muted-foreground">({meal.reviews} reviews)</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="text-primary font-medium">{meal.calories} kcal</div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">{meal.description}</p>

            {/* Nutrition Grid */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-[#F5F8F5] rounded-2xl border border-primary/10">
              <div className="text-center">
                <span className="block text-xs text-muted-foreground uppercase">Protein</span>
                <span className="block text-lg font-bold text-foreground">{meal.protein}g</span>
              </div>
              <div className="text-center border-l border-primary/10">
                <span className="block text-xs text-muted-foreground uppercase">Carbs</span>
                <span className="block text-lg font-bold text-foreground">{meal.carbs}g</span>
              </div>
              <div className="text-center border-l border-primary/10">
                <span className="block text-xs text-muted-foreground uppercase">Fats</span>
                <span className="block text-lg font-bold text-foreground">{meal.fats}g</span>
              </div>
              <div className="text-center border-l border-primary/10">
                <span className="block text-xs text-muted-foreground uppercase">Fiber</span>
                <span className="block text-lg font-bold text-foreground">8g</span>
              </div>
            </div>

            {/* Vendor / Sourcing */}
            <div className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-secondary/50 transition-colors cursor-pointer group">
              <img src="/public/farm-logo.png" className="rounded-full w-12 h-12" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Sourced from</p>
                <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {meal.vendorName}
                </p>
              </div>
              <Info size={20} className="text-muted-foreground" />
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
              <div className="flex items-center border rounded-xl h-14 w-fit px-4 gap-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Minus size={20} />
                </button>
                <span className="font-bold text-lg w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Plus size={20} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart - ${(meal.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        {/* Traceability Modal */}
        <TraceabilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} reportId={meal.labReportId} />
      </div>
    </div>
  )
}
