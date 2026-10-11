import { getProjects, projectUrl } from '../lib/projects';
export async function GET() {
  const paths = [
    '/',
    '/work/',
    '/development/',
    '/about/',
    '/games/',
    ...(await getProjects()).map(projectUrl),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>https://wrightgames.org${path}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
