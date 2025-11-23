"use client"

import { useState, useEffect } from "react"
import { api } from "@/services/api"
import MealCard from "@/components/ui/MealCard"
import { type Meal, CATEGORIES } from "@/lib/mock-data"
import { Search, X } from "lucide-react"
import MealDetailModal from "@/components/ui/MealDetailModal"

export default function MenuPage() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMealClick = (meal: Meal) => {
    setSelectedMeal(meal)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true)
      try {
        const data = await api.meals.getAll({
          category: activeCategory,
          search: searchQuery,
        })
        setMeals(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchMeals, 300)
    return () => clearTimeout(timer)
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header & Controls */}
        <div className="mb-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Menu</h1>
            <p className="text-gray-500">Explore healthy, lab-tested meals delivered to your door.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.slug
                      ? "bg-red-600 text-white shadow-md shadow-red-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search meals..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-[380px] animate-pulse border border-gray-200"></div>
            ))}
          </div>
        ) : meals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} onMealClick={() => handleMealClick(meal)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-500">No meals found</h3>
            <p className="text-sm text-gray-400">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <MealDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} meal={selectedMeal} />
    </div>
  )
}
