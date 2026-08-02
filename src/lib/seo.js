import { posts, getPost } from './posts.js';
import { getCaseStudy } from './caseStudies.js';

export const SITE = {
  url: 'https://crudehr.com',
  name: 'Crude HR',
  legalName: 'Crude HR Consulting',
  founder: 'Brittany Sutton',
  defaultTitle: 'Crude HR | Texas Field Operations & Workflow Automation',
  defaultDescription:
    'Crude HR helps Texas and Gulf Coast oilfield, industrial, transportation, and manufacturing businesses replace manual back-office processes with practical automation, custom apps, and fractional HR support. Book a free 15-minute Workflow Triage.',
  ogImage: 'https://crudehr.com/og-default.png',
  areaServed: ['Texas', 'Gulf Coast', 'Permian Basin', 'United States'],
};

const organizationLd = {
  '@type': ['ProfessionalService', 'Organization'],
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: `${SITE.url}/`,
  image: SITE.ogImage,
  description: SITE.defaultDescription,
  areaServed: SITE.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kilgore',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  founder: {
    '@type': 'Person',
    name: SITE.founder,
    jobTitle: 'Founder',
    hasCredential: 'SHRM-CP',
  },
  serviceType: [
    'Workflow automation',
    'Custom app development',
    'Digital field ticketing',
    'Fractional HR support',
    'HR operations cleanup',
  ],
};

const personLd = {
  '@type': 'Person',
  '@id': `${SITE.url}/about#brittany-sutton`,
  name: SITE.founder,
  jobTitle: 'Founder, HR & Operations Leader',
  worksFor: { '@id': `${SITE.url}/#organization` },
  hasCredential: 'SHRM-CP',
  description:
    'HR and operations leader with 15+ years inside oilfield services, transportation, manufacturing, and education. Runs payroll, closes compliance audits, and builds the automation herself.',
};

function graph(nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

// Per-route title/description. Keys are exact pathnames (no trailing slash).
const routes = {
  '/': { title: SITE.defaultTitle, description: SITE.defaultDescription },
  '/services': {
    title: 'Services: Workflow Automation, Custom Apps & Fractional HR | Crude HR',
    description:
      'Workflow automation, custom internal app builds, digital field ticketing, approval routing, and fractional HR support for Texas and Gulf Coast oilfield, industrial, and field-service businesses.',
  },
  '/portfolio': {
    title: 'Portfolio: Field-Service Workflow Builds | Crude HR',
    description:
      'Example automation and custom-app builds for field-heavy Texas and Gulf Coast businesses: digital field ticketing, bonus and payroll approval routing, onboarding automation, and HR operations cleanup.',
  },
  '/blog': {
    title: 'Blog: Straight Talk on Process & Automation | Crude HR',
    description:
      'Practical articles on back-office automation, oilfield payroll compliance, and cutting admin work for field-service and industrial businesses across Texas and the Gulf Coast.',
  },
  '/about': {
    title: 'About Brittany Sutton: Operator First. Consultant Second. | Crude HR',
    description:
      'Crude HR is founded and run by Brittany Sutton, an HR and operations leader with 15+ years inside Texas and Gulf Coast oilfield services, transportation, and manufacturing.',
  },
  '/contact': {
    title: 'Book a Free 15-Minute Workflow Triage | Crude HR',
    description:
      'Bring one manual process and start with a free 15-minute Workflow Triage for your Texas or Gulf Coast field-service, oilfield, or industrial business. No slide deck, no discovery questionnaire.',
  },
  '/pricing': {
    title: 'Pricing: Automation, Custom Apps & Fractional HR | Crude HR',
    description:
      'Indicative pricing and engagement models for workflow automation, custom app builds, and fractional HR support for Texas and Gulf Coast field-service and oilfield businesses.',
  },
  '/demo': {
    title: 'Live Field Ticketing Demo | Crude HR',
    description:
      'Try a working digital field-ticketing app built for oilfield and field-service crews: GPS stamps, digital signatures, and supervisor approval. A real build, not a mockup.',
  },
};

function normalize(pathname) {
  if (!pathname) return '/';
  const clean = pathname.split('?')[0].split('#')[0];
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1);
  return clean;
}

