import styles from './ElevationChart.module.css';

/** Pure-SVG elevation chart - no image needed. */
export default function ElevationChart({ title, points, unit = 'm' }) {
  const W = 520, H = 170, pad = 28;
  const max = Math.max(...points), min = Math.min(...points);
  const x = (i) => pad + (i * (W - pad * 2)) / (points.length - 1);
  const y = (v) => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
  const line = points.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points.length - 1)},${H - pad} L${x(0)},${H - pad} Z`;
  return (
    <div className="card">
      <h3 className="card__title">{title}</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} role="img" aria-label={`Elevation from ${min}${unit} to ${max}${unit}`}>
        {[0, 1, 2, 3].map((g) => <line key={g} x1={pad} x2={W - pad} y1={pad + (g * (H - pad * 2)) / 3} y2={pad + (g * (H - pad * 2)) / 3} className={styles.grid} />)}
        <path d={area} className={styles.area} />
        <path d={line} className={styles.line} />
        <text x={pad} y={14} className={styles.label}>{max}{unit}</text>
        <text x={pad} y={H - 6} className={styles.label}>0 km</text>
        <text x={W - pad} y={H - 6} textAnchor="end" className={styles.label}>10 km</text>
      </svg>
    </div>
  );
}
