import { defineCollection, z, reference } from 'astro:content';

// Shared primitives
const seo = z.object({
  title: z.string().max(80).optional(),
  description: z.string().max(160).optional(),
  ogImage: z.string().optional(),
});

const verdict = z.object({
  winner: z.string(),
  reason: z.string().max(280),
});

const faq = z.object({
  q: z.string().min(5),
  a: z.string().min(20),
});

const affiliate = z.object({
  product: z.string(),
  url: z.string().url(),
  cta: z.string().max(60),
  price: z.string().optional(),
});

const prosCons = z.object({
  pros: z.array(z.string()),
  cons: z.array(z.string()),
});

// ----------------------------------------------------------------
// Reviews: single-product deep-dive
// ----------------------------------------------------------------
const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(80),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    category: z.enum([
      'meeting-notes',
      'writing',
      'note-taking',
      'task-management',
      'email',
      'research',
      'transcription',
      'other',
    ]),
    product: z.string(),                // primary reviewed product slug
    relatedProducts: z.array(z.string()).optional(),
    rating: z.number().min(0).max(5),
    verdict: verdict,
    prosCons: prosCons.optional(),
    faqs: z.array(faq).default([]),
    affiliate: z.array(affiliate).default([]),
    seo: seo.optional(),
  }),
});

// ----------------------------------------------------------------
// Best: ranked-list articles ("Best X for Y in 2026")
// ----------------------------------------------------------------
const best = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(80),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    category: z.enum([
      'meeting-notes',
      'writing',
      'note-taking',
      'task-management',
      'email',
      'research',
      'transcription',
      'other',
    ]),
    products: z.array(z.object({
      slug: z.string(),
      rank: z.number().int().positive(),
      bestFor: z.string(),
      rating: z.number().min(0).max(5),
    })).min(3),
    faqs: z.array(faq).default([]),
    affiliate: z.array(affiliate).default([]),
    seo: seo.optional(),
  }),
});

// ----------------------------------------------------------------
// Compare: head-to-head (2 or 3 products)
// ----------------------------------------------------------------
const compare = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(80),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    category: z.enum([
      'meeting-notes',
      'writing',
      'note-taking',
      'task-management',
      'email',
      'research',
      'transcription',
      'other',
    ]),
    products: z.array(z.string()).min(2).max(3),
    verdict: verdict,
    faqs: z.array(faq).default([]),
    affiliate: z.array(affiliate).default([]),
    seo: seo.optional(),
  }),
});

// ----------------------------------------------------------------
// Guides: educational / framework articles
// ----------------------------------------------------------------
const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(80),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    faqs: z.array(faq).default([]),
    affiliate: z.array(affiliate).default([]),
    seo: seo.optional(),
  }),
});

// ----------------------------------------------------------------
// Products: structured product data (referenced by collections above)
// ----------------------------------------------------------------
const products = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    brand: z.string(),
    category: z.string(),
    url: z.string().url(),
    affiliateUrl: z.string().url().optional(),
    pricing: z.object({
      starting: z.number(),
      currency: z.string().default('USD'),
      hasFreeTier: z.boolean().default(false),
    }),
    rating: z.number().min(0).max(5),
    g2Score: z.number().min(0).max(5).optional(),
    description: z.string().max(280),
    bestFor: z.array(z.string()),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    features: z.record(z.boolean()).default({}),
    lastUpdated: z.coerce.date(),
  }),
});

export const collections = { reviews, best, compare, guides, products };
