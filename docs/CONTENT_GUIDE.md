# Updating the portfolio

## The short version

One **Markdown file** controls each project. Its filename becomes its URL. You can add a project with a command, duplicate an existing file, or use GitHub's editor. You do not need to edit Astro components.

```sh
npm run new:project -- "A new Blender scene" --category 3d --status complete
```

This creates `src/content/projects/a-new-blender-scene.md` and an image folder at `public/media/a-new-blender-scene/`. Existing files are never overwritten. Titles with punctuation are safely escaped. Use `--slug a-short-name` to pick a URL.

The generated page starts as a **draft**. It is visible in `npm run dev`; production builds exclude it from pages, listings and the sitemap. Set `draft: false` to publish it in the next production build.

## A complete example

```yaml
---
title: "A new Blender scene"
summary: "An environment study exploring scale and lighting."
categories: ["3d", "design"]
status: "complete"
year: "2026"
role: "Modelling, lighting & rendering"
tools: ["Blender"]
draft: false
featured: 5
cover:
  src: "/media/a-new-blender-scene/cover.webp"
  alt: "Describe what someone would see in the render"
  caption: "Final render."
gallery:
  - src: "/media/a-new-blender-scene/blockout.webp"
    alt: "Grey blockout showing the environment's main shapes"
    caption: "First pass at scale and composition."
links:
  - label: "View the source project"
    href: "https://github.com/your-account/your-project"
---

## The project

Explain the idea in a short paragraph.

## My contribution

Say what you personally created, and credit collaborators.

## The process

Write about a decision, a problem you solved, or a useful experiment.
```

Remove optional fields you do not need. `summary` is limited to 240 characters to keep cards readable. The build rejects unknown categories, invalid statuses, malformed video IDs and missing image alternative text.

## Where things appear

| Field                         | Effect                                                     |
| ----------------------------- | ---------------------------------------------------------- |
| `categories: ["film"]`        | Film & editing filter                                      |
| `categories: ["3d"]`          | 3D & digital art filter                                    |
| `categories: ["design"]`      | Digital design filter                                      |
| `categories: ["interactive"]` | Games & software filter and `/games/`                      |
| Multiple categories           | The project appears in every matching filter               |
| `status: "complete"`          | Finished work                                              |
| `status: "development"`       | Active development; included in the workbench              |
| `status: "concept"`           | Early idea; included in the workbench with a concept label |
| `status: "archive"`           | Older work or inactive experiments, still browsable        |
| `stage: "Story development"`  | Optional more specific progress label                      |
| `featured: 1`                 | Featured selection/order; lower numbers appear first       |
| `draft: true`                 | Local preview only; absent from production output          |

The homepage's selected work includes featured completed/archive projects. Its workbench shows the first two development/concept entries, ordered by `featured` and then title; the full development page shows all of them. Keep featured numbers unique for predictable ordering. Unfeatured work is sorted alphabetically. You can add more featured projects, but four is a good starting point for a balanced homepage.

## Images

Put new assets in `public/media/<project-name>/`. Write `/media/<project-name>/image.webp` in the content file — leave off `public`.

- Use clear, descriptive filenames without spaces for new assets.
- A landscape cover around 1600 pixels wide is usually enough. Prefer WebP/JPEG for photographs and renders; PNG for transparency.
- A short descriptive `alt` is required. Captions are optional.
- Use `coverFit: "contain"` when cropping would hide part of a poster or interface.
- No cover is required: the card uses a typographic treatment with the project's title and stage. Developing projects can instead set `placeholder: "orbit"` or `placeholder: "worlds"` for an explicitly labelled visual placeholder.
- Legacy images remain in the original `images/` directory and are copied automatically.
- The existing film covers use genuine YouTube thumbnail URLs. You can replace those URLs with local stills at any time. A blocked thumbnail falls back to a readable title card.
- Link a gallery image to open its full size. For very large originals, supply a web-sized version and link the original separately.

## Videos

Paste only the 11-character YouTube video ID, not the full URL. For `https://www.youtube.com/watch?v=B2sAUnq1YBw`, the ID is `B2sAUnq1YBw`.

```yaml
videos:
  - id: 'B2sAUnq1YBw'
    title: 'Full film'
  - id: '2WE8yjOYYao'
    title: 'Trailer'
```

