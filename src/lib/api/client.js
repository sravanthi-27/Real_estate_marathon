export class ApiClientError extends Error {
  constructor(message, status, fieldErrors) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors || {};
  }
}

async function parse(res) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.ok === false) throw new ApiClientError(json.error || 'Something went wrong. Please try again.', res.status, json.fieldErrors);
  return json.data;
}

export async function apiPost(url, body) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return parse(res);
}

export async function apiGet(url) {
  return parse(await fetch(url, { cache: 'no-store' }));
}

export async function apiUpload(kind, file) {
  const form = new FormData();
  form.append('kind', kind);
  form.append('file', file);
  return parse(await fetch('/api/uploads', { method: 'POST', body: form }));
}
