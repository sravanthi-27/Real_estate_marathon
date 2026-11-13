import { cn } from '@/lib/utils';
import styles from './SectionTitle.module.css';

export default function SectionTitle({ children, sub, light = false, align = 'center', as: Tag = 'h2' }) {
  return (
    <div className={cn(styles.wrap, align === 'left' && styles.left)}>
      <Tag className={cn(styles.title, light && styles.light)}>{children}</Tag>
      {sub && <p className={cn(styles.sub, light && styles.subLight)}>{sub}</p>}
    </div>
  );
}
