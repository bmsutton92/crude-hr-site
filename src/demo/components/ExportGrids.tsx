import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Table2, Download, ChevronDown } from "lucide-react";
import { Ticket } from "../types";
import { ticketToExportInput, toNetSuite, toPaylocity, rowsToCsv } from "../lib/exports";

const STAGGER_MS = 120;
const BILLING_SYSTEMS = ["NetSuite", "SAP", "QuickBooks"];
const PAYROLL_SYSTEMS = ["Paylocity", "ADP", "Paycom"];

const MONEY_COLS = new Set(["Rate", "Amount"]);
const NUMERIC_COLS = new Set(["Qty", "Hours", "Rate", "Amount"]);

function formatCell(col: string, value: unknown): string {
  if (value === "" || value === null || value === undefined) return "";
  if (MONEY_COLS.has(col) && typeof value === "number") {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return String(value);
}

// Client-side CSV download via Blob — no server involved.
function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function encodeForm(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join("&");
}

interface ExportTableProps {
  kind: string; // "Billing" | "Payroll"
  system: string;
  systemOptions: string[];
  onSystemChange: (v: string) => void;
  rows: Array<Record<string, unknown>>;
  totalLabel: string;
  total: number;
  ticketId: string;
  startIndex: number;
  revealed: number;
  onDownload: () => void;
}

function ExportTable({
  kind, system, systemOptions, onSystemChange, rows, totalLabel, total, ticketId, startIndex, revealed, onDownload,
}: ExportTableProps) {
  const columns = rows.length ? Object.keys(rows[0]) : [];
  return (
    <div className="bg-zinc-900 border border-zinc-850 rounded-xl overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-b border-zinc-850 bg-zinc-950">
        <ArrowRight size={14} className="text-amber-500 shrink-0" />
        {/* System-name selector — changes the label only, not the data */}
        <div className="relative">
          <select
            aria-label={`${kind} system`}
            value={system}
            onChange={(e) => onSystemChange(e.target.value)}
            className="appearance-none bg-zinc-900 border border-zinc-800 text-amber-500 text-[11px] font-mono font-bold uppercase tracking-widest rounded pl-2 pr-6 py-1 cursor-pointer hover:border-zinc-700 focus:outline-none focus:border-amber-500/60"
          >
            {systemOptions.map((s) => (
              <option key={s} value={s} className="bg-zinc-900 text-zinc-200">{s}</option>
            ))}
          </select>
          <ChevronDown size={12} className="text-amber-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-500">({kind})</span>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">{rows.length} rows</span>
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 hover:border-amber-500/60 hover:text-amber-500 text-zinc-300 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded transition cursor-pointer"
          >
            <Download size={11} /> Download CSV
          </button>
        </div>
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
  const [billingSystem, setBillingSystem] = useState(BILLING_SYSTEMS[0]);
  const [payrollSystem, setPayrollSystem] = useState(PAYROLL_SYSTEMS[0]);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const data = useMemo(() => {
    if (!ticket) return null;
    const input = ticketToExportInput(ticket);
    return { netsuite: toNetSuite(input), paylocity: toPaylocity(input), id: input.id };
  }, [ticket]);

  const totalRows = data ? data.netsuite.rows.length + data.paylocity.rows.length : 0;

  useEffect(() => {
    if (!data) return;
    setRevealed(0);
    setMounted(false);
    setEmailStatus("idle");
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

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || emailStatus === "sending") return;
    setEmailStatus("sending");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({ "form-name": "demo-export", email, context: `Demo export — ticket ${data.id}` }),
      });
      setEmailStatus("done");
      setEmail("");
    } catch {
      setEmailStatus("error");
    }
  };

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
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] text-zinc-400 leading-normal max-w-xl">
              Column headers map to your systems. Swap NetSuite/Paylocity for SAP, ADP, QuickBooks —
              same parse.
            </p>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/25 px-2 py-1 rounded whitespace-nowrap">
              Sample data — not a real ticket
            </span>
          </div>

          <ExportTable
            kind="Billing"
            system={billingSystem}
            systemOptions={BILLING_SYSTEMS}
            onSystemChange={setBillingSystem}
            rows={data.netsuite.rows as Array<Record<string, unknown>>}
            totalLabel="Invoice Total"
            total={data.netsuite.total}
            ticketId={data.id}
            startIndex={0}
            revealed={revealed}
            onDownload={() =>
              downloadCsv(`${billingSystem.toLowerCase()}-billing-${data.id}.csv`, rowsToCsv(data.netsuite.rows as Array<Record<string, unknown>>))
            }
          />

          <ExportTable
            kind="Payroll"
            system={payrollSystem}
            systemOptions={PAYROLL_SYSTEMS}
            onSystemChange={setPayrollSystem}
            rows={data.paylocity.rows as Array<Record<string, unknown>>}
            totalLabel="Gross Pay"
            total={data.paylocity.gross}
            ticketId={data.id}
            startIndex={data.netsuite.rows.length}
            revealed={revealed}
            onDownload={() =>
              downloadCsv(`${payrollSystem.toLowerCase()}-payroll-${data.id}.csv`, rowsToCsv(data.paylocity.rows as Array<Record<string, unknown>>))
            }
          />

          {/* Optional lead capture — download works without it. Only the email is sent (Netlify Forms). */}
          {emailStatus === "done" ? (
            <p className="text-[11px] font-mono text-green-500">
              Thanks — I'll reach out about wiring this into your systems.
            </p>
          ) : (
            <form
              name="demo-export"
              method="POST"
              data-netlify="true"
              onSubmit={submitEmail}
              className="flex flex-col gap-2 border-t border-zinc-850 pt-4 sm:flex-row sm:items-center"
            >
              <input type="hidden" name="form-name" value="demo-export" />
              <label htmlFor="demo-export-email" className="text-[11px] text-zinc-400 sm:mr-1">
                Want these wired into your <span className="text-zinc-200">actual</span> systems? Optional — leave an email:
              </label>
              <div className="flex gap-2">
                <input
                  id="demo-export-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="min-w-0 flex-1 bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono px-3 py-2 rounded placeholder-zinc-600 focus:outline-none focus:border-amber-500/60 sm:w-56"
                />
                <button
                  type="submit"
                  disabled={emailStatus === "sending"}
                  className="shrink-0 bg-amber-500 text-black text-[10px] font-mono font-black uppercase tracking-widest px-3 py-2 rounded hover:bg-amber-400 transition cursor-pointer disabled:opacity-60"
                >
                  {emailStatus === "sending" ? "Sending…" : "Keep me posted"}
                </button>
              </div>
              {emailStatus === "error" && (
                <span className="text-[10px] text-rose-400 font-mono">Couldn't send — try the contact page.</span>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
