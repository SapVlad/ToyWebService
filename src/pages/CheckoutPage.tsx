import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, CheckCircle, Package } from 'lucide-react';
import { useCartStore, useAuthStore } from '../store';

const API = 'http://localhost:3001/api';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { user, token } = useAuthStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [shipping, setShipping] = useState({ name: '', address: '', city: '', zip: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvv: '', name: '' });
  const [guestEmail, setGuestEmail] = useState('');

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
          shipping,
          guestEmail: user ? null : guestEmail
        })
      });
      const data = await res.json();
      if (data.id) {
        setOrderId(data.id);
        clearCart();
        setStep(3);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-cream-400 mb-4">Your cart is empty</p>
          <Link to="/catalog" className="text-toy-primary hover:underline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-toy-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-toy-green" size={40} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
          <p className="text-cream-400 mb-2">Thank you for your purchase!</p>
          <p className="text-cream-300 mb-6">Order ID: <span className="font-mono">{orderId.slice(0, 8)}</span></p>
          <Link to={user ? '/profile' : '/'} className="inline-block bg-toy-primary hover:bg-toy-primary-dark text-white px-6 py-3 rounded-xl font-semibold">
            {user ? 'View Orders' : 'Continue Shopping'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/catalog" className="flex items-center gap-2 text-cream-400 hover:text-white mb-8">
          <ChevronLeft size={20} /> Continue Shopping
        </Link>

        {/* Progress */}
        <div className="flex items-center justify-center mb-12">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-toy-primary' : 'text-cream-400'}`}>
            <div className="w-8 h-8 rounded-full bg-toy-primary flex items-center justify-center text-sm font-bold">1</div>
            <span>Shipping</span>
          </div>
          <div className="w-16 h-0.5 bg-charcoal-700 mx-4" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-toy-primary' : 'text-cream-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-toy-primary' : 'bg-charcoal-700'}`}>2</div>
            <span>Payment</span>
          </div>
          <div className="w-16 h-0.5 bg-charcoal-700 mx-4" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-toy-primary' : 'text-cream-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-toy-primary' : 'bg-charcoal-700'}`}>3</div>
            <span>Done</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Package size={24} /> Shipping Information
                </h2>
                {!user && (
                  <div className="mb-6 p-4 bg-charcoal-700/50 rounded-xl">
                    <label className="block text-sm text-cream-400 mb-2">Email (for guest checkout)</label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={e => setGuestEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm text-cream-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={shipping.name}
                    onChange={e => setShipping({ ...shipping, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-cream-400 mb-2">Address</label>
                  <input
                    type="text"
                    value={shipping.address}
                    onChange={e => setShipping({ ...shipping, address: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-cream-400 mb-2">City</label>
                    <input
                      type="text"
                      value={shipping.city}
                      onChange={e => setShipping({ ...shipping, city: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-cream-400 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={shipping.zip}
                      onChange={e => setShipping({ ...shipping, zip: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-toy-primary hover:bg-toy-primary-dark text-white py-4 rounded-xl font-semibold transition-all">
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard size={24} /> Payment Details
                </h2>
                <p className="text-cream-400 text-sm mb-4">This is a mock checkout - no real payment will be processed.</p>
                <div>
                  <label className="block text-sm text-cream-400 mb-2">Card Number</label>
                  <input
                    type="text"
                    value={payment.cardNumber}
                    onChange={e => setPayment({ ...payment, cardNumber: e.target.value })}
                    required
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-cream-400 mb-2">Expiry</label>
                    <input
                      type="text"
                      value={payment.expiry}
                      onChange={e => setPayment({ ...payment, expiry: e.target.value })}
                      required
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-cream-400 mb-2">CVV</label>
                    <input
                      type="text"
                      value={payment.cvv}
                      onChange={e => setPayment({ ...payment, cvv: e.target.value })}
                      required
                      placeholder="123"
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-cream-400 mb-2">Name on Card</label>
                  <input
                    type="text"
                    value={payment.name}
                    onChange={e => setPayment({ ...payment, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                  />
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 bg-charcoal-700 hover:bg-charcoal-600 text-white py-4 rounded-xl font-semibold transition-all">
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="flex-1 bg-toy-primary hover:bg-toy-primary-dark text-white py-4 rounded-xl font-semibold transition-all disabled:opacity-50">
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-charcoal-800 rounded-2xl p-6 h-fit">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              {items.map(item => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="text-cream-400">{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-charcoal-700 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-toy-accent">${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}