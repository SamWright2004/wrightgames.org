# Sam Wright — portfolio redesign

A static, content-driven portfolio for **wrightgames.org**. Built with Astro, Markdown, TypeScript and plain CSS. Film, 3D, design and interactive work share one project system.

The redesign lives on `codex/portfolio-redesign`. The original root HTML, template assets and original images remain intact for reference. **The new entry point is `src/pages/index.astro`; publish the generated `dist/` folder, not the repository root.** This branch does not deploy the live website.

## Run locally

Use Node **24 LTS**. The tests use its native TypeScript support.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro. The dev server updates as you save files, including Markdown. Drafts appear locally with a notice on their project page.

```sh
npm run verify    # type/content checks, production build and tests
npm run preview   # serve the built production site locally
```

## Add a project in a few minutes

```sh
npm run new:project -- "My new film" --category film
```

1. Edit the generated Markdown file in `src/content/projects/`.
2. Put its images in `public/media/<project-slug>/` and add their paths to the file.
3. Set `draft: false` when ready. Commit the content and images together.

The new project automatically gets a page, appears in the relevant filters, and joins the sitemap. Add `featured: 5` to include finished/archive work on the homepage; `development` and `concept` projects appear in the workbench instead. No layout edits required.

See **[Content guide](docs/CONTENT_GUIDE.md)** for videos, galleries, ordering, links and production notes. You can also edit Markdown and upload images directly in GitHub.

## Structure

| Path                          | Purpose                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------- |
| `src/content/projects/*.md`   | Project metadata and written content                                         |
| `src/content.config.ts`       | Validated project schema                                                     |
| `src/data/site.ts`            | Name, biography summary, contact, social links and optional CV               |
| `src/pages/`                  | Home, work library, project pages, development, about and legacy games route |
| `src/components/`             | Reusable project cards and click-to-load video player                        |
| `src/layouts/Base.astro`      | Shared header, footer, metadata and typography                               |
| `src/styles/global.css`       | Responsive design and colour/type tokens                                     |
| `public/media/`               | New project images and files, copied directly to the output                  |
| `images/`                     | Original artwork, copied into the output by the asset preparation script     |
| `scripts/`                    | Safe project scaffolding and legacy-route preservation                       |
| `tests/`                      | Built-link checks, migration checks, draft safety and filtering              |
| `.github/workflows/build.yml` | CI checks and downloadable static-site artifact; no deployment               |

No React, database, paid CMS, API keys or runtime server are required. Content is rendered into HTML at build time. Small client scripts handle filters, thumbnail failures and video activation; reading and navigation work without JavaScript.

## Design and content choices

- Spacious graphite/olive palette, pale green accents and locally hosted fonts.
- A mixed homepage featuring a film edit, an app, digital artwork and a 3D prototype.
- Dedicated URLs with contributions, videos, Markdown body, optional galleries and updates.
- Genuine original imagery and YouTube thumbnail URLs; typographic covers for developing concepts.
- Four discipline filters, stage filters, text search and shareable filter URLs.
- Keyboard navigation, visible focus, reduced-motion support, responsive layouts and a real 404 page.
- Search metadata, social previews and a generated sitemap.
- No empty CV button: add a public-safe PDF and set `site.cv` when ready.

**[Migration audit](docs/MIGRATION_AUDIT.md)** records what was found and what is still missing. **[Launch notes](docs/LAUNCH.md)** explain how to deploy later without breaking the app's privacy URL.

## Verification limits

The implementation was type checked, built, and tested against its generated HTML. Browser QA was unavailable in the build environment, so desktop/mobile visual review and real YouTube playback still need checking before launch. External gallery assets are not all in Git; see the migration audit. The live domain and `main` branch are unchanged by this work.
