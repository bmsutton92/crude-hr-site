import { useEffect, useRef, useState } from 'react';

// Counts up to `value` once when scrolled into view. `value` is the numeric part;
// prefix/suffix carry symbols like $, %, +, K, M.
export default function StatBlock({ value, prefix = '', suffix = '', label, decimals = 0 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        if (reduced) {
          setDisplay(value);
          return;
        }
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(value * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="border-l-2 border-accent pl-4">
      <div className="font-display text-4xl font-bold text-accent sm:text-5xl">
        {prefix}
        {display.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-1 text-sm leading-snug text-muted">{label}</div>
    </div>
  );
}
