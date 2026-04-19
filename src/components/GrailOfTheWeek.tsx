import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, Loader2 } from 'lucide-react'
import axios from 'axios'

interface AuctionProduct {
  id: number
  name: string
  image: string
  series: string
  year: string
  condition: string
}

interface Auction {
  id: number
  currentBid: number | null
  startPrice: number
  endTime: string
  product: AuctionProduct
}

export function GrailOfTheWeek() {
  const [auction, setAuction] = useState<Auction | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5001/api/auctions/current')
      .then(res => {
        setAuction(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <section className="py-24 bg-charcoal-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  if (!auction || !auction.product) {
    return (
      <section className="py-24 bg-charcoal-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4">
              Spotlight
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-cream-100 text-center">
              Grail of the Week
            </h2>
          </div>
          <p className="text-center text-cream-400">No active auction at the moment. Check back soon!</p>
        </div>
      </section>
    )
  }

  const displayPrice = auction.currentBid || auction.startPrice

  return (
    <section className="py-24 bg-charcoal-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4">
            Spotlight
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-cream-100 text-center">
            Grail of the Week
          </h2>
        </div>

        <div className="relative bg-charcoal-800 rounded-sm border border-white/5 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16 items-center">
            {/* Image Side */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gold-500/10 blur-2xl transform group-hover:scale-105 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
              <div className="relative aspect-square overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                <img
                  src={auction.product.image}
                  alt={auction.product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-charcoal-950/90 backdrop-blur border border-gold-500/30 px-4 py-2">
                  <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">
                    {auction.product.condition}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  <span className="text-gold-500 text-sm font-medium tracking-wide">
                    Live Auction
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif text-cream-100 leading-tight mb-4">
                  {auction.product.name}
                </h3>
                <p className="text-cream-300 text-lg font-light leading-relaxed">
                  {auction.product.series} • {auction.product.year}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/10">
                <div>
                  <span className="block text-cream-400 text-xs uppercase tracking-wider mb-1">
                    Condition
                  </span>
                  <span className="text-cream-100 font-serif">
                    {auction.product.condition}
                  </span>
                </div>
                <div>
                  <span className="block text-cream-400 text-xs uppercase tracking-wider mb-1">
                    Starting Price
                  </span>
                  <span className="text-cream-100 font-serif">
                    ${auction.startPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6">
                <div>
                  <span className="block text-cream-400 text-sm mb-1">
                    Current Bid
                  </span>
<span className="text-4xl font-serif text-gold-400">
                      ${displayPrice.toLocaleString()}
                    </span>
                </div>
                <Link to={`/auction/${auction.id}`} className="w-full sm:w-auto px-8 py-4 bg-cream-100 text-charcoal-950 hover:bg-gold-400 transition-colors duration-300 font-medium flex items-center justify-center group">
                  Place Bid
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
