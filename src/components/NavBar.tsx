import { ShoppingBag, Search, Menu, X, User } from 'lucide-react'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Catalog', href: '/catalog' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-charcoal-900/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="font-serif text-2xl tracking-wider text-cream-100"
          >
            ARCHIVE<span className="text-gold-500">.</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="group relative text-sm font-medium text-cream-200 hover:text-gold-400 transition-colors duration-300"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <form onSubmit={handleSearch} className="hidden lg:flex items-center relative">
            <input
              type="text"
              placeholder="Search Archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-charcoal-800/50 border border-white/10 rounded-full py-1.5 pl-4 pr-10 text-xs text-cream-100 focus:outline-none focus:border-gold-500/50 w-48 transition-all focus:w-64"
            />
            <button type="submit" className="absolute right-3 text-cream-400 hover:text-gold-500 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <Link to="/catalog" className="lg:hidden text-cream-200 hover:text-gold-400 transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          
          <Link to="/cart" className="relative text-cream-200 hover:text-gold-400 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-600 text-charcoal-900 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {user?.isAdmin && (
                <Link to="/admin" className="text-gold-500 hover:text-gold-400 font-bold text-xs uppercase tracking-widest border border-gold-500/30 px-3 py-1 rounded">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="flex items-center gap-2 text-cream-200 hover:text-gold-400 transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden lg:inline text-sm font-medium">{user?.name.split(' ')[0]}</span>
              </Link>
            </div>
          ) : (
            <Link to="/login" className="text-sm font-medium text-gold-500 hover:text-gold-400 transition-colors">
              Sign In
            </Link>
          )}

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
            <Link
              key={link.name}
              to={link.href}
              className="text-lg font-serif text-cream-100 hover:text-gold-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {!isAuthenticated && (
            <Link
              to="/login"
              className="text-lg font-serif text-gold-500 hover:text-gold-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
