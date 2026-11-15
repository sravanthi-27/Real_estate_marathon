import Link from 'next/link';
import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import NewsletterForm from './NewsletterForm';
import { SITE, SOCIALS } from '@/config/site';
import { images } from '@/config/images';
import styles from './Footer.module.css';

const footerLinks = [
  [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Route', href: '/route' },
    { label: 'Sponsors', href: '/sponsors' },
  ],
  [
    { label: 'Merchandise', href: '/merchandise' },
    { label: 'Why Participate', href: '/why-participate' },
    { label: 'Contact', href: '/contact' },
    { label: 'Expo', href: '/expo' },
  ],
];

const footerContact = {
  address: 'Gachibowli Stadium, Hyderabad, Telangana',
  phone: '+91 98765 43210',
  email: 'info@realestatejobs.co.in',
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Img src={images.common.logo} alt={SITE.name} contain className={styles.logo} />
          <p className={styles.about}>
            Unifying India&apos;s leading developers, channel partners, architects, and residents through purposeful community wellness.
          </p>
        </div>
        <div className={styles.links}>
          <h4 className={styles.heading}>Quick Links</h4>
          <div className={styles.cols}>
            {footerLinks.map((column, i) => (
              <ul key={i}>{column.map((l) => <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>)}</ul>
            ))}
          </div>
        </div>
        <div className={styles.contactColumn}>
          <h4 className={styles.heading}>Contact Us</h4>
          <ul className={styles.contact}>
            <li><Icon name="map-pin" size={14} /> <span>{footerContact.address}</span></li>
            <li><Icon name="phone" size={14} /> <span>{footerContact.phone}</span></li>
            <li><Icon name="mail" size={14} /> <span>{footerContact.email}</span></li>
          </ul>
        </div>
        <div className={styles.socialColumn}>
          <h4 className={styles.heading}>Follow Us</h4>
          <div className={styles.socials}>
            {SOCIALS.map((s) => <a key={s.label} href={s.href} aria-label={s.label} className={styles.social}><Icon name={s.icon} size={16} /></a>)}
          </div>
          <h4 className={`${styles.heading} ${styles.newsletterHeading}`}>Newsletter</h4>
          <p className={styles.small}>Subscribe for latest updates and event announcements.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span>&copy; {new Date().getFullYear()} RealEstateJobs.co.in. All Rights Reserved.</span>
        <span className={styles.hash}>{SITE.hashtag}</span>
      </div>
    </footer>
  );
}
