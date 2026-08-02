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
      'Map one manual process end to end, cut the dead steps, and automate the rest with the platform that fits: n8n, Power Automate, Make, or direct integrations.',
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
      'Purpose-built internal tools (field ticketing, tally sheets, inspection forms, approval dashboards) designed around how your crews actually work.',
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

const REVIEW_INCLUDES = [
  'Current-state process mapping',
  'Approval and handoff analysis',
  'Duplicate-entry and exception points',
  'Recommended future-state workflow',
  'Automation or custom-app opportunities',
  'Implementation priorities',
  'Preliminary build scope and pricing',
  'Written findings and recommendations',
];

export default function Pricing() {
  return (
    <>
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">Pricing</div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              Priced to the work, not to your headcount
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Every engagement begins with a free 15-minute Workflow Triage to confirm fit and
              determine whether the process is ready for a detailed review. When deeper analysis is
              needed, the next step is a $1,000 founding-client Workflow Review. The full review fee
              is credited toward implementation when the project is approved and the deposit is paid
              within 30 days.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How the process works */}
      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">How It Works</div>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              How the Crude HR process works
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-5">
            <Reveal>
              <div className="flex flex-col gap-4 border border-edge bg-steel/40 p-6 sm:flex-row sm:gap-6">
                <div className="flex items-center gap-3 sm:w-60 sm:flex-col sm:items-start">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-accent font-mono text-sm font-bold text-accent">1</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide">Free 15-Minute Workflow Triage</h3>
                    <div className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">Investment: $0</div>
                  </div>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted">
                  We briefly discuss one workflow, where it appears to stall, who is involved, and what
                  outcome you need. The purpose is to confirm fit and project readiness, not complete the
                  full assessment for free.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-col gap-4 border border-accent bg-steel/60 p-6 sm:flex-row sm:gap-6">
                <div className="flex items-center gap-3 sm:w-60 sm:flex-col sm:items-start">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-accent bg-accent font-mono text-sm font-bold text-white">2</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide">Workflow Review</h3>
                    <div className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">Founding-client investment: $1,000</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-muted">
                    If the opportunity is a good fit, the next step is a focused review of the selected
                    workflow. The review may include:
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {REVIEW_INCLUDES.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-body">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-col gap-4 border border-edge bg-steel/40 p-6 sm:flex-row sm:gap-6">
                <div className="flex items-center gap-3 sm:w-60 sm:flex-col sm:items-start">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-accent font-mono text-sm font-bold text-accent">3</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide">Implementation</h3>
                    <div className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">$1,000 review fee credited</div>
                  </div>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted">
                  Crude HR can then build or automate the recommended workflow. If you approve an
                  implementation project and pay the project deposit within 30 days of the Workflow
                  Review, the full $1,000 review fee is credited toward the build.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Build pricing tiers */}
      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">Build Pricing</div>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              What implementation typically costs
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Ranges below are indicative starting points. The specific number is tied to a real
              scope after the Workflow Review.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
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

      <CTASection
        heading="Not sure what your workflow needs?"
        body="Start with a free 15-minute Workflow Triage. We will discuss one process, confirm whether there is a practical opportunity, and determine the right next step."
        buttonLabel="Book a Free Workflow Triage"
      />
    </>
  );
}
