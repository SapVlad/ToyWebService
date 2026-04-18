import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthStore, useCartStore } from '../store';

export function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { toggleCart, getItemCount } = useCartStore();
  const cartCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-charcoal-900/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/" className="font-serif text-2xl font-bold tracking-wider text-cream-100">
            Toy<span className="text-toy-primary">World</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-toy-primary ${location.pathname === link.href ? 'text-toy-primary' : 'text-cream-200'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleCart} className="relative text-cream-200 hover:text-toy-primary transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-toy-primary text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative group">
              <button className="text-cream-200 hover:text-toy-primary transition-colors">
                <User className="w-5 h-5" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-charcoal-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-3 border-b border-charcoal-700">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-cream-400">{user.email}</p>
                </div>
                <div className="p-2">
                  <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-cream-200 hover:bg-charcoal-700 rounded-lg">
                    <User size={16} /> My Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-cream-200 hover:bg-charcoal-700 rounded-lg">
                      <LayoutDashboard size={16} /> Admin
                    </Link>
                  )}
                  <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-charcoal-700 rounded-lg">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-sm font-medium text-cream-200 hover:text-toy-primary transition-colors">
              Login
            </Link>
          )}

          <button className="md:hidden text-cream-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-charcoal-900 border-b border-white/5 py-6 px-6 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.href}
              className="text-lg font-medium text-cream-100 hover:text-toy-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <Link to="/login" className="text-lg font-medium text-cream-100 hover:text-toy-primary" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}