import React, { useEffect, useState } from 'react'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const navLinks = [
    {
      name: 'Auctions',
      href: '#',
    },
    {
      name: 'Private Sales',
      href: '#',
    },
    {
      name: 'Valuation',
      href: '#',
    },
    {
      name: 'About',
      href: '#',
    },
  ]
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-charcoal-900/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a
            href="#"
            className="font-serif text-2xl tracking-wider text-cream-100"
          >
            ARCHIVE<span className="text-gold-500">.</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative text-sm font-medium text-cream-200 hover:text-gold-400 transition-colors duration-300"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <button className="text-cream-200 hover:text-gold-400 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="relative text-cream-200 hover:text-gold-400 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold-500 rounded-full"></span>
          </button>
          <button
            className="md:hidden text-cream-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-charcoal-900 border-b border-white/5 py-6 px-6 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-serif text-cream-100 hover:text-gold-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
