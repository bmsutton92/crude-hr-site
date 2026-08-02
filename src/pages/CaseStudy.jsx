import { ArrowLeft, ArrowRight, FileWarning } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import CaseStudyCard from '../components/CaseStudyCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { getCaseStudy, getRelatedCaseStudies } from '../lib/caseStudies.js';

// Two accent colors outside the Tailwind theme (positive green / negative red).
// Applied via inline styles, since Tailwind only generates arbitrary classes it
// can find as complete literal strings — interpolated class names are missed.
const RED = '#E8705C';
const GREEN = '#5FBF8B';

function metricStyle(tone) {
  if (tone === 'positive') return { color: GREEN };
  return undefined;
}
function metricClass(tone) {
  if (tone === 'accent') return 'text-accent';
  if (tone === 'positive') return '';
  return 'text-body';
}
function ledgerStyle(tone) {
  if (tone === 'neg') return { color: RED };
  if (tone === 'pos') return { color: GREEN };
  return undefined;
}
function ledgerClass(tone) {
  if (tone === 'head') return 'text-body';
  if (tone === 'neg' || tone === 'pos') return '';
  return 'text-muted';
}

export default function CaseStudy() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  if (!study) {
    return (
      <section className="py-24 text-center">
        <h1 className="font-display text-3xl font-bold uppercase">Case study not found</h1>
        <Link to="/portfolio" className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-accent">
          Back to portfolio
        </Link>
      </section>
    );
  }

  const related = getRelatedCaseStudies(study);

  return (
    <article>
      {/* Hero */}
      <section className="hero-glow border-b border-edge">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-accent"
          >
            <ArrowLeft size={14} /> Back to portfolio
          </Link>
          <Reveal className="mt-8">
            <div className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Case Study · {study.eyebrow}
            </div>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl">
              {study.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{study.summary}</p>
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-3">
            {study.heroMetrics.map((m) => (
              <div key={m.label} className="bg-charcoal px-6 py-6">
                <div className={`font-mono text-3xl font-medium ${metricClass(m.tone)}`} style={metricStyle(m.tone)}>
                  {m.value}
                </div>
                <div className="mt-2 text-sm text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="border-b border-edge py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-widest text-accent">The Problem</div>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight">{study.problem.heading}</h2>
            {study.problem.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-muted">{p}</p>
            ))}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {study.problem.cards.map((c) => (
                <div key={c.label} className="border border-edge bg-steel/40 p-5">
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-widest" style={{ color: RED }}>
                    {c.label}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="lg:sticky lg:top-24">
              {study.problem.exhibit.image ? (
                <a
                  href={study.problem.exhibit.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-edge bg-charcoal transition-colors hover:border-signal/60"
                >
                  <img
                    src={study.problem.exhibit.image}
                    alt={study.problem.exhibit.label}
                    loading="lazy"
                    className="block w-full border-b border-edge"
                  />
                  <div className="p-4">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-accent">
                      {study.problem.exhibit.label}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{study.problem.exhibit.caption}</p>
                    <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors group-hover:text-accent">
                      View full size <ArrowRight size={12} />
                    </span>
                  </div>
                </a>
              ) : (
                <div className="border border-edge bg-charcoal">
                  <div className="flex aspect-[4/5] items-center justify-center border-b border-edge bg-steel/30 p-8 text-center">
                    <FileWarning size={40} className="text-accent/70" strokeWidth={1.5} />
                  </div>
                  <div className="p-4">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-accent">{study.problem.exhibit.label}</div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{study.problem.exhibit.caption}</p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Fix */}
      <section className="border-b border-edge bg-charcoal py-16">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-widest text-accent">The Fix</div>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight">{study.fix.heading}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">{study.fix.intro}</p>
          </Reveal>

          <Reveal className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse border border-edge text-sm">
              <thead>
                <tr className="bg-navy">
                  <th className="border-b border-edge px-4 py-3 text-left font-mono text-[11px] font-semibold uppercase tracking-widest text-body">
                    {study.fix.columns[0]}
                  </th>
                  <th className="border-b border-edge px-4 py-3 text-left font-mono text-[11px] font-semibold uppercase tracking-widest text-muted">
                    {study.fix.columns[1]}
                  </th>
                  <th className="border-b border-edge px-4 py-3 text-left font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
                    {study.fix.columns[2]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {study.fix.rows.map((row, i) => (
                  <tr key={row[0]} className={i % 2 ? 'bg-navy/40' : ''}>
                    <td className="border-b border-edge px-4 py-3 font-medium text-body">{row[0]}</td>
                    <td className="border-b border-edge px-4 py-3 text-muted">{row[1]}</td>
                    <td className="border-b border-edge px-4 py-3 font-medium" style={{ color: GREEN }}>{row[2]}</td>
                  </tr>
                ))}
                <tr className="bg-accent/10">
                  <td className="px-4 py-3 font-display text-base font-bold uppercase tracking-wide text-body">
                    {study.fix.totalRow[0]}
                  </td>
                  <td className="px-4 py-3 font-mono font-medium" style={{ color: RED }}>{study.fix.totalRow[1]}</td>
                  <td className="px-4 py-3 font-mono font-medium" style={{ color: GREEN }}>{study.fix.totalRow[2]}</td>
                </tr>
              </tbody>
            </table>
          </Reveal>

          <p className="mt-6 max-w-3xl leading-relaxed text-muted">
            <span className="font-semibold text-body">The math: </span>
            {study.fix.math}
          </p>
        </div>
      </section>

      {/* Ledger + status panel */}
      <section className="border-b border-edge py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-widest text-accent">{study.ledger.left.eyebrow}</div>
            <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide">{study.ledger.left.heading}</h3>
            <p className="mt-3 leading-relaxed text-muted">{study.ledger.left.intro}</p>
            <div className="mt-6 border border-edge bg-charcoal p-5 font-mono text-[13px] leading-loose">
              {study.ledger.left.lines.map((line) => (
                <div
                  key={line.label}
                  className={`flex justify-between gap-4 ${ledgerClass(line.tone)}`}
                  style={ledgerStyle(line.tone)}
                >
                  <span>{line.label}</span>
                  <span className="whitespace-nowrap">{line.value}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="font-mono text-[11px] uppercase tracking-widest text-accent">{study.ledger.right.eyebrow}</div>
            <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide">{study.ledger.right.heading}</h3>
            <p className="mt-3 leading-relaxed text-muted">{study.ledger.right.intro}</p>
            <div className="mt-6 flex flex-col gap-3">
              {study.ledger.right.statuses.map((s, i) => {
                const color = s.tone === 'pos' ? GREEN : RED;
                return (
                  <div key={i} className="flex items-center gap-3 border border-edge bg-steel/30 px-4 py-3">
                    <span className="h-2 w-2 flex-none rounded-full" style={{ background: color }} />
                    <span className="text-sm font-medium text-body">{s.label}</span>
                    <span
                      className="ml-auto rounded border px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color, borderColor: `${color}66`, background: `${color}1a` }}
                    >
                      {s.status}
                    </span>
                  </div>
                );
              })}
              <div className="flex items-baseline justify-between border border-accent/30 bg-accent/10 px-4 py-3">
                <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  {study.ledger.right.highlight.label}
                </span>
                <span className="font-mono text-lg font-medium text-body">{study.ledger.right.highlight.value}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Deep dive */}
      <section className="border-b border-edge bg-charcoal py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent">Deep Dive Impact</div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {study.deepDive.map((d) => (
              <Reveal key={d.title} className="h-full">
                <div className="h-full border border-edge bg-steel/30 p-6">
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-signal">{d.title}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom line */}
      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h3 className="font-display text-3xl font-bold uppercase tracking-tight">The bottom line</h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {study.bottomLine.map((b, i) => (
              <Reveal key={i} delay={(i % 4) * 80}>
                <div className="h-full border border-edge bg-steel/40 p-5">
                  <div className="font-mono text-2xl font-medium text-accent">{b.value}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {study.tools.map((t) => (
              <span key={t} className="border border-edge bg-navy px-3 py-1.5 font-mono text-[11px] text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Study CTA */}
      <section className="border-b border-edge bg-charcoal py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="max-w-xl font-display text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">
              {study.cta.heading}
            </h3>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">{study.cta.text}</p>
          </div>
          <Link
            to="/contact"
            className="btn-accent inline-flex flex-none items-center gap-2 self-start rounded px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white sm:self-auto"
          >
            Book a Free 15-Minute Workflow Triage <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight">More case studies</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <CaseStudyCard key={item.slug} study={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
