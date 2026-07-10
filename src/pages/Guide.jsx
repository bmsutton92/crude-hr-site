import Reveal from '../components/Reveal.jsx';
import CTASection from '../components/CTASection.jsx';

const swatches = [
  ['Navy', '#0C1017', 'Base background'],
  ['Charcoal', '#171B22', 'Raised surfaces'],
  ['Steel', '#2A2F3A', 'Cards and dividers'],
  ['Accent', '#C96A3B', 'CTAs, key stats, industrial labels'],
  ['Signal', '#4C9BE8', 'Workflow diagram and live data states only'],
];

const sections = [
  {
    title: 'The concept',
    body: 'Three ideas fused into one system: Industrial Executive (dark, high-contrast, serious), Automation Command Center (dashboard panels, mono labels, live-feeling data), and Founder-Led Authority (real career numbers, first-person credibility, no agency gloss). Every design decision on the site traces back to one of those three.',
  },
  {
    title: 'Layout strategy',
    body: 'A single 6xl container, strong left-aligned editorial blocks, and a consistent section rhythm: mono kicker label, condensed uppercase headline, one short paragraph, then the content. Dashboard-style bordered panels carry the technical sections (the workflow diagram, the demo) so the automation story is shown, not claimed.',
  },
  {
    title: 'Color',
    body: 'The palette is mostly navy, charcoal, and steel with white text. A muted burnt orange (#C96A3B) is rationed to CTAs, stat numbers, and small labels so it always means "act here" or "this number matters," with a subtle orange-to-black gradient reserved for the hero and primary buttons. Steel blue (#4C9BE8) appears only inside workflow and data contexts, which quietly separates marketing from machinery. No yellow, no gold, anywhere.',
  },
  {
    title: 'Typography',
    body: 'Barlow Condensed (600/700) for display, set uppercase with tight tracking for an industrial signage feel. Inter for body copy at a comfortable line height. IBM Plex Mono for kicker labels, workflow node text, and anything that should read as system output rather than marketing.',
  },
  {
    title: 'Motion',
    body: 'Restrained and single-purpose: sections fade and rise once on entry, stat numbers count up once in view, and the workflow diagram draws its connector lines when scrolled into view. Cards lift slightly on hover. Everything respects prefers-reduced-motion and nothing loops, autoplays, or parallaxes.',
  },
  {
    title: 'How it was built',
    body: 'Vite, React, React Router, and Tailwind CSS, written with Fable and Opus in Claude Code. Blog posts are plain markdown files loaded with import.meta.glob, forms post to Netlify, and the whole site deploys as a static bundle. No CMS, no database, no backend to maintain.',
  },
  {
    title: 'Adapting the concept',
    body: 'The system transfers to any founder-led technical services firm. Keep the ratios: dark neutral base, one hot accent rationed to actions and proof points, one cool accent reserved for the technical artifact, condensed display type over a quiet body face. Swap the workflow diagram for whatever artifact proves your craft, and keep the claims as concrete as the design.',
  },
];

export default function Guide() {
  return (
    <>
      <section className="border-b border-edge py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              Design Guide
            </div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              How this site was designed
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              A short, honest breakdown of the concept and the choices behind it, for anyone
              curious or anyone who wants to adapt it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Palette</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {swatches.map(([name, hex, use], i) => (
              <Reveal key={name} delay={i * 80}>
                <div className="border border-edge">
                  <div className="h-20" style={{ backgroundColor: hex }} />
                  <div className="bg-charcoal p-3">
                    <div className="font-display text-base font-semibold uppercase">{name}</div>
                    <div className="font-mono text-xs text-muted">{hex}</div>
                    <div className="mt-1 text-xs text-muted">{use}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-edge py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 100}>
                <h2 className="font-display text-xl font-semibold uppercase tracking-wide">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection compact heading="Enough about the site. Let's talk about your process." />
    </>
  );
}
