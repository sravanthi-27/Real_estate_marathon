import HomeHero from '@/components/home/HomeHero';
import RouteSection from '@/components/home/RouteSection';
import CommunitySection from '@/components/home/CommunitySection';
import HomePartners from '@/components/home/HomePartners';
import HomePromoGrid from '@/components/home/HomePromoGrid';
import HomeOrganizers from '@/components/home/HomeOrganizers';
import CtaStrip from '@/components/shared/CtaStrip';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <RouteSection />
      <CommunitySection />
      <HomePartners />
      <HomePromoGrid />
      <HomeOrganizers />
      <CtaStrip />
    </>
  );
}
