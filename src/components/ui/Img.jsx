'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/** Image with a soft placeholder. Drop the real file into /public/images/<page>/ and it appears automatically. */
export default function Img({ src, alt = '', className = '', style, contain = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={cn('img-slot', className)} style={style}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} style={contain ? { objectFit: 'contain' } : undefined} />
      )}
    </div>
  );
}
