import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import Navbar from "@/components/layout/Navbar"
import { Toaster } from "@/components/ui/toaster"
// import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "PurePlate | Organic & Transparent Food Delivery",
  description: "Zero-adulteration healthy food delivery with complete ingredient traceability.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col`}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            {/* Footer removed from here */}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
