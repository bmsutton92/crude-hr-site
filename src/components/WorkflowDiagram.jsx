import { useEffect, useRef, useState } from 'react';
import { ClipboardList, GitBranch, Banknote, LineChart } from 'lucide-react';

const B = ({ children }) => <strong className="font-semibold text-body">{children}</strong>;

const nodes = [
  {
    icon: ClipboardList,
    step: '01 / Capture',
    title: 'Field Ticket Captured',
    detail: (
      <>
        Hands log hours, equipment, and materials on location. <B>GPS stamped</B>, priced from the
        rate book, <B>signed on glass</B>.
      </>
    ),
    status: 'TICKET FT-2214 SUBMITTED',
  },
  {
    icon: GitBranch,
    step: '02 / Route',
    title: 'Approval Routed',
    detail: (
      <>
        The ticket goes straight to the supervisor and client rep. <B>No truck rides to town</B>,
        no lost carbon copies.
      </>
    ),
    status: 'SUPERVISOR APPROVED 14:32',
  },
  {
    icon: Banknote,
    step: '03 / Handoff',
    title: 'Payroll and Billing Split',
    detail: (
      <>
        <B>One approved record feeds both sides.</B> Payroll hours to the pay run, billable line
        items to the invoice.
      </>
    ),
    status: 'INVOICE DRAFTED $18,410',
  },
  {
    icon: LineChart,
    step: '04 / Visibility',
    title: 'Finance Sees It Same Day',
    detail: (
      <>
        Revenue on the books <B>the day the work happens</B>, not three weeks later when the paper
        shows up.
      </>
    ),
    status: 'DSO DOWN, ZERO RE-KEYING',
  },
];

function Connector({ vertical, delay }) {
  return vertical ? (
    <svg width="2" height="36" className="mx-auto md:hidden" aria-hidden="true">
      <line
        x1="1" y1="0" x2="1" y2="36"
        stroke="#4C9BE8" strokeWidth="2"
        className="wf-line"
        style={{ '--wf-len': 36, animationDelay: `${delay}ms` }}
      />
    </svg>
  ) : (
    <svg width="100%" height="2" viewBox="0 0 100 2" preserveAspectRatio="none" className="hidden w-full md:block" aria-hidden="true">
      <line
        x1="0" y1="1" x2="100" y2="1"
        stroke="#4C9BE8" strokeWidth="2"
        className="wf-line"
        style={{ '--wf-len': 100, animationDelay: `${delay}ms` }}
      />
    </svg>
  );
}

export default function WorkflowDiagram() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`border border-edge bg-charcoal ${animate ? 'wf-animate' : ''}`}>
      <div className="flex items-center justify-between border-b border-edge px-5 py-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Field-to-Finance Pipeline
        </span>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-signal">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-signal" />
          Live Flow
        </span>
      </div>

      <div className="grid items-stretch gap-0 p-5 md:grid-cols-[1fr_44px_1fr_44px_1fr_44px_1fr] md:gap-0 md:p-8">
        {nodes.map((n, i) => (
          <div key={n.title} className="contents">
            {i > 0 && (
              <div className="flex items-center py-2 md:py-0 md:px-1">
                <Connector vertical delay={300 * i} />
                <Connector delay={300 * i} />
              </div>
            )}
            <div
              className="wf-node border border-edge bg-navy p-4"
              style={{ transitionDelay: `${200 + 300 * i}ms` }}
            >
              <div className="flex items-center gap-2">
                <n.icon size={16} className="text-signal" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-signal">
                  {n.step}
                </span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold uppercase leading-tight tracking-wide text-body">
                {n.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{n.detail}</p>
              <div className="mt-3 border-t border-edge pt-2 font-mono text-[10px] tracking-wider text-signal">
                {n.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-px border-t border-edge bg-edge sm:grid-cols-3">
        {[
          ['Re-keying between systems', 'Eliminated'],
          ['Ticket-to-invoice lag', 'Weeks to same day'],
          ['Where the record lives', 'One system, searchable'],
        ].map(([k, v]) => (
          <div key={k} className="bg-charcoal px-5 py-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{k}</div>
            <div className="mt-1 font-display text-base font-semibold uppercase text-body">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
