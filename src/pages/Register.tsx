import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', { name, email, password });
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-charcoal-800 border border-charcoal-700 p-8 rounded-lg shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-gold-500/10 rounded-full border border-gold-500/20">
            <UserPlus className="w-8 h-8 text-gold-500" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
          Join the Shop
        </h2>
        {error && <p className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-6 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-cream-300 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cream-300 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cream-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-500 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gold-600 hover:bg-gold-500 text-charcoal-900 font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02]"
          >
            Create Account
          </button>
        </form>
        <p className="mt-8 text-center text-cream-400">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-500 hover:text-gold-400 font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
