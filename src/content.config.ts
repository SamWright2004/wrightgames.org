import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const publicPath = z
  .string()
  .regex(
    /^\/(?!\/)[^?#]+$/,
    'Use an absolute public path, e.g. /media/project/cover.jpg',
  );
const webUrl = z
  .url()
  .refine((value) => /^https?:\/\//.test(value), 'Use an http(s) URL');
const mediaPath = z.union([publicPath, webUrl]);
const picture = z.object({
  src: mediaPath,
  alt: z.string().min(1),
  caption: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1).max(240),
    categories: z.array(z.enum(['film', '3d', 'design', 'interactive'])).min(1),
    status: z.enum(['complete', 'development', 'concept', 'archive']),
    stage: z.string().optional(),
    year: z.string().optional(),
    role: z.string().min(1),
    tools: z.array(z.string()).default([]),
    cover: picture.optional(),
    coverFit: z.enum(['cover', 'contain']).default('cover'),
    coverPosition: z
      .string()
      .regex(/^\d{1,3}% \d{1,3}%$/)
      .default('50% 50%'),
    placeholder: z.enum(['orbit', 'worlds']).optional(),
    featured: z.number().int().positive().optional(),
    draft: z.boolean().default(false),
    videos: z
      .array(
        z.object({
          id: z.string().regex(/^[\w-]{11}$/),
          title: z.string().min(1),
        }),
      )
      .default([]),
    gallery: z.array(picture).default([]),
    links: z
      .array(
        z.object({
          label: z.string().min(1),
          href: z.union([webUrl, publicPath]),
        }),
      )
      .default([]),
    updates: z
      .array(
        z.object({
          date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
          text: z.string().min(1),
        }),
      )
      .default([]),
  }),
});

export const collections = { projects };
