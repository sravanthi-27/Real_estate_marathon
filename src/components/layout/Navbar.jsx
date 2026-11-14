'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { NAV_LINKS, SITE } from '@/config/site';
import { images } from '@/config/images';
import { cn } from '@/lib/utils';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className={styles.header}>
      <div className={cn('container', styles.inner)}>
        <Link href="/" className={styles.logo} aria-label={`${SITE.name} home`}>
          <Img src={images.common.logo} alt={SITE.name} contain className={styles.logoImage} />
        </Link>
        <nav className={cn(styles.nav, open && styles.open)} aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={cn(styles.link, isActive(l.href) && styles.active)}>{l.label}</Link>
          ))}
          <Button href="/register" className={styles.mobileCta} onClick={() => setOpen(false)}>Register Now</Button>
        </nav>
        <Button href="/register" size="sm" className={styles.cta}>Register Now</Button>
        <button className={styles.burger} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}><Icon name={open ? 'x' : 'menu'} size={24} /></button>
      </div>
    </header>
  );
}
