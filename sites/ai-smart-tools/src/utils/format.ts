export function formatDate(date: Date, opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }): string {
  return new Intl.DateTimeFormat('en-US', opts).format(date);
}

export function readingTime(text: string): number {
  const wordsPerMinute = 220;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function stars(rating: number, max = 5): string {
  const filled = Math.round(rating);
  return '★'.repeat(filled) + '☆'.repeat(max - filled);
}
