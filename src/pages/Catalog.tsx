import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Eye, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Catalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const { addToCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const category = searchParams.get('category')?.toLowerCase() || '';

    let filtered = products;

    if (query) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.series.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    if (category) {
      filtered = filtered.filter(p => p.category.toLowerCase() === category);
    }

    setFilteredProducts(filtered);
  }, [location.search, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
            Archive Inventory
          </h1>
          <p className="text-cream-400 font-light tracking-wide uppercase text-xs">
            {filteredProducts.length} Specimens Available
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group bg-charcoal-800 border border-charcoal-700 rounded-xl overflow-hidden hover:border-gold-500/50 transition-all duration-300">
            <div className="relative aspect-square overflow-hidden bg-charcoal-900">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Link 
                  to={`/product/${product.id}`}
                  className="p-3 bg-cream-100 text-charcoal-900 rounded-full hover:bg-gold-500 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <button 
                  onClick={() => addToCart(product)}
                  className="p-3 bg-gold-600 text-charcoal-900 rounded-full hover:bg-gold-500 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-gold-500/80 text-[10px] uppercase tracking-widest font-bold mb-1">{product.series}</p>
                  <h3 className="text-lg font-bold text-cream-100 group-hover:text-gold-400 transition-colors">{product.name}</h3>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                <span className="text-xl font-bold text-gold-400">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-cream-500 text-[10px] font-bold uppercase tracking-tighter">
                  {product.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-24">
          <p className="text-cream-400 text-lg">No specimens found in our archives matching your search.</p>
        </div>
      )}
    </div>
  );
}
