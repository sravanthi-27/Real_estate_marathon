import styles from './Leaderboard.module.css';

export default function Leaderboard({ title, columns, rows }) {
  return (
    <div className="card">
      <h3 className="card__title">{title}</h3>
      <table className={styles.table}>
        <thead><tr><th>#</th>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={r[0]}><td>{i + 1}</td>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
