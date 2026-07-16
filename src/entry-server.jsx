import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { posts } from './lib/posts.js';
import { getSeo, SITE } from './lib/seo.js';
import { renderHeadHtml } from './lib/head.js';

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

// All routes that should be prerendered to static HTML.
export function getRoutes() {
  const staticRoutes = [
    '/',
    '/services',
    '/portfolio',
    '/blog',
    '/about',
    '/contact',
    '/pricing',
    '/demo',
  ];
  const blogRoutes = posts.map((p) => `/blog/${p.slug}`);
  return [...staticRoutes, ...blogRoutes];
}

export function headFor(url) {
  return renderHeadHtml(getSeo(url));
}

export function buildSitemap() {
  const urls = getRoutes().map((path) => {
    const loc = `${SITE.url}${path === '/' ? '/' : path}`;
    let lastmod;
    if (path.startsWith('/blog/')) {
      const slug = path.slice('/blog/'.length);
      const post = posts.find((p) => p.slug === slug);
      lastmod = post?.date || undefined;
    }
    return { loc, lastmod, priority: path === '/' ? '1.0' : '0.7' };
  });

  const body = urls
    .map(
      ({ loc, lastmod, priority }) =>
        `  <url>\n    <loc>${loc}</loc>${
          lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
        }\n    <priority>${priority}</priority>\n  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}
