import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import DemoApp from '../demo/DemoApp.tsx';

export default function Demo() {
  return (
    <div className="bg-zinc-950">
      <div className="border-b border-edge bg-charcoal">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Info size={16} className="mt-0.5 shrink-0 text-signal" />
            <p className="text-sm text-muted">
              This is a working demo of the digital field ticketing app: create a ticket, price it
              from the rate book, sign it, and approve it as a supervisor. Data stays in your
              browser.
            </p>
          </div>
          <Link
            to="/contact"
            className="w-fit shrink-0 border border-accent px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-white"
          >
            Book a Workflow Review
          </Link>
        </div>
      </div>
      <DemoApp />
    </div>
  );
}
