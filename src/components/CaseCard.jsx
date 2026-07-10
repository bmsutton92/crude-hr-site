export default function CaseCard({ label, title, problem, approach, tools, payoff }) {
  return (
    <div className="flex h-full flex-col border border-edge bg-steel/40 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-signal/50">
      <div className="font-mono text-[11px] uppercase tracking-widest text-signal">{label}</div>
      <h3 className="mt-2 font-display text-xl font-semibold uppercase tracking-wide text-body">
        {title}
      </h3>
      <div className="mt-4 space-y-4 text-sm leading-relaxed">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">Problem</div>
          <p className="mt-1 text-muted">{problem}</p>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">Approach</div>
          <p className="mt-1 text-muted">{approach}</p>
        </div>
        {payoff && (
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted">Payoff</div>
            <p className="mt-1 text-body">{payoff}</p>
          </div>
        )}
      </div>
      {tools && (
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {tools.map((t) => (
            <span
              key={t}
              className="border border-edge bg-navy px-2 py-1 font-mono text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
