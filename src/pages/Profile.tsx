import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { User, Package, Calendar, DollarSign, LogOut } from 'lucide-react';

export function Profile() {
  const { user, token, logout, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5001/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [isAuthenticated, token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-charcoal-800 border border-charcoal-700 p-8 rounded-xl text-center">
            <div className="w-24 h-24 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-500/20">
              <User className="w-12 h-12 text-gold-500" />
            </div>
            <h2 className="text-2xl font-bold text-cream-100 mb-1">{user.name}</h2>
            <p className="text-cream-500 text-sm mb-8">{user.email}</p>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 transition-colors py-2 border border-red-400/20 rounded-lg hover:bg-red-400/10"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold text-cream-100 mb-8 flex items-center gap-3">
            <Package className="text-gold-500" /> Order History
          </h1>

          {orders.length === 0 ? (
            <div className="bg-charcoal-800 border border-charcoal-700 p-12 rounded-xl text-center">
              <p className="text-cream-400">No orders found. Your collection journey starts here!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-charcoal-800 border border-charcoal-700 rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-charcoal-700 bg-charcoal-900/50 flex justify-between items-center">
                    <div className="flex gap-8">
                      <div>
                        <p className="text-xs uppercase text-cream-500 font-bold mb-1">Order ID</p>
                        <p className="text-cream-100">#ORD-{order.id}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase text-cream-500 font-bold mb-1">Date</p>
                        <p className="text-cream-100">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase text-cream-500 font-bold mb-1">Total</p>
                        <p className="text-gold-500 font-bold">${order.total.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold border border-green-500/20">
                      {order.status}
                    </span>
                  </div>
                  <div className="p-6">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4 mb-4 last:mb-0">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-grow">
                          <p className="text-cream-100 font-medium">{item.product.name}</p>
                          <p className="text-cream-500 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-cream-300">${item.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
