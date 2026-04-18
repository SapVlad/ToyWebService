import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store';

const API = 'http://localhost:3001/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ageRange: string;
  category: { name: string; slug: string };
}

const ageRanges = ['all', '0-3', '3-7', '4-9', '6-10', '6-12', '8+', '10+', '14+'];
const categories = ['all', 'stem', 'plush', 'action', 'board-games'];

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [ageRange, setAgeRange] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const addItem = useCartStore(s => s.addItem);
  const openCart = useCartStore(s => s.openCart);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search && search !== 'all') params.set('search', search);
    if (category && category !== 'all') params.set('category', category);
    if (ageRange && ageRange !== 'all') params.set('ageRange', ageRange);
    
    fetch(`${API}/products?${params}`)
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, [search, category, ageRange]);

  const handleAddToCart = (product: Product) => {
    addItem({ productId: product.id, name: product.name, price: product.price, image: product.image });
    openCart();
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Toy Catalog</h1>
        
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-400" size={20} />
            <input
              type="text"
              placeholder="Search toys..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-cream-100 placeholder-cream-400 focus:outline-none focus:ring-2 focus:ring-toy-primary"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-lg text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'all' ? 'All Categories' : c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
            
            <select
              value={ageRange}
              onChange={e => setAgeRange(e.target.value)}
              className="px-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-lg text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
            >
              {ageRanges.map(a => (
                <option key={a} value={a}>{a === 'all' ? 'All Ages' : `${a} years`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-toy-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-cream-400">
            <p>No toys found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-charcoal-800 rounded-2xl overflow-hidden hover:ring-2 hover:ring-toy-primary transition-all group">
                <div className="aspect-square overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-toy-secondary text-sm">{product.category.name}</span>
                    <span className="text-cream-400 text-sm">{product.ageRange} years</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-toy-accent">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-toy-primary hover:bg-toy-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1"
                    >
                      <ShoppingCart size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setSelectedProduct(null)}>
          <div className="bg-charcoal-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-cream-400 hover:text-white">
              <X size={24} />
            </button>
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-toy-secondary text-sm">{selectedProduct.category.name}</span>
                <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                <p className="text-cream-400 mb-4">{selectedProduct.description}</p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl font-bold text-toy-accent">${selectedProduct.price.toFixed(2)}</span>
                  <span className="text-cream-400">Ages: {selectedProduct.ageRange}</span>
                </div>
                <button
                  onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full bg-toy-primary hover:bg-toy-primary-dark text-white py-3 rounded-xl font-semibold transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}