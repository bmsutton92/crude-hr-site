import { Workflow, AppWindow, ClipboardList, GitBranch, Banknote, Users, Wrench, UserPlus, ShieldCheck } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import CTASection from '../components/CTASection.jsx';

const groups = [
  {
    heading: 'Automation and Custom Builds',
    services: [
      {
        icon: Workflow,
        title: 'Workflow Automation',
        what: 'I map a manual process end to end, cut the steps that earn nothing, and automate the rest with whatever platform fits: n8n, Power Automate, Make, or plain integrations.',
        outcome: 'Admin hours drop and the process stops depending on who is in the office.',
      },
      {
        icon: AppWindow,
        title: 'Custom App Builds',
        what: 'Purpose-built internal tools such as ticketing apps, tally sheets, inspection forms, and approval dashboards, designed around how your crews actually work.',
        outcome: 'Software that fits the field, owned by you, with no per-seat license creep.',
      },
      {
        icon: ClipboardList,
        title: 'Digital Field Ticketing Workflows',
        what: 'Replace paper tickets with mobile capture: rate-book pricing, GPS stamps, digital signatures, and instant submission to the office.',
        outcome: 'Same-day ticket visibility and invoices that go out while the job is still fresh.',
      },
      {
        icon: GitBranch,
        title: 'Approval Routing',
        what: 'Route approvals automatically to the right person, escalate when they sit, and keep a timestamped trail of every decision.',
        outcome: 'Approvals in hours instead of weeks, with an audit trail built in.',
      },
      {
        icon: Banknote,
        title: 'Payroll, Bonus, and Invoice Handoff Workflows',
        what: 'Clean up the workflow before it hits payroll, billing, or compliance. One approved record feeds the pay run and the invoice without re-keying.',
        outcome: 'Payroll and billing that match the field, every cycle.',
      },
    ],
  },
  {
    heading: 'HR Operations',
    services: [
      {
        icon: Users,
        title: 'Fractional HR Support',
        what: 'Senior HR leadership on a fractional basis: policy, compliance, employee relations escalations, and payroll process oversight without a full-time salary.',
        outcome: 'An experienced HR operator in your corner for a fraction of the cost.',
      },
      {
        icon: Wrench,
        title: 'HR Operations Cleanup',
        what: 'Untangle the spreadsheets, duplicate records, and half-finished HRIS setups that accumulate as a company grows.',
        outcome: 'One source of truth for employee data and processes people actually follow.',
      },
      {
        icon: UserPlus,
        title: 'Onboarding Process Automation',
        what: 'Digital new-hire packets, automatic task routing to IT and payroll, and a live checklist so nothing falls through between offer and first day.',
        outcome: 'New hires that are field-ready on day one, with complete files.',
      },
      {
        icon: ShieldCheck,
        title: 'Compliance and Documentation Workflows',
        what: 'Get certifications, acknowledgments, JSAs, and required documents captured digitally, tracked to expiration, and retrievable in seconds.',
        outcome: 'Audit requests answered from a screen, not a storage room.',
      },
    ],
  },
];

export default function Services() {
  return (
    <>
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">Services</div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              Fix the process. Then automate it.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Every engagement starts with the workflow, not the software. These are the problems
              I take on most.
            </p>
          </Reveal>
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.heading} className="border-b border-edge py-16">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-body">
                {group.heading}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {group.services.map((s, i) => (
                <Reveal key={s.title} delay={(i % 2) * 100} className="h-full">
                  <div className="flex h-full gap-5 border border-edge bg-steel/40 p-6 transition-transform duration-300 hover:-translate-y-1">
                    <s.icon size={22} className="mt-1 shrink-0 text-accent" />
                    <div>
                      <h3 className="font-display text-xl font-semibold uppercase tracking-wide">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{s.what}</p>
                      <p className="mt-3 border-t border-edge pt-3 text-sm leading-relaxed text-body">
                        {s.outcome}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTASection heading="Not sure which service fits? Start with the process." />
    </>
  );
}
