import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-charcoal-900/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1566576912902-199bd620ed36?q=80&w=2560&auto=format&fit=crop"
          alt="Vintage Star Wars Collection"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-8 animate-fade-in-up">
          <span className="inline-block py-1 px-3 border border-gold-500/30 rounded-full bg-gold-500/10 text-gold-400 text-xs tracking-[0.2em] uppercase font-medium backdrop-blur-sm">
            Est. 2024 • Premium Collectibles
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight leading-tight">
            Where <span className="gold-shimmer-text italic">Grails</span> Find
            <br />
            Their Guardians
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-cream-300 font-light leading-relaxed">
            Curating the world's most exclusive vintage toys and prototypes.
            Authenticated, insured, and delivered with white-glove service.
          </p>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/catalog" className="group relative px-8 py-4 bg-gold-600 text-charcoal-950 font-medium tracking-wide overflow-hidden transition-all duration-300 hover:bg-gold-500 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]">
              <span className="relative z-10 flex items-center">
                Explore Collection
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link to="/contact" className="group px-8 py-4 bg-transparent border border-cream-200/20 text-cream-100 font-medium tracking-wide transition-all duration-300 hover:border-gold-500/50 hover:text-gold-400">
              Consign Your Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-cream-400/50">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-500/50 to-transparent"></div>
      </div>
    </section>
  )
}
