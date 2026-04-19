import { Navbar } from './NavBar';
import { Footer } from './Footer';
import { RecentlySoldTicker } from './RecentlySoldTicker';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen bg-charcoal-900 text-cream-100 selection:bg-gold-500/30 selection:text-gold-300">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <RecentlySoldTicker />
      <Footer />
    </div>
  );
}
