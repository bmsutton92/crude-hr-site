import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-charcoal">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="font-display text-xl font-bold uppercase tracking-tight text-body">
              Crude<span className="text-accent">HR</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Practical automation, custom internal apps, and HR operations systems for businesses
              outgrowing manual work.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Site</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/services" className="text-body hover:text-accent">Services</Link></li>
              <li><Link to="/portfolio" className="text-body hover:text-accent">Portfolio</Link></li>
              <li><Link to="/demo" className="text-body hover:text-accent">Live Demo</Link></li>
              <li><Link to="/blog" className="text-body hover:text-accent">Blog</Link></li>
              <li><Link to="/about" className="text-body hover:text-accent">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Get Started</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Bring one manual process. I will show you where it breaks down and what to do about
              it.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-block border border-accent px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-white"
            >
              Book a Workflow Review
            </Link>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-edge pt-6 text-xs text-muted sm:flex-row">
          <span>Crude HR Consulting, Kilgore, Texas. Serving oilfield and industrial operations across Texas and the Gulf Coast.</span>
          <span>&copy; {new Date().getFullYear()} Crude HR. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
