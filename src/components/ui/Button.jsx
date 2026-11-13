import Link from 'next/link';
import { cn } from '@/lib/utils';

/** Renders a link when `href` is given, otherwise a <button>. */
export default function Button({ href, variant = 'accent', size, block = false, className, children, ...rest }) {
  const classes = cn('btn', `btn--${variant}`, size && `btn--${size}`, block && 'btn--block', className);
  if (href) return <Link href={href} className={classes} {...rest}>{children}</Link>;
  return <button className={classes} type="button" {...rest}>{children}</button>;
}
