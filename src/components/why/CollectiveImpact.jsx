import { HeartPulse, Leaf, Users, Wind } from 'lucide-react';
import { collectiveImpact } from '@/data/why';
import styles from './CollectiveImpact.module.css';

const impactIcons = { wind: Wind, leaf: Leaf, users: Users, 'heart-pulse': HeartPulse };

function TreeIllustration() {
  return (
    <svg className={styles.tree} viewBox="0 0 72 82" aria-hidden="true">
      <path d="M36 72V43m0 14L21 43m15 8 15-15M36 48 27 31m9 10 10-17" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
      <circle cx="18" cy="39" r="11" fill="#6ba94d" />
      <circle cx="29" cy="27" r="12" fill="#4d963e" />
      <circle cx="44" cy="26" r="13" fill="#73ad4e" />
      <circle cx="55" cy="39" r="11" fill="#4d963e" />
      <circle cx="34" cy="40" r="13" fill="#5b9f43" />
      <path d="M25 73h22" stroke="#87633c" strokeLinecap="round" strokeWidth="5" />
    </svg>
  );
}

export default function CollectiveImpact() {
  return (
    <article className={`card ${styles.card}`}>
      <h2 className="card__title">{collectiveImpact.title}</h2>
      <p className={styles.description}>{collectiveImpact.description}</p>
      <div className={styles.illustration} role="img" aria-label="A tree connected to cleaner air, a better environment, stronger communities and a healthier future">
        <svg className={styles.connectors} viewBox="0 0 300 150" preserveAspectRatio="none" aria-hidden="true">
          <circle cx="150" cy="75" r="56" />
          <path d="M150 75 78 39m72 36 72-36m-72 36-72 39m72-39 72 39" />
        </svg>
        <div className={styles.treeWrap}><TreeIllustration /></div>
        {collectiveImpact.items.map(({ icon, label }) => {
          const ImpactIcon = impactIcons[icon];
          return (
            <div key={label} className={`${styles.node} ${styles[icon]}`}>
              <span className={styles.nodeIcon}><ImpactIcon aria-hidden="true" /></span>
              <span className={styles.label}>{label}</span>
            </div>
          );
        })}
      </div>
      <p className={styles.note}>{collectiveImpact.note}</p>
    </article>
  );
}
