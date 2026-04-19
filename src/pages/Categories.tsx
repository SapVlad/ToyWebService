import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Vintage Figures', count: 124, image: 'https://images.unsplash.com/photo-1636572481914-a07d3673bd36?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Sealed Grails', count: 45, image: 'https://images.unsplash.com/photo-1601153211050-61a27458dd21?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Japanese Imports', count: 89, image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Prototypes', count: 12, image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=1000&auto=format&fit=crop' }
];

export function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
        Browse by Department
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, i) => (
          <Link key={i} to={`/catalog?category=${encodeURIComponent(cat.name)}`} className="group relative h-80 rounded-2xl overflow-hidden border border-charcoal-700">
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent flex flex-col justify-end p-8">
              <h2 className="text-3xl font-bold text-cream-100 mb-2">{cat.name}</h2>
              <p className="text-gold-500 font-medium">{cat.count} items in collection</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
