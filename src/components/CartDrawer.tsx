import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={closeCart} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-charcoal-800 animate-slide-in-right">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-charcoal-700">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingBag size={20} />
              Your Cart ({items.length})
            </h2>
            <button onClick={closeCart} className="text-cream-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {items.length === 0 ? (
              <div className="text-center text-cream-400 py-12">
                <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                <p>Your cart is empty</p>
                <Link to="/catalog" onClick={closeCart} className="text-toy-primary hover:underline mt-2 block">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.productId} className="flex gap-4 bg-charcoal-700/50 p-4 rounded-xl">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                      <p className="text-toy-accent font-semibold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 bg-charcoal-600 rounded hover:bg-charcoal-500"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 bg-charcoal-600 rounded hover:bg-charcoal-500"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="ml-auto text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-charcoal-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-cream-400">Total</span>
                <span className="text-2xl font-bold text-toy-accent">${getTotal().toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="block w-full bg-toy-primary hover:bg-toy-primary-dark text-white py-3 rounded-xl font-semibold text-center transition-all"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}