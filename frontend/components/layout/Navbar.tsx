"use client"

import Link from "next/link"
import { ShoppingCart, Menu, Search, Utensils } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import AuthModal from "@/components/ui/AuthModal"

export default function Navbar() {
  const { itemCount } = useCart()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (pathname?.startsWith("/business")) {
    return null
  }

  const isLandingPage = pathname === "/"

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-300 ${
          isScrolled ? "h-14 shadow-md" : "h-16"
        }`}
      >
        <div className={`container mx-auto px-4 h-full flex items-center justify-between transition-all duration-300`}>
          <Link href="/" className="flex items-center space-x-2 group">
            <div
              className={`bg-red-600 text-white rounded-lg transition-all duration-300 ${
                isScrolled ? "p-1" : "p-1.5"
              } group-hover:rotate-3`}
            >
              <Utensils size={isScrolled ? 16 : 20} fill="currentColor" />
            </div>
            <span
              className={`font-bold tracking-tight text-gray-900 transition-all duration-300 ${
                isScrolled ? "text-lg" : "text-xl"
              }`}
            >
              Pure<span className="text-red-600">Plate</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            {user && (
              <Link href="/menu" className="hover:text-red-600 transition-colors">
                Menu
              </Link>
            )}
            <Link href="/why-join-us" className="hover:text-red-600 transition-colors">
              Why Join Us
            </Link>
            <Link href="/about/sourcing" className="hover:text-red-600 transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isLandingPage && user && (
              <>
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-600 transition-colors">
                  <Search size={20} />
                </button>

                <Link
                  href="/cart"
                  className="relative p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-600 group transition-colors"
                >
                  <ShoppingCart size={20} />
                  {itemCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {user ? (
              <div className="relative group flex items-center gap-4">
                <Link href="/meal-plan" className="text-sm font-medium hover:text-red-600 hidden md:block">
                  My Plan
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded-full pr-3 transition-colors"
                >
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                  <span className="text-sm font-medium hidden sm:block text-gray-700">{user.name.split(" ")[0]}</span>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={() => openAuthModal("login")}
                  className="px-5 py-2 text-sm font-bold text-red-600 bg-white border-2 border-red-100 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors"
                >
                  Sign In
                </button>
                <Link
                  href="/business/login"
                  className="px-5 py-2 text-sm font-bold bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-md shadow-red-200"
                >
                  Join Us
                </Link>
              </div>
            )}

            <button className="md:hidden p-2 text-gray-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white p-4 space-y-4 animate-in slide-in-from-top-2 shadow-xl">
            {user && (
              <>
                <Link href="/menu" className="block p-2 hover:bg-gray-50 rounded-md font-medium text-gray-700">
                  Menu
                </Link>
                <Link href="/meal-plan" className="block p-2 hover:bg-gray-50 rounded-md font-medium text-gray-700">
                  My Meal Plan
                </Link>
              </>
            )}
            <Link href="/why-join-us" className="block p-2 hover:bg-gray-50 rounded-md font-medium text-gray-700">
              Why Join Us
            </Link>
            <Link href="/about/sourcing" className="block p-2 hover:bg-gray-50 rounded-md font-medium text-gray-700">
              About
            </Link>
            {!user && (
              <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-3">
                <button
                  onClick={() => openAuthModal("login")}
                  className="flex justify-center p-2.5 rounded-xl font-bold text-red-600 bg-red-50"
                >
                  Sign In
                </button>
                <Link
                  href="/business/login"
                  className="flex justify-center p-2.5 rounded-xl font-bold bg-red-600 text-white"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </>
  )
}
