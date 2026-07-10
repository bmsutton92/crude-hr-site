import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/demo', label: 'Live Demo' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `font-mono text-xs uppercase tracking-widest transition-colors ${
      isActive ? 'text-accent' : 'text-muted hover:text-body'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-navy/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl font-bold uppercase tracking-tight text-body">
            Crude<span className="text-accent">HR</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="btn-accent rounded px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-white"
          >
            Book a Workflow Review
          </Link>
        </nav>

        <button
          type="button"
          className="text-body md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-edge bg-charcoal px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-accent mt-1 inline-block w-fit rounded px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-white"
            >
              Book a Workflow Review
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
