import Img from '@/components/ui/Img';
import SectionTitle from '@/components/ui/SectionTitle';
import { homePartners } from '@/data/home';
import styles from './HomePartners.module.css';

export default function HomePartners() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionTitle sub="Prominent real estate brand partners">Event Partners &amp; Associate Sponsors</SectionTitle>
        <div className={styles.panel}>
          {homePartners.map((group) => (
            <div className={styles.group} key={group.title}>
              <h3>{group.title}</h3>
              <div className={styles.logos}>
                {group.logos.map((src, index) => (
                  <Img
                    key={src}
                    src={src}
                    alt={`${group.title} logo ${index + 1}`}
                    contain
                    className={styles.logo}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
