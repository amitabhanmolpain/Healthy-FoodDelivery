"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  TrendingUp,
  Users,
  ShieldCheck,
  ChefHat,
  ArrowRight,
  Zap,
  DollarSign,
  BarChart3,
  Headphones,
  Award,
  TrendingDown,
  Store,
  Truck,
  Star,
  Gift,
  Crown,
  Target,
} from "lucide-react"
import Link from "next/link"
import Footer from "@/components/layout/Footer"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function WhyJoinUsPage() {
  const benefitsRef = useRef(null)
  const benefits = [
    {
      icon: TrendingUp,
      title: "Boost Your Revenue",
      description: "Partner restaurants see an average of 30% increase in monthly revenue within the first 3 months.",
      color: "red",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80",
    },
    {
      icon: Users,
      title: "Reach New Customers",
      description: "Access thousands of health-conscious customers actively looking for quality meals.",
      color: "blue",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
    },
    {
      icon: ShieldCheck,
      title: "Verified Quality Badge",
      description: "Get the PurePlate seal of trust that tells customers your food is clean and traceable.",
      color: "green",
      image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=600&q=80",
    },
    {
      icon: ChefHat,
      title: "Chef-Centric Platform",
      description: "We handle the logistics so you can focus on what you do best - cooking amazing food.",
      color: "orange",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
    },
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Get your kitchen live on our platform in less than 24 hours. No complex integration required.",
      color: "yellow",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    },
    {
      icon: DollarSign,
      title: "Zero Commission on First Month",
      description: "Start earning from day one. We waive all commissions for your first 30 days as a partner.",
      color: "purple",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track sales, popular items, and customer feedback with our intuitive dashboard.",
      color: "indigo",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    },
    {
      icon: Headphones,
      title: "24/7 Partner Support",
      description: "Dedicated account manager and round-the-clock technical support for all partners.",
      color: "pink",
      image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&q=80",
    },
    {
      icon: Award,
      title: "Marketing & Promotion",
      description: "Featured placement in our app, social media promotions, and co-branded marketing campaigns.",
      color: "teal",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
    },
    {
      icon: TrendingDown,
      title: "Low Operating Costs",
      description: "Save on delivery infrastructure, customer acquisition, and payment processing fees.",
      color: "cyan",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    },
  ]

  const kitchenBenefits = [
    {
      icon: Store,
      title: "Premium Marketplace Access",
      description: "Join an exclusive network of health-focused restaurants reaching affluent customers.",
    },
    {
      icon: Target,
      title: "Targeted Audience",
      description: "Connect with customers who value quality ingredients and are willing to pay premium prices.",
    },
    {
      icon: Crown,
      title: "Brand Elevation",
      description:
        "Association with PurePlate elevates your restaurant's reputation as a trusted health food provider.",
    },
    {
      icon: Truck,
      title: "Logistics Handled",
      description: "We manage delivery, packaging, and customer service so you can focus on the kitchen.",
    },
  ]

  const memberBenefits = [
    {
      icon: Gift,
      title: "Exclusive Perks",
      description: "Priority listing, featured spots, and promotional campaigns to boost visibility.",
    },
    {
      icon: Star,
      title: "Quality Recognition",
      description: "Earn PurePlate verification badges that customers trust and actively seek.",
    },
    {
      icon: BarChart3,
      title: "Growth Insights",
      description: "Access detailed analytics on customer preferences, peak hours, and menu optimization.",
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Join a community of like-minded chefs and restaurateurs sharing best practices.",
    },
  ]

  useEffect(() => {
    if (benefitsRef.current) {
      const cards = benefitsRef.current.querySelectorAll(".benefit-card")
      
      // Set initial state
      gsap.set(cards, { opacity: 1, y: 0, scale: 1, rotation: 0 })
      
      // Animate cards in with stagger
      gsap.fromTo(cards, 
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
          rotation: -8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      )

      // Animate icons separately for extra flair
      const icons = benefitsRef.current.querySelectorAll(".benefit-icon")
      gsap.fromTo(icons,
        {
          scale: 0,
          rotation: 180,
        },
        {
          scale: 1,
          rotation: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
          },
        }
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section (Red Background) */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#ce1126] to-red-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
              Grow Your Kitchen <br />
              <span className="text-white opacity-90">With PurePlate</span>
            </h1>
            <p className="text-xl text-white mb-10 max-w-2xl leading-relaxed opacity-95">
              Join the movement for transparent, healthy food. Connect with customers who value quality over everything
              else.
            </p>
            <Link
              href="/business/login"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-red-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Partner With Us <ArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Why Top Kitchens Choose Us</h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
              We provide the tools and audience you need to scale your food business sustainably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {kitchenBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:border-red-200 transition-all group"
              >
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-gradient-to-br from-[#ce1126] to-red-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10" ref={benefitsRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">Complete Partnership Benefits</h2>
            <p className="text-white text-lg max-w-2xl mx-auto leading-relaxed opacity-90">
              Everything you need to succeed on our platform - from technology to marketing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card bg-white p-6 rounded-2xl shadow-lg border border-white/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer opacity-100 relative overflow-hidden"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Background Image on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="benefit-icon w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/90 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <benefit.icon className="text-red-600 group-hover:text-red-600 transition-colors" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-white transition-colors duration-300">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Technology Built for <br />
                <span className="text-red-600">Modern Kitchens</span>
              </h2>
              <ul className="space-y-6">
                {[
                  "Real-time order management dashboard",
                  "Automated inventory tracking",
                  "Detailed sales analytics and insights",
                  "Direct customer feedback loop",
                  "Smart menu optimization suggestions",
                  "Seamless payment processing",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-gray-700">
                    <div className="bg-red-100 p-1 rounded-full text-red-600 shrink-0">
                      <CheckCircle size={20} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="rounded-3xl shadow-2xl w-full h-64 overflow-hidden transform translate-y-12 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80"
                    alt="Professional Chef Cooking"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="rounded-3xl shadow-2xl w-full h-64 overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80"
                    alt="Modern Restaurant Interior"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-50/50 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#ce1126] to-red-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">What You Get After Joining</h2>
            <p className="text-white text-lg max-w-2xl mx-auto leading-relaxed opacity-90">
              Unlock exclusive features and benefits designed to accelerate your restaurant's success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {memberBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all group"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  <benefit.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                <p className="text-white leading-relaxed opacity-90">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black mb-6 text-gray-900">Ready to Partner?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Start growing your business with PurePlate today. No setup fees, no hidden costs.
          </p>
          <Link
            href="/business/login"
            className="inline-flex items-center gap-2 bg-[#ce1126] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Join Now <ArrowRight />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
