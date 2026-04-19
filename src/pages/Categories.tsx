import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const categoryConfig: Record<string, { displayName: string; image: string }> = {
  'Vintage Figures': { displayName: 'Vintage Figures', image: 'https://images.unsplash.com/photo-1636572481914-a07d3673bd36?q=80&w=1000&auto=format&fit=crop' },
  'Sealed Grails': { displayName: 'Sealed Grails', image: 'https://images.unsplash.com/photo-1601153211050-61a27458dd21?q=80&w=1000&auto=format&fit=crop' },
  'Japanese Imports': { displayName: 'Japanese Imports', image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop' },
  'Prototype & Pre-Production': { displayName: 'Prototypes', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=1000&auto=format&fit=crop' }
};

interface CategoryCount {
  [key: string]: number;
}

export function Categories() {
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount>({});

  useEffect(() => {
    axios.get('http://localhost:5001/api/products/categories/counts')
      .then(res => setCategoryCounts(res.data))
      .catch(err => console.error(err));
  }, []);

  const categories = Object.entries(categoryConfig).map(([dbName, config]) => ({
    name: config.displayName,
    urlParam: dbName,
    count: categoryCounts[dbName] || 0,
    image: config.image
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
        Browse by Department
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, i) => (
          <Link key={i} to={`/catalog?category=${encodeURIComponent(cat.urlParam)}`} className="group relative h-80 rounded-2xl overflow-hidden border border-charcoal-700">
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
