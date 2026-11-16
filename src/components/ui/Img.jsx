'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

function ImageContent({ src, alt, contain, loading }) {
  const [fallback, setFallback] = useState(false);
  const [failed, setFailed] = useState(false);
  const optimizedSrc = src.replace(/\.(png|jpe?g)$/i, '.webp');
  if (failed) return null;

  // eslint-disable-next-line @next/next/no-img-element
  return <img
    src={fallback ? src : optimizedSrc}
    alt={alt}
    loading={loading}
    onError={() => {
      if (!fallback && optimizedSrc !== src) setFallback(true);
      else setFailed(true);
    }}
    style={contain ? { objectFit: 'contain' } : undefined}
  />;
}

/** Uses generated WebP assets when available and falls back to the original source. */
export default function Img({ src, alt = '', className = '', style, contain = false, loading = 'lazy' }) {
  return (
    <div className={cn('img-slot', className)} style={style}>
      <ImageContent key={src} src={src} alt={alt} contain={contain} loading={loading} />
    </div>
  );
}
