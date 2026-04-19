import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Link } from 'react-router-dom'
export function CategoryNav() {
  const { ref, isVisible } = useScrollAnimation()
  const categories = [
    'Vintage Figures',
    'Sealed Grails',
    'Limited Editions',
    'Japanese Imports',
    'Prototype & Pre-Production',
  ]
  return (
    <section className="bg-charcoal-900 py-16 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`flex flex-wrap justify-center gap-x-12 gap-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/catalog?category=${encodeURIComponent(category)}`}
              className="group relative text-xl md:text-2xl font-serif text-cream-300 hover:text-gold-400 transition-colors duration-300"
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {category}
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out"></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
