"use client"

import { Check } from "lucide-react"

const PLANS = [
  {
    name: "Starter",
    price: 99,
    meals: 6,
    features: ["Select any 6 meals", "Free Delivery", "Pause anytime"],
    recommended: false,
  },
  {
    name: "Lifestyle",
    price: 189,
    meals: 12,
    features: ["Select any 12 meals", "Priority Delivery", "Free Diet Consultation", "10% off Add-ons"],
    recommended: true,
  },
  {
    name: "All-In",
    price: 349,
    meals: 24,
    features: ["Full month supply (Mon-Sat)", "Free Delivery", "Quarterly Lab Tour", "Concierge Support"],
    recommended: false,
  },
]

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">Commit to Clean Eating</h1>
          <p className="text-muted-foreground text-lg">
            Save up to 20% with our weekly meal plans. Flexible, pause-able, and always verified pure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl p-8 border ${plan.recommended ? "border-primary shadow-xl scale-105 z-10" : "border-border shadow-sm"} flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className="text-muted-foreground">/week</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.meals} meals per week</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="bg-green-100 p-1 rounded-full text-green-600">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold transition-all ${plan.recommended ? "bg-primary text-white hover:bg-primary/90 shadow-lg" : "bg-secondary text-foreground hover:bg-gray-200"}`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
