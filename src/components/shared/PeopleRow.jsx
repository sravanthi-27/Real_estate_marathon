import Img from '@/components/ui/Img';
import styles from './PeopleRow.module.css';

export default function PeopleRow({ people }) {
  return (
    <div className={styles.row}>
      {people.map((p) => (
        <div key={p.name} className={styles.person}>
          <Img src={p.src} alt={p.name} className={styles.photo} />
          <strong>{p.name}</strong>
          <span>{p.role}</span>
        </div>
      ))}
    </div>
  );
}
