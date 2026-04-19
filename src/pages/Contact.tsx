import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
          Contact the Vault
        </h1>
        <p className="text-cream-400 text-xl max-w-2xl mx-auto">
          Need a custom valuation or looking for a specific holy grail? Our agents are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-charcoal-800 p-10 rounded-2xl border border-charcoal-700">
          <h2 className="text-2xl font-bold text-cream-100 mb-8">Send a Secure Inquiry</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-cream-500 mb-2">Name</label>
                <input type="text" className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg p-3 text-cream-100 outline-none focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-sm text-cream-500 mb-2">Email</label>
                <input type="email" className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg p-3 text-cream-100 outline-none focus:border-gold-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-cream-500 mb-2">Subject</label>
              <input type="text" className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg p-3 text-cream-100 outline-none focus:border-gold-500" />
            </div>
            <div>
              <label className="block text-sm text-cream-500 mb-2">Message</label>
              <textarea rows={6} className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg p-3 text-cream-100 outline-none focus:border-gold-500" placeholder="Describe your request..."></textarea>
            </div>
            <button type="button" className="w-full bg-gold-600 hover:bg-gold-500 text-charcoal-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8 py-4">
          <div className="flex gap-6">
            <div className="p-4 bg-charcoal-800 rounded-xl h-fit border border-charcoal-700">
              <Mail className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-cream-100 mb-1">Email Us</h3>
              <p className="text-cream-400">concierge@archive.toys</p>
              <p className="text-cream-500 text-sm mt-2">24/7 dedicated collector support</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="p-4 bg-charcoal-800 rounded-xl h-fit border border-charcoal-700">
              <Phone className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-cream-100 mb-1">Private Sales</h3>
              <p className="text-cream-400">+1 (888) LEGENDS</p>
              <p className="text-cream-500 text-sm mt-2">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="p-4 bg-charcoal-800 rounded-xl h-fit border border-charcoal-700">
              <MapPin className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-cream-100 mb-1">Showroom</h3>
              <p className="text-cream-400">123 Collector Lane</p>
              <p className="text-cream-400">New York, NY 10001</p>
              <p className="text-cream-500 text-sm mt-2">By appointment only.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
