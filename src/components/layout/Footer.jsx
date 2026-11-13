import Link from 'next/link';
import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import NewsletterForm from './NewsletterForm';
import { CONTACT, FOOTER_COLUMNS, SITE, SOCIALS } from '@/config/site';
import { images } from '@/config/images';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <Img src={images.common.logoLight} alt={SITE.name} contain style={{ width: 130, height: 48, background: 'transparent' }} />
          <p className={styles.about}>{SITE.description}</p>
        </div>
        <div className={styles.cols}>
          {FOOTER_COLUMNS.map((col, i) => (
            <div key={i}>
              <h4 className={styles.heading}>{col.title || '\u00A0'}</h4>
              <ul>{col.links.map((l) => <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div>
          <h4 className={styles.heading}>Contact Us</h4>
          <ul className={styles.contact}>
            <li><Icon name="map-pin" size={14} /> {CONTACT.address}</li>
            <li><Icon name="phone" size={14} /> {CONTACT.phone}</li>
            <li><Icon name="mail" size={14} /> {CONTACT.email}</li>
          </ul>
        </div>
        <div>
          <h4 className={styles.heading}>Follow Us</h4>
          <div className={styles.socials}>
            {SOCIALS.map((s) => <a key={s.label} href={s.href} aria-label={s.label} className={styles.social}><Icon name={s.icon} size={16} /></a>)}
          </div>
          <h4 className={styles.heading} style={{ marginTop: '1rem' }}>Newsletter</h4>
          <p className={styles.small}>Stay updated with race news and offers.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
        <span className={styles.hash}>{SITE.hashtag}</span>
      </div>
    </footer>
  );
}
