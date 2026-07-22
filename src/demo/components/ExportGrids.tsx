import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Table2 } from "lucide-react";
import { Ticket } from "../types";
import { ticketToExportInput, toNetSuite, toPaylocity } from "../lib/exports";

const STAGGER_MS = 120;

// Columns rendered as money (right-aligned, $ + thousands).
const MONEY_COLS = new Set(["Rate", "Amount"]);
const NUMERIC_COLS = new Set(["Qty", "Hours", "Rate", "Amount"]);

function formatCell(col: string, value: unknown): string {
  if (value === "" || value === null || value === undefined) return "";
  if (MONEY_COLS.has(col) && typeof value === "number") {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return String(value);
}

interface ExportTableProps {
  label: string;
  rows: Array<Record<string, unknown>>;
  totalLabel: string;
  total: number;
  ticketId: string;
  startIndex: number;
  revealed: number;
}

function ExportTable({ label, rows, totalLabel, total, ticketId, startIndex, revealed }: ExportTableProps) {
  const columns = rows.length ? Object.keys(rows[0]) : [];
  return (
    <div className="bg-zinc-900 border border-zinc-850 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-850 bg-zinc-950">
        <ArrowRight size={14} className="text-amber-500" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-500">
          {label}
        </span>
        <span className="ml-auto text-[9px] font-mono uppercase tracking-widest text-zinc-500">
          {rows.length} rows
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[11px] font-mono">
          <thead>
            <tr className="bg-zinc-950/60">
              {columns.map((col) => (
                <th
                  key={col}
                  className={`px-3 py-2 border-b border-zinc-850 text-[9px] font-bold uppercase tracking-wider text-zinc-500 whitespace-nowrap ${
                    NUMERIC_COLS.has(col) ? "text-right" : "text-left"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const shown = startIndex + i < revealed;
              return (
                <tr
                  key={i}
                  className="odd:bg-zinc-900 even:bg-zinc-950/40"
                  style={{
                    opacity: shown ? 1 : 0,
                    transform: shown ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity .3s ease, transform .3s ease",
                  }}
                >
                  {columns.map((col) => (
                    <td
                      key={col}
                      className={`px-3 py-1.5 border-b border-zinc-850/60 whitespace-nowrap ${
                        MONEY_COLS.has(col)
                          ? "text-right text-amber-500 font-semibold"
                          : NUMERIC_COLS.has(col)
                          ? "text-right text-zinc-300"
                          : "text-left text-zinc-300"
                      }`}
                    >
                      {formatCell(col, row[col])}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-zinc-850 bg-zinc-950">
        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">{totalLabel}</span>
        <span className="text-xs font-mono font-bold text-amber-500">
          ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
      <div className="px-4 py-2 bg-zinc-900 text-[9px] font-mono text-zinc-500">
        Generated from ticket {ticketId} — <span className="text-green-500 font-bold">0 fields re-keyed</span>
      </div>
    </div>
  );
}

export default function ExportGrids({ ticket }: { ticket: Ticket | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(0);

  const data = useMemo(() => {
    if (!ticket) return null;
    const input = ticketToExportInput(ticket);
    return { netsuite: toNetSuite(input), paylocity: toPaylocity(input), id: input.id };
  }, [ticket]);

  const totalRows = data ? data.netsuite.rows.length + data.paylocity.rows.length : 0;

  // Animate rows in one at a time, NetSuite first then Paylocity, so it reads
  // as data streaming out of the ticket.
  useEffect(() => {
    if (!data) return;
    setRevealed(0);
    setMounted(false);
    const mountT = setTimeout(() => setMounted(true), 30);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= totalRows; i++) {
      timers.push(setTimeout(() => setRevealed(i), 220 + i * STAGGER_MS));
    }
    const scrollT = setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 450);
    return () => {
      clearTimeout(mountT);
      clearTimeout(scrollT);
      timers.forEach(clearTimeout);
    };
  }, [data, totalRows]);

  if (!data) return null;

  return (
    <div
      ref={containerRef}
      className="scroll-mt-4"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(12px)",
        transition: "opacity .4s ease, transform .4s ease",
      }}
    >
      <div className="bg-zinc-900 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-zinc-950 border-b border-zinc-850 px-6 py-2.5 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
          <span className="flex items-center gap-1.5">
            <Table2 size={12} className="text-amber-500" />
            EXPORT_ENGINE: PARSED FROM APPROVED TICKET
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
        </div>

        <div className="p-4 md:p-6 flex flex-col gap-4">
          <p className="text-[11px] text-zinc-400 leading-normal">
            Column headers map to your systems. Swap NetSuite/Paylocity for SAP, ADP, QuickBooks —
            same parse.
          </p>

          <ExportTable
            label="→ NetSuite (Billing)"
            rows={data.netsuite.rows as Array<Record<string, unknown>>}
            totalLabel="Invoice Total"
            total={data.netsuite.total}
            ticketId={data.id}
            startIndex={0}
            revealed={revealed}
          />

          <ExportTable
            label="→ Paylocity (Payroll)"
            rows={data.paylocity.rows as Array<Record<string, unknown>>}
            totalLabel="Gross Pay"
            total={data.paylocity.gross}
            ticketId={data.id}
            startIndex={data.netsuite.rows.length}
            revealed={revealed}
          />
        </div>
      </div>
    </div>
  );
}
