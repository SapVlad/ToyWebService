import React from 'react';
import { ShieldCheck, Award, Users, Globe } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
          The Archive Story
        </h1>
        <p className="text-cream-400 text-xl max-w-2xl mx-auto">
          Preserving history, one legend at a time. We are the world's premier destination for high-end vintage toy collectibles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold text-cream-100 mb-6">Our Mission</h2>
          <p className="text-cream-300 text-lg leading-relaxed mb-4">
            Founded by a group of passionate collectors in 2010, Archive was born out of a desire to create a safe, transparent, and premium marketplace for the world's rarest toys.
          </p>
          <p className="text-cream-300 text-lg leading-relaxed">
            We don't just sell toys; we curate pieces of cultural history. Every item in our vault undergoes a rigorous authentication process to ensure that our collectors receive only the finest specimens.
          </p>
        </div>
        <div className="bg-charcoal-800 p-2 rounded-2xl border border-charcoal-700">
          <img 
            src="https://images.unsplash.com/photo-1558060370-d644479cb975?q=80&w=1000&auto=format&fit=crop" 
            alt="Vintage Toys" 
            className="rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: ShieldCheck, title: "Authentication", desc: "Expert grading and verification for every piece." },
          { icon: Award, title: "Quality", desc: "Only the highest condition toys make it to our catalog." },
          { icon: Users, title: "Community", desc: "A global network of elite toy collectors." },
          { icon: Globe, title: "Global Reach", desc: "Secure international shipping to 150+ countries." }
        ].map((feature, i) => (
          <div key={i} className="bg-charcoal-800 border border-charcoal-700 p-8 rounded-xl text-center">
            <feature.icon className="w-10 h-10 text-gold-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-cream-100 mb-2">{feature.title}</h3>
            <p className="text-cream-400 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
