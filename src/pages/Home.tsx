import { HeroSection } from '../components/HeroSection';
import { TrustBar } from '../components/TrustBar';
import { CategoryNav } from '../components/CategoryNav';
import { GrailOfTheWeek } from '../components/GrailOfTheWeek';
import { FeaturedProducts } from '../components/FeaturedProducts';

export function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryNav />
      <GrailOfTheWeek />
      <FeaturedProducts />
    </>
  );
}
