import React from 'react'
import { Mail, Share2, MessageCircle, Heart } from 'lucide-react'
export function Footer() {
  return (
    <footer className="bg-charcoal-950 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <a
              href="#"
              className="font-serif text-2xl tracking-wider text-cream-100 block mb-6"
            >
              ARCHIVE<span className="text-gold-500">.</span>
            </a>
            <p className="text-cream-400 font-light text-sm leading-relaxed mb-6">
              The world's premier destination for investment-grade vintage toys
              and collectibles. Preserving history, one grail at a time.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-cream-400 hover:text-gold-500 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-cream-400 hover:text-gold-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-cream-400 hover:text-gold-500 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-cream-100 font-serif mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm text-cream-400">
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Live Auctions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Private Sales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Consign with Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Past Results
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream-100 font-serif mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-cream-400">
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Authentication
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Shipping & Storage
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Condition Grading
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Contact Specialists
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-cream-100 font-serif mb-6">Stay Informed</h4>
            <p className="text-cream-400 text-sm mb-4">
              Subscribe for auction alerts and market insights.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-charcoal-900 border border-white/10 focus:border-gold-500/50 text-cream-100 px-4 py-3 text-sm outline-none transition-colors"
                />
                <Mail className="absolute right-3 top-3 w-4 h-4 text-cream-400" />
              </div>
              <button className="w-full bg-gold-600 text-charcoal-950 font-medium py-3 text-sm hover:bg-gold-500 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream-400/60 text-xs">
            © 2024 Archive Collectibles. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-cream-400/60">
            <a href="#" className="hover:text-cream-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cream-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-cream-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
