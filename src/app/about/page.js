import PageHero from '@/components/shared/PageHero';
import StatsBand from '@/components/shared/StatsBand';
import IconCardGrid from '@/components/shared/IconCardGrid';
import PeopleRow from '@/components/shared/PeopleRow';
import CtaStrip from '@/components/shared/CtaStrip';
import SectionTitle from '@/components/ui/SectionTitle';
import AboutIntro from '@/components/about/AboutIntro';
import VisionMission from '@/components/about/VisionMission';
import ImpactSection from '@/components/about/ImpactSection';
import { aboutStats, organizers, whyThisMarathon } from '@/data/about';
import { images } from '@/config/images';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="World's First" highlight="Real Estate Marathon" subtitle="Running towards stronger communities" image={images.about.hero} />
      <AboutIntro />
      <VisionMission />
      <StatsBand items={aboutStats} />
      <section className="section section--white">
        <div className="container">
          <SectionTitle>Why This Marathon?</SectionTitle>
          <IconCardGrid items={whyThisMarathon} columns={5} />
        </div>
      </section>
      <ImpactSection />
      <section className="section section--white">
        <div className="container">
          <SectionTitle>{organizers.title}</SectionTitle>
          <PeopleRow people={organizers.people} />
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
