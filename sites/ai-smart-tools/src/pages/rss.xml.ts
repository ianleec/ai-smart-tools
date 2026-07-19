import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL | undefined }) {
  const reviews = await getCollection('reviews');
  const best = await getCollection('best');
  const compare = await getCollection('compare');
  const guides = await getCollection('guides');

  const all = [
    ...reviews.map(p => ({ ...p, kind: 'review' })),
    ...best.map(p => ({ ...p, kind: 'best' })),
    ...compare.map(p => ({ ...p, kind: 'compare' })),
    ...guides.map(p => ({ ...p, kind: 'guide' })),
  ];

  return rss({
    title: 'AI Smart Tools',
    description: 'Independent reviews and comparisons of the best AI productivity tools.',
    site: context.site ?? 'https://aismarttools.com',
    items: all
      .sort((a, b) => +b.data.pubDate - +a.data.pubDate)
      .map(post => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/${(post.kind === 'review' ? 'reviews' : post.kind)}/${post.slug}`,
        categories: [(post.data as any).category ?? 'general'],
      })),
    customData: '<language>en-us</language>',
  });
}