export function getSeo(pathname) {
  const path = normalize(pathname);

  if (path.startsWith('/blog/')) {
    const post = getPost(path.slice('/blog/'.length));
    if (post) {
      const canonical = `${SITE.url}/blog/${post.slug}`;
      const description = post.excerpt || SITE.defaultDescription;
      return {
        title: `${post.title} | Crude HR`,
        description,
        canonical,
        ogType: 'article',
        jsonLd: graph([
          organizationLd,
          {
            '@type': 'Article',
            headline: post.title,
            description,
            datePublished: post.date || undefined,
            dateModified: post.date || undefined,
            author: { '@type': 'Person', name: post.author || SITE.founder, '@id': `${SITE.url}/about#brittany-sutton` },
            publisher: { '@id': `${SITE.url}/#organization` },
            mainEntityOfPage: canonical,
            url: canonical,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Blog', item: `${SITE.url}/blog` },
              { '@type': 'ListItem', position: 2, name: post.title, item: canonical },
            ],
          },
        ]),
      };
    }
  }

  if (path.startsWith('/case-studies/')) {
    const study = getCaseStudy(path.slice('/case-studies/'.length));
    if (study) {
      const canonical = `${SITE.url}/case-studies/${study.slug}`;
      const description = study.summary || SITE.defaultDescription;
      return {
        title: `${study.eyebrow}: Case Study | Crude HR`,
        description,
        canonical,
        ogType: 'article',
        jsonLd: graph([
          organizationLd,
          {
            '@type': 'Article',
            headline: study.title,
            description,
            author: { '@type': 'Person', name: SITE.founder, '@id': `${SITE.url}/about#brittany-sutton` },
            publisher: { '@id': `${SITE.url}/#organization` },
            mainEntityOfPage: canonical,
            url: canonical,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Portfolio', item: `${SITE.url}/portfolio` },
              { '@type': 'ListItem', position: 2, name: study.title, item: canonical },
            ],
          },
        ]),
      };
    }
  }

  const meta = routes[path] || { title: SITE.defaultTitle, description: SITE.defaultDescription };
  const nodes = [organizationLd];
  if (path === '/about') nodes.push(personLd);
  if (path === '/blog') {
    nodes.push({
      '@type': 'Blog',
      '@id': `${SITE.url}/blog#blog`,
      name: 'Crude HR Blog',
      url: `${SITE.url}/blog`,
      publisher: { '@id': `${SITE.url}/#organization` },
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${SITE.url}/blog/${p.slug}`,
        datePublished: p.date || undefined,
        author: { '@type': 'Person', name: p.author || SITE.founder },
      })),
    });
  }
  if (path === '/pricing') {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${SITE.url}/pricing#faq`,
      mainEntity: PRICING_FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return {
    title: meta.title,
    description: meta.description,
    canonical: `${SITE.url}${path === '/' ? '/' : path}`,
    ogType: 'website',
    jsonLd: graph(nodes),
  };
}

export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

// Shared FAQ content — rendered on the Pricing page and mirrored in FAQPage schema.
export const PRICING_FAQ = [
  {
    q: 'How much does workflow automation or a custom app build cost?',
    a: 'A simple single-workflow automation starts around $2,500 and a custom app build around $6,000, with most projects landing in the low five figures depending on how many systems the workflow touches and whether a custom app is involved. Builds are fixed-price, not per-seat. Every engagement begins with a free 15-minute Workflow Triage; detailed scope and pricing come from a $1,000 founding-client Workflow Review, which is credited toward the build when you proceed within 30 days.',
  },
  {
    q: 'How does fractional HR pricing work?',
    a: 'Fractional HR support is a monthly retainer sized to your headcount and the scope of work: compliance, onboarding, payroll process oversight, and HR operations cleanup. It is a fraction of the cost of a full-time senior HR hire, and you can scale it up or down as the business changes.',
  },
  {
    q: 'Do you charge per user, like most field-service software?',
    a: 'No. Custom builds are owned by you with no per-seat license creep. That is a deliberate cost advantage over per-user SaaS, which keeps charging more as your crews grow.',
  },
  {
    q: 'Why is there no fixed price list?',
    a: 'Field-service businesses have very different processes, systems, and levels of mess. A fixed menu would either overcharge simple jobs or underscope complex ones. The free Workflow Triage and the paid Workflow Review exist so you get a real, scoped number before committing to a build.',
  },
  {
    q: 'Who do you work with?',
    a: 'Owners, CFOs, COOs, and HR or operations leaders at field-heavy Texas and Gulf Coast businesses (oilfield services, industrial contractors, transportation, and manufacturing) where the back office still runs on paper, spreadsheets, and chased-down signatures.',
  },
];
