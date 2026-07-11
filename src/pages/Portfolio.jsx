import Reveal from '../components/Reveal.jsx';
import CaseCard from '../components/CaseCard.jsx';
import CTASection from '../components/CTASection.jsx';

const cases = [
  {
    label: 'Demo build',
    title: 'Digital field ticketing workflow',
    problem: 'Paper tickets filled out on location take days to reach the office, get re-keyed by hand, and go missing between the truck and billing.',
    approach: 'A mobile-first ticketing app: crews log hours, equipment, and materials priced from a live rate book, capture GPS and digital signatures, and submit from the wellsite. Supervisors approve from their phone.',
    tools: ['Custom React app', 'Power Automate'],
    payoff: 'Tickets visible to the office the same day, with zero re-keying between the field and the invoice. Try it on the live demo page.',
  },
  {
    label: 'Common client scenario',
    title: 'Bonus and payroll approval workflow',
    problem: 'Bonus structures with supervisor sign-offs live in email threads and spreadsheets, miss payroll cutoffs, and leave no trail when questions come up.',
    approach: 'Automated routing that sends each request to the right approver, escalates when it sits too long, and writes every decision to a timestamped log that feeds the pay run.',
    tools: ['n8n', 'Power Automate'],
    payoff: 'Approvals close in hours, payroll gets clean inputs, and every dollar of variable pay has a trail.',
  },
  {
    label: 'Process example',
    title: 'Onboarding automation',
    problem: 'New-hire paperwork trickles in over weeks, start dates slip, and required documents surface missing during audits.',
    approach: 'Digital offer-to-day-one packets with automatic task routing to IT, payroll, and safety, plus a live per-hire checklist HR can see at a glance.',
    tools: ['Make', 'HRIS integrations'],
    payoff: 'Hires are field-ready on day one and the personnel file is complete before they start.',
  },
  {
    label: 'Operational use case',
    title: 'HR operations cleanup',
    problem: 'Years of growth leave employee data scattered across spreadsheets, an underused HRIS, and someone\'s desk drawer. Nobody trusts any single source.',
    approach: 'Consolidate to one system of record, rebuild the core processes around it (changes, terminations, leaves), and document the workflow so it survives turnover.',
    tools: ['HRIS migration', 'Process documentation'],
    payoff: 'One trustworthy source for employee data and processes that do not depend on memory.',
  },
  {
    label: 'Sample workflow',
    title: 'Paper-to-digital workflow replacement',
    problem: 'A form that works fine on paper (inspections, JSAs, tally sheets) creates delay and blindness the moment it needs to be shared, counted, or audited.',
    approach: 'Rebuild the form as a mobile capture flow with validation, photos, and automatic routing, keeping the field experience as fast as the clipboard version.',
    tools: ['Custom React app', 'Make', 'n8n'],
    payoff: 'The data is usable the moment it is captured, and audit season stops being a search party.',
  },
  {
    label: 'Common client scenario',
    title: 'Field-to-finance process visibility',
    problem: 'Leadership cannot answer basic questions (what is unbilled, what is stuck, what did this week look like) without a day of digging.',
    approach: 'Connect ticket capture, approvals, and billing handoffs into one pipeline, then surface pending, stuck, and unbilled work on a simple dashboard.',
    tools: ['Power Automate', 'Dashboarding'],
    payoff: 'Owners see problems while they are small, before they hit payroll, billing, or a client call.',
  },
];

export default function Portfolio() {
  return (
    <>
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">Portfolio</div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              The workflows I build
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 100} className="h-full">
                <CaseCard {...c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Have a workflow that looks like one of these?" />
    </>
  );
}
