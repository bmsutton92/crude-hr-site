// Post-build prerender: render each route to static HTML so non-JS crawlers and
// AI answer engines (GPTBot, ClaudeBot, PerplexityBot) receive real content and
// per-route metadata. Pure Node — no headless browser — so it runs in the
// Netlify build. The browser still re-renders the app on load via createRoot,
// so runtime behavior is unchanged.
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render, getRoutes, headFor } = await import(fileURLToPath(new URL(`file://${ssrEntry}`)));

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Strip the head tags the prerenderer re-injects per route, so nothing is
// duplicated. Leaves charset/viewport/keywords/theme-color/favicon/scripts.
function cleanHead(html) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta\s+name="description"[^>]*>/i, '')
    .replace(/\s*<link\s+rel="canonical"[^>]*>/i, '')
    .replace(/\s*<meta\s+property="og:[^"]*"[^>]*>/gi, '')
    .replace(/\s*<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
    .replace(/\s*<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, '');
}

function injectRoute(html, appHtml, headHtml) {
  return cleanHead(html)
    .replace('</head>', `    ${headHtml}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function outFileFor(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

let count = 0;
for (const route of getRoutes()) {
  const html = injectRoute(template, render(route), headFor(route));
  const outFile = outFileFor(route);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  count += 1;
}

console.log(`Prerendered ${count} routes`);
