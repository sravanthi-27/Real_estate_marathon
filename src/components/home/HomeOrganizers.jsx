import SectionTitle from '@/components/ui/SectionTitle';
import PeopleRow from '@/components/shared/PeopleRow';
import { homeOrganizers } from '@/data/home';
import styles from './HomeOrganizers.module.css';

export default function HomeOrganizers() {
  return (
    <section className={`section home-organizers ${styles.section}`}>
      <div className="container">
        <SectionTitle>Organized by Industry. For the Community.</SectionTitle>
        <PeopleRow people={homeOrganizers} className={styles.people} />
      </div>
    </section>
  );
}
