import { Award } from 'lucide-react';
import styles from './Leaderboard.module.css';

export default function Leaderboard({ title, description, columns, rows }) {
  return (
    <article className={`card ${styles.card}`}>
      <h3 className="card__title">{title}</h3>
      <p className={styles.description}>{description}</p>
      <table className={styles.table}>
        <thead><tr><th>Rank</th>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row[0]}>
              <td>{i === 0 && <Award aria-label="First place" />}<span>{i + 1}</span></td>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <a className={styles.fullLeaderboard} href="/merchandise#community-leaderboard">View Full Leaderboard</a>
    </article>
  );
}
