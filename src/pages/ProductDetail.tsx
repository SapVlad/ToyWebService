import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5001/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/catalog" className="flex items-center text-gold-500 hover:text-gold-400 mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-charcoal-800 border border-charcoal-700 rounded-2xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col">
          <p className="text-gold-500 font-medium mb-2 uppercase tracking-widest">{product.series}</p>
          <h1 className="text-5xl font-bold text-cream-100 mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gold-400">${product.price.toLocaleString()}</span>
            <span className="px-3 py-1 bg-charcoal-800 text-cream-300 rounded border border-charcoal-700">
              Condition: {product.condition}
            </span>
            <span className="text-cream-400">Year: {product.year}</span>
          </div>

          <p className="text-cream-300 text-lg leading-relaxed mb-8">
            {product.description || "No description available for this rare collectible."}
          </p>

          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-gold-600 hover:bg-gold-500 text-charcoal-900 font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] mb-12"
          >
            <ShoppingCart className="w-6 h-6" />
            Add to Collection
          </button>

          <div className="grid grid-cols-3 gap-4 border-t border-charcoal-700 pt-8">
            <div className="text-center">
              <ShieldCheck className="w-8 h-8 text-gold-500 mx-auto mb-2" />
              <p className="text-xs text-cream-400 uppercase tracking-tighter">Guaranteed Authentic</p>
            </div>
            <div className="text-center">
              <Truck className="w-8 h-8 text-gold-500 mx-auto mb-2" />
              <p className="text-xs text-cream-400 uppercase tracking-tighter">Secure Shipping</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-8 h-8 text-gold-500 mx-auto mb-2" />
              <p className="text-xs text-cream-400 uppercase tracking-tighter">30-Day Returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
