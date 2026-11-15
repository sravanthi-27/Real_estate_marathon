import SplitSection from '@/components/shared/SplitSection';
import IconCardGrid from '@/components/shared/IconCardGrid';
import CtaStrip from '@/components/shared/CtaStrip';
import Icon from '@/components/ui/Icon';
import SectionTitle from '@/components/ui/SectionTitle';
import Img from '@/components/ui/Img';
import ExpoZones from '@/components/expo/ExpoZones';
import { aboutExpo, expectColumns, expoHighlights, whyExhibit } from '@/data/expo';
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
            <SplitSection image={whyExhibit.image} imageAlt="Busy real estate innovation exhibition booth" imageHeight={174} reverse>
              <h2 className="card__title">{whyExhibit.title}</h2>
              <ul className={styles.exhibitList}>
                {whyExhibit.points.map((point) => (
                  <li key={point}>
                    <span className={styles.exhibitCheck}><Icon name="check" size={8} /></span>
                    {point}
                  </li>
                ))}
              </ul>
            </SplitSection>
          </article>
          <article className={`card ${styles.highlights}`}>
            <h2 className="card__title">{expoHighlights.title}</h2>
            <IconCardGrid items={expoHighlights.items} columns={3} compact />
          </article>
        </div>
      </section>
      <ExpoZones />
      <section className={styles.informationSection}>
        <div className={`container ${styles.informationGrid}`}>
          {expectColumns.map((column) => (
            <article key={column.title} className={styles.infoCard}>
              <h2>{column.title}</h2>
              <span className={styles.infoDivider} aria-hidden="true" />
              <ul>
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Icon name={item.icon} size={13} />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <article className={styles.bookCard}>
            <h2>Be a part of<br />Hyderabad&apos;s biggest<br />real estate expo</h2>
            <p>Showcase. Connect. Grow.</p>
            <a href="/contact">Book your stall now</a>
            <span>Limited Stalls Available!</span>
          </article>
        </div>
      </section>
      <section className={`section section--white ${styles.gallerySection}`}>
        <div className={`container ${styles.gallery}`}>
          {images.expo.gallery.map((src) => (
            <figure className={styles.galleryCard} key={src}>
              <Img
                src={src}
                alt="Real estate expo event"
                className={styles.galleryImage}
              />
            </figure>
          ))}
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
