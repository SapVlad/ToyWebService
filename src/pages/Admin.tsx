import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, ShoppingBag, Plus, Trash2, Edit, Save, X, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Admin() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState<any>({
    name: '', series: '', year: '', price: '', image: '', condition: '', category: '', description: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (activeTab === 'products') {
        const res = await axios.get('http://localhost:5001/api/products');
        setProducts(res.data);
      } else {
        const res = await axios.get('http://localhost:5001/api/orders/all', config);
        setOrders(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('http://localhost:5001/api/products', newProduct, config);
      setIsAdding(false);
      setNewProduct({ name: '', series: '', year: '', price: '', image: '', condition: '', category: '', description: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:5001/api/products/${editingProduct.id}`, editingProduct, config);
      setEditingProduct(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5001/api/products/${id}`, config);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-serif text-cream-100">
          Admin <span className="text-gold-500">Dashboard</span>
        </h1>
        <div className="flex bg-charcoal-800 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'products' ? 'bg-gold-600 text-charcoal-900' : 'text-cream-400 hover:text-cream-100'}`}
          >
            <Package className="w-4 h-4 inline-block mr-2" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-gold-600 text-charcoal-900' : 'text-cream-400 hover:text-cream-100'}`}
          >
            <ShoppingBag className="w-4 h-4 inline-block mr-2" />
            Orders
          </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <div className="space-y-8">
          <div className="flex justify-end">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="bg-gold-600 hover:bg-gold-500 text-charcoal-900 px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
            >
              {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isAdding ? 'Cancel' : 'Add New Product'}
            </button>
          </div>

          {isAdding && (
            <form onSubmit={handleCreateProduct} className="bg-charcoal-800 p-8 rounded-xl border border-gold-500/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              <input type="text" placeholder="Series" value={newProduct.series} onChange={e => setNewProduct({...newProduct, series: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              <input type="text" placeholder="Year" value={newProduct.year} onChange={e => setNewProduct({...newProduct, year: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              <input type="number" step="0.01" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              <input type="text" placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              <input type="text" placeholder="Condition" value={newProduct.condition} onChange={e => setNewProduct({...newProduct, condition: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              <input type="text" placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100 col-span-2" required />
              <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100 col-span-full h-24" />
              <button type="submit" className="bg-gold-600 text-charcoal-900 py-3 rounded font-bold col-span-full hover:bg-gold-500 transition-colors">Create Product</button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-cream-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4">Specimen</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={product.image} className="w-12 h-12 rounded object-cover border border-white/10" />
                        <div>
                          <div className="text-cream-100 font-bold">{product.name}</div>
                          <div className="text-cream-400 text-xs">{product.series} • {product.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-cream-300">{product.category}</td>
                    <td className="px-6 py-4 text-gold-400 font-bold">${product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => setEditingProduct(product)} className="text-cream-400 hover:text-gold-500 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-cream-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-charcoal-800 border border-white/5 rounded-xl p-6 hover:border-gold-500/30 transition-all">
              <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-gold-500 font-bold font-serif">Order #{order.id}</span>
                    <span className="text-cream-500 text-xs px-2 py-0.5 bg-charcoal-900 rounded border border-white/5 uppercase tracking-tighter">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-cream-300 text-sm font-medium">{order.user.name} ({order.user.email})</p>
                </div>
                <div className="text-right">
                  <p className="text-gold-400 text-2xl font-bold">${order.total.toLocaleString()}</p>
                  <p className="text-cream-500 text-[10px] uppercase tracking-widest font-bold">Total Investment</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3 bg-charcoal-900/50 p-3 rounded-lg border border-white/5">
                    <img src={item.product.image} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="text-cream-100 text-xs font-bold line-clamp-1">{item.product.name}</p>
                      <p className="text-cream-400 text-[10px] uppercase">{item.quantity}x @ ${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-charcoal-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-charcoal-800 border border-gold-500/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif text-cream-100">Edit <span className="text-gold-500">Specimen</span></h2>
              <button onClick={() => setEditingProduct(null)}><X className="w-6 h-6 text-cream-400 hover:text-white" /></button>
            </div>
            <form onSubmit={handleUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold-500">Name</label>
                <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold-500">Series</label>
                <input type="text" value={editingProduct.series} onChange={e => setEditingProduct({...editingProduct, series: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold-500">Year</label>
                <input type="text" value={editingProduct.year} onChange={e => setEditingProduct({...editingProduct, year: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold-500">Price</label>
                <input type="number" step="0.01" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold-500">Category</label>
                <input type="text" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold-500">Condition</label>
                <input type="text" value={editingProduct.condition} onChange={e => setEditingProduct({...editingProduct, condition: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              </div>
              <div className="space-y-1 col-span-full">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold-500">Image URL</label>
                <input type="text" value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100" required />
              </div>
              <div className="space-y-1 col-span-full">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold-500">Description</label>
                <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3 rounded text-cream-100 h-32" />
              </div>
              <button type="submit" className="bg-gold-600 text-charcoal-900 py-4 rounded-xl font-bold col-span-full hover:bg-gold-500 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2">
                <Save className="w-5 h-5" /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
