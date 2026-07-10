import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ icon: Icon, title, what, outcome, to }) {
  const body = (
    <>
      {Icon && (
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-edge bg-navy text-accent">
          <Icon size={20} />
        </div>
      )}
      <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-body">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{what}</p>
      {outcome && (
        <p className="mt-3 border-t border-edge pt-3 text-sm leading-relaxed text-body">
          {outcome}
        </p>
      )}
      {to && (
        <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-accent">
          Learn more <ArrowRight size={13} />
        </span>
      )}
    </>
  );

  const cardClass =
    'block border border-edge bg-steel/40 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-accent/60';

  return to ? (
    <Link to={to} className={cardClass}>
      {body}
    </Link>
  ) : (
    <div className={cardClass.replace('hover:-translate-y-1 hover:border-accent/60', '')}>{body}</div>
  );
}
