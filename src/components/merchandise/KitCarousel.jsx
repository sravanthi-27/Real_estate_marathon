'use client';

import { useRef } from 'react';
import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { communityKits } from '@/data/merchandise';
import styles from './KitCarousel.module.css';

export default function KitCarousel({ className = '' }) {
  const trackRef = useRef(null);

  return (
    <section className={`section section--white ${styles.section} ${className}`}>
      <div className="container">
        <header className={styles.headingGroup}>
          <div className={styles.headingRow}>
            <span className={styles.headingLine} aria-hidden="true" />
            <h2 className={styles.heading}>Community Sponsored Kits</h2>
            <span className={styles.headingLine} aria-hidden="true" />
          </div>
          <p className={styles.subtitle}>Participating Communities</p>
        </header>
        <div className={styles.carousel}>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            aria-label="Previous communities"
            onClick={() => trackRef.current?.scrollBy({ left: -133, behavior: 'smooth' })}
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <div className={styles.track} ref={trackRef} tabIndex={0} aria-label="Community kits">
          {communityKits.map((k) => (
            <article key={k.name} className={styles.card}>
                <div className={styles.logoSlot}>
                  {k.logo && <Img src={k.logo} alt={`${k.name} logo`} contain className={styles.logo} />}
                  {!k.logo && <span className={styles.logoFallback}>{k.name}</span>}
                </div>
                <Img src={k.src} alt={`${k.name} community jersey`} className={styles.img} />
                <span className={styles.registered}>Residents Registered</span>
                <strong className={styles.count}>{k.count}</strong>
                <a className={styles.registerButton} href="/register">
                  Register through<br />community
                </a>
            </article>
          ))}
          </div>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            aria-label="Next communities"
            onClick={() => trackRef.current?.scrollBy({ left: 133, behavior: 'smooth' })}
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
        <a className={styles.viewAll} href="/register">View All Communities</a>
      </div>
    </section>
  );
}
