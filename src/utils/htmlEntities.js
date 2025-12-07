/**
 * Decodes HTML entities in a string
 * Handles named entities (e.g., &amp;), numeric decimal entities (e.g., &#038;), 
 * and numeric hexadecimal entities (e.g., &#x26;)
 * @param {string} str - The string containing HTML entities
 * @returns {string} - The decoded string
 */
export function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return str;

  // Use the browser's built-in decoder if available (most efficient)
  if (typeof document !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  }

  // Fallback for server-side or environments without DOM
  return str
    // Decode numeric decimal entities (e.g., &#038;)
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(parseInt(dec, 10)))
    // Decode numeric hexadecimal entities (e.g., &#x26;)
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)))
    // Decode common named entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&copy;/g, '©')
    .replace(/&reg;/g, '®')
    .replace(/&trade;/g, '™')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&hellip;/g, '\u2026')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&rdquo;/g, '\u201D');
}

