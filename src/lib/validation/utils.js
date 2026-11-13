/** Runs a zod schema and returns { ok, data, errors } where errors is { 'field.path': 'message' }. */
export function validate(schema, value) {
  const result = schema.safeParse(value);
  if (result.success) return { ok: true, data: result.data, errors: {} };
  return { ok: false, data: null, errors: issuesToErrors(result.error.issues) };
}

export function issuesToErrors(issues) {
  const errors = {};
  for (const issue of issues) {
    const key = issue.path.join('.');
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
