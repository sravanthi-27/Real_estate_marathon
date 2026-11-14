import Link from 'next/link';
import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { images } from '@/config/images';
import { route } from '@/data/home';
import styles from './RoutePage.module.css';

export const metadata = { title: 'Route' };

const pointsOfInterest = [
  { title: 'Gachibowli Stadium', description: 'Event start and finish venue.' },
  { title: 'Financial District', description: 'Hyderabad business district.' },
  { title: 'ORR Stretch', description: 'Route landmark; course details pending.' },
  { title: 'Durgam Cheruvu', description: 'Hyderabad lake and cable bridge.' },
  { title: 'Creek Towers', description: 'Nearby city landmark.' },
  { title: 'Biodiversity Junction', description: 'Hyderabad junction landmark.' },
];

const supportCards = [
  { icon: 'droplets', title: 'Hydration Plan', text: 'Hydration point locations will be published with the confirmed course.' },
  { icon: 'heart-pulse', title: 'Medical Support', text: 'Medical point locations will be shared before race day.' },
  { icon: 'shield', title: 'Route Safety', text: 'Course marshals and safety instructions will be announced with the final route.' },
  { icon: 'info', title: 'Important Note', text: 'The official road-by-road course and elevation profile are awaiting confirmation.' },
];

export default function RoutePage() {
  return (
    <div className={styles.page}>
      <Img
        src={images.route.hero}
        alt="Real Estate Marathon event banner"
        className={styles.hero}
      />

      <section className={styles.mapSection}>
        <div className={styles.mapPanel}>
          <div className={styles.mapColumn}>
            <h1>10 KM Route Map</h1>
            <div className={styles.mapFrame}>
              <iframe
                title="Interactive map centered on Gachibowli Stadium"
                src={route.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span className={styles.startBadge}><Icon name="map-pin" size={14} /> Start / Finish · Gachibowli Stadium</span>
            </div>
            <p className={styles.disclaimer}>
              The map shows the event area only. The official 10 km course line will be added after it is confirmed.
            </p>
          </div>
          <aside className={styles.routeDetails}>
            <h2>Route Highlights</h2>
            <ul>
              <li><Icon name="map-pin" size={14} /> Gachibowli Stadium start / finish</li>
              <li><Icon name="building" size={14} /> Financial District</li>
              <li><Icon name="flag" size={14} /> ORR stretch</li>
              <li><Icon name="droplets" size={14} /> Hydration points: to be confirmed</li>
              <li><Icon name="heart-pulse" size={14} /> Medical support: to be confirmed</li>
            </ul>
            <Link href={route.mapUrl} target="_blank" rel="noreferrer" className={styles.mapLink}>
              Open interactive map <Icon name="arrow-right" size={13} />
            </Link>
          </aside>
        </div>
      </section>

      <section className={styles.detailsSection}>
        <div className={styles.detailsGrid}>
          <aside className={styles.elevation}>
            <h2><Icon name="trending-up" size={15} /> Elevation Profile</h2>
            <div className={styles.profilePending}>
              <span aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>
              <p>Elevation data will be published with the confirmed course.</p>
            </div>
          </aside>
          <div className={styles.pointsPanel}>
            <h2>Points of Interest</h2>
            <div className={styles.pointsGrid}>
              {pointsOfInterest.map((point, index) => (
                <article className={styles.point} key={point.title}>
                  <Img src={images.route.points[index]} alt={point.title} className={styles.pointImage} />
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.supportSection}>
        <div className={styles.supportGrid}>
          {supportCards.map((card) => (
            <article className={styles.supportCard} key={card.title}>
              <span><Icon name={card.icon} size={16} /></span>
              <div><h2>{card.title}</h2><p>{card.text}</p></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
