import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Truck, Shield, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store';

const API = 'http://localhost:3001/api';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: { name: string };
}

export function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const addItem = useCartStore(s => s.addItem);

  useEffect(() => {
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(data => setFeatured(data.slice(0, 4)));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-toy-primary/20 via-transparent to-toy-secondary/20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-toy-primary via-toy-accent to-toy-secondary bg-clip-text text-transparent">
              Welcome to Toy World!
            </h1>
            <p className="text-xl text-cream-300 mb-8 max-w-2xl mx-auto">
              Discover amazing toys for kids of all ages. STEM toys, plushies, action figures, and board games - all in one place!
            </p>
            <Link to="/catalog" className="inline-flex items-center gap-2 bg-toy-primary hover:bg-toy-primary-dark text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105">
              <ShoppingBag size={20} />
              Shop Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6 bg-charcoal-800/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 p-6 glass-effect rounded-2xl">
            <div className="p-3 bg-toy-secondary/20 rounded-full">
              <Truck className="text-toy-secondary" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Free Shipping</h3>
              <p className="text-cream-400 text-sm">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 glass-effect rounded-2xl">
            <div className="p-3 bg-toy-accent/20 rounded-full">
              <Shield className="text-toy-accent" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Safe & Secure</h3>
              <p className="text-cream-400 text-sm">100% secure checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 glass-effect rounded-2xl">
            <div className="p-3 bg-toy-purple/20 rounded-full">
              <Star className="text-toy-purple" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Quality Toys</h3>
              <p className="text-cream-400 text-sm">Best brands guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Toys</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <div key={product.id} className="group bg-charcoal-800 rounded-2xl overflow-hidden hover:ring-2 hover:ring-toy-primary transition-all">
                <div className="aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <p className="text-toy-secondary text-sm">{product.category.name}</p>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-toy-accent">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => addItem({ productId: product.id, name: product.name, price: product.price, image: product.image })}
                      className="bg-toy-primary hover:bg-toy-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/catalog" className="inline-flex items-center gap-2 text-toy-primary hover:text-toy-primary-dark font-medium">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-charcoal-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['STEM', 'Plush', 'Action', 'Board Games'].map(cat => (
              <Link
                key={cat}
                to={`/catalog?category=${cat.toLowerCase().replace(' ', '-')}`}
                className="p-8 text-center glass-effect rounded-2xl hover:ring-2 hover:ring-toy-primary transition-all"
              >
                <h3 className="text-xl font-semibold">{cat}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}