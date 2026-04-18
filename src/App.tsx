import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { CategoryNav } from './components/CategoryNav';
import { GrailOfTheWeek } from './components/GrailOfTheWeek';
import { FeaturedProducts } from './components/FeaturedProducts';
import { RecentlySoldTicker } from './components/RecentlySoldTicker';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CatalogPage } from './pages/CatalogPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage, RegisterPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { useAuthStore } from './store';

function HomePage() {
  return (
    <div className="min-h-screen bg-charcoal-900 text-cream-100 selection:bg-gold-500/30 selection:text-gold-300">
      <main>
        <HeroSection />
        <TrustBar />
        <CategoryNav />
        <GrailOfTheWeek />
        <FeaturedProducts />
      </main>
      <RecentlySoldTicker />
    </div>
  );
}

export function App() {
  const checkAuth = useAuthStore(s => s.checkAuth);
  
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-charcoal-900 text-cream-100 selection:bg-gold-500/30 selection:text-gold-300">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </BrowserRouter>
  );
}