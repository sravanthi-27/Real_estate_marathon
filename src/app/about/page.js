import Img from '@/components/ui/Img';
import StatsBand from '@/components/shared/StatsBand';
import IconCardGrid from '@/components/shared/IconCardGrid';
import CtaStrip from '@/components/shared/CtaStrip';
import SectionTitle from '@/components/ui/SectionTitle';
import AboutIntro from '@/components/about/AboutIntro';
import VisionMission from '@/components/about/VisionMission';
import ImpactSection from '@/components/about/ImpactSection';
import AboutOrganizers from '@/components/about/AboutOrganizers';
import { aboutStats, whyThisMarathon } from '@/data/about';
import { images } from '@/config/images';
import styles from './AboutPage.module.css';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <>
      <section aria-label="About the World's First Real Estate Marathon">
        <Img src={images.about.hero} alt="About the World's First Real Estate Marathon in Hyderabad" className={styles.heroImage} />
      </section>
      <AboutIntro />
      <VisionMission />
      <StatsBand items={aboutStats} />
      <section className={`section section--white ${styles.why}`}>
        <div className="container">
          <SectionTitle>Why This Marathon?</SectionTitle>
          <IconCardGrid items={whyThisMarathon} columns={5} compact />
        </div>
      </section>
      <ImpactSection />
      <AboutOrganizers />
      <CtaStrip />
    </>
  );
}
