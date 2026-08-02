// Keyword-matched answers used when the AI endpoint is unavailable
// (local dev without `netlify dev`, or no ANTHROPIC_API_KEY set in Netlify).
// { text, book } — book: true appends the booking call-to-action card.

const RULES = [
  {
    keywords: ['book', 'schedule', 'meeting', 'appointment', 'call', 'talk', 'consult', 'review'],
    text: 'The best next step is a free 15-minute Workflow Triage. Bring one messy process and Brittany will confirm the primary friction point, whether Crude HR is the right fit, and the most sensible next step. Fill out the form below and she will reach out within one business day.',
    book: true,
  },
  {
    keywords: ['price', 'pricing', 'cost', 'rate', 'charge', 'fee', 'how much'],
    text: 'Pricing is scoped to the process, not a rate sheet. Simple automations start around $2,500 and custom app builds around $6,000, with most projects landing in the low five figures. It starts with a free 15-minute Workflow Triage; a $1,000 founding-client Workflow Review produces the detailed scope and pricing, and it is credited toward the build if you move forward within 30 days.',
    book: true,
  },
  {
    keywords: ['service', 'offer', 'do you do', 'help with', 'automation', 'automate', 'workflow', 'app', 'ticket'],
    text: 'Crude HR does two things: automation and custom builds (workflow automation, custom internal apps, digital field ticketing, approval routing, payroll and invoice handoff workflows) and HR operations (fractional HR support, HR cleanup, onboarding automation, compliance and documentation workflows). The full list is on the Services page.',
  },
  {
    keywords: ['hr', 'fractional', 'payroll', 'onboarding', 'compliance', 'hiring'],
    text: 'On the HR side, Crude HR offers fractional HR support, HR operations cleanup, onboarding process automation, and compliance and documentation workflows: senior HR leadership without the full-time salary.',
  },
  {
    keywords: ['who', 'industries', 'oilfield', 'industrial', 'transportation', 'manufacturing', 'texas', 'gulf'],
    text: 'Crude HR works with field-heavy businesses across Texas and the Gulf Coast (oilfield services, industrial contractors, transportation, and manufacturing), typically with owners, CFOs, COOs, and HR or operations leaders.',
  },
  {
    keywords: ['demo', 'example', 'sample', 'show me'],
    text: 'There is a live demo of a custom field ticketing app on this site. Head to the Live Demo page to click through it. It shows the kind of purpose-built internal tools Crude HR delivers.',
  },
  {
    keywords: ['brittany', 'founder', 'about'],
    text: 'Crude HR was founded by Brittany Sutton, based in Kilgore, Texas. You can read more on the About page, or book a free 15-minute Workflow Triage to talk with her directly.',
  },
];

const DEFAULT_REPLY = {
  text: 'Good question. The fastest way to get a real answer is a free 15-minute Workflow Triage with Brittany. You can also browse the Services page, or ask me about services, industries, or the live demo.',
  book: true,
};

export function getFallbackReply(input) {
  const text = input.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => text.includes(k))) {
      return { text: rule.text, book: Boolean(rule.book) };
    }
  }
  return DEFAULT_REPLY;
}
