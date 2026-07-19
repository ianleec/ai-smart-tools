/**
 * Affiliate link helpers.
 * Use cloak() to funnel external affiliate URLs through an internal redirect,
 * e.g. /go/<id> → external. This survives ad-blockers and lets us track clicks.
 *
 * For now we just return the original URL; the route /go/[id].astro can be
 * added later as a Cloudflare Worker or Astro endpoint.
 */
export function cloak(url: string, id?: string): string {
  const slug = id ?? btoa(url).replace(/[^a-z0-9]/gi, '').slice(0, 12);
  return `/go/${slug}?target=${encodeURIComponent(url)}`;
}

/**
 * Apply UTM-style params to a URL (e.g. for analytics).
 */
export function utm(url: string, source: string, medium = 'affiliate', campaign = 'inline'): string {
  const u = new URL(url);
  u.searchParams.set('utm_source', source);
  u.searchParams.set('utm_medium', medium);
  u.searchParams.set('utm_campaign', campaign);
  return u.toString();
}

/**
 * Format an affiliate disclosure tooltip.
 */
export const AFFILIATE_DISCLOSURE_TEXT =
  'Some links on this page are affiliate links. We may earn a commission at no extra cost to you.';
