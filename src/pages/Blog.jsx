import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import BlogCard from '../components/BlogCard.jsx';
import { posts } from '../lib/posts.js';

function encode(data) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&');
}

export default function Blog() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'newsletter', email }),
      });
      setStatus('done');
      setEmail('');
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
              Blog / Newsletter
            </div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              Straight talk on process, paper, and automation
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Short, practical posts for owners and operators of field-heavy businesses. No vendor
              pitches, no buzzwords.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 100} className="h-full">
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <div className="border border-edge bg-charcoal p-8 sm:p-10">
              <div className="font-mono text-xs uppercase tracking-widest text-accent">
                Newsletter
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">
                One useful idea per issue
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Occasional notes on cutting admin work in field-heavy businesses. Unsubscribe any
                time.
              </p>
              {status === 'done' ? (
                <p className="mt-5 font-mono text-sm text-signal">
                  You're on the list. Talk soon.
                </p>
              ) : (
                <form
                  name="newsletter"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubscribe}
                  className="mt-5 flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <input type="hidden" name="form-name" value="newsletter" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full border border-edge bg-navy px-4 py-3 text-sm text-body placeholder:text-muted focus:border-accent focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-accent shrink-0 rounded px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Joining…' : 'Subscribe'}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="mt-3 text-sm text-accent">
                  Something went wrong. Try again, or email me instead.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
