import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, Clock, Truck, CheckCircle, LogIn } from 'lucide-react';
import { useAuthStore } from '../store';

const API = 'http://localhost:3001/api';

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: { product: { name: string; image: string }; quantity: number; price: number }[];
}

const statusConfig: Record<string, { color: string; icon: typeof Clock }> = {
  processing: { color: 'bg-toy-orange', icon: Clock },
  shipped: { color: 'bg-toy-blue', icon: Truck },
  delivered: { color: 'bg-toy-green', icon: CheckCircle },
};

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${API}/orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { 
        setOrders(data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, [user, token, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <LogIn size={48} className="mx-auto mb-4 text-cream-400" />
          <p className="text-cream-400 mb-4">Please login to view your profile</p>
          <Link to="/login" className="inline-block bg-toy-primary hover:bg-toy-primary-dark text-white px-6 py-3 rounded-xl font-semibold">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-charcoal-800 rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-bold mb-2">My Profile</h1>
          <p className="text-cream-400">{user.name}</p>
          <p className="text-cream-400">{user.email}</p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Order History</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-toy-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-cream-400">
            <Package size={48} className="mx-auto mb-4 opacity-50" />
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => {
              const config = statusConfig[order.status] || { color: 'bg-cream-400', icon: Clock };
              const Icon = config.icon;
              return (
                <div key={order.id} className="bg-charcoal-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-mono text-sm text-cream-400">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-cream-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.color} text-white text-sm`}>
                      <Icon size={14} />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-cream-400 text-sm">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-charcoal-700 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-gold-400">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}