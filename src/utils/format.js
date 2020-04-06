export function formatZipCode(value) {
  if (!value) return '';

  return `${value.toString().substring(0, 5)}-${value.toString().substring(5)}`;
}
