# Existing website audit

Inspected repository: `SamWright2004/wrightgames.org`, `main` at `51b0129965c4218f380c59ccb1118a81e7dc8133`.

**Deployment update, 12 October 2026:** after the initial redesign commit, a separate commit (`9ecd444`) added an Astro GitHub Pages workflow. The deployment succeeded and a direct HTTP check confirmed the redesign on `https://wrightgames.org/`. The current publishing branch is `codex/portfolio-redesign`; `main` still contains the original site. The workflow now verifies content and built output before the deployment job runs. Historical observations below describe the original inspection unless stated otherwise.

## What existed

The site was a set of static HTML pages based on HTML5 UP's Massively template. There was no package manifest, build pipeline, reusable project model, content schema or test suite. `README.txt` was effectively empty.

`index.html` combined an Elfsight gallery with six hard-coded YouTube embeds. `games.html` held two app entries and four older games. `pTable.html` is the app's privacy policy, **not an app showcase page**. `elements.html` is the template demonstration page.

The front end loaded jQuery, Scrollex, Scrolly, browser/breakpoint helpers and a large shared template stylesheet. The homepage also loaded Google Analytics and Elfsight. Content was mixed into markup, making frequent additions increasingly awkward. There were empty links, an invalid `p1` element, duplicate IDs and a duplicate `href` in navigation. The viewport disabled zoom.

## Important items retained

| Item                                     | Use in redesign                                                      |
| ---------------------------------------- | -------------------------------------------------------------------- |
| `CNAME` (`wrightgames.org`)              | Copied unchanged into static output                                  |
| `.htaccess`                              | Retained/copied for compatible Apache hosting                        |
| `pTable.html`                            | Preserved byte-for-byte at `/pTable.html` and `/pTable/`             |
| Existing `/games` and `/games.html` URLs | New games listing at `/games/` plus exact `.html` compatibility copy |
| `images/BlackHole2.png`                  | Homepage artwork and a digital-art project page                      |
| `images/pTable.png`                      | Original app visual and design/interactive project page              |
| `images/SolarGaze.png`                   | Original solar-system prototype image                                |
| Four named legacy-game PNGs              | Preserved archive entries and original GameJolt links                |
| Six YouTube IDs                          | Five project pages; Across the Field keeps both film and trailer     |
| ArtStation, DeviantArt, Instagram        | Existing public social URLs carried forward                          |
| `wrightgamesbusiness@gmail.com`          | Existing public contact from pTable privacy page                     |
| Original root files and `assets/`        | Untouched reference/rollback material; not used by the new build     |

The `pic01`–`pic09` images, `bg.jpg`, overlay and old template resources remain available but are not presented as original portfolio work. Original files are copied to the public output for compatibility; none is deleted.

## Video mapping

| Original entry                         | YouTube ID    | New project                |
| -------------------------------------- | ------------- | -------------------------- |
| WW2 Film TEST                          | `KVKgS7PoBl0` | `/work/ww2-film-test/`     |
| Shadows in Motion                      | `nwEa3UQ7meM` | `/work/shadows-in-motion/` |
| Mark & Rachel 25th Wedding Anniversary | `_20JntfL45k` | `/work/anniversary-film/`  |
| LICA259 One Minute Film                | `LNlkuUapITY` | `/work/one-minute-film/`   |
| Across the Field trailer               | `2WE8yjOYYao` | `/work/across-the-field/`  |
| Across the Field                       | `B2sAUnq1YBw` | `/work/across-the-field/`  |

Only the two final-project films explicitly credited Sam with editing in the source. Other roles are deliberately general pending a proper credits/contribution pass. Dates, tool lists, awards, production metrics and finished breakdowns were not invented.

## New content and status decisions

Two developing project pages were added from the supplied brief: the KSP film and the Minecraft film concept. These have typographic covers, clear stage labels and concise descriptions. No generated image is presented as finished production material. The KSP film is not labelled Orbitfall: that title belonged to a separate sequel pitch.

SolarGaze had a historical "in development" label but no release date or link; it is conservatively presented as an archived prototype until its current status is confirmed. The WW2 test is similarly an archive experiment. The four older games remain in the archive.

## Missing assets and launch decisions

1. **Elfsight gallery:** widget ID `2f473dcd-69dd-40cc-a19b-efdc3255b315`. Most gallery artwork is stored outside this repository. The public widget script was unavailable to the inspection environment (HTTP 403); those assets were not exported. Add the original image files/captions as project entries before considering the gallery fully migrated. Public ArtStation/DeviantArt links remain accessible from the redesign.
2. **YouTube thumbnails/playback:** genuine thumbnail URLs are retained with a title-card fallback. This environment could not retrieve valid thumbnail image bytes, so no broken download was committed. Availability, image crop and embed permission need a normal-browser check. Prefer locally uploaded stills for predictable long-term thumbnails.
3. **CV:** no public PDF is present. An optional CV setting exists; the button is hidden until a real file is supplied. The private CV/home address was not published.
4. **Expanded project credits/process:** finish contribution descriptions and add genuine behind-the-scenes material when available. The current pages intentionally stick to supportable facts.
5. **Analytics:** the old `G-M2JVB8C6Y7` configuration remains in the untouched legacy homepage. Analytics is not loaded in the new front end. Decide what measurement/consent approach to use at launch.
6. **Hosting:** the initial inspection found `CNAME` but no deployment workflow. The subsequent GitHub Actions deployment now builds and publishes `dist/` from `codex/portfolio-redesign`. Keep GitHub Pages on the Actions workflow, rather than publishing the source root through Jekyll. The original domain and `main` ref are preserved.

## Why Astro

Markdown content is validated and rendered into static project pages, with reusable components for every layout. It suits a portfolio that will grow frequently without requiring a database, paid editor service or a client-side application framework. A future CMS can write these same content files without replacing the front end.

The original template's layout and JavaScript are not dependencies of the redesign. Its original attribution comments are retained with the legacy code; new layout/components/styles are separate.

## Verification

- Astro content/type check.
- Production build of the complete site.
- Every generated internal link and local media reference checked against output files.
- Legacy domain/privacy/game-route checks.
- Static content and click-to-load embed checks.
- A real unpublished example exercises draft exclusion from project routes, listings and sitemap.
- Scaffolder tests for quoted titles, unsafe slugs and overwrite prevention.
- Filter logic tested for multiple categories, combined stages/search and no-match results.

Browser QA was unavailable in this environment. Visual checks at narrow/mobile widths, keyboard interactions and live video playback remain launch checks; the tests above do not substitute for those checks.
