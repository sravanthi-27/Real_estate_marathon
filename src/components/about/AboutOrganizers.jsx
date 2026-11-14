import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import SectionTitle from '@/components/ui/SectionTitle';
import { organizers, whoCanParticipate } from '@/data/about';
import styles from './AboutOrganizers.module.css';

export default function AboutOrganizers() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.layout}`}>
        <div>
          <SectionTitle>{organizers.title}</SectionTitle>
          <div className={styles.people}>
            {organizers.people.map((person) => (
              <article className={styles.person} key={person.name}>
                <Img src={person.src} alt="" className={styles.photo} />
                <strong>{person.name}</strong>
                <span>{person.role}</span>
              </article>
            ))}
          </div>
        </div>
        <aside className={styles.card}>
          <h2>{whoCanParticipate.title}</h2>
          <ul>
            {whoCanParticipate.items.map((item) => (
              <li key={item}><Icon name="check" size={13} />{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
