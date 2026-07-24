import { useState } from "react";
import { Ticket, TicketStatus } from "../types";
import { computeBonus } from "../lib/exports";
import { 
  Plus, 
  Search, 
  MapPin, 
  Briefcase, 
  AlertCircle, 
  RefreshCw,
  TrendingUp,
  Inbox,
  CheckCircle2,
  XCircle,
  User,
  Users,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Clock,
  DollarSign,
  ArrowRight,
  Pencil
} from "lucide-react";

interface HistoryDashboardProps {
  tickets: Ticket[];
  onCreateNewTicket: () => void;
  onSelectTicket: (ticket: Ticket) => void;
  onResetDatabase?: () => void;
  activeRole?: string;
  onApproveTicket?: (ticketId: string) => void;
  onRejectTicket?: (ticketId: string, notes: string) => void;
  onEditTicket?: (ticket: Ticket) => void;
}

export default function HistoryDashboard({
  tickets,
  onCreateNewTicket,
  onSelectTicket,
  onResetDatabase,
  activeRole = "hand",
  onApproveTicket,
  onRejectTicket,
  onEditTicket
}: HistoryDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [employeeFilter, setEmployeeFilter] = useState<string>("All");

  // Supervisor-specific UI control states
  const [expandedEmployees, setExpandedEmployees] = useState<Record<string, boolean>>({});
  const [rejectionNotes, setRejectionNotes] = useState<Record<string, string>>({});
  const [rejectionInputVisible, setRejectionInputVisible] = useState<Record<string, boolean>>({});

  // Calculations for dynamic Live Tracking Payroll & Invoices Dashboard
  const handTickets = activeRole === "hand" ? tickets.filter(t => !t.fieldHandName || t.fieldHandName === "Cody Rogers") : tickets;
  const approvedTickets = handTickets.filter(t => t.status === "Approved");
  const pendingTickets = handTickets.filter(t => t.status === "Pending Review");
  const rejectedTickets = handTickets.filter(t => t.status === "Rejected");

  // Sum payroll from approved tickets (Tickets affect payroll!)
  const approvedPayrollTotal = approvedTickets.reduce((acc, t) => acc + (t.payrollAmount || 0), 0);
  const pendingPayrollTotal = pendingTickets.reduce((acc, t) => acc + (t.payrollAmount || 0), 0);
  
  // Total hours worked
  const totalApprovedHours = approvedTickets.reduce((acc, t) => acc + t.hoursWorked, 0);

  // Dynamic list of unique employee names for filter
  const allEmployees = Array.from(new Set(tickets.map(t => t.fieldHandName || "Cody Rogers"))).filter(Boolean);

  const finalFilteredTickets = handTickets.filter((t) => {
    const handName = t.fieldHandName || "Cody Rogers";
    const matchesEmployee = employeeFilter === "All" || handName === employeeFilter;

    const matchesSearch = 
      t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.wellName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.serviceLine.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || t.status === statusFilter;

    return matchesEmployee && matchesSearch && matchesStatus;
  });

  const statusBadgeColors: Record<TicketStatus, string> = {
    Approved: "bg-green-500/10 text-green-400 border border-green-500/20",
    "Pending Review": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    Rejected: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    Draft: "bg-amber-500/10 text-amber-500 border border-amber-500/20"
  };

  return (
    <div className="flex flex-col gap-5 text-zinc-200">
      
      {/* Live Payroll Tracking Panel: Tickets directly impact payroll */}
      {activeRole !== "supervisor" && (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3 border-b border-zinc-850 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded bg-amber-500/10 text-amber-500">
                <TrendingUp size={15} />
              </span>
              <span className="text-xs uppercase tracking-wider font-mono font-bold text-zinc-400">
                Personal Live Ticket Monitoring
              </span>
            </div>
            {onResetDatabase && (
              <button
                onClick={onResetDatabase}
                title="Reset Simulated Database Defaults"
                className="text-zinc-500 hover:text-zinc-300 transition p-1 cursor-pointer"
              >
                <RefreshCw size={12} className="animate-hoverPulse" />
              </button>
            )}
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed mb-4 font-normal">
            Tickets trigger automated backend billing release upon Supervisor endorsement, tracking accounts receivable and field-employee bonus payouts instantly.
          </p>

          {/* BENTO STAT BLOCKS */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {/* APPROVED REALIZED PAYROLL */}
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Approved Bonus</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              </div>
              <div className="mt-2.5">
                <span className="text-xl font-mono text-amber-400 font-bold">
                  ${approvedPayrollTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </span>
              </div>
            </div>

            {/* PENDING EXPOSURE */}
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Pending Bonus</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              </div>
              <div className="mt-2.5">
                <span className="text-xl font-mono text-zinc-300 font-bold">
                  ${pendingPayrollTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </span>
                <span className="text-[9px] text-zinc-500 block mt-1 italic">
                  {pendingTickets.length} tickets in review pipeline
                </span>
              </div>
            </div>

            {/* ACTION REQUIRED FLAGGED */}
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex flex-col justify-between col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Action Required</span>
                {rejectedTickets.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                )}
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <div>
                  <span className="text-xl font-mono font-bold text-rose-400">
                    {rejectedTickets.length}
                  </span>
                  <span className="text-[9px] text-rose-400 block mt-1 font-medium">
                    Correction rejects returned
                  </span>
                </div>
                {rejectedTickets.length > 0 && (
                  <span className="text-[9px] bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded border border-rose-500/20 font-bold font-mono animate-pulse uppercase">
                    Fix drafts
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUPERVISOR ENDORSEMENT & QUALITY GATE SYSTEM */}
      {activeRole === "supervisor" && (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-4 md:p-5 shadow-xl flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-850 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <ShieldCheck size={18} />
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider font-mono font-bold text-zinc-400 block">Supervisor Endorsement Panel</span>
                <span className="text-sm font-extrabold text-white tracking-tight">Dan Sullivan • Operational Quality Gate</span>
              </div>
            </div>
            {onResetDatabase && (
              <button
                onClick={onResetDatabase}
                title="Reset Database to Defaults"
                className="text-zinc-500 hover:text-zinc-300 transition px-2.5 py-1 text-[10px] font-mono border border-zinc-800 rounded bg-zinc-950/40 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw size={11} className="animate-hoverPulse" /> Reset Logs
              </button>
            )}
          </div>

          {/* SUPERVISOR QUICK STATISTICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* STAT 1: PENDING TICKET COUNT */}
            <div className="bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-850 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Awaiting Review</span>
                <span className="text-xl font-mono text-blue-400 font-bold">
                  {tickets.filter(t => t.status === "Pending Review").length}
                </span>
              </div>
              <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                <Inbox size={16} />
              </span>
            </div>

            {/* STAT 2: TOTAL PENDING VALUE */}
            <div className="bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-850 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Pending Ledger Value</span>
                <span className="text-xl font-mono text-amber-500 font-bold">
                  ${tickets.filter(t => t.status === "Pending Review").reduce((acc, t) => acc + t.lineItems.reduce((sum, item) => sum + item.total, 0), 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                </span>
              </div>
              <span className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                <TrendingUp size={16} />
              </span>
            </div>

            {/* STAT 3: GROUP CREW SIZE */}
            <div className="bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-850 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Active Group Crew</span>
                <span className="text-xl font-mono text-zinc-350 font-bold">
                  {allEmployees.length} Employees
                </span>
              </div>
              <span className="p-2 bg-zinc-850 text-zinc-400 rounded-lg">
                <Users size={16} />
              </span>
            </div>
          </div>

          {/* THE EASY REVIEW & APPROVAL BOARD */}
          <div className="border border-zinc-850 rounded-xl bg-zinc-950/30 p-3.5">
            <div className="flex items-center justify-between mb-3 border-b border-zinc-850/60 pb-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Inbox size={13} className="text-blue-400 animate-pulse" />
                Easy Approval &amp; Review Board
              </span>
              <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono font-bold">
                {tickets.filter(t => t.status === "Pending Review").length} Awaiting
              </span>
            </div>

            {tickets.filter(t => t.status === "Pending Review").length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
                <div className="p-3 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">No Tickets Awaiting Action</h5>
                  <p className="text-[10px] text-zinc-500 max-w-sm mt-0.5 leading-normal">
                    Outstanding field ticket logs have been fully audited, endorsed, and split-released to corresponding invoicing ledgers.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                {tickets.filter(t => t.status === "Pending Review").map((ticket) => {
                  const ticketTotal = ticket.lineItems.reduce((sum, item) => sum + item.total, 0);
                  return (
                    <div
                      key={ticket.id}
                      onClick={() => onSelectTicket(ticket)}
                      className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-3.5 hover:border-zinc-700 hover:bg-zinc-900/70 transition animate-fadeIn cursor-pointer"
                    >
                      {/* Ticket Header */}
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2 border-b border-zinc-850/40 pb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold font-mono text-zinc-300">{ticket.ticketNumber}</span>
                            <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                              Waiting Endorsement
                            </span>
                            <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono font-bold">
                              {ticket.serviceLine}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[11px] text-white font-extrabold">{ticket.clientName}</span>
                            <span className="text-[10px] text-zinc-400 font-mono">• {ticket.wellName}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider block">Aggregate Value</span>
                          <span className="text-sm font-bold font-mono text-amber-400">${ticketTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                      </div>

                      {/* Line items mini ledger */}
                      <div className="bg-zinc-950/60 rounded-lg border border-zinc-850 p-2.5 font-mono text-[10px] mb-3">
                        <div className="text-[8px] uppercase tracking-wider text-zinc-500 font-extrabold mb-1.5">Dispatched Itemized Receipts:</div>
                        <div className="flex flex-col gap-1.5">
                          {ticket.lineItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center gap-2 border-b border-zinc-900/40 pb-1">
                              <div className="text-zinc-300 truncate max-w-[220px]">
                                {item.name}
                              </div>
                              <div className="text-right text-zinc-400 flex-shrink-0">
                                {item.quantity} {item.unitMeasure} @ ${item.unitRate} = <span className="text-zinc-300 font-bold">${item.total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Travel Origin / Destination */}
                      {(ticket.routeFrom || ticket.routeTo) && (
                        <div className="mb-3 p-2 bg-zinc-950/30 border border-zinc-850/60 rounded-lg text-[9px] font-mono flex items-center justify-between text-zinc-400">
                          <span className="font-bold text-zinc-500">Transit Details:</span>
                          <div className="flex items-center gap-1">
                            <span className="text-zinc-300 font-bold">{ticket.routeFrom || "--"}</span>
                            <ArrowRight size={10} className="text-zinc-600" />
                            <span className="text-zinc-300 font-bold">{ticket.routeTo || "--"}</span>
                          </div>
                        </div>
                      )}

                      {/* Ticket Footer & Actions */}
                      <div className="flex items-center justify-between flex-wrap gap-2 text-[10px] text-zinc-500 font-mono mt-2.5 border-t border-zinc-850/40 pt-2.5">
                        <div className="flex items-center gap-3">
                          <span>Employee: <strong className="text-zinc-300">{ticket.fieldHandName || "Cody Rogers"}</strong></span>
                          <span>Logged: <strong>{new Date(ticket.createdAt).toLocaleDateString()}</strong></span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
                          {onRejectTicket && (
                            <button
                              id={`quick-reject-btn-${ticket.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setRejectionInputVisible(prev => ({ ...prev, [ticket.id]: !prev[ticket.id] }));
                              }}
                              className="px-2.5 py-1.5 text-[9px] font-bold text-rose-400 border border-rose-500/20 hover:border-rose-500/40 bg-rose-500/5 hover:bg-rose-500/10 rounded-lg transition uppercase tracking-wider cursor-pointer flex items-center gap-1"
                            >
                              <XCircle size={12} /> Reject
                            </button>
                          )}
                          {onEditTicket && (
                            <button
                              id={`quick-edit-btn-${ticket.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditTicket(ticket);
                              }}
                              className="px-2.5 py-1.5 text-[9px] font-bold text-blue-400 border border-blue-500/20 hover:border-blue-500/40 bg-blue-500/5 hover:bg-blue-500/10 rounded-lg transition uppercase tracking-wider cursor-pointer flex items-center gap-1"
                            >
                              <Pencil size={12} /> Edit
                            </button>
                          )}
                          {onApproveTicket && (
                            <button
                              id={`quick-approve-btn-${ticket.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onApproveTicket(ticket.id);
                              }}
                              className="px-3 py-1.5 text-[9px] font-extrabold text-black bg-green-400 hover:bg-green-300 rounded-lg transition uppercase tracking-wider cursor-pointer flex items-center gap-1 shadow shadow-green-500/20"
                            >
                              <CheckCircle2 size={12} /> Approve &amp; Settle
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Rejection comments expansion inline form */}
                      {rejectionInputVisible[ticket.id] && (
                        <div className="mt-3 p-3 bg-zinc-950 border border-rose-900/30 rounded-lg flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                          <label className="text-[8px] uppercase tracking-wider font-extrabold text-zinc-400 font-mono">
                            Required Correction Notes / Rejection Reason:
                          </label>
                          <textarea
                            value={rejectionNotes[ticket.id] || ""}
                            onChange={(e) => setRejectionNotes(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                            placeholder="Please specify changes required, e.g. 'Add diesel logs fuel quantity...' or 'Missing operator certification signature...'"
                            className="w-full text-xs p-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-rose-500 font-mono h-16 resize-none"
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setRejectionInputVisible(prev => ({ ...prev, [ticket.id]: false }));
                              }}
                              className="px-2 py-1 text-[9px] uppercase font-mono text-zinc-500 hover:text-zinc-300"
                            >
                              Cancel
                            </button>
                            <button
                              id={`submit-reject-reason-${ticket.id}`}
                              onClick={() => {
                                if (!rejectionNotes[ticket.id]?.trim()) {
                                  alert("Please enter a correction note before rejecting.");
                                  return;
                                }
                                onRejectTicket?.(ticket.id, rejectionNotes[ticket.id]);
                                setRejectionInputVisible(prev => ({ ...prev, [ticket.id]: false }));
                              }}
                              className="px-3 py-1 text-[9px] uppercase font-mono font-bold text-white bg-rose-600 hover:bg-rose-500 rounded"
                            >
                              Confirm Rejection
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* CREW HAND DIRECTORY (TICKETS BY EMPLOYEE SECTION) */}
          <div id="supervisor-by-employee-directory" className="border border-zinc-850 rounded-xl bg-zinc-950/30 p-3.5">
            <div className="flex items-center gap-1.5 border-b border-zinc-850/60 pb-2 mb-2.5">
              <Users size={14} className="text-amber-500" />
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                Employee Directory (Group Tickets)
              </span>
            </div>
            <p className="text-[10px] text-zinc-450 leading-normal mb-3 font-mono">
              Visual monitoring of accrued logs, payroll allocation status, and operational submissions grouped securely per crew member. Click any block to expand.
            </p>

            <div className="flex flex-col gap-2">
              {allEmployees.map((empName) => {
                const empTickets = tickets.filter(t => (t.fieldHandName || "Cody Rogers") === empName);
                const approvedWages = empTickets.filter(t => t.status === "Approved").reduce((sum, t) => sum + (t.payrollAmount || 0), 0);
                const hoursLogged = empTickets.reduce((sum, t) => sum + t.hoursWorked, 0);
                const totalValue = empTickets.reduce((sum, t) => sum + t.lineItems.reduce((acc, item) => acc + item.total, 0), 0);
                const isExpanded = !!expandedEmployees[empName];

                return (
                  <div key={empName} className="border border-zinc-850 bg-zinc-950/50 rounded-xl overflow-hidden transition">
                    {/* Header trigger */}
                    <button
                      id={`emp-accordion-header-${empName.replace(/\s+/g, '-').toLowerCase()}`}
                      type="button"
                      onClick={() => {
                        setExpandedEmployees(prev => ({ ...prev, [empName]: !prev[empName] }));
                      }}
                      className="w-full p-3 flex items-center justify-between text-left hover:bg-zinc-900/40 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xs flex-shrink-0 font-mono">
                          {empName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-zinc-200 block truncate">{empName}</span>
                          <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">
                            {empTickets.length} Tickets logged
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2.5 text-[9px] font-mono text-zinc-450 text-right">
                          <div>
                            <span className="block text-zinc-600 font-extrabold text-[8px] uppercase">Hours Logged</span>
                            <span className="text-zinc-300 font-bold">{hoursLogged} hrs</span>
                          </div>
                          <div className="w-px h-5 bg-zinc-850" />
                          <div>
                            <span className="block text-zinc-600 font-extrabold text-[8px] uppercase">Settled Wages</span>
                            <span className="text-green-400 font-bold">${approvedWages.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                          </div>
                        </div>

                        {isExpanded ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
                      </div>
                    </button>

                    {/* Collapsible Body */}
                    {isExpanded && (
                      <div className="p-3 border-t border-zinc-850/60 bg-zinc-950/90 flex flex-col gap-2 animate-fadeIn">
                        {/* mini stats bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-900/60 p-2 rounded-lg border border-zinc-850/40 font-mono text-[9px] text-zinc-400">
                          <div>
                            <span className="text-zinc-500 block uppercase text-[7px] font-extrabold">Accumulated Work</span>
                            <span className="text-zinc-300 font-bold">{empTickets.length} Tickets</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block uppercase text-[7px] font-extrabold">Active Status</span>
                            <span className="text-amber-500 font-bold">
                              {empTickets.filter(t => t.status === "Pending Review").length} Awaiting Review
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block uppercase text-[7px] font-extrabold">Approved Value</span>
                            <span className="text-green-400 font-bold">${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block uppercase text-[7px] font-extrabold">Earnings Approved</span>
                            <span className="text-white font-bold">${approvedWages.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                          </div>
                        </div>

                        {/* tickets listing */}
                        <div className="flex flex-col gap-1.5 mt-2">
                          <span className="text-[8px] uppercase tracking-wider text-zinc-500 font-extrabold font-mono">Employee Ticket Logs:</span>
                          {empTickets.length === 0 ? (
                            <span className="text-[10px] text-zinc-600 font-mono italic">No tickets generated yet.</span>
                          ) : (
                            empTickets.map((t) => {
                              const tTotal = t.lineItems.reduce((s, item) => s + item.total, 0);
                              return (
                                <div
                                  id={`emp-card-tkt-${t.id}`}
                                  key={t.id}
                                  onClick={() => onSelectTicket(t)}
                                  className="flex items-center justify-between gap-3 p-2 rounded-lg bg-zinc-900/30 border border-zinc-850 hover:bg-zinc-900/70 cursor-pointer transition text-xs"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[10px] font-bold text-zinc-450">{t.ticketNumber}</span>
                                    <span className="text-zinc-500 font-mono text-[10px] truncate max-w-[120px]">{t.clientName} ({t.wellName})</span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${statusBadgeColors[t.status]}`}>
                                      {t.status === "Pending Review" ? "Review" : t.status}
                                    </span>
                                    <span className="font-mono text-[10px] font-bold text-zinc-300">
                                      ${tTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                    </span>
                                    <span className="text-[9px] text-amber-500 hover:underline">Verify →</span>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* FILTERING & SEARCH CONTROLS */}
      <div className="flex flex-col lg:flex-row gap-2.5">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-2.5 text-zinc-500">
            <Search size={15} />
          </span>
          <input
            id="search-ticket-input"
            type="text"
            placeholder="Search tickets by Well name, Client, or Ticket ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Employee Filter Select (only for supervisor view) */}
          {activeRole === "supervisor" && (
            <div className="bg-zinc-900 border border-zinc-805 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs text-zinc-300">
              <span className="text-[10px] font-bold text-zinc-500 uppercase font-mono">Employee:</span>
              <select
                id="employee-filter-select"
                value={employeeFilter}
                onChange={(e) => setEmployeeFilter(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 py-0.5 px-2 focus:outline-none focus:border-amber-500 cursor-pointer text-xs"
              >
                <option value="All">All Employees ({allEmployees.length})</option>
                {allEmployees.map((emp) => (
                  <option key={emp} value={emp}>
                    {emp}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Filter Pills */}
          <div className="bg-zinc-900 border border-zinc-805 p-1 rounded-xl flex gap-0.5">
            {["All", "Draft", "Pending Review", "Approved", "Rejected"].map((status) => (
              <button
                id={`filter-pill-${status.replace(/\s+/g, '-').toLowerCase()}`}
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition cursor-pointer ${
                  statusFilter === status
                    ? "bg-zinc-800 text-amber-500"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {status === "Pending Review" ? "Review" : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TICKET FLOW PIPELINE LIST */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-zinc-500 px-1">
          <span className="text-[10px] font-bold tracking-widest uppercase">Ticket Pipeline ({finalFilteredTickets.length} Items)</span>
          {activeRole !== "supervisor" && (
            <button
              id="create-new-ticket-dashboard-btn"
              onClick={onCreateNewTicket}
              className="text-[10px] bg-amber-500 hover:bg-amber-400 text-black font-black uppercase px-3 py-1.5 rounded shadow-md flex items-center gap-1 transition-all"
            >
              <Plus size={13} /> Log Field Ticket
            </button>
          )}
        </div>

        {finalFilteredTickets.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl py-12 flex flex-col items-center justify-center gap-2.5 text-center px-4">
            <Inbox size={32} className="text-zinc-600" />
            <div>
              <p className="text-sm text-zinc-400 font-semibold">No tickets matching search query</p>
              <p className="text-xs text-zinc-500 mt-1">Refine your tags or clear filters above.</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
              }}
              className="mt-2 text-[10px] text-amber-500 border border-amber-500/20 px-3 py-1.5 rounded uppercase font-bold hover:bg-amber-500/10 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
            {finalFilteredTickets.map((ticket) => {
              const ticketSum = ticket.lineItems.reduce((acc, t) => acc + t.total, 0);
              
              // Custom left accent colors from design spec
              const borderLeftAccent = 
                ticket.status === "Approved" ? "border-l-4 border-l-green-500" :
                ticket.status === "Pending Review" ? "border-l-4 border-l-blue-500/60" :
                ticket.status === "Rejected" ? "border-l-4 border-l-rose-500" :
                "border-l-4 border-l-amber-500";

              return (
                <div
                  id={`tkt-card-${ticket.id}`}
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  className={`bg-zinc-900/60 hover:bg-zinc-900 border-t border-r border-b border-zinc-800 ${borderLeftAccent} transition p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer group shadow shadow-black/20`}
                >
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold font-mono text-zinc-350 tracking-wider">
                        {ticket.ticketNumber}
                      </span>
                      <span className={`text-[9px] font-bold font-mono uppercase px-2 py-0.5 rounded-full ${statusBadgeColors[ticket.status]}`}>
                        {ticket.status === "Pending Review" ? "Review" : ticket.status}
                      </span>
                      <span className="text-[10px] bg-zinc-950 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-805 font-mono">
                        {ticket.serviceLine}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-zinc-100 truncate">
                          {ticket.clientName}
                        </h4>
                        <span className="text-[10px] text-zinc-400 font-mono italic">
                          By: {ticket.fieldHandName || "Cody Rogers"}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin size={11} className="text-zinc-500" /> {ticket.wellName}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                    {/* Financial Right-column sum. Client billing value is decoupled from the field-hand view. */}
                    <div className="flex items-center justify-between md:flex-col md:items-end justify-center gap-1 border-t border-zinc-850 md:border-none pt-2.5 md:pt-0">
                      {activeRole !== "hand" && (
                        <div className="md:text-right">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Aggregate Value</span>
                          <span className="text-base font-bold font-mono text-white group-hover:text-amber-400 transition-colors">
                            ${ticketSum.toLocaleString(undefined, {minimumFractionDigits: 2})}
                          </span>
                        </div>
                      )}

                      {/* Role-specific status or payroll indicator */}
                      {activeRole === "supervisor" ? (
                        ticket.status === "Approved" ? (
                          <span className="text-[10px] bg-green-950/20 text-green-400 border border-green-900/30 px-2 py-0.5 rounded font-mono md:mt-2">
                            Approved &amp; Settled
                          </span>
                        ) : ticket.status === "Pending Review" ? (
                          <span className="text-[10px] bg-blue-950/25 text-blue-400 border border-blue-900/40 px-2 py-0.5 rounded font-mono md:mt-2 animate-pulse font-bold">
                            Action Required
                          </span>
                        ) : ticket.status === "Rejected" ? (
                          <span className="text-[10px] bg-rose-950/20 text-rose-400 border border-rose-900/30 px-2 py-0.5 rounded font-mono md:mt-2">
                            Needs Correction
                          </span>
                        ) : (
                          <span className="text-[10px] bg-zinc-950 text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded font-mono md:mt-2">
                            In-Progress Draft
                          </span>
                        )
                      ) : (
                        ticket.status === "Approved" ? (
                          <span className="text-[10px] bg-green-950/20 text-green-450 border border-green-900/30 px-2 py-0.5 rounded italic font-mono md:mt-2">
                            +${ticket.payrollAmount?.toFixed(2)} Bonus Earned
                          </span>
                        ) : (
                          <span className="text-[9px] text-zinc-450 bg-zinc-950 px-2 py-0.5 border border-zinc-800 rounded font-mono italic md:mt-2">
                            Est. Bonus: ${computeBonus(ticket).bonus.toFixed(2)}
                          </span>
                        )
                      )}
                    </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
