import HomeHero from '@/components/home/HomeHero';
import RouteSection from '@/components/home/RouteSection';
import PointsOfInterest from '@/components/home/PointsOfInterest';
import IconCardGrid from '@/components/shared/IconCardGrid';
import CtaStrip from '@/components/shared/CtaStrip';
import { infoCards } from '@/data/home';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <RouteSection />
      <PointsOfInterest />
      <section className="section">
        <div className="container"><IconCardGrid items={infoCards} columns={5} /></div>
      </section>
      <CtaStrip />
    </>
  );
}
