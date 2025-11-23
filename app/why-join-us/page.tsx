"use client"

import { motion } from "framer-motion"
import { CheckCircle, TrendingUp, Users, ShieldCheck, ChefHat, ArrowRight } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/layout/Footer"

export default function WhyJoinUsPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Boost Your Revenue",
      description: "Partner restaurants see an average of 30% increase in monthly revenue within the first 3 months.",
    },
    {
      icon: Users,
      title: "Reach New Customers",
      description: "Access thousands of health-conscious customers actively looking for quality meals.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Quality Badge",
      description: "Get the PurePlate seal of trust that tells customers your food is clean and traceable.",
    },
    {
      icon: ChefHat,
      title: "Chef-Centric Platform",
      description: "We handle the logistics so you can focus on what you do best - cooking amazing food.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-red-600 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 opacity-90"></div>

        <div className="container mx-auto px-4 relative z-10">
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

      {/* Benefits Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why Top Kitchens Choose Us</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We provide the tools and audience you need to scale your food business sustainably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all group"
              >
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                  <benefit.icon className="text-red-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed">{benefit.description}</p>
              </motion.div>
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
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-gray-700">
                    <div className="bg-red-100 p-1 rounded-full text-red-600">
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
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80"
                  className="rounded-3xl shadow-2xl w-full h-64 object-cover transform translate-y-12"
                  alt="Kitchen staff"
                />
                <img
                  src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9f4?auto=format&fit=crop&q=80"
                  className="rounded-3xl shadow-2xl w-full h-64 object-cover"
                  alt="Chef cooking"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-50/50 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
