"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Meal } from "@/lib/mock-data"

export interface CartItem extends Meal {
  quantity: number
}

interface NutritionSummary {
  calories: number
  protein: number
  carbs: number
  fats: number
  healthyScore: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (meal: Meal) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  nutrition: NutritionSummary
  totalPrice: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setItems(JSON.parse(stored))
  }, [])

  // Save cart to local storage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (meal: Meal) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === meal.id)
      if (existing) {
        return prev.map((i) => (i.id === meal.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...meal, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return removeItem(id)
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)))
  }

  const clearCart = () => setItems([])

  // Calculate totals
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  // Nutrition Calculator
  const nutrition = items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories * item.quantity,
      protein: acc.protein + item.protein * item.quantity,
      carbs: acc.carbs + item.carbs * item.quantity,
      fats: acc.fats + item.fats * item.quantity,
      healthyScore: 0, // Calc below
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0, healthyScore: 0 },
  )

  // Mock "Healthy Score" algorithm (0-100)
  // Penalize high fats/carbs slightly, reward protein, normalize by calories
  if (nutrition.calories > 0) {
    const pRatio = (nutrition.protein * 4) / nutrition.calories
    const score = Math.min(100, Math.max(0, 70 + pRatio * 50))
    nutrition.healthyScore = Math.round(score)
  } else {
    nutrition.healthyScore = 100
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, nutrition, totalPrice, itemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
