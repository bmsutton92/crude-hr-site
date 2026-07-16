// Post-build prerender: renders each route to static HTML so non-JS crawlers,
// AI answer engines, and social link-preview bots receive real content and
// per-route metadata. Runs purely in Node (no headless browser), so it works
// in CI / Netlify builds. The client re-renders on load via createRoot.
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render, getRoutes, headFor, buildSitemap } = await import(
  fileURLToPath(new URL(`file://${ssrEntry}`))
);

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Strip the placeholder <title> and <meta name="description"> from the built
// template so per-route tags don't duplicate them.
function cleanHead(html) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta\s+name="description"[^>]*>/i, '');
}

function injectRoute(html, appHtml, headHtml) {
  const withHead = cleanHead(html).replace('</head>', `    ${headHtml}\n  </head>`);
  return withHead.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function outFileFor(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

const routes = getRoutes();
let count = 0;
for (const route of routes) {
  const appHtml = render(route);
  const headHtml = headFor(route);
  const html = injectRoute(template, appHtml, headHtml);
  const outFile = outFileFor(route);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  count += 1;
}

// Sitemap (kept in sync with the route list, including blog posts).
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemap());

console.log(`Prerendered ${count} routes + sitemap.xml`);
