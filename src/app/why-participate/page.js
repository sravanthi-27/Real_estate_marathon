import IconCardGrid from '@/components/shared/IconCardGrid';
import Leaderboard from '@/components/shared/Leaderboard';
import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
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
      <Img src={images.why.hero} alt="Why participate? One runner, one tree, one better tomorrow." className={styles.hero} loading="eager" />
      <section className={`section section--white ${styles.reasons}`}>
        <div className={`container ${styles.reasonContainer}`}>
          <div className={styles.reasonHeading}>
            <span aria-hidden="true" />
            <h2>Top Reasons to Participate</h2>
            <span aria-hidden="true" />
          </div>
          <IconCardGrid items={reasons} columns={6} highlightIndex={4} className={styles.reasonCards} />
        </div>
      </section>
      <section className={`section ${styles.greenSection}`}>
        <div className={`container ${styles.greenGrid}`}>
          <article className={styles.planetCard}>
            <Img src={runForPlanet.image} alt="A seedling growing in rich soil" className={styles.plantImage} />
            <h2>{runForPlanet.title}</h2>
            <p>{runForPlanet.description}</p>
            <ul>
              {runForPlanet.points.map((point) => (
                <li key={point}><Icon name="check" size={11} />{point}</li>
              ))}
            </ul>
          </article>
          <FinisherReceives />
        </div>
      </section>
      <section className={`section section--white ${styles.impactSection}`}>
        <div className={`container ${styles.impactGrid}`}>
          <PlantationPartners />
          <Leaderboard title={greenChallenge.title} description={greenChallenge.description} columns={greenChallenge.columns} rows={greenChallenge.rows} />
          <CollectiveImpact />
        </div>
      </section>
      <RegisterBanner />
    </div>
  );
}
