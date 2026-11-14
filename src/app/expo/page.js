import SplitSection from '@/components/shared/SplitSection';
import IconCardGrid from '@/components/shared/IconCardGrid';
import InfoCard from '@/components/shared/InfoCard';
import CtaStrip from '@/components/shared/CtaStrip';
import EnquiryForm from '@/components/shared/EnquiryForm';
import SectionTitle from '@/components/ui/SectionTitle';
import Img from '@/components/ui/Img';
import ExpoZones from '@/components/expo/ExpoZones';
import { aboutExpo, expectColumns, expoHighlights, stallFormFields, whyExhibit } from '@/data/expo';
import { images } from '@/config/images';
import styles from './ExpoPage.module.css';

export const metadata = { title: 'Real Estate Expo' };

export default function ExpoPage() {
  return (
    <>
      <Img src={images.expo.hero} alt="Real Estate Expo 2026 — Connect, Collaborate, Grow" className={styles.hero} />
      <section className={`section section--white ${styles.about}`}>
        <div className="container">
          <SectionTitle sub={aboutExpo.text}>{aboutExpo.title}</SectionTitle>
          <IconCardGrid items={aboutExpo.features} columns={6} compact />
        </div>
      </section>
      <section className={styles.showcase}>
        <div className={`container ${styles.showcaseGrid}`}>
          <article className={`card ${styles.whyCard}`}>
            <SplitSection image={whyExhibit.image} imageAlt="Busy real estate innovation exhibition booth" imageHeight={150}>
              <h2 className="card__title">{whyExhibit.title}</h2>
              <ul className="stack" style={{ fontSize: 'var(--fs-sm)' }}>{whyExhibit.points.map((p) => <li key={p}>&#10003; {p}</li>)}</ul>
            </SplitSection>
          </article>
          <article className={`card ${styles.highlights}`}>
            <h2 className="card__title">{expoHighlights.title}</h2>
            <IconCardGrid items={expoHighlights.items} columns={3} compact />
          </article>
        </div>
      </section>
      <ExpoZones />
      <section className="section section--white">
        <div className={`container ${styles.audienceGrid}`}>
          {expectColumns.map((c) => <InfoCard key={c.title} title={c.title} items={c.items} />)}
          <article className={styles.bookCard}>
            <h2>Be a part of<br />Hyderabad&apos;s biggest<br />real estate expo</h2>
            <p>Meet buyers, builders and industry leaders.</p>
            <a href="#stall-form">Book your stall <span aria-hidden="true">→</span></a>
          </article>
        </div>
        <div className={`container ${styles.gallery}`}>
          {images.expo.gallery.map((src, i) => <Img key={src} src={src} alt={`Real estate expo event ${i + 1}`} className={styles.galleryImage} />)}
        </div>
      </section>
      <section className={styles.formSection}>
        <div className={`container ${styles.formContainer}`}>
          <EnquiryForm id="stall-form" type="expo_stall" title="Be a part of Hyderabad's biggest real estate expo" intro="Book your stall and we will confirm availability and pricing." fields={stallFormFields} submitLabel="Book my stall" successMessage="Thank you! Our expo team will contact you shortly." />
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
