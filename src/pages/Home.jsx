import { Link } from 'react-router-dom';
import { Workflow, AppWindow, Users, FileWarning, Clock, EyeOff, Repeat, MonitorPlay } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import StatBlock from '../components/StatBlock.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import CaseCard from '../components/CaseCard.jsx';
import BlogCard from '../components/BlogCard.jsx';
import WorkflowDiagram from '../components/WorkflowDiagram.jsx';
import CTASection from '../components/CTASection.jsx';
import CaseStudyCard from '../components/CaseStudyCard.jsx';
import { posts } from '../lib/posts.js';
import { caseStudies } from '../lib/caseStudies.js';
import heroPortrait from '../assets/brittany-hero.jpg';

const painPoints = [
  {
    icon: FileWarning,
    title: 'Paper rides around in trucks',
    text: 'Field tickets, JSAs, and timesheets are filled out on location, then spend days traveling before anyone in the office can act on them. Some never arrive.',
  },
  {
    icon: Repeat,
    title: 'Everything gets typed twice',
    text: 'The office re-keys field data into spreadsheets, then into payroll, then into billing. Every handoff adds hours of admin time and another chance for an error.',
  },
  {
    icon: Clock,
    title: 'Approvals stall in inboxes',
    text: 'Bonuses, purchases, and sign-offs wait on whoever is hardest to reach this week. Nothing escalates, nothing is tracked, and payroll cutoffs get missed.',
  },
  {
    icon: EyeOff,
    title: 'Nobody can see the work',
    text: 'Unbilled jobs, pending tickets, and compliance gaps stay invisible until they become fire drills at month-end or during an audit.',
  },
];

