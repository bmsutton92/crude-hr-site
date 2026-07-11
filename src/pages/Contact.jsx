import { useState } from 'react';
import { CalendarClock, Users, Search, ArrowDown } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';

function encode(data) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&');
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', process: '' });
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

  return (
    <>
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              Book a Workflow Review
            </div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              Bring one messy process. Leave with a plan.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              A workflow review is thirty minutes, free, and specific. No slide deck, no discovery
              questionnaire, just your process on the table. Send the details below and I'll reach
              out within one business day to set a time.
            </p>
            <a
              href="#request-form"
              className="btn-accent mt-8 inline-flex items-center gap-2 rounded px-8 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white"
            >
              Request Your Review <ArrowDown size={15} />
            </a>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Bring one manual process, spreadsheet, approval chain, or paper workflow. I'll
              review where it breaks down, what can be simplified, and whether automation or a
              custom app makes sense.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full border border-edge bg-steel/40 p-7">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-accent" />
                  <h2 className="font-display text-xl font-semibold uppercase tracking-wide">
                    Who should book this
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Owners, CFOs, COOs, and HR or operations leaders at field-heavy businesses:
                  oilfield services, industrial contractors, transportation, manufacturing, and any
                  company where the back office still runs on paper, spreadsheets, and chased-down
                  signatures.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full border border-edge bg-steel/40 p-7">
                <div className="flex items-center gap-3">
                  <Search size={20} className="text-accent" />
                  <h2 className="font-display text-xl font-semibold uppercase tracking-wide">
                    What the call covers
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  I walk through your one process step by step: where it starts, who touches it,
                  where it stalls, and what it feeds. You leave knowing which steps to cut, whether
                  automation or a custom app makes sense, and roughly what a fix would involve.
                  If the honest answer is "do not automate this," that is what you will hear.
                </p>
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
                Share the one process you want reviewed and I'll come to the call prepared. I
                reply within one business day.
              </p>

              {status === 'done' ? (
                <p className="mt-6 font-mono text-sm text-signal">
                  Got it. I'll be in touch within one business day.
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
                      <span className="font-mono text-xs uppercase tracking-widest text-muted">
                        Name
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={update}
                        className="mt-2 w-full border border-edge bg-navy px-4 py-3 text-sm text-body focus:border-accent focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono text-xs uppercase tracking-widest text-muted">
                        Company
                      </span>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={update}
                        className="mt-2 w-full border border-edge bg-navy px-4 py-3 text-sm text-body focus:border-accent focus:outline-none"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={update}
                      className="mt-2 w-full border border-edge bg-navy px-4 py-3 text-sm text-body focus:border-accent focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      The one process you want reviewed
                    </span>
                    <textarea
                      name="process"
                      rows={4}
                      required
                      value={form.process}
                      onChange={update}
                      placeholder="Example: our field tickets are still on paper and billing runs two to three weeks behind the work."
                      className="mt-2 w-full border border-edge bg-navy px-4 py-3 text-sm text-body placeholder:text-muted/70 focus:border-accent focus:outline-none"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-accent mt-2 w-fit rounded px-8 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send it over'}
                  </button>
                  {status === 'error' && (
                    <p className="text-sm text-accent">
                      Something went wrong. Try again in a minute.
                    </p>
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
