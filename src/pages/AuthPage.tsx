import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useAuthStore } from '../store';

const API = 'http://localhost:3001/api';

export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore(s => s.setAuth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAuth(data.user, data.token);
        navigate('/');
      }
    } catch (err) {
      setError('Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-charcoal-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back!</h1>
          <p className="text-cream-400 text-center mb-8">Sign in to your account</p>
          
          {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-xl mb-4 text-center">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-cream-400 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-400" size={18} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-charcoal-700 border border-charcoal-600 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-cream-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-400" size={18} />
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-charcoal-700 border border-charcoal-600 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-toy-primary hover:bg-toy-primary-dark text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <p className="text-center mt-6 text-cream-400">
            Don't have an account? <Link to="/register" className="text-toy-primary hover:underline">Register</Link>
          </p>
          <p className="text-center mt-2 text-cream-400 text-sm">
            Or <Link to="/checkout" className="text-toy-secondary hover:underline">continue as Guest</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore(s => s.setAuth);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAuth(data.user, data.token);
        navigate('/');
      }
    } catch (err) {
      setError('Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-charcoal-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
          <p className="text-cream-400 text-center mb-8">Join Toy World today!</p>
          
          {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-xl mb-4 text-center">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-cream-400 mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-400" size={18} />
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-charcoal-700 border border-charcoal-600 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-cream-400 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-400" size={18} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-charcoal-700 border border-charcoal-600 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-cream-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-400" size={18} />
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 bg-charcoal-700 border border-charcoal-600 rounded-xl text-cream-100 focus:outline-none focus:ring-2 focus:ring-toy-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-toy-primary hover:bg-toy-primary-dark text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50">
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>
          
          <p className="text-center mt-6 text-cream-400">
            Already have an account? <Link to="/login" className="text-toy-primary hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}