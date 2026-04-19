import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="p-6 bg-charcoal-800 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-gold-500/50" />
        </div>
        <h2 className="text-3xl font-bold text-cream-100 mb-4">Your vault is empty</h2>
        <p className="text-cream-400 mb-8 max-w-md">Looks like you haven't added any legendary collectibles to your cart yet. Start building your collection today!</p>
        <Link to="/catalog" className="bg-gold-600 hover:bg-gold-500 text-charcoal-900 font-bold px-8 py-3 rounded-lg transition-colors">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
        Your Selection
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-6 bg-charcoal-800 border border-charcoal-700 p-6 rounded-xl">
              <div className="w-24 h-24 bg-charcoal-900 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-cream-100">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)} className="text-cream-500 hover:text-red-400 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gold-500 font-medium mb-4">${item.price.toLocaleString()}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-charcoal-900 border border-charcoal-700 rounded-lg px-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-cream-400 hover:text-gold-500">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-cream-100">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-cream-400 hover:text-gold-500">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-charcoal-800 border border-charcoal-700 p-8 rounded-xl h-fit sticky top-24">
          <h2 className="text-2xl font-bold text-cream-100 mb-6">Order Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-cream-400">
              <span>Subtotal</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-cream-400">
              <span>Shipping</span>
              <span className="text-gold-500">Calculated at checkout</span>
            </div>
            <div className="border-t border-charcoal-700 pt-4 flex justify-between text-xl font-bold text-cream-100">
              <span>Total</span>
              <span className="text-gold-400">${cartTotal.toLocaleString()}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-gold-600 hover:bg-gold-500 text-charcoal-900 font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02]"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center text-cream-500 text-sm mt-6 flex items-center justify-center gap-2">
            Secure checkout powered by ToyPay™
          </p>
        </div>
      </div>
    </div>
  );
}
