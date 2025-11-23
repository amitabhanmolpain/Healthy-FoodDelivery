"use client"

import type React from "react"
import { useState } from "react"
import { MEALS_DB, type Meal } from "@/lib/mock-data"
import { ChevronLeft, ChevronRight, Calendar, GripVertical, Trash2, Zap, Plus, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type ViewMode = "day" | "week" | "month"

interface PlannedMeal {
  id: string
  meal: Meal
  date: string
  slot: "breakfast" | "lunch" | "dinner" | "snack"
}

export default function MealPlanPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("week")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>([])
  const [draggedMeal, setDraggedMeal] = useState<Meal | null>(null)

  const formatDate = (date: Date) => date.toISOString().split("T")[0]

  const getDaysInWeek = (date: Date) => {
    const start = new Date(date)
    start.setDate(start.getDate() - start.getDay() + 1)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      return d
    })
  }

  const handleDrop = (e: React.DragEvent, dateStr: string, slot: "breakfast" | "lunch" | "dinner" | "snack") => {
    e.preventDefault()
    if (!draggedMeal) return

    const newPlan: PlannedMeal = {
      id: Math.random().toString(36).substr(2, 9),
      meal: draggedMeal,
      date: dateStr,
      slot,
    }
    setPlannedMeals([...plannedMeals, newPlan])
    setDraggedMeal(null)
  }

  const removeMeal = (id: string) => {
    setPlannedMeals(plannedMeals.filter((p) => p.id !== id))
  }

  const renderWeekView = () => {
    const days = getDaysInWeek(currentDate)
    const slots = ["Breakfast", "Lunch", "Dinner", "Snack"] as const

    return (
      <div className="grid grid-cols-7 gap-6 h-full min-w-[1400px] pb-8">
        {days.map((day, i) => {
          const dateStr = formatDate(day)
          const isToday = dateStr === formatDate(new Date())

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={dateStr}
              className={`flex flex-col h-full rounded-[2rem] overflow-hidden transition-all duration-300 ${
                isToday
                  ? "bg-white shadow-2xl ring-4 ring-red-500/20 z-10 scale-[1.02]"
                  : "bg-white/60 hover:bg-white/90 shadow-sm hover:shadow-xl backdrop-blur-md"
              }`}
            >
              {/* Header */}
              <div
                className={`p-6 text-center border-b ${
                  isToday ? "bg-red-600 text-white border-red-600" : "bg-white/50 border-gray-100"
                }`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-[0.2em] block mb-2 ${
                    isToday ? "text-red-100" : "text-gray-400"
                  }`}
                >
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <div className={`text-4xl font-black ${isToday ? "text-white" : "text-gray-900"}`}>{day.getDate()}</div>
              </div>

              {/* Slots */}
              <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto custom-scrollbar">
                {slots.map((slot) => (
                  <div
                    key={slot}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, dateStr, slot.toLowerCase() as any)}
                    className={`flex-1 min-h-[140px] rounded-2xl transition-all p-3 flex flex-col gap-2 relative group/slot border-2 border-dashed ${
                      isToday
                        ? "bg-gray-50/80 border-red-100 hover:border-red-300"
                        : "bg-gray-50/30 border-gray-100 hover:border-red-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1 px-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{slot}</span>
                      <Plus
                        size={14}
                        className="text-red-400 opacity-0 group-hover/slot:opacity-100 transition-opacity"
                      />
                    </div>

                    <AnimatePresence>
                      {plannedMeals
                        .filter((p) => p.date === dateStr && p.slot === slot.toLowerCase())
                        .map((plan) => (
                          <motion.div
                            layoutId={plan.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            key={plan.id}
                            className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 relative group cursor-grab active:cursor-grabbing hover:shadow-lg transition-all hover:-translate-y-1"
                          >
                            <div className="flex gap-3 items-center">
                              <img
                                src={plan.meal.image || "/placeholder.svg"}
                                className="w-12 h-12 rounded-xl object-cover bg-gray-100 shadow-sm"
                                alt={plan.meal.name}
                              />
                              <div className="min-w-0 flex-1">
                                <div className="font-bold text-xs truncate leading-tight text-gray-900 mb-1">
                                  {plan.meal.name}
                                </div>
                                <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                  <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded-md font-bold">
                                    {plan.meal.calories}
                                  </span>
                                  <span>kcal</span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeMeal(plan.id)}
                              className="absolute -top-2 -right-2 bg-white border border-red-100 rounded-full p-1.5 shadow-md text-red-600 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 hover:bg-red-50"
                            >
                              <Trash2 size={12} />
                            </button>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-4">
            <div className="bg-red-600 p-3 rounded-2xl text-white shadow-xl shadow-red-200">
              <Calendar size={28} />
            </div>
            Smart Planner
          </h1>
          <p className="text-gray-400 text-sm mt-1 ml-[72px] font-medium">Drag & drop to design your perfect week</p>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex bg-gray-100/80 p-1.5 rounded-2xl gap-1">
            {(["day", "week", "month"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-8 py-3 rounded-xl text-sm font-bold capitalize transition-all ${
                  viewMode === mode
                    ? "bg-white shadow-md text-red-600 scale-100 ring-1 ring-gray-100"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-2 pl-6 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-black text-gray-800 min-w-[160px] text-center uppercase tracking-wide text-sm">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  const d = new Date(currentDate)
                  d.setDate(d.getDate() - 7)
                  setCurrentDate(d)
                }}
                className="p-2.5 hover:bg-red-50 rounded-xl text-gray-600 hover:text-red-600 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => {
                  const d = new Date(currentDate)
                  d.setDate(d.getDate() + 7)
                  setCurrentDate(d)
                }}
                className="p-2.5 hover:bg-red-50 rounded-xl text-gray-600 hover:text-red-600 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Meal Bank */}
        <div className="w-[400px] bg-white border-r border-gray-200 flex flex-col z-10 shadow-2xl shadow-gray-200/50">
          <div className="p-8 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50/50">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-6 text-xl">
              <div className="p-2 bg-yellow-100 rounded-xl text-yellow-600">
                <Zap size={20} />
              </div>
              Meal Collection
            </h3>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search meals..."
                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all shadow-sm pl-12"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Plus size={18} className="rotate-45" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-gray-50/30">
            <div className="flex justify-between items-center px-2 mb-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Drag to Calendar</p>
              <Info size={14} className="text-gray-300" />
            </div>
            {MEALS_DB.map((meal) => (
              <motion.div
                key={meal.id}
                draggable
                onDragStart={() => setDraggedMeal(meal)}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-3xl border border-gray-100 hover:border-red-500/30 shadow-sm hover:shadow-xl hover:shadow-red-500/5 cursor-grab active:cursor-grabbing transition-all group flex gap-5 items-center relative overflow-hidden"
              >
                <div className="absolute inset-y-0 left-0 w-1.5 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden shrink-0 relative shadow-inner">
                  <img
                    src={meal.image || "/placeholder.svg"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={meal.name}
                  />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h4 className="font-bold text-base text-gray-900 truncate mb-2">{meal.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                      ₹{Math.floor(meal.price * 85)}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span>{meal.calories} kcal</span>
                  </div>
                </div>
                <div className="text-gray-300 group-hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-xl">
                  <GripVertical size={22} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Calendar Area */}
        <div className="flex-1 overflow-auto p-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
          {viewMode === "week" ? (
            renderWeekView()
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 font-medium bg-white/50 rounded-[3rem] border-2 border-dashed border-gray-200 m-10 backdrop-blur-sm">
              <Calendar size={64} className="mb-6 opacity-20" />
              <p className="text-xl font-bold text-gray-300">This view is coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
