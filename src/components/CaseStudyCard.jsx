import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GREEN = '#5FBF8B';

export default function CaseStudyCard({ study }) {
  return (
    <Link
      to={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col border border-edge bg-steel/40 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-signal/50"
      aria-label={`View case study: ${study.title}`}
    >
      <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest">
        <span className="border border-accent/40 px-2 py-1 text-accent">{study.caseStudyType}</span>
        <span className="border border-edge px-2 py-1 text-muted">{study.industry}</span>
      </div>

      <div className="mt-5 font-mono text-[11px] uppercase tracking-widest text-signal">
        {study.eyebrow || study.category}
      </div>
      <h3 className="mt-2 font-display text-xl font-semibold uppercase leading-tight tracking-wide text-body">
        {study.title}
      </h3>

      {study.heroMetrics && (
        <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden border border-edge bg-edge">
          {study.heroMetrics.map((m) => (
            <div key={m.label} className="bg-charcoal px-3 py-3">
              <div
                className={`font-mono text-base font-medium ${m.tone === 'accent' ? 'text-accent' : 'text-body'}`}
                style={m.tone === 'positive' ? { color: GREEN } : undefined}
              >
                {m.value}
              </div>
              <div className="mt-1 text-[10.5px] leading-snug text-muted">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-5 text-sm leading-relaxed text-muted">{study.summary}</p>

      <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-xs uppercase tracking-widest text-accent transition-colors group-hover:text-accent-hover">
        View case study <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
