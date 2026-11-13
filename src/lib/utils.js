export const cn = (...c) => c.filter(Boolean).join(' ');

export const uid = () => Math.random().toString(36).slice(2, 10);

export function formatINR(paise) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format((paise || 0) / 100);
}

export function ageFromDob(iso, today = new Date()) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split('-').map(Number);
  let age = today.getFullYear() - y;
  const month = today.getMonth() + 1;
  if (month < m || (month === m && today.getDate() < d)) age -= 1;
  return age;
}

export function formatDate(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export const toISODate = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
