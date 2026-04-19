import { useEffect, useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Product {
  id: number
  name: string
  series: string
  year: string
  price: number
  image: string
  condition: string
}

export function FeaturedProducts() {
  const { ref, isVisible } = useScrollAnimation()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then(res => setProducts(res.data.slice(0, 3)))
      .catch(err => console.error(err))
  }, [])

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
          <Link
            to="/catalog"
            className="hidden md:block text-gold-500 hover:text-gold-300 transition-colors text-sm uppercase tracking-widest font-medium"
          >
            View All Inventory
          </Link>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
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
                    ${product.price.toLocaleString()}
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
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            to="/catalog"
            className="inline-block px-8 py-3 border border-gold-500/30 text-gold-400 uppercase tracking-widest text-sm font-medium"
          >
            View All Inventory
          </Link>
        </div>
      </div>
    </section>
  )
}
