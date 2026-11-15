import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { organizers, whoCanParticipate } from '@/data/about';
import styles from './AboutOrganizers.module.css';

export default function AboutOrganizers() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.layout}`}>
        <div>
          <h2 className={styles.heading}>{organizers.title}</h2>
          <div className={styles.people}>
            {organizers.people.map((person) => (
              <article className={styles.person} key={person.name}>
                <Img src={person.src} alt={person.name} className={styles.photo} />
                <strong>{person.name}</strong>
                <span>{person.role}</span>
              </article>
            ))}
          </div>
        </div>
        <aside className={styles.card}>
          <h2>{whoCanParticipate.title}</h2>
          <ul>
            {whoCanParticipate.items.map((item, index) => (
              <li className={index === whoCanParticipate.items.length - 1 ? styles.featured : ''} key={item}>
                <span className={styles.check}><Icon name="check" size={7} /></span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
