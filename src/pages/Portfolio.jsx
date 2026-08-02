import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import CaseStudyCard from '../components/CaseStudyCard.jsx';
import CTASection from '../components/CTASection.jsx';
import { caseStudies } from '../lib/caseStudies.js';

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
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Real field problems, priced out to the dollar, and the digitized workflows that close
              the gap. Each case study breaks down where paper cost the operation and what an
              automated fix pays back.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={(i % 2) * 100} className="h-full">
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Live demo callout */}
      <section className="border-b border-edge bg-charcoal py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-signal">See it working</div>
            <h2 className="mt-2 max-w-xl font-display text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">
              Try the live field ticketing demo
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">
              A working mobile-first ticketing app: log operational units, capture GPS and signatures,
              and submit from the wellsite. The same kind of build behind these case studies.
            </p>
          </div>
          <Link
            to="/demo"
            className="inline-flex flex-none items-center gap-2 self-start rounded border border-edge px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-body transition-colors hover:border-signal/60 hover:text-accent sm:self-auto"
          >
            Open the demo <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTASection heading="Have a workflow that looks like one of these?" />
    </>
  );
}
