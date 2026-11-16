import { Activity, Building2, CalendarDays, Handshake, MapPin, Route, TreePine, UsersRound } from 'lucide-react';
import IconCardGrid from '@/components/shared/IconCardGrid';
import { eventSnapshot, helpTopics } from '@/data/contact';
import styles from './ContactHelpSection.module.css';

const snapshotIcons = {
  activity: Activity,
  route: Route,
  'map-pin': MapPin,
  users: UsersRound,
  building: Building2,
  handshake: Handshake,
  tree: TreePine,
};

function EventSnapshot() {
  return (
    <aside className={styles.snapshot}>
      <h2 className={styles.snapshotTitle}>
        <CalendarDays aria-hidden="true" />
        {eventSnapshot.title}
      </h2>
      <dl className={styles.snapshotRows}>
        {eventSnapshot.rows.map(({ icon, label, value, emphasis, green }) => {
          const RowIcon = snapshotIcons[icon];
          return (
            <div key={label} className={`${styles.snapshotRow} ${green ? styles.green : ''}`}>
              <dt>
                <RowIcon aria-hidden="true" />
                <span>{label}</span>
              </dt>
              <dd className={emphasis ? styles.emphasis : ''}>{value}</dd>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}

export default function ContactHelpSection() {
  return (
    <div className={styles.layout}>
      <section className={styles.helpCard} aria-labelledby="contact-help-title">
        <h2 className={styles.helpTitle} id="contact-help-title">What can we help you with?</h2>
        <span className={styles.underline} aria-hidden="true" />
        <IconCardGrid items={helpTopics} columns={4} compact className={styles.topics} />
        <p className={styles.helper}>Click on any option above to submit your specific enquiry.</p>
      </section>
      <EventSnapshot />
    </div>
  );
}
