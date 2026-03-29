import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Heart } from 'lucide-react'
interface Product {
  id: number
  name: string
  series: string
  year: string
  price: string
  image: string
  condition: string
}
const products: Product[] = [
  {
    id: 1,
    name: 'Optimus Prime G1',
    series: 'Transformers Generation 1',
    year: '1984',
    price: '$8,200',
    condition: 'AFA 85',
    image:
      'https://images.unsplash.com/photo-1636572481914-a07d3673bd36?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'USS Flagg Aircraft Carrier',
    series: 'G.I. Joe',
    year: '1985',
    price: '$4,500',
    condition: 'Complete in Box',
    image:
      'https://images.unsplash.com/photo-1532103861939-270836c2455f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Skeletor Panthor Set',
    series: 'Masters of the Universe',
    year: '1983',
    price: '$2,800',
    condition: 'Mint on Card',
    image:
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Technodrome Playset',
    series: 'TMNT',
    year: '1990',
    price: '$3,200',
    condition: 'Sealed',
    image:
      'https://images.unsplash.com/photo-1601153211050-61a27458dd21?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Darth Vader TIE Fighter',
    series: 'Star Wars',
    year: '1978',
    price: '$1,900',
    condition: 'AFA 80',
    image:
      'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Voltron Lion Force',
    series: 'Voltron',
    year: '1984',
    price: '$5,600',
    condition: 'Die-cast / Mint',
    image:
      'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop',
  },
]
export function FeaturedProducts() {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <section className="py-24 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-cream-100 mb-2">
              Curated Collection
            </h2>
            <p className="text-cream-400 font-light">
              Rare finds available for immediate acquisition
            </p>
          </div>
          <a
            href="#"
            className="hidden md:block text-gold-500 hover:text-gold-300 transition-colors text-sm uppercase tracking-widest font-medium"
          >
            View All Inventory
          </a>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-charcoal-800 border border-white/5 hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-900">
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800 to-transparent opacity-60 z-10"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />

                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-charcoal-900/80 backdrop-blur text-cream-100 hover:text-gold-500 rounded-full border border-white/10 hover:border-gold-500/50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-gold-500/90 text-charcoal-950 text-xs font-bold uppercase tracking-wider">
                    {product.condition}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <div className="absolute -top-10 left-6 z-20">
                  <span className="text-4xl font-serif text-cream-100 text-shadow-gold drop-shadow-lg">
                    {product.price}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-serif text-cream-100 group-hover:text-gold-300 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-cream-400 text-sm">
                        {product.series} • {product.year}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs text-cream-400 uppercase tracking-wider">
                      Available Now
                    </span>
                    <span className="text-gold-500 text-sm font-medium cursor-pointer hover:underline">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a
            href="#"
            className="inline-block px-8 py-3 border border-gold-500/30 text-gold-400 uppercase tracking-widest text-sm font-medium"
          >
            View All Inventory
          </a>
        </div>
      </div>
    </section>
  )
}
