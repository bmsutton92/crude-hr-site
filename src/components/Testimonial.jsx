import { Quote } from 'lucide-react';

// A named reference quote. Attribution is required — these are real people
// who approved use of their name, title, and words.
export default function Testimonial({ quote, name, role, context, className = '' }) {
  return (
    <figure
      className={`flex h-full flex-col border border-edge bg-steel/40 p-7 ${className}`}
    >
      <Quote size={26} className="shrink-0 text-accent" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-body">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-edge pt-4">
        <div className="font-display text-lg font-semibold uppercase tracking-wide text-body">
          {name}
        </div>
        <div className="font-mono text-xs uppercase tracking-widest text-accent">
          {role}
        </div>
        {context && <div className="mt-1 text-sm text-muted">{context}</div>}
      </figcaption>
    </figure>
  );
}
