import IconCardGrid from '@/components/shared/IconCardGrid';
import SplitSection from '@/components/shared/SplitSection';
import Leaderboard from '@/components/shared/Leaderboard';
import SectionTitle from '@/components/ui/SectionTitle';
import Img from '@/components/ui/Img';
import FinisherReceives from '@/components/why/FinisherReceives';
import PlantationPartners from '@/components/why/PlantationPartners';
import CollectiveImpact from '@/components/why/CollectiveImpact';
import RegisterBanner from '@/components/why/RegisterBanner';
import { greenChallenge, reasons, runForPlanet } from '@/data/why';
import { images } from '@/config/images';
import styles from './WhyParticipatePage.module.css';

export const metadata = { title: 'Why Participate' };

export default function WhyParticipatePage() {
  return (
    <div className={styles.page}>
      <Img src={images.why.hero} alt="Why participate? One runner, one tree, one better tomorrow." className={styles.hero} />
      <section className={`section section--white ${styles.reasons}`}>
        <div className="container">
          <SectionTitle>Top Reasons to Participate</SectionTitle>
          <IconCardGrid items={reasons} columns={6} highlightIndex={4} compact />
        </div>
      </section>
      <section className={`section ${styles.greenSection}`}>
        <div className={`container ${styles.greenGrid}`}>
          <article className="card">
            <SplitSection image={runForPlanet.image} imageAlt="A seedling growing in rich soil" imageHeight={180}>
              <h2 className="card__title">{runForPlanet.title}</h2>
              <ul className="stack" style={{ fontSize: 'var(--fs-sm)' }}>{runForPlanet.points.map((p) => <li key={p}>&#10003; {p}</li>)}</ul>
            </SplitSection>
          </article>
          <FinisherReceives />
        </div>
      </section>
      <section className={`section section--white ${styles.impactSection}`}>
        <div className={`container ${styles.impactGrid}`}>
          <PlantationPartners />
          <Leaderboard title={greenChallenge.title} columns={greenChallenge.columns} rows={greenChallenge.rows} />
          <CollectiveImpact />
        </div>
      </section>
      <RegisterBanner />
    </div>
  );
}
