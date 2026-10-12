# Publishing the portfolio

The redesign is live at **https://wrightgames.org/**. Its current publishing branch is **`codex/portfolio-redesign`**. A push to that branch triggers the **Deploy portfolio** workflow. `main` still contains the original website.

## Normal update flow

1. Add or edit a project in `src/content/projects/` and put its images in `public/media/`.
2. Preview locally with `npm run dev`.
3. Set `draft: false` when the project is ready.
4. Run `npm run verify`, then commit and push to `codex/portfolio-redesign`.
5. Check **Actions → Deploy portfolio** for the completed deployment.

No manual edits to navigation, templates or a project index are needed. Draft pages appear during local development but are excluded from production pages, listings and the sitemap. They are still files in this public repository, so draft mode is not private storage.

## How publishing works

`.github/workflows/deploy.yml` checks out the publishing branch, uses `withastro/action` with Node 24 to install dependencies and build the site, then runs the content/type check and built-output tests. Its deployment job depends on all those steps succeeding and publishes the prepared Pages artifact through the `github-pages` environment.

The separate **Check portfolio** workflow also validates the branch and creates a downloadable `portfolio-static-site` artifact. This generic artifact is useful for review; the deploy workflow prepares its own Pages artifact.

Keep **Settings → Pages → Build and deployment → Source** set to **GitHub Actions**. Do not switch to publishing the source branch root through Jekyll: the Astro source files must first be built into `dist/`.

## Review locally

Use Node 24:

```sh
npm ci
npm run dev
```

To inspect the same production output that will be published:

```sh
npm run verify
npm run preview
```

Use the URL printed by Astro. Do not double-click an HTML file, because the site uses normal root-relative URLs. For larger unpublished changes, create another working branch; deployment is restricted to the branch listed in `deploy.yml` for push events.

Browser visual review and real YouTube playback still need checking. Elfsight and the former collage are retired. Add any further artwork directly as project entries; no widget migration is required. See `MIGRATION_AUDIT.md` for the remaining content gaps.

## Keep the domain and important routes

- Publish **the contents of `dist/`**, not the repository root.
- The build copies `CNAME`, the existing `.htaccess`, all original images and the pTable policy.
- `/pTable.html` and `/pTable/` preserve the app privacy page.
- `/games/` and `/games.html` preserve the old games entry points.
- `/work/ptable/` is the app portfolio page and does not replace its policy.
- The canonical domain is configured in `astro.config.mjs`, `public/robots.txt`, `src/pages/sitemap.xml.ts` and `CNAME`; update them together if the domain changes.

## Eventually moving production to main

When the redesign is ready to become the main codebase, review and merge it into `main`, and change the deployment workflow's push branch from `codex/portfolio-redesign` to `main` in the same merge. Check the `github-pages` environment's permitted branches if GitHub blocks deployment. The custom domain does not need to change.

Until then, merging is not required to publish content: the redesign branch already deploys.

## Rollback

Use a previous known-good commit/deployment when a change needs reversing. The original root files remain intact, and their original commit is recorded in the audit. Do not delete new project content or change the domain as a rollback method.
