import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import styles from './ContactHistoryCta.module.css';

const actions = [
  { label: 'Register Now', href: '/register', icon: 'footprints', tone: 'orange' },
  { label: 'Become a Sponsor', href: '/sponsors', icon: 'handshake', tone: 'navy' },
  { label: 'Book Expo Space', href: '/expo', icon: 'store', tone: 'orange' },
  { label: 'Register Your Community', href: '/register', icon: 'users', tone: 'navy' },
];

export default function ContactHistoryCta() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Ready to Be Part of History?</h2>
      <p className={styles.subtitle}>10 KM <span>•</span> 10,000 Participants <span>•</span> 10,000 Trees</p>
      <nav className={styles.actions} aria-label="Event actions">
        {actions.map(({ label, href, icon, tone }) => (
          <Link key={label} href={href} className={`${styles.button} ${styles[tone]}`}>
            <Icon name={icon} size={11} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
