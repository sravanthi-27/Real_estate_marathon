'use client';
import { useRef, useState } from 'react';
import Icon from '../Icon';
import { apiUpload } from '@/lib/api/client';
import styles from './form.module.css';

/** Uploads straight to the server (-> Supabase Storage) and returns the stored path via onChange(path, fileName). */
export default function FileUpload({ kind, value, fileName, onChange, accept = 'image/jpeg,image/png,image/webp', title, hint, invalid }) {
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function pick(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true); setError('');
    try {
      const res = await apiUpload(kind, file);
      onChange(res.path, res.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" className={`${styles.upload} ${value ? styles.uploadOk : ''} ${invalid && !value ? styles.invalid : ''}`} onClick={() => input.current?.click()} disabled={busy}>
        <Icon name={busy ? 'loader' : value ? 'check-circle' : 'upload'} size={22} className={busy ? 'spin' : ''} />
        <strong>{title}</strong>
        {value ? <span className={styles.uploadName}>{fileName || 'Uploaded'} - click to replace</span> : <span>{busy ? 'Uploading...' : hint}</span>}
      </button>
      <input ref={input} type="file" accept={accept} onChange={pick} hidden />
      {error && <span className={styles.error} role="alert">{error}</span>}
    </div>
  );
}
