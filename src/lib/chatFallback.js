// Keyword-matched answers used when the AI endpoint is unavailable
// (local dev without `netlify dev`, or no ANTHROPIC_API_KEY set in Netlify).
// { text, book } — book: true appends the booking call-to-action card.

const RULES = [
  {
    keywords: ['book', 'schedule', 'meeting', 'appointment', 'call', 'talk', 'consult', 'review'],
    text: 'The best next step is a free 30-minute workflow review — bring one messy process and Brittany will walk through where it breaks down and whether automation or a custom app makes sense. Fill out the form below and she will reach out within one business day.',
    book: true,
  },
  {
    keywords: ['price', 'pricing', 'cost', 'rate', 'charge', 'fee', 'how much'],
    text: 'Pricing depends on the process and the fix, so it is scoped on the free workflow review call rather than off a rate sheet. The review itself is free and takes thirty minutes.',
    book: true,
  },
  {
    keywords: ['service', 'offer', 'do you do', 'help with', 'automation', 'automate', 'workflow', 'app', 'ticket'],
    text: 'Crude HR does two things: automation and custom builds (workflow automation, custom internal apps, digital field ticketing, approval routing, payroll and invoice handoff workflows) and HR operations (fractional HR support, HR cleanup, onboarding automation, compliance and documentation workflows). The full list is on the Services page.',
  },
  {
    keywords: ['hr', 'fractional', 'payroll', 'onboarding', 'compliance', 'hiring'],
    text: 'On the HR side, Crude HR offers fractional HR support, HR operations cleanup, onboarding process automation, and compliance and documentation workflows — senior HR leadership without the full-time salary.',
  },
  {
    keywords: ['who', 'industries', 'oilfield', 'industrial', 'transportation', 'manufacturing', 'texas', 'gulf'],
    text: 'Crude HR works with field-heavy businesses across Texas and the Gulf Coast — oilfield services, industrial contractors, transportation, and manufacturing — typically with owners, CFOs, COOs, and HR or operations leaders.',
  },
  {
    keywords: ['demo', 'example', 'sample', 'show me'],
    text: 'There is a live demo of a custom field ticketing app on this site — head to the Live Demo page to click through it. It shows the kind of purpose-built internal tools Crude HR delivers.',
  },
  {
    keywords: ['brittany', 'founder', 'about'],
    text: 'Crude HR was founded by Brittany Sutton, based in Kilgore, Texas. You can read more on the About page, or book a free workflow review to talk with her directly.',
  },
];

const DEFAULT_REPLY = {
  text: 'Good question — the fastest way to get a real answer is a free 30-minute workflow review with Brittany. You can also browse the Services page, or ask me about services, industries, or the live demo.',
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
