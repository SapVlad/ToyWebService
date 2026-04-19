import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { CreditCard, Lock, CheckCircle2 } from 'lucide-react';

export function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call to create order
      await axios.post('http://localhost:5001/api/orders', {
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: cartTotal
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-4xl font-bold text-cream-100 mb-4">Transaction Successful!</h2>
        <p className="text-cream-400 mb-10 max-w-md text-lg">Your order has been placed and is being prepared for secure transport. Welcome to the elite collector's circle.</p>
        <button 
          onClick={() => navigate('/profile')}
          className="bg-gold-600 hover:bg-gold-500 text-charcoal-900 font-bold px-10 py-4 rounded-xl transition-all"
        >
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-charcoal-800 border border-charcoal-700 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="text-gold-500" /> Payment Details
            </h2>
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-cream-500 mb-2 font-bold">Card Number</label>
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg px-4 py-3 text-cream-100 focus:border-gold-500 outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-500 mb-2 font-bold">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg px-4 py-3 text-cream-100 focus:border-gold-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-500 mb-2 font-bold">CVV</label>
                  <input 
                    type="text" 
                    placeholder="000"
                    className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg px-4 py-3 text-cream-100 focus:border-gold-500 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="pt-4">
                <button 
                  disabled={loading}
                  className="w-full bg-gold-600 hover:bg-gold-500 disabled:bg-gold-900 text-charcoal-900 font-bold py-4 rounded-xl transition-all"
                >
                  {loading ? 'Processing...' : `Pay $${cartTotal.toLocaleString()}`}
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center gap-2 text-cream-500 text-sm">
            <Lock className="w-4 h-4" /> SSL Encrypted Transaction
          </div>
        </div>

        <div className="bg-charcoal-800 border border-charcoal-700 p-6 rounded-xl h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span className="text-cream-300">{item.name} x{item.quantity}</span>
                <span className="text-gold-500">${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-charcoal-700 pt-4 flex justify-between font-bold text-lg">
            <span className="text-cream-100">Total</span>
            <span className="text-gold-400">${cartTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
