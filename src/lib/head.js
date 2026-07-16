import { SITE, getSeo, serializeJsonLd } from './seo.js';

// Head tags this module manages are marked so we can update the same nodes the
// prerender step wrote (or update them on client navigation) instead of piling
// up duplicates.
const MARK = 'data-seo';

// Ordered descriptors for a route's head, used by both the client updater and
// the build-time prerenderer so the two never drift.
export function headTags(seo) {
  const tags = [
    { tag: 'title', text: seo.title },
    { tag: 'meta', attrs: { name: 'description', content: seo.description } },
    { tag: 'link', attrs: { rel: 'canonical', href: seo.canonical } },
    { tag: 'meta', attrs: { property: 'og:type', content: seo.ogType || 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE.name } },
    { tag: 'meta', attrs: { property: 'og:title', content: seo.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: seo.description } },
    { tag: 'meta', attrs: { property: 'og:url', content: seo.canonical } },
    { tag: 'meta', attrs: { property: 'og:image', content: SITE.ogImage } },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'en_US' } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: seo.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: seo.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: SITE.ogImage } },
  ];
  if (seo.jsonLd) {
    tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, json: seo.jsonLd });
  }
  return tags;
}

function escAttr(v) {
  return String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escText(v) {
  return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Build the <head> markup for a route at build time (prerender step).
export function renderHeadHtml(seo) {
  return headTags(seo)
    .map(({ tag, text, attrs = {}, json }) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${escAttr(v)}"`)
        .join(' ');
      if (tag === 'title') return `<title ${MARK}>${escText(text)}</title>`;
      if (tag === 'script') return `<script ${attrStr} ${MARK}>${serializeJsonLd(json)}</script>`;
      return `<${tag} ${attrStr} ${MARK} />`;
    })
    .join('\n    ');
}

// Update the live document head on client-side navigation.
export function applyHead(pathname) {
  if (typeof document === 'undefined') return;
  const seo = getSeo(pathname);
  document.querySelectorAll(`[${MARK}]`).forEach((el) => {
    if (el.tagName !== 'TITLE') el.remove();
  });
  for (const { tag, text, attrs = {}, json } of headTags(seo)) {
    if (tag === 'title') {
      document.title = text;
      continue;
    }
    const el = document.createElement(tag);
    el.setAttribute(MARK, '');
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    if (tag === 'script' && json) el.textContent = serializeJsonLd(json);
    document.head.appendChild(el);
  }
}