Videos use privacy-enhanced YouTube embeds and load only when selected. Without JavaScript the control is a normal YouTube link. Make sure your video allows embedding; that permission belongs to YouTube, not this site. Remote thumbnail images still make a request to YouTube before playback; use local covers if you want to avoid that.

## Production updates

Add genuine dated notes to a developing project. They display newest first.

```yaml
updates:
  - date: '2026-10-11'
    text: 'Completed the first lighting test for the interior.'
```

This is an example of the format, not an actual claim about any existing project. Add stills to the gallery and longer explanations in the Markdown body as the project grows.

## CV, contact and shared settings

Change `src/data/site.ts` for your email, public location and profile links. To enable the CV button, add a suitable PDF to `public/files/` and set `cv: '/files/Sam-Wright-CV.pdf'`. Use a public-safe copy: your permanent home address and private phone number need not be published. No CV is included in this branch.

## Updating directly in GitHub

1. Select the working branch.
2. Use **Add file → Upload files** for media.
3. Create or edit the corresponding Markdown file in `src/content/projects/`.
4. Commit and push. The workflows build and check the site, then publish the redesign branch to GitHub Pages.

The **Check portfolio** workflow also makes a downloadable `portfolio-static-site` artifact. The separate **Deploy portfolio** workflow publishes the build to **wrightgames.org** only after its checks pass. Both currently run on `codex/portfolio-redesign`; `main` is still the original website. Keep unfinished entries as `draft: true` or make changes on another working branch if they must not appear in the live site yet. See `LAUNCH.md`.

## Share links that match the job

- Film work: `https://wrightgames.org/work/?category=film`
- 3D work: `https://wrightgames.org/work/?category=3d`
- Design: `https://wrightgames.org/work/?category=design`
- Interactive work: `https://wrightgames.org/work/?category=interactive`
- One project: `https://wrightgames.org/work/across-the-field/`

These are the production URLs. Browser filters also preserve search text and stage in the address bar. Direct project pages are fully rendered HTML and do not depend on JavaScript. A category filter requires JavaScript; without it, all projects remain visible and usable.

## Replacing the development placeholders

The KSP and Minecraft entries use `placeholder: "orbit"` and `placeholder: "worlds"`. These are abstract layout illustrations, visibly marked as placeholders. Add a real `cover` to the same Markdown file to replace the placeholder automatically in both listings and the project page:

```yaml
cover:
  src: "/media/ksp-film/cover.webp"
  alt: "Describe the actual production image"
  caption: "Describe the stage of the work shown."
```

You can then remove the `placeholder` line. The homepage reads these same entries, so no layout edits are needed. Elfsight and the previous collage are retired; upload art directly using the existing `cover` and `gallery` fields.

The small brand emblems live in `src/assets/`. Astro generates optimized web versions. The film emblem is selected automatically on project pages with the `film` category. The opening artwork and its credit link are in `src/pages/index.astro`; keep both pointing to the same project if you replace it.

## Browsing and previews

Project cards now use image overlays and open an in-page preview. The preview reads the same title, cover, summary, role, stage and videos from the project file. Films play inside it only after the visitor selects a play control. Closing the preview stops playback and returns focus to the selected card. Escape and clicking outside also close it. The full project page remains available, and cards remain ordinary links without JavaScript or when opened in a new tab.

The homepage uses horizontally scrollable project rows (swipe on touchscreens, arrows on desktop). Keep adding featured entries as before. The complete collection retains its filters and grid. Hover reveals a short summary, enlarges the image and softly colours the surrounding background. Touch users see the summary without hovering. Reduced-motion preferences disable the decorative motion. Native cross-page transitions enhance supported browsers without changing navigation in others.

## Cover crops and homepage scrolling

Cards always crop their images to fill the frame. Use `coverPosition: "50% 40%"` to move the crop's focal point. `coverFit: "contain"` preserves the entire artwork on the full project page and in the preview; it no longer creates bars in the browsing card. YouTube hqdefault thumbnails receive an extra crop to remove embedded letterboxing.

The homepage's artwork row automatically includes completed projects in the `3d` category. The imported renders live in `public/media/renders/` as optimized WebP images. The original uploads remain in the supplied archive. The existing Black hole page uses the supplied brighter render; it is not duplicated.

The opening artwork stays fixed and fades as the page scrolls, with the title handing off to the fixed navigation. Reduced-motion mode keeps normal static artwork. Desktop rows can be dragged, touch rows swiped, and the arrow controls remain available.
