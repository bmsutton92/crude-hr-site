import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { posts } from './lib/posts.js';
import { caseStudies } from './lib/caseStudies.js';
import { getSeo } from './lib/seo.js';
import { renderHeadHtml } from './lib/head.js';

// Render a route's React tree to an HTML string (build-time only).
export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

// Every route to prerender to static HTML.
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
  return [
    ...staticRoutes,
    ...posts.map((p) => `/blog/${p.slug}`),
    ...caseStudies.map((s) => `/case-studies/${s.slug}`),
  ];
}

export function headFor(url) {
  return renderHeadHtml(getSeo(url));
}
