import Link from "next/link"
import { Instagram, Twitter, Facebook, MapPin, Mail, Phone, Utensils } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-brand-red text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-white">
              <div className="bg-white text-[#ce1126] p-2 rounded-xl">
                <Utensils size={24} fill="currentColor" />
              </div>
              <span className="font-bold text-2xl tracking-tight">
                Pure<span className="text-red-100">Plate</span>
              </span>
            </div>
            <p className="text-red-100 text-sm leading-relaxed max-w-xs">
              Revolutionizing food delivery with 100% transparency. From farm to fork, we ensure every bite is pure,
              healthy, and delicious.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="bg-red-700/50 p-2 rounded-full hover:bg-white hover:text-red-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-red-700/50 p-2 rounded-full hover:bg-white hover:text-red-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-red-700/50 p-2 rounded-full hover:bg-white hover:text-red-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-white rounded-full"></span> Quick Links
            </h4>
            <ul className="space-y-4 text-red-100">
              <li>
                <Link href="/menu" className="hover:text-white transition-colors flex items-center gap-2">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/why-join-us" className="hover:text-white transition-colors flex items-center gap-2">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link href="/about/sourcing" className="hover:text-white transition-colors flex items-center gap-2">
                  Sourcing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-2">
                  Health Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-white rounded-full"></span> Support
            </h4>
            <ul className="space-y-4 text-red-100">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-white transition-colors">
                  Food Safety Reports
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-white rounded-full"></span> Contact Us
            </h4>
            <ul className="space-y-4 text-red-100">
              <li className="flex items-start gap-3">
                <MapPin className="text-red-200 shrink-0 mt-1" size={18} />
                <span>123 Gourmet Street, Foodie Valley, India 500033</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-red-200 shrink-0" size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-red-200 shrink-0" size={18} />
                <span>support@pureplate.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-red-500/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-red-200">
          <p>© 2025 PurePlate Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
