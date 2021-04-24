function sanitizeString(str) {
  return str.replace(/[^A-Z0-9]/gi, "");
}

export { sanitizeString };
