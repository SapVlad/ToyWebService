import { useEffect, useState, useRef } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then(res => {
        setProducts(res.data.slice(0, 3))
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth
      setVisibleCount(width < 768 ? 1 : width < 1024 ? 2 : 3)
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const infiniteProducts = [...products, ...products, ...products]

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current || infiniteProducts.length === 0) return
    const container = scrollRef.current
    const cardWidth = container.offsetWidth / visibleCount
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % products.length
    scrollToIndex(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = currentIndex <= 0 ? products.length - 1 : currentIndex - 1
    scrollToIndex(prevIndex)
  }

  useEffect(() => {
    if (products.length === 0) return
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % products.length
      scrollToIndex(nextIndex)
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, products.length])

  if (isLoading || products.length === 0) {
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
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }

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

        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-charcoal-800/80 border border-white/10 hover:border-gold-500/30 hover:bg-charcoal-700 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-cream-100" />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteProducts.map((product, index) => (
              <Link
                key={`${product.id}-${index}`}
                to={`/product/${product.id}`}
                className="flex-none w-full md:w-1/2 lg:w-1/3 snap-center group relative bg-charcoal-800 border border-white/5 hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
              >
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

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-charcoal-800/80 border border-white/10 hover:border-gold-500/30 hover:bg-charcoal-700 transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-cream-100" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                (currentIndex % products.length) === index
                  ? 'bg-gold-500 w-8'
                  : 'bg-cream-400/30 hover:bg-cream-400/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
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