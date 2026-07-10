import { MASTER_PRICE_BOOK } from "../data";
import { ServiceLine } from "../types";
import { BookOpen, BadgeInfo } from "lucide-react";

export default function PriceBookView() {
  return (
    <div id="pricebook-view-panel" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-4 text-zinc-200">
      <div className="flex items-center gap-2 border-b border-zinc-850 pb-2.5">
        <span className="p-1.5 rounded bg-amber-500/10 text-amber-500">
          <BookOpen size={16} />
        </span>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest font-mono text-zinc-400">
            Table1: Master Price Book Rate Card
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono">
            Immutable contract rates mapping
          </p>
        </div>
      </div>

      <p className="text-[11px] text-zinc-400 leading-normal">
        All materials and equipment selections of tickets dynamically pull billing data from this master ledger based on the selected Service Line.
      </p>

      {/* Grouping items by service line */}
      <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
        {Object.values(ServiceLine).map((sl) => {
          const items = MASTER_PRICE_BOOK.filter((item) => item.serviceLine === sl);
          return (
            <div key={sl} className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-bold text-amber-500 font-mono uppercase tracking-wider block border-b border-zinc-900 pb-1.5 mb-2">
                {sl}
              </span>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between text-xs py-1.5 border-b border-zinc-900 last:border-0 last:pb-0">
                    <div className="min-w-0 pr-2">
                      <span className="font-semibold text-zinc-200 block truncate">{item.name}</span>
                      <span className={`text-[8px] uppercase tracking-wide font-mono px-1 rounded-sm ${
                        item.category === "equipment" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-zinc-800 text-zinc-450"
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-bold font-mono text-zinc-200">${item.unitRate}</span>
                      <span className="text-[9px] text-zinc-500 font-mono block">/{item.unitMeasure}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Contract audit compliance status */}
      <div className="bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg flex items-center gap-2 text-[10px] text-zinc-450 leading-relaxed font-mono">
        <BadgeInfo size={14} className="text-amber-500 flex-shrink-0" />
        <span>Price Book fully synchronized with API. Field hand calculations are strictly locked.</span>
      </div>
    </div>
  );
}
