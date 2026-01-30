// MOCK API SERVICE
// In the future, swap the implementation of these functions to call your Node/Express backend.
// BASE URL: Set this to your backend URL when ready.
const API_BASE_URL = "http://localhost:3000/api"

// Import local mock data
import { MEALS_DB, CATEGORIES } from "@/lib/mock-data"

// Helper to simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  // AUTH
  auth: {
    login: async (email, password) => {
      await delay(800)
      if (email === "user@example.com" && password === "password") {
        return {
          user: {
            id: "u1",
            name: "Jane Doe",
            email,
            avatar: "/placeholder.svg?height=40&width=40",
            preferences: { vegan: false, glutenFree: true },
          },
          token: "mock-jwt-token-123",
        }
      }
      throw new Error("Invalid credentials")
    },
    register: async (userData) => {
      await delay(1000)
      return {
        user: { id: "u2", ...userData, avatar: "/placeholder.svg?height=40&width=40" },
        token: "mock-jwt-token-456",
      }
    },
    logout: async () => {
      await delay(200)
      return true
    },
  },

  // MEALS
  meals: {
    getAll: async (filters = {}) => {
      await delay(500)
      let results = [...MEALS_DB]
      if (filters.category && filters.category !== "all") {
        results = results.filter((m) => m.category === filters.category)
      }
      if (filters.search) {
        const q = filters.search.toLowerCase()
        results = results.filter((m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q))
      }
      return results
    },
    getBySlug: async (slug) => {
      await delay(300)
      const meal = MEALS_DB.find((m) => m.slug === slug)
      if (!meal) throw new Error("Meal not found")
      return meal
    },
    getCategories: async () => {
      await delay(200)
      return CATEGORIES
    },
  },

  // CART (Mocking server-side cart persistence)
  cart: {
    get: async () => {
      await delay(300)
      const saved = localStorage.getItem("mock_cart")
      return saved ? JSON.parse(saved) : { items: [], total: 0 }
    },
    update: async (cartData) => {
      await delay(300)
      localStorage.setItem("mock_cart", JSON.stringify(cartData))
      return cartData
    },
  },

  // ORDERS
  orders: {
    create: async (orderData) => {
      await delay(1500)
      const newOrder = {
        id: "ORD-" + Math.floor(Math.random() * 10000),
        status: "confirmed",
        createdAt: new Date().toISOString(),
        ...orderData,
      }
      // In a real app, save to DB
      return newOrder
    },
    getHistory: async () => {
      await delay(800)
      return [
        { id: "ORD-9921", date: "2023-10-15", total: 45.5, status: "delivered", items: [MEALS_DB[0], MEALS_DB[2]] },
        { id: "ORD-8812", date: "2023-09-28", total: 32.0, status: "delivered", items: [MEALS_DB[1]] },
      ]
    },
  },

  // LAB REPORTS
  provenance: {
    getReport: async (id) => {
      await delay(600)
      return {
        id,
        imageUrl: "/placeholder.svg?key=y1dlc",
        verifiedAt: "2023-11-01",
        labName: "PureLabs Inc.",
        result: "PASSED: No contaminants found.",
      }
    },
  },
}