const caseCards = [
  {
    label: 'Demo build',
    title: 'Digital field ticketing',
    problem: 'Paper tickets take days to reach billing and get re-keyed by hand.',
    approach: 'A mobile ticketing app with rate-book pricing, GPS stamps, digital sign-off, and supervisor approval.',
    tools: ['Custom React app', 'Power Automate'],
    payoff: 'Same-day ticket visibility, zero re-keying.',
  },
  {
    label: 'Common client scenario',
    title: 'Bonus and payroll approval',
    problem: 'Variable pay approvals live in email threads and miss payroll cutoffs.',
    approach: 'Automated routing with escalation rules and a timestamped audit trail feeding the pay run.',
    tools: ['n8n', 'Power Automate'],
    payoff: 'Approvals in hours, a clean trail for every dollar.',
  },
  {
    label: 'Process example',
    title: 'Onboarding automation',
    problem: 'New-hire paperwork delays start dates and leaves compliance gaps.',
    approach: 'Digital packets, automatic task routing to IT and payroll, and a live checklist per hire.',
    tools: ['Make', 'HRIS integrations'],
    payoff: 'Field-ready on day one, documents complete.',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-glow relative overflow-hidden border-b border-edge">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(51,58,71,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(51,58,71,0.35) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:py-28 md:grid-cols-[1fr_minmax(0,380px)]">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Automation / Custom Apps / Fractional HR
              </span>
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Your back office runs on paper.
              <span className="text-gradient-accent"> It doesn't have to.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Crude HR helps oilfield, industrial, transportation, and manufacturing businesses
              across Texas and the surrounding energy markets replace manual back-office processes
              with practical automation, custom apps, and fractional HR support. Less admin work,
              more visibility, no added headcount.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/contact"
                className="btn-accent inline-block rounded px-8 py-3 text-center font-mono text-sm font-semibold uppercase tracking-widest text-white"
              >
                Book a Workflow Review
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 rounded border border-signal/60 bg-signal/10 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-signal transition-colors hover:bg-signal/20"
              >
                <MonitorPlay size={16} /> Try the Live Demo
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Bring one manual process, spreadsheet, approval chain, or paper workflow. I'll
              review where it breaks down, what can be simplified, and whether automation or a
              custom app makes sense.
            </p>
          </Reveal>

          <Reveal delay={150} className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-3 -z-10 border border-accent/30" />
              <img
                src={heroPortrait}
                alt="Brittany Sutton, founder of Crude HR"
                className="w-full border border-edge shadow-2xl shadow-black/40"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/95 to-transparent p-4">
                <div className="font-display text-lg font-semibold uppercase tracking-wide text-body">
                  Brittany Sutton
                </div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  Founder / 15+ Years HR &amp; Ops / SHRM-CP
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              The Problem
            </div>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              Manual work is quietly your most expensive department
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Field-heavy businesses run on tickets, timesheets, approvals, and compliance docs.
              When those live on paper and in inboxes, the cost shows up as admin hours, delayed
              invoices, and problems nobody sees coming.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {painPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="flex h-full gap-4 border border-edge bg-steel/40 p-6">
                  <p.icon size={22} className="mt-1 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              What I Do
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              Three ways to get the paper out of the process
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Built for oilfield, industrial, transportation, and manufacturing operations across
              Texas, the Gulf Coast, and the Permian Basin — with the field terminology (JSAs,
              company-man sign-off, day-rate crews) generic software leaves out.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Reveal>
              <ServiceCard
                icon={Workflow}
                title="Process Automation"
                what="Platform-agnostic automation of the workflows that eat your admin time: approvals, handoffs, notifications, and document routing."
                outcome="Work moves itself. Your team handles exceptions, not routing."
                to="/services"
              />
            </Reveal>
            <Reveal delay={100}>
              <ServiceCard
                icon={AppWindow}
                title="Custom App Development"
                what="Purpose-built internal tools like field ticketing, tally sheets, and approval dashboards, built to match how your crews actually work."
                outcome="Software that fits the field instead of forcing the field to fit software."
                to="/services"
              />
            </Reveal>
            <Reveal delay={200}>
              <ServiceCard
                icon={Users}
                title="Fractional HR Support"
                what="Senior HR operations leadership without the full-time salary: compliance, onboarding, payroll processes, and HRIS cleanup."
                outcome="An HR function that scales with headcount instead of chasing it."
                to="/services"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Workflow diagram */}
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              How It Works
            </div>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              From the wellsite to the balance sheet, one flow
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              This is the pipeline I build most often. Capture the work where it happens, route
              the approval automatically, and let one clean record feed payroll and billing.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <WorkflowDiagram />
          </Reveal>
          <Reveal className="mt-8">
            <p className="text-sm text-muted">
              Want to click through it yourself?{' '}
              <Link to="/demo" className="font-mono text-xs uppercase tracking-widest text-signal underline underline-offset-4">
                Try the live field ticketing demo
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">Portfolio</div>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              Workflow examples and build concepts
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Honest framing: these are the workflows I build and the scenarios I see most, shown
              as capability rather than client history.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {caseCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 100} className="h-full">
                <CaseCard {...c} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link
              to="/portfolio"
              className="font-mono text-xs uppercase tracking-widest text-accent hover:text-accent-hover"
            >
              See all workflow examples →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Founder credibility */}
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              Featured Case Studies
            </div>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              See the process, the operating problem, and the proposed result
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Clearly labeled prototypes and anonymized professional experience—without invented
              client names or performance claims.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {caseStudies.filter((study) => study.featured).slice(0, 2).map((study, index) => (
              <Reveal key={study.slug} delay={index * 100} className="h-full">
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link
              to="/portfolio"
              className="font-mono text-xs uppercase tracking-widest text-accent hover:text-accent-hover"
            >
              View all case studies →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Founder credibility */}
      <section className="border-b border-edge bg-charcoal py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <Reveal>
              <div className="font-mono text-xs uppercase tracking-widest text-accent">
                The Founder
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
                Built by someone who has run the back office in the field
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Brittany Sutton spent 15+ years leading HR and operations inside oilfield services,
                transportation, and manufacturing companies. She has scaled workforces, cleaned up
                payroll and compliance processes, and lived the paper problem firsthand. Crude HR
                pairs that operator experience with practical automation and custom app
                development.
              </p>
              <figure className="mt-8 border-l-2 border-accent pl-5">
                <blockquote className="text-base italic leading-relaxed text-body">
                  “The old systems of paper were scrapped, and Brittany had the entire set of
                  historical records — totaling tens of thousands — and the entire department
                  converted to electronic documents within weeks.”
                </blockquote>
                <figcaption className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">
                  Derek S. — President, LATX Operations
                </figcaption>
              </figure>
              <Link
                to="/about"
                className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-accent hover:text-accent-hover"
              >
                More about Brittany →
              </Link>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2">
              <Reveal delay={100}>
                <StatBlock value={423} prefix="82 → " label="Oilfield services workforce scaled, as head of HR" />
              </Reveal>
              <Reveal delay={200}>
                <StatBlock value={64} suffix="%" label="Reduction in time-to-hire" />
              </Reveal>
              <Reveal delay={300}>
                <StatBlock value={4.8} prefix="$" suffix="M" decimals={1} label="Annualized labor savings identified in one manufacturing role" />
              </Reveal>
              <Reveal delay={400}>
                <StatBlock value={98} suffix="%" label="Post-merger employee retention" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              From the Blog
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              Straight talk on process and automation
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 100} className="h-full">
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="One process. One call. A clear answer." />
    </>
  );
}
