import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { CategoryNav } from './components/CategoryNav';
import { GrailOfTheWeek } from './components/GrailOfTheWeek';
import { FeaturedProducts } from './components/FeaturedProducts';
import { RecentlySoldTicker } from './components/RecentlySoldTicker';
import { Footer } from './components/Footer';
export function App() {
  return <div className="min-h-screen bg-charcoal-900 text-cream-100 selection:bg-gold-500/30 selection:text-gold-300">
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <CategoryNav />
        <GrailOfTheWeek />
        <FeaturedProducts />
      </main>
      <RecentlySoldTicker />
      <Footer />
    </div>;
}