import { Workflow, AppWindow, Users, Check } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import CTASection from '../components/CTASection.jsx';
import { PRICING_FAQ } from '../lib/seo.js';

const tiers = [
  {
    icon: Workflow,
    name: 'Workflow Automation',
    price: 'From ~$2,500',
    unit: 'per workflow, fixed-price',
    blurb:
      'Map one manual process end to end, cut the dead steps, and automate the rest with the platform that fits — n8n, Power Automate, Make, or direct integrations.',
    points: [
      'Fixed project price, scoped up front',
      'No per-seat license creep',
      'Built around your existing systems',
    ],
  },
  {
    icon: AppWindow,
    name: 'Custom App Build',
    price: 'From ~$6,000',
    unit: 'per build, fixed-price',
    blurb:
      'Purpose-built internal tools — field ticketing, tally sheets, inspection forms, approval dashboards — designed around how your crews actually work.',
    points: [
      'You own the app, no ongoing seat fees',
      'Field-tested UX (works with gloves on)',
      'Live field-ticketing demo shows the bar',
    ],
    featured: true,
  },
  {
    icon: Users,
    name: 'Fractional HR Support',
    price: 'Monthly retainer',
    unit: 'sized to your headcount',
    blurb:
      'Senior HR operations leadership without the full-time salary: compliance, onboarding, payroll process oversight, and HRIS cleanup.',
    points: [
      'Scale up or down as the business changes',
      'A fraction of a full-time senior HR hire',
      'Process built to survive turnover',
    ],
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PRICING_FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Pricing() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">Pricing</div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              Priced to the work, not to your headcount
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Builds are fixed-price and owned by you — no per-user SaaS bill that grows every time
              a crew does. Fractional HR is a monthly retainer sized to what you actually need.
              Ranges below are indicative; every engagement starts with a free workflow review so
              the number is tied to a real scope.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 100} className="h-full">
                <div
                  className={`flex h-full flex-col border p-7 ${
                    t.featured ? 'border-accent bg-steel/60' : 'border-edge bg-steel/40'
                  }`}
                >
                  <t.icon size={24} className="text-accent" />
                  <h2 className="mt-4 font-display text-xl font-semibold uppercase tracking-wide">
                    {t.name}
                  </h2>
                  <div className="mt-4 font-display text-3xl font-bold text-accent">{t.price}</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted">
                    {t.unit}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{t.blurb}</p>
                  <ul className="mt-5 space-y-2 border-t border-edge pt-5">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-body">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <p className="max-w-2xl text-sm text-muted">
              Complex, multi-system builds are scoped individually. If the honest answer is that a
              cheaper off-the-shelf tool fits you better, you will hear that on the review call.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">FAQ</div>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              Pricing questions, answered plainly
            </h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {PRICING_FAQ.map((f, i) => (
              <Reveal key={f.q} delay={(i % 3) * 80}>
                <details className="group border border-edge bg-steel/40 p-6">
                  <summary className="cursor-pointer list-none font-display text-lg font-semibold uppercase tracking-wide text-body">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Want a real number for your process? Start with the review." />
    </>
  );
}
