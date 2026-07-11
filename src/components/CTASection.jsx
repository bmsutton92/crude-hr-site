import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export default function CTASection({
  heading = 'Bring me one messy process.',
  compact = false,
}) {
  return (
    <section className={`border-t border-edge bg-charcoal ${compact ? 'py-14' : 'py-20'}`}>
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-widest text-accent">
            Workflow Review
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Bring one manual process, spreadsheet, approval chain, or paper workflow. I'll review
            where it breaks down, what can be simplified, and whether automation or a custom app
            makes sense.
          </p>
          <Link
            to="/contact"
            className="btn-accent mt-8 inline-block rounded px-8 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white"
          >
            Book a Workflow Review
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
