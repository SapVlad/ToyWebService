import React from 'react'
import { ShieldCheck, Truck, Award, Search } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
export function TrustBar() {
  const { ref, isVisible } = useScrollAnimation()
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-500" />,
      title: 'Authentication Guaranteed',
      description: 'Every item verified by experts',
    },
    {
      icon: <Award className="w-6 h-6 text-gold-500" />,
      title: 'Provenance Verified',
      description: 'Complete history documentation',
    },
    {
      icon: <Truck className="w-6 h-6 text-gold-500" />,
      title: 'Insured Shipping',
      description: 'Global white-glove delivery',
    },
    {
      icon: <Search className="w-6 h-6 text-gold-500" />,
      title: 'Condition Reports',
      description: 'High-resolution 360° analysis',
    },
  ]
  return (
    <section className="relative z-20 bg-charcoal-950 border-y border-gold-500/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3 p-4 group hover:bg-white/5 rounded-lg transition-colors duration-300"
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="p-3 rounded-full bg-gold-500/10 border border-gold-500/20 group-hover:border-gold-500/50 group-hover:shadow-[0_0_15px_rgba(201,168,76,0.15)] transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-cream-100 font-serif text-lg">
                {feature.title}
              </h3>
              <p className="text-cream-400 text-sm font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
