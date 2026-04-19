import React from 'react';
import { Link } from 'react-router-dom';
import {Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-charcoal-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="font-serif text-2xl tracking-wider text-cream-100">
              ARCHIVE<span className="text-gold-500">.</span>
            </Link>
            <p className="text-cream-400 text-sm leading-relaxed max-w-xs">
              The world's premier destination for rare, vintage, and museum-quality collectible toys. Preserving play history since 2024.
            </p>

          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-cream-100 font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/catalog" className="text-cream-400 hover:text-gold-400 transition-colors text-sm">Collection Catalog</Link>
              </li>
              <li>
                <Link to="/categories" className="text-cream-400 hover:text-gold-400 transition-colors text-sm">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="text-cream-400 hover:text-gold-400 transition-colors text-sm">Our Heritage</Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream-400 hover:text-gold-400 transition-colors text-sm">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-cream-100 font-serif text-lg mb-6">Client Services</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-cream-400 hover:text-gold-400 transition-colors text-sm">Shipping & Handling</a>
              </li>
              <li>
                <a href="#" className="text-cream-400 hover:text-gold-400 transition-colors text-sm">Authentication Process</a>
              </li>
              <li>
                <a href="#" className="text-cream-400 hover:text-gold-400 transition-colors text-sm">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-cream-400 hover:text-gold-400 transition-colors text-sm">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-cream-100 font-serif text-lg mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <span className="text-cream-400 text-sm leading-relaxed group-hover:text-cream-200 transition-colors">
                  123 Collector's Lane<br />
                  London, UK W1B 2EL
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-gold-500 shrink-0" />
                <span className="text-cream-400 text-sm group-hover:text-cream-200 transition-colors">+44 (0) 20 7946 0123</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-gold-500 shrink-0" />
                <span className="text-cream-400 text-sm group-hover:text-cream-200 transition-colors">concierge@archiveshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream-500 text-xs tracking-widest uppercase">
            © 2024 Archive Toy Shop. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-[10px] tracking-widest uppercase text-cream-500">
            <a href="#" className="hover:text-gold-500 transition-colors">Sitemap</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Cookies</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
