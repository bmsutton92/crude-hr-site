import { SITE, getSeo, serializeJsonLd } from './seo.js';

// Head tags managed by our SEO layer are marked with this attribute so the
// client can update the exact same nodes the prerender step wrote, instead of
// duplicating them.
const MARK = 'data-seo';

// Build the ordered list of head tags for a given SEO object. Returned as
// plain descriptors so the same source can produce server HTML strings and
// client DOM nodes.
export function headTags(seo) {
  const tags = [];
  tags.push({ tag: 'title', text: seo.title });
  tags.push({ tag: 'meta', attrs: { name: 'description', content: seo.description } });
  tags.push({ tag: 'link', attrs: { rel: 'canonical', href: seo.canonical } });

  // Open Graph
  tags.push({ tag: 'meta', attrs: { property: 'og:type', content: seo.ogType || 'website' } });
  tags.push({ tag: 'meta', attrs: { property: 'og:site_name', content: SITE.name } });
  tags.push({ tag: 'meta', attrs: { property: 'og:title', content: seo.title } });
  tags.push({ tag: 'meta', attrs: { property: 'og:description', content: seo.description } });
  tags.push({ tag: 'meta', attrs: { property: 'og:url', content: seo.canonical } });
  tags.push({ tag: 'meta', attrs: { property: 'og:image', content: seo.ogImage || SITE.ogImage } });
  tags.push({ tag: 'meta', attrs: { property: 'og:locale', content: 'en_US' } });

  // Twitter Card
  tags.push({ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } });
  tags.push({ tag: 'meta', attrs: { name: 'twitter:title', content: seo.title } });
  tags.push({ tag: 'meta', attrs: { name: 'twitter:description', content: seo.description } });
  tags.push({ tag: 'meta', attrs: { name: 'twitter:image', content: seo.ogImage || SITE.ogImage } });

  if (seo.jsonLd) {
    tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, json: seo.jsonLd });
  }
  return tags;
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeText(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Render head tags to an HTML string for the prerender step.
export function renderHeadHtml(seo) {
  return headTags(seo)
    .map(({ tag, text, attrs = {}, json }) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
        .join(' ');
      const marked = attrStr ? `${attrStr} ${MARK}` : MARK;
      if (tag === 'title') return `<title ${MARK}>${escapeText(text)}</title>`;
      if (tag === 'script') return `<script ${marked}>${serializeJsonLd(json)}</script>`;
      if (tag === 'meta' || tag === 'link') return `<${tag} ${marked} />`;
      return '';
    })
    .join('\n    ');
}

// Apply head tags to the live document during client-side navigation.
export function applyHead(pathname) {
  if (typeof document === 'undefined') return;
  const seo = getSeo(pathname);
  // Remove previously managed tags (except <title>, which we reuse).
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
