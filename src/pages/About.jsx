import Reveal from '../components/Reveal.jsx';
import StatBlock from '../components/StatBlock.jsx';
import CTASection from '../components/CTASection.jsx';
import { BadgeCheck } from 'lucide-react';
import portrait from '../assets/brittany-portrait.jpg';

const themes = [
  'HRIS migrations and cleanup',
  'M&A workforce integration',
  'ACA compliance programs',
  'Workforce scaling in field operations',
  'Payroll and bonus process design',
  'Custom internal tools built with AI-assisted development',
];

export default function About() {
  return (
    <>
      <section className="hero-glow border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-12 md:grid-cols-[1fr_minmax(0,320px)]">
            <Reveal>
              <div className="font-mono text-xs uppercase tracking-widest text-accent">About</div>
              <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
                Operator first. Consultant second.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                Crude HR is founded and run by Brittany Sutton, an HR and operations leader with 15+
                years inside oilfield services, transportation, manufacturing, and education. She has
                sat in the seat her clients sit in: responsible for payroll that has to be right,
                compliance that has to hold up, and field crews that do not have time for clumsy
                software.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative w-fit">
                <img
                  src={portrait}
                  alt="Brittany Sutton, founder of Crude HR"
                  className="w-full max-w-xs border border-edge"
                />
                <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full border border-accent/40" />
              </div>
              <div className="mt-6 border-l-2 border-accent pl-4">
                <div className="font-display text-lg font-semibold uppercase tracking-wide">
                  Brittany Sutton
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted">
                  Founder, SHRM-CP
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              Her track record
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              These numbers come from Brittany's HR leadership roles, not Crude HR client
              engagements. They are her background, stated plainly.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <StatBlock value={423} prefix="82 → " label="Scaled an oilfield services workforce from 82 to 423 employees" />
            </Reveal>
            <Reveal delay={100}>
              <StatBlock value={64} suffix="%" label="Reduction in time-to-hire" />
            </Reveal>
            <Reveal delay={200}>
              <StatBlock value={98} suffix="%" label="Post-merger employee retention" />
            </Reveal>
            <Reveal delay={300}>
              <StatBlock value={95} prefix="$" suffix="K" label="Annual ACA savings delivered at Marshall ISD" />
            </Reveal>
            <Reveal delay={400}>
              <StatBlock value={4.8} prefix="$" suffix="M" decimals={1} label="Annualized labor savings identified at Master Woodcraft" />
            </Reveal>
            <Reveal delay={500}>
              <div className="border-l-2 border-accent pl-4">
                <div className="flex items-center gap-2 font-display text-4xl font-bold text-accent sm:text-5xl">
                  <BadgeCheck size={36} /> SHRM-CP
                </div>
                <div className="mt-1 text-sm leading-snug text-muted">
                  Certified Professional, Society for Human Resource Management
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                Why the automation part is credible
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Plenty of HR consultants talk about technology. Brittany builds with it. She
                designed and launched crudehr.com herself with AI-assisted development, and the
                field ticketing application on the live demo page is a working build, not a
                mockup. The point is not that tools are hard. The point is that she knows both
                sides: what the back office needs and how to actually construct it.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                That combination matters in the field. Most automation fails not because the
                software is bad but because whoever built it never ran a payroll, closed a
                compliance audit, or watched a crew try to use an app with gloves on.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                Recurring themes in her work
              </h2>
              <ul className="mt-4 space-y-3">
                {themes.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection heading="Talk to the person who will do the work." />
    </>
  );
}
