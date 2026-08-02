import { useState } from 'react';
import { CalendarClock, ClipboardCheck, MinusCircle, ArrowDown, Check } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';

function encode(data) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&');
}

const COVERS = [
  'The workflow you want to improve',
  'The primary delay, handoff, or visibility issue',
  'The people and departments involved',
  'The outcome you want',
  'Whether the opportunity is ready for a detailed review',
  'The recommended next step',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    role: '',
    process: '',
    current: '',
    improve: '',
  });
  const [status, setStatus] = useState('idle');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...form }),
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const fieldClass =
    'mt-2 w-full border border-edge bg-navy px-4 py-3 text-sm text-body focus:border-accent focus:outline-none';
  const labelClass = 'font-mono text-xs uppercase tracking-widest text-muted';

  return (
    <>
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              Book a Free 15-Minute Workflow Triage
            </div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              Bring one messy process. Let's determine the right next step.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              The Workflow Triage is a free, focused 15-minute conversation about one manual
              process, spreadsheet, approval chain, or field-to-office handoff. We will identify the
              main issue at a high level, confirm whether Crude HR is the right fit, and determine
              whether a paid Workflow Review would be worthwhile. No slide deck or lengthy discovery
              questionnaire is required.
            </p>
            <a
              href="#request-form"
              className="btn-accent mt-8 inline-flex items-center gap-2 rounded px-8 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white"
            >
              Request My 15-Minute Triage <ArrowDown size={15} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full border border-edge bg-steel/40 p-7">
                <div className="flex items-center gap-3">
                  <ClipboardCheck size={20} className="text-accent" />
                  <h2 className="font-display text-xl font-semibold uppercase tracking-wide">
                    What the free call covers
                  </h2>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {COVERS.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm leading-relaxed text-body">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full border border-edge bg-steel/40 p-7">
                <div className="flex items-center gap-3">
                  <MinusCircle size={20} className="text-muted" />
                  <h2 className="font-display text-xl font-semibold uppercase tracking-wide">
                    What the free call does not include
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  The free triage does not include detailed process mapping, ROI calculations,
                  software selection, technical architecture, custom workflow design, written
                  recommendations, or a final implementation quote. Those deliverables are completed
                  through the paid Workflow Review.
                </p>
                <div className="mt-5 border-t border-edge pt-5">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                    If there is a fit
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    The founding-client Workflow Review is <strong className="text-accent">$1,000</strong>.
                    If you move forward with implementation and pay the project deposit within 30 days,
                    the entire $1,000 is credited toward your build.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="request-form" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <div className="border border-edge bg-charcoal p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <CalendarClock size={20} className="text-accent" />
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  Tell me about the process
                </h2>
              </div>
              <p className="mt-3 text-sm text-muted">
                Share the one process you want to discuss. I will respond within one business day to
                schedule your 15-minute Workflow Triage.
              </p>

              {status === 'done' ? (
                <p className="mt-6 font-mono text-sm text-signal">
                  Got it. I will respond within one business day to schedule your triage.
                </p>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="mt-6 grid gap-4"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className={labelClass}>Name</span>
                      <input type="text" name="name" required value={form.name} onChange={update} className={fieldClass} />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Company</span>
                      <input type="text" name="company" value={form.company} onChange={update} className={fieldClass} />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Email</span>
                      <input type="email" name="email" required value={form.email} onChange={update} className={fieldClass} />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Your role</span>
                      <input type="text" name="role" value={form.role} onChange={update} className={fieldClass} />
                    </label>
                  </div>
                  <label className="block">
                    <span className={labelClass}>Which process do you want to discuss?</span>
                    <textarea
                      name="process"
                      rows={2}
                      required
                      value={form.process}
                      onChange={update}
                      placeholder="Example: paper field tickets that take two to three weeks to reach billing."
                      className={`${fieldClass} placeholder:text-muted/70`}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>What is currently happening?</span>
                    <textarea
                      name="current"
                      rows={2}
                      value={form.current}
                      onChange={update}
                      placeholder="Where it stalls, who touches it, and what it feeds."
                      className={`${fieldClass} placeholder:text-muted/70`}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>What would you like to improve?</span>
                    <textarea
                      name="improve"
                      rows={2}
                      value={form.improve}
                      onChange={update}
                      placeholder="The outcome you want."
                      className={`${fieldClass} placeholder:text-muted/70`}
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-accent mt-2 w-fit rounded px-8 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : 'Request My 15-Minute Triage'}
                  </button>
                  {status === 'error' && (
                    <p className="text-sm text-accent">Something went wrong. Try again in a minute.</p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
