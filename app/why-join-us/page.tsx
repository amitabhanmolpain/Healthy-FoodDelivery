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
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function WhyJoinUsPage() {
  const heroRef = useRef(null)
  const benefitsRef = useRef(null)
  const kitchenBenefitsRef = useRef(null)
  const imageRef = useRef(null)

  const benefits = [
    {
      icon: TrendingUp,
      title: "Boost Your Revenue",
      description: "Partner restaurants see an average of 30% increase in monthly revenue within the first 3 months.",
      color: "red",
    },
    {
      icon: Users,
      title: "Reach New Customers",
      description: "Access thousands of health-conscious customers actively looking for quality meals.",
      color: "blue",
    },
    {
      icon: ShieldCheck,
      title: "Verified Quality Badge",
      description: "Get the PurePlate seal of trust that tells customers your food is clean and traceable.",
      color: "green",
    },
    {
      icon: ChefHat,
      title: "Chef-Centric Platform",
      description: "We handle the logistics so you can focus on what you do best - cooking amazing food.",
      color: "orange",
    },
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Get your kitchen live on our platform in less than 24 hours. No complex integration required.",
      color: "yellow",
    },
    {
      icon: DollarSign,
      title: "Zero Commission on First Month",
      description: "Start earning from day one. We waive all commissions for your first 30 days as a partner.",
      color: "purple",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track sales, popular items, and customer feedback with our intuitive dashboard.",
      color: "indigo",
    },
    {
      icon: Headphones,
      title: "24/7 Partner Support",
      description: "Dedicated account manager and round-the-clock technical support for all partners.",
      color: "pink",
    },
    {
      icon: Award,
      title: "Marketing & Promotion",
      description: "Featured placement in our app, social media promotions, and co-branded marketing campaigns.",
      color: "teal",
    },
    {
      icon: TrendingDown,
      title: "Low Operating Costs",
      description: "Save on delivery infrastructure, customer acquisition, and payment processing fees.",
      color: "cyan",
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
    // Hero animation
    if (heroRef.current) {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
    }

    // Benefits cards stagger animation
    if (benefitsRef.current) {
      const cards = benefitsRef.current.querySelectorAll(".benefit-card")
      gsap.from(cards, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: "top 70%",
        },
      })
    }

    // Kitchen benefits animation
    if (kitchenBenefitsRef.current) {
      const cards = kitchenBenefitsRef.current.querySelectorAll(".kitchen-card")
      gsap.from(cards, {
        opacity: 0,
        scale: 0.9,
        stagger: 0.15,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: kitchenBenefitsRef.current,
          start: "top 70%",
        },
      })
    }

    // Image reveal animation
    if (imageRef.current) {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 70%",
        },
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section (Red Background) */}
      <section className="relative py-32 overflow-hidden bg-[#ce1126] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ce1126] to-red-800 opacity-90"></div>

        <div className="container mx-auto px-4 relative z-10" ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
              Grow Your Kitchen <br />
              <span className="text-red-200">With PurePlate</span>
            </h1>
            <p className="text-xl text-red-100 mb-10 max-w-2xl leading-relaxed">
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

      <section className="py-24 bg-white" ref={kitchenBenefitsRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Why Top Kitchens Choose Us</h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
              We provide the tools and audience you need to scale your food business sustainably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {kitchenBenefits.map((benefit, index) => (
              <div
                key={index}
                className="kitchen-card bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:border-red-200 transition-all group"
              >
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-gray-50" ref={benefitsRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Complete Partnership Benefits</h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
              Everything you need to succeed on our platform - from technology to marketing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all group"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <benefit.icon className="text-red-600 group-hover:text-white transition-colors" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
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

            <div ref={imageRef} className="flex-1 relative">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <img
                  src="/professional-chef-preparing-healthy-meals-in-moder.jpg"
                  className="rounded-3xl shadow-2xl w-full h-64 object-cover transform translate-y-12"
                  alt="Kitchen staff"
                />
                <img
                  src="/chef-cooking-gourmet-healthy-food-in-restaurant.jpg"
                  className="rounded-3xl shadow-2xl w-full h-64 object-cover"
                  alt="Chef cooking"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-50/50 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#ce1126] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ce1126] to-red-800 opacity-90"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">What You Get After Joining</h2>
            <p className="text-red-100 text-lg max-w-2xl mx-auto leading-relaxed">
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
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-red-100 leading-relaxed">{benefit.description}</p>
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
