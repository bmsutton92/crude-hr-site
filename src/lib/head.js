import { SITE, getSeo } from './seo.js';

// Head tags this module manages are marked so we can update the same nodes on
// each navigation instead of piling up duplicates. Runs entirely on the client
// (DOM only) — no build-time or server behavior.
const MARK = 'data-seo';

function upsert(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    el.setAttribute(MARK, '');
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(attr, key, content) {
  const el = upsert(`meta[${attr}="${key}"][${MARK}]`, () => {
    const m = document.createElement('meta');
    m.setAttribute(attr, key);
    return m;
  });
  el.setAttribute('content', content);
}

export function applyHead(pathname) {
  if (typeof document === 'undefined') return;
  const seo = getSeo(pathname);

  document.title = seo.title;
  setMeta('name', 'description', seo.description);

  const canonical = upsert(`link[rel="canonical"][${MARK}]`, () => {
    const l = document.createElement('link');
    l.setAttribute('rel', 'canonical');
    return l;
  });
  canonical.setAttribute('href', seo.canonical);

  setMeta('property', 'og:type', seo.ogType || 'website');
  setMeta('property', 'og:site_name', SITE.name);
  setMeta('property', 'og:title', seo.title);
  setMeta('property', 'og:description', seo.description);
  setMeta('property', 'og:url', seo.canonical);
  setMeta('property', 'og:image', SITE.ogImage);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', seo.title);
  setMeta('name', 'twitter:description', seo.description);
  setMeta('name', 'twitter:image', SITE.ogImage);
}
