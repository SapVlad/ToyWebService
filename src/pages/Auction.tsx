import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ArrowRight, Gavel, Clock, DollarSign, Lock } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface AuctionData {
  id: number;
  productId: number;
  startPrice: number;
  currentBid: number | null;
  endTime: string;
  isActive: boolean;
  product: {
    name: string;
    series: string;
    year: string;
    price: number;
    image: string;
    condition: string;
    category: string;
    description: string | null;
  };
  bids: Array<{
    id: number;
    amount: number;
    createdAt: string;
    user: { name: string };
  }>;
}

export function Auction() {
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const [auction, setAuction] = useState<AuctionData | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidPlaced, setBidPlaced] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/api/auctions/current')
      .then(res => {
        setAuction(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleBid = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      await axios.post(
        `http://localhost:5001/api/auctions/${auction!.id}/bid`,
        { amount: parseInt(bidAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const res = await axios.get('http://localhost:5001/api/auctions/current');
      setAuction(res.data);
      
      setBidPlaced(true);
      setBidAmount('');
      setError('');
      setTimeout(() => setBidPlaced(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to place bid');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-gold-500">Loading auction...</div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-cream-400 text-xl">No active auctions at the moment.</p>
      </div>
    );
  }

  const currentBid = auction.currentBid || auction.startPrice;
  const minBid = currentBid + 1000;
  const endDate = new Date(auction.endTime);
  const now = new Date();
  const timeLeft = endDate.getTime() - now.getTime();
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {!isAuthenticated && (
        <div className="mb-8 p-6 bg-charcoal-800 rounded-2xl border border-gold-500/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Lock className="w-6 h-6 text-gold-500" />
            <div>
              <h3 className="text-cream-100 font-bold">Members Only Auction</h3>
              <p className="text-cream-400 text-sm">Sign in to place bids on exclusive prototypes</p>
            </div>
          </div>
          <Link to="/login" className="px-6 py-3 bg-gold-600 text-charcoal-900 font-bold rounded-lg hover:bg-gold-500 transition-colors">
            Sign In to Bid
          </Link>
        </div>
      )}

      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-600/20 border border-gold-500/30 rounded-full text-gold-500 text-sm tracking-widest uppercase mb-4">
          <Gavel className="w-4 h-4" /> Live Auction
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
          Featured Auction
        </h1>
        <p className="text-cream-400 text-lg max-w-2xl mx-auto">
          Place your bid on this exclusive holy grail. Reserve price not yet met.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative">
          <div className="absolute top-4 left-4 z-10 bg-charcoal-900/90 backdrop-blur border border-gold-500/30 px-4 py-2">
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">
              {auction.product.condition}
            </span>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-charcoal-700">
            <img
              src={auction.product.image}
              alt={auction.product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
              <span className="text-gold-500 text-sm font-medium tracking-wide">
                {auction.product.condition}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-cream-100 leading-tight mb-4">
              {auction.product.name}
            </h2>
            <p className="text-cream-300 text-lg font-light leading-relaxed">
              {auction.product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/10">
            <div>
              <span className="block text-cream-400 text-xs uppercase tracking-wider mb-1">Series</span>
              <span className="text-cream-100 font-serif">{auction.product.series}</span>
            </div>
            <div>
              <span className="block text-cream-400 text-xs uppercase tracking-wider mb-1">Year</span>
              <span className="text-cream-100 font-serif">{auction.product.year}</span>
            </div>
            <div>
              <span className="block text-cream-400 text-xs uppercase tracking-wider mb-1">Category</span>
              <span className="text-cream-100 font-serif">{auction.product.category}</span>
            </div>
            <div>
              <span className="block text-cream-400 text-xs uppercase tracking-wider mb-1">Starting Price</span>
              <span className="text-cream-100 font-serif">${auction.startPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-charcoal-800 rounded-2xl p-6 border border-charcoal-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="block text-cream-400 text-sm mb-1">Current Bid</span>
                <span className="text-4xl font-serif text-gold-400">
                  ${currentBid.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-cream-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{days}d {hours}h left</span>
              </div>
            </div>

            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream-400" />
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`Enter $${minBid}+`}
                      className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg py-4 pl-10 pr-4 text-cream-100 outline-none focus:border-gold-500"
                    />
                  </div>
                  <button
                    onClick={handleBid}
                    disabled={!bidAmount}
                    className="px-8 py-4 bg-gold-600 text-charcoal-900 font-bold rounded-lg hover:bg-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Place Bid
                  </button>
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                {bidPlaced && (
                  <p className="text-green-400 text-sm">Bid placed successfully!</p>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-cream-400 mb-4">Sign in to place your bid</p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold-600 text-charcoal-900 font-bold rounded-lg hover:bg-gold-500 transition-colors"
                >
                  Sign In <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          <div className="flex gap-4 text-sm text-cream-500">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Auto-extend 5min
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4" /> Verified authentic
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}