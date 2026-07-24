import { useState } from "react";
import { Ticket, TicketStatus } from "../types";
import { computeBonus, nextBonusPayDate } from "../lib/exports";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  User, 
  MapPin, 
  Clock, 
  Check, 
  X, 
  FileSpreadsheet, 
  Sparkles,
} from "lucide-react";

interface TicketDetailViewProps {
  ticket: Ticket;
  activeRole: string; // 'hand' | 'companyman' | 'supervisor' | 'admin'
  onApprove?: (ticketId: string) => void;
  onReject?: (ticketId: string, notes: string) => void;
  onClose: () => void;
  onEditDraft?: (ticket: Ticket) => void;
}

export default function TicketDetailView({
  ticket,
  activeRole,
  onApprove,
  onReject,
  onClose,
  onEditDraft
}: TicketDetailViewProps) {
  const [rejectMode, setRejectMode] = useState(false);
  const [correctionNotes, setCorrectionNotes] = useState("");

  const statusColors: Record<TicketStatus, { bg: string; text: string; border: string; icon: any }> = {
    Approved: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/20",
      icon: CheckCircle2
    },
    "Pending Review": {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
      icon: AlertTriangle
    },
    Rejected: {
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      border: "border-rose-500/20",
      icon: XCircle
    },
    Draft: {
      bg: "bg-amber-500/10",
      text: "text-amber-500",
      border: "border-amber-500/20",
      icon: FileSpreadsheet
    }
  };

  const statusInfo = statusColors[ticket.status];
  const StatusIcon = statusInfo.icon;

  // Pricing is decoupled from the field-hand view — dollars render only for the
  // supervisor / office roles. The field hand sees logged operational units only.
  const showPricing = activeRole !== "hand";

  const aggregateTotal = ticket.lineItems.reduce((sum, item) => sum + item.total, 0);

  // The employee's only earning is the bonus (5% of non-3rd-party revenue). Hours bill the client.
  const activeSubtotal = ticket.lineItems.filter(i => !i.isThirdParty).reduce((sum, item) => sum + item.total, 0);
  const passThroughTotal = aggregateTotal - activeSubtotal; // 3rd-party freight / chemicals excluded from bonus
  const activeBonus = activeSubtotal * 0.05;
  const simulatedPayroll = ticket.payrollAmount ?? activeBonus;
  const simulatedBillingInvoice = ticket.billingAmount || aggregateTotal;

  const handleRejectSubmit = () => {
    if (!correctionNotes.trim()) {
      alert("Please provide the specific correction notes so the field employee can adjust spelling/safety checklists.");
      return;
    }
    if (onReject) {
      onReject(ticket.id, correctionNotes.trim());
      setRejectMode(false);
    }
  };

  // Bonus figures for the field-employee approved view — shown as an added panel
  // on top of the same ticket detail they saw when it was pending.
  const showEmployeeBonus = activeRole === "hand" && ticket.status === "Approved";
  const employeeBonus = computeBonus(ticket).bonus;
  const employeeBonusPayDate = nextBonusPayDate(ticket.approvedAt);

  return (
    <div id={`tkt-detail-${ticket.id}`} className="flex flex-col gap-5 px-1 py-1 text-zinc-200">
      
      {/* Top Banner Control */}
      <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-zinc-500">Document Reference</span>
          <h2 className="text-base font-bold text-zinc-100 flex items-center gap-1.5">
            Ticket No: <span className="text-amber-500 font-mono font-medium">{ticket.ticketNumber}</span>
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Ticket current workflow status panel */}
      <div className={`p-4 rounded-xl border ${statusInfo.bg} ${statusInfo.border} flex flex-col gap-2`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusIcon size={16} className={statusInfo.text} />
            <span className={`text-xs font-bold uppercase tracking-widest ${statusInfo.text}`}>
              Status: {ticket.status === "Pending Review" ? "Review" : ticket.status}
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            Created: {new Date(ticket.createdAt).toLocaleDateString()}
          </span>
        </div>

        {ticket.status === "Rejected" && ticket.correctionNotes && (
          <div className="bg-rose-950/20 border border-rose-900/30 p-2.5 rounded-lg mt-1 text-xs">
            <strong className="text-rose-300 block mb-0.5 font-bold uppercase tracking-wide text-[9px]">Supervisor Rejection Feedback:</strong>
            <span className="text-rose-200 font-mono text-[11px] leading-normal">{ticket.correctionNotes}</span>
          </div>
        )}

        {ticket.status === "Approved" && (
          <div className="bg-green-950/25 border border-green-900/30 p-2.5 rounded-lg mt-1 text-xs text-green-300 flex items-start gap-1.5">
            <Check size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-green-200 block font-bold uppercase tracking-wide text-[9px]">Validated Gate Endorsement</strong>
              Document is signed and settled on the live Permian ledger. Financial split processes have executed.
            </div>
          </div>
        )}
      </div>

      {/* Field-employee bonus panel — shown on the approved ticket alongside the full detail */}
      {showEmployeeBonus && (
        <div className="bg-zinc-900 border border-amber-500/25 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">Total Bonus Earned</span>
            <span className="text-2xl font-mono font-black text-amber-500">
              ${employeeBonus.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2">
            <Clock size={13} className="text-green-400" />
            Next bonus pay date: <strong className="text-zinc-200">{employeeBonusPayDate}</strong>
          </div>
        </div>
      )}

      {/* Primary Ops Section split */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
          I. Field & Well Ops Metadata
        </h3>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Service Line</span>
            <span className="text-zinc-200 font-bold">{ticket.serviceLine}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Customer Brand</span>
            <span className="text-zinc-200 font-bold">{ticket.clientName}</span>
          </div>
          <div className="flex flex-col gap-0.5 col-span-2">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Well Identification</span>
            <span className="text-zinc-200 font-semibold">{ticket.wellName}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Salesman Name</span>
            <span className="text-zinc-300 flex items-center gap-1 font-semibold">
              <User size={12} className="text-zinc-400" /> {ticket.supervisorName}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Logged Hours</span>
            <span className="text-zinc-300 flex items-center gap-1 font-semibold font-mono">
              <Clock size={12} className="text-amber-500" /> {ticket.hoursWorked} Hours
            </span>
          </div>
          <div className="flex flex-col gap-0.5 col-span-2">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Field Employee / Direct Report</span>
            <span className="text-zinc-300 flex items-center gap-1 font-bold">
              <User size={12} className="text-amber-500" /> {ticket.fieldHandName || "Cody Rogers"}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 col-span-2 border-t border-zinc-850 pt-2 mt-1">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Job Session Duration Type</span>
            <div className="flex items-center gap-2 mt-1">
              {ticket.isOngoing ? (
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/25 px-2 py-1 rounded inline-flex items-center gap-1">
                    Ongoing Multi-Day Tally
                  </span>
                  {ticket.isJobFinished && (
                    <span className="text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/25 px-2 py-1 rounded inline-flex items-center gap-1">
                      Job Finished (Final Day Tally)
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-[10px] font-mono font-bold bg-zinc-800 text-zinc-400 border border-zinc-750 px-2 py-1 rounded">
                  ⏱ Standard Single-Run Session
                </span>
              )}
            </div>
          </div>

          {(ticket.routeFrom || ticket.routeTo) && (
            <div className="flex flex-col gap-1.5 col-span-2 border-t border-zinc-850 pt-2.5 mt-1.5">
              <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Transit Details (Active Route Log)</span>
              <div className="grid grid-cols-2 gap-3 bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-850/60 font-mono">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[8px] uppercase tracking-wider font-extrabold text-zinc-500">Route Origin (From)</span>
                  <span className="text-[11px] text-zinc-300 font-bold">{ticket.routeFrom || "--"}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                   <span className="text-[8px] uppercase tracking-wider font-extrabold text-zinc-505">Route Destination (To)</span>
                  <span className="text-[11px] text-zinc-300 font-bold">{ticket.routeTo || "--"}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GPS georeference info block */}
        {ticket.gpsLocation && (
          <div className="bg-zinc-950 p-2.5 border border-zinc-850 rounded-lg flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5 text-zinc-400 truncate">
              <MapPin size={13} className="text-green-500" />
              <span className="truncate">{ticket.gpsLocation.formatted}</span>
            </div>
            <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
              ±{ticket.gpsLocation.accuracy || 10}m GPS
            </span>
          </div>
        )}

        {/* Safety checklist status panels as styled in Design theme */}
        <div className="grid grid-cols-2 gap-3.5 mt-1">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-2 block">Safety Check (JSA)</label>
            {ticket.jsaVerified ? (
              <div className="flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/30 rounded">
                <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[10px] text-green-500 font-bold uppercase">Verified Ok</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2 bg-zinc-950 border border-zinc-805 rounded">
                <span className="text-[10px] text-zinc-500 font-bold uppercase italic">Unverified JSA</span>
              </div>
            )}
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-2 block">Tailgate Safety Complete</label>
            {ticket.tailgateVerified ? (
              <div className="flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/30 rounded">
                <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[10px] text-green-500 font-bold uppercase">Safety Verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2 bg-zinc-950 border border-zinc-805 rounded">
                <span className="text-[10px] text-zinc-500 font-bold uppercase italic">No Tailgate Sign-off</span>
              </div>
            )}
          </div>
        </div>
      </div>



      {/* Pricing / Financial Ledger breakdown (Table1 Auto Pricing matches).
          For the field hand this is a units-only log — contract dollars are hidden. */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
          {showPricing ? "III. Auto-Pricing Worksheet (Contract Rates)" : "III. Logged Operational Units"}
        </h3>

        <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto">
          {ticket.lineItems.map((item) => (
            <div key={item.id} className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-805">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-zinc-200">{item.name}</span>
                  {item.isThirdParty && (
                    <span className="text-[8px] tracking-wide inline-block font-mono font-bold text-rose-450 bg-rose-500/10 px-1 rounded w-max">
                      3RD PARTY / PASS-THROUGH
                    </span>
                  )}
                </div>
                {showPricing ? (
                  <span className="text-xs font-bold font-mono text-zinc-100">${item.total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                ) : (
                  <span className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider whitespace-nowrap">{item.quantity} {item.unitMeasure}</span>
                )}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-1.5 border-t border-zinc-900 pt-1.5">
                <span>Category: <strong className="text-zinc-400 capitalize">{item.category}</strong></span>
                <span>Qty: <strong className="text-zinc-300">{item.quantity} {item.unitMeasure}</strong>{showPricing ? ` @ $${item.unitRate}` : ""}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Combined invoice sum — supervisor / office only */}
        {showPricing ? (
          <div className="bg-zinc-950 border border-zinc-855 p-3 rounded-xl flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Estimated Total:</span>
            <span className="text-base font-bold font-mono text-amber-500">
              ${aggregateTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </span>
          </div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-855 p-3 rounded-xl flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Operational Log:</span>
            <span className="text-xs font-bold font-mono text-zinc-300">
              {ticket.lineItems.length} line items · priced at supervisor gate
            </span>
          </div>
        )}
      </div>

      {/* Supervisor bonus-pool audit — transparent gross → pass-through → net eligible math */}
      {showPricing && (
        <div id="supervisor-bonus-audit" className="bg-zinc-900 border border-blue-500/20 rounded-xl p-4 flex flex-col gap-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 font-mono flex items-center gap-1.5">
            <FileSpreadsheet size={12} className="text-blue-400" />
            Supervisor Audit — Bonus Pool Math
          </h3>
          <div className="flex flex-col gap-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Gross Billed Revenue</span>
              <span className="text-zinc-100 font-bold">${aggregateTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
            {passThroughTotal > 0 && (
              <div className="flex items-center justify-between text-rose-400">
                <span className="flex items-center gap-1.5">
                  <span className="text-[8px] uppercase tracking-wider bg-rose-500/10 border border-rose-500/25 px-1 py-0.5 rounded">Pass-Through</span>
                  Less Non-Bonus (3rd-Party)
                </span>
                <span className="font-bold">– ${passThroughTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-zinc-800 pt-2 mt-0.5">
              <span className="text-amber-500 font-bold uppercase tracking-wide text-[10px]">Net Bonus-Eligible</span>
              <span className="text-amber-500 font-bold">${activeSubtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex items-center justify-between text-green-400">
              <span>Field Bonus Pool (5% of eligible)</span>
              <span className="font-bold">${activeBonus.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
          </div>
          {passThroughTotal > 0 && (
            <p className="text-[10px] text-zinc-500 leading-normal">
              Third-party trucking, chemicals, and fuel are billed to the customer but excluded from the field bonus pool. The automation splits the ledger before the ticket reaches the supervisor — no manual math.
            </p>
          )}
        </div>
      )}

      {/* Signature review rendering */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3">
        <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase font-mono block">
          IV. Client Digital Signature Verification
        </span>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-wide">On-Site Representative:</span>
          <strong className="text-zinc-200 text-xs">{ticket.clientRepresentative || "Mark Vance"}</strong>
        </div>

        {ticket.signatureData ? (
          <div className="border border-zinc-800 bg-zinc-950 p-2 rounded-lg flex items-center justify-center min-h-[100px] max-h-[140px] overflow-hidden shadow-inner">
            {ticket.signatureData.startsWith("data:image") ? (
              <img 
                src={ticket.signatureData} 
                alt="Representative Digital Signature" 
                className="max-h-[120px] max-w-full object-contain invert" // Nice high-contrast invert so the light signature shines beautifully if the client signed white
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-zinc-600 font-mono text-[9px] antialiased italic flex flex-col items-center gap-1">
                <span>[Secure Hex Vector Signature Capture]</span>
                <span className="opacity-60 truncate max-w-[280px]">{ticket.signatureData}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center border border-dashed border-zinc-800 rounded-lg text-xs text-rose-500 font-bold uppercase tracking-wider italic">
            Representative did not sign this ticket document.
          </div>
        )}
      </div>

      {/* THIS IS NOT AN INVOICE notice block */}
      <div id="detail-regulatory-disclaimer" className="bg-yellow-500/10 border border-yellow-500/25 p-3.5 rounded-xl border-dashed flex flex-col items-center justify-center text-center font-mono">
        <span className="text-yellow-500 font-extrabold text-xs tracking-widest uppercase animate-pulse">
          THIS IS NOT AN INVOICE
        </span>
        <p className="text-[10px] text-zinc-400 mt-1 max-w-lg leading-normal">
          Authorized signature acknowledges performance of described services under contract rates. This physical-style receipt is an operational entry voucher for general ledger clearing and routing only.
        </p>
      </div>

      {/* BACKEND TRIGGERED RELEASE LEDGER (Section 6: Ticket & Billing Release) — supervisor / office only */}
      {showPricing && ticket.status === "Approved" && (
        <div id="backend-automated-release-panel" className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex flex-col gap-3">
          <h4 className="text-xs font-bold font-mono text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-500 animate-pulse" />
            V. Automated Backend Split-Release Ledgers
          </h4>
          <p className="text-[10px] text-zinc-400 leading-normal">
            Upon supervisor approval, Crude HR's billing queue instantly forks transactions to field ticket databases and client invoicing books.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-1 font-mono">
            {/* INVOICE RELEASE */}
            <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg flex flex-col justify-between">
              <div>
                <span className="text-[8px] uppercase font-bold text-zinc-500 tracking-wider">Client Invoicing</span>
                <h5 className="text-[11px] font-bold text-zinc-300 mt-1">Invoice Dispatched</h5>
                <p className="text-[8px] text-zinc-600 mt-0.5">Approved Ledger Sent</p>
              </div>
              <div className="mt-4 text-xs font-bold text-zinc-300 flex items-baseline gap-0.5">
                {showPricing ? (
                  <><span className="text-[10px] text-zinc-500">$</span>{simulatedBillingInvoice.toLocaleString(undefined, {minimumFractionDigits: 2})}</>
                ) : (
                  <span className="text-green-400 text-[11px] uppercase tracking-wider">Dispatched ✓</span>
                )}
              </div>
            </div>

            {/* EMPLOYEE BONUS RELEASE */}
            <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg flex flex-col justify-between">
              <div>
                <span className="text-[8px] uppercase font-bold text-amber-500 tracking-wider">Employee Bonus</span>
                <h5 className="text-[11px] font-bold text-amber-500 mt-1">Bonus Payout</h5>
                <p className="text-[8px] text-zinc-600 mt-0.5">Bonus Credited</p>
              </div>
              <div className="mt-4 text-xs font-bold text-amber-500 flex items-baseline gap-0.5">
                <span className="text-[10px] text-amber-500">$</span>{simulatedPayroll.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUPERVISOR GATE DOCK CONTROL OR REEDIT FOR CORRECTIONS */}
      <div className="border-t border-zinc-850 pt-4 flex flex-col gap-3 mt-1 pb-4">
        {/* Supervisor Action Box */}
        {activeRole === "supervisor" && ticket.status === "Pending Review" && (
          <div id="supervisor-decision-dock" className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex flex-col gap-3 shadow-lg">
            {!rejectMode ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 bg-amber-500/10 rounded border border-amber-500/25">
                    Supervisor Action Gate Required
                  </span>
                </div>
                <div className="flex gap-2.5">
                  <button
                    id="supervisor-reject-trigger-btn"
                    onClick={() => setRejectMode(true)}
                    className="flex-1 py-2 text-xs font-bold uppercase bg-rose-600/10 text-rose-455 border border-rose-800/60 rounded cursor-pointer hover:bg-rose-500/10 transition-all"
                  >
                    Reject To Draft
                  </button>
                  <button
                    id="supervisor-approve-btn"
                    onClick={() => onApprove && onApprove(ticket.id)}
                    className="flex-1 py-2 text-xs font-black uppercase bg-amber-500 text-black hover:bg-amber-400 rounded cursor-pointer transition-all flex items-center justify-center gap-1"
                  >
                    <Check size={14} /> Approve & Settle
                  </button>
                </div>
                {onEditDraft && (
                  <button
                    id="supervisor-edit-ticket-btn"
                    onClick={() => onEditDraft(ticket)}
                    className="w-full py-2 text-[11px] font-bold uppercase tracking-wider bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-blue-500/50 hover:text-blue-400 rounded cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileSpreadsheet size={13} /> Edit Ticket Details
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2 animate-fadeIn">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Define Core Adjustment Feedback:</span>
                <textarea
                  id="textarea-correction-notes"
                  rows={2}
                  placeholder="Explain exactly what needs to be changed (e.g. adjust drilling lengths, correct Safety Talk flag, etc.)"
                  value={correctionNotes}
                  onChange={(e) => setCorrectionNotes(e.target.value)}
                  className="w-full text-xs font-mono bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-rose-500"
                />
                <div className="flex gap-2 justify-end mt-1.5">
                  <button
                    onClick={() => {
                      setRejectMode(false);
                      setCorrectionNotes("");
                    }}
                    className="px-3 py-1.5 text-[10px] uppercase font-bold text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    id="supervisor-reject-confirm-btn"
                    onClick={handleRejectSubmit}
                    className="px-4 py-1.5 text-[10px] uppercase font-bold text-rose-300 bg-rose-950 border border-rose-900 rounded hover:bg-rose-900/60 cursor-pointer"
                  >
                    Issue Rejection Notes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Field Hand edit option for Rejected / Draft tickets */}
        {activeRole === "hand" && (ticket.status === "Draft" || ticket.status === "Rejected") && onEditDraft && (
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-zinc-200">Re-enter Drafting Workspace</h4>
              <p className="text-[10px] text-zinc-500">Modify operational logs, tally lists and prices to resubmit.</p>
            </div>
            <button
              id="re-enter-draft-workspace-btn"
              onClick={() => onEditDraft(ticket)}
              className="px-4 py-2 text-[10px] uppercase font-black bg-amber-500 text-black hover:bg-amber-400 rounded transition cursor-pointer"
            >
              Resume Draft
            </button>
          </div>
        )}

        {/* Standard safe back trigger */}
        <button
          onClick={onClose}
          className="w-full py-2.5 text-[10px] uppercase font-black bg-zinc-900 border border-zinc-805 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 cursor-pointer transition-all"
        >
          Return to Dashboard Deck
        </button>
      </div>

    </div>
  );
}
