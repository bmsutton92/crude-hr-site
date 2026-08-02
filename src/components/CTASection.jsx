import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

const DEFAULT_BODY =
  "Bring one manual process, spreadsheet, approval chain, or field-to-office handoff. In a free 15-minute Workflow Triage, we'll confirm the primary friction point, whether Crude HR is the right fit, and the most sensible next step.";

export default function CTASection({
  heading = 'One process. Fifteen minutes. A clear next step.',
  body = DEFAULT_BODY,
  eyebrow = 'Workflow Triage',
  buttonLabel = 'Book a Free Workflow Triage',
  compact = false,
}) {
  return (
    <section className={`border-t border-edge bg-charcoal ${compact ? 'py-14' : 'py-20'}`}>
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-widest text-accent">
            {eyebrow}
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{body}</p>
          <Link
            to="/contact"
            className="btn-accent mt-8 inline-block rounded px-8 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white"
          >
            {buttonLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
