export function highlightUppercase(text) {
  return text.replace(/\b[A-Z]{2,}(?:\s[A-Z]{2,})*\b/g, match => `<strong>${match}</strong>`);
}

export function highlightPlusBold(text) {
  return text.replace(/\+(.*?)\+/g, (_, match) => `<strong>${match}</strong>`);
}