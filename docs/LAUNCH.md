# Launching the redesign

This branch is for development and review. The included workflow **checks and packages** the site; it does not deploy it. The existing live website is unaffected.

## Review locally

```sh
npm ci
npm run verify
npm run preview
```

Use Node 24. The built output is `dist/`. Serve it with `npm run preview`; do not double-click an HTML file, because the site uses normal root-relative URLs.

Before launch, review desktop and mobile widths, filters and keyboard focus, all film embeds, project credits and the asset gaps in `MIGRATION_AUDIT.md`. Add a suitable CV if wanted. Import the rest of the Elfsight artwork before removing access to that gallery from the live site.

## Keep the domain and important routes

- Publish **the contents of `dist/`**, not the repository root.
- The build copies `CNAME`, the existing `.htaccess`, all original images and the pTable policy.
- Keep `/pTable.html` and `/pTable/` available: a store listing may link to either.
- `/games/` and `/games.html` remain valid.
- `/work/ptable/` is the app's portfolio page; it does not replace the policy.
- The configured canonical domain is `https://wrightgames.org`. If the domain ever changes, update `astro.config.mjs`, `public/robots.txt`, `src/pages/sitemap.xml.ts` and `CNAME` together.

## Hosting choices

First check how the live site currently publishes. The repository has a custom-domain file but no previous deployment workflow; do not assume the active settings.

**GitHub Pages:** use an Actions deployment that builds with Node 24, runs `npm ci` and `npm run verify`, uploads `dist/` using `actions/upload-pages-artifact`, then deploys it using `actions/deploy-pages`. Configure the Pages environment and `pages: write` / `id-token: write` permissions. Set deployment to run only from the reviewed production branch. Leave the custom domain unchanged. The existing generic `portfolio-static-site` artifact is for download/review, not a Pages deployment artifact.

**Existing static host:** set build command to `npm run build`, output directory to `dist`, and Node version to 24. If uploading manually, upload the contents of `dist/`, including the copied dotfile when the host uses Apache. New project routes are directories with `index.html`; no SPA fallback is required.

Check provider documentation when configuring deployment, since hosting workflows can change. Suggested official references:

- https://docs.astro.build/en/guides/deploy/github/
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Future update flow

After deployment is configured, the intended routine is: add/edit Markdown and media → preview → commit → automated build → publish. Project updates do not require manually editing navigation, page templates or a project index.

## Rollback

Keep the old production deployment available when making the first switch. The original root site files are unchanged in this branch, and the original commit is recorded in `MIGRATION_AUDIT.md`. Restoring an earlier host deployment is preferable to deleting new content. Do not merge or change production settings just to preview this branch.
