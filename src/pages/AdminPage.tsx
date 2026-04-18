import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Package, LogIn, X } from 'lucide-react';
import { useAuthStore } from '../store';

const API = 'http://localhost:3001/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ageRange: string;
  stock: number;
  category: { id: string; name: string };
}

interface Category {
  id: string;
  name: string;
}

export function AdminPage() {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', ageRange: '', stock: '', categoryId: '' });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      setLoading(false);
      return;
    }
    if (!token) {
      setLoading(false);
      return;
    }
    Promise.all([
      fetch(`${API}/admin/products`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch(`${API}/categories`).then(r => r.json())
    ]).then(([productsData, categoriesData]) => {
      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user, token]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <Package size={48} className="mx-auto mb-4 text-cream-400" />
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-cream-400 mb-4">This page is for admins only.</p>
          <Link to="/login" className="inline-block bg-toy-primary hover:bg-toy-primary-dark text-white px-6 py-3 rounded-xl font-semibold">
            Login as Admin
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const url = editing ? `${API}/admin/products/${editing.id}` : `${API}/admin/products`;
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock), categoryId: form.categoryId || categories[0]?.id })
    });
    if (res.ok) {
      const updated = await fetch(`${API}/admin/products`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
      setProducts(updated);
      setShowForm(false);
      setEditing(null);
      setForm({ name: '', description: '', price: '', image: '', ageRange: '', stock: '', categoryId: '' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm('Delete this product?')) return;
    await fetch(`${API}/admin/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setProducts(products.filter(p => p.id !== id));
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({ name: product.name, description: product.description, price: product.price.toString(), image: product.image, ageRange: product.ageRange, stock: product.stock.toString(), categoryId: product.category.id });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', description: '', price: '', image: '', ageRange: '', stock: '', categoryId: categories[0]?.id || '' }); }} className="flex items-center gap-2 bg-toy-primary hover:bg-toy-primary-dark text-white px-4 py-2 rounded-xl">
            <Plus size={18} /> Add Product
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-toy-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="bg-charcoal-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-charcoal-700">
                <tr>
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Stock</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-t border-charcoal-700">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4">{product.category.name}</td>
                    <td className="p-4">${product.price.toFixed(2)}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openEdit(product)} className="text-toy-blue hover:text-toy-blue/80 mr-3">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-charcoal-800 rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editing ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-cream-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-cream-400 mb-1">Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-2 bg-charcoal-700 border border-charcoal-600 rounded-lg text-cream-100" />
              </div>
              <div>
                <label className="block text-sm text-cream-400 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={3} className="w-full px-4 py-2 bg-charcoal-700 border border-charcoal-600 rounded-lg text-cream-100" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-cream-400 mb-1">Price</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required className="w-full px-4 py-2 bg-charcoal-700 border border-charcoal-600 rounded-lg text-cream-100" />
                </div>
                <div>
                  <label className="block text-sm text-cream-400 mb-1">Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required className="w-full px-4 py-2 bg-charcoal-700 border border-charcoal-600 rounded-lg text-cream-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-cream-400 mb-1">Age Range</label>
                  <input type="text" value={form.ageRange} onChange={e => setForm({ ...form, ageRange: e.target.value })} required placeholder="e.g. 6-12" className="w-full px-4 py-2 bg-charcoal-700 border border-charcoal-600 rounded-lg text-cream-100" />
                </div>
                <div>
                  <label className="block text-sm text-cream-400 mb-1">Category</label>
                  <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} className="w-full px-4 py-2 bg-charcoal-700 border border-charcoal-600 rounded-lg text-cream-100">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-cream-400 mb-1">Image URL</label>
                <input type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} required className="w-full px-4 py-2 bg-charcoal-700 border border-charcoal-600 rounded-lg text-cream-100" />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="flex-1 bg-charcoal-700 hover:bg-charcoal-600 text-white py-2 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 bg-toy-primary hover:bg-toy-primary-dark text-white py-2 rounded-lg">{editing ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}