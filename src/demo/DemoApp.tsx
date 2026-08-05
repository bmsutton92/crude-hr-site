import { useState, useEffect } from "react";
import { Ticket, SystemLog } from "./types";
import { INITIAL_TICKETS } from "./data";
import HistoryDashboard from "./components/HistoryDashboard";
import TicketForm from "./components/TicketForm";
import TicketDetailView from "./components/TicketDetailView";
import PriceBookView from "./components/PriceBookView";
import ExportGrids from "./components/ExportGrids";
import { computeBonus } from "./lib/exports";

import {
  Building2,
  Terminal,
  Database,
  Info,
  Workflow,
  Sun,
  Moon
} from "lucide-react";

export default function App() {
  // Role switcher: 'hand' (Field Hand), 'supervisor' (Dan Sullivan), 'companyman' (Client Rep / Company Man)
  const [activeRole, setActiveRole] = useState<string>("hand");
  const [isSupervisorToggleVisible, setIsSupervisorToggleVisible] = useState<boolean>(true);

  // Light / dark appearance for the demo app. Defaults to dark (the app's
  // native look); persisted per-browser like the ticket data below.
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("crude_hr_theme");
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    localStorage.setItem("crude_hr_theme", theme);
  }, [theme]);
  
  // Realized state arrays loaded from LocalStorage or code initializers
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem("crude_hr_tickets");
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  // Current ticket interaction state pointers
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // The just-approved ticket, whose data is parsed into the live export grids
  // shown below the app. Kept in memory only — never persisted.
  const [exportTicket, setExportTicket] = useState<Ticket | null>(null);

  // Simulated live event logger for showing background integrations (Invoicing & Ticket splits)
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([
    {
      id: "log-1",
      timestamp: new Date().toLocaleTimeString(),
      message: "Crude HR transaction database engine initialized securely on Permian Basin local client node.",
      type: "system"
    },
    {
      id: "log-2",
      timestamp: new Date().toLocaleTimeString(),
      message: "Mapped Table1 Price Book with contract rate schedule. Filters locked.",
      type: "info"
    },
    {
      id: "log-3",
      timestamp: new Date().toLocaleTimeString(),
      message: "Operational live tracking field ticket modules primed for dispatch.",
      type: "success"
    }
  ]);

  // Save changes to cache
  useEffect(() => {
    localStorage.setItem("crude_hr_tickets", JSON.stringify(tickets));
  }, [tickets]);

  // Keep detail view updated if tickets state array shifts
  useEffect(() => {
    if (selectedTicket) {
      const match = tickets.find((t) => t.id === selectedTicket.id);
      if (match) setSelectedTicket(match);
    }
  }, [tickets]);

  // Scroll to top of viewport on view transitions
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isEditing, selectedTicket]);

  const appendSystemLog = (message: string, type: SystemLog["type"] = "info") => {
    const newLog: SystemLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    };
    setSystemLogs((prev) => [newLog, ...prev.slice(0, 18)]);
  };

  const handleResetDatabase = () => {
    if (window.confirm("Restore Crude HR tracking dashboard to default tickets?")) {
      setTickets(INITIAL_TICKETS);
      setSelectedTicket(null);
      setIsEditing(false);
      setExportTicket(null);
      appendSystemLog("Initiated database factory reset. Historical registers repopulated.", "warning");
    }
  };

  // Field Hand actions
  const handleSaveDraft = (draftTicket: Ticket) => {
    // Check if updating existing
    const exists = tickets.some((t) => t.id === draftTicket.id);
    if (exists) {
      setTickets((prev) => prev.map((t) => (t.id === draftTicket.id ? draftTicket : t)));
      appendSystemLog(`Draft ticket updated: #${draftTicket.ticketNumber}. Cache synced.`, "info");
    } else {
      setTickets((prev) => [draftTicket, ...prev]);
      appendSystemLog(`New Draft ticket logged successfully: #${draftTicket.ticketNumber}.`, "success");
    }
    setIsEditing(false);
    setSelectedTicket(null);
  };

  const handleSubmitForReview = (submittedTicket: Ticket) => {
    // Shifts status to Pending Review
    const exists = tickets.some((t) => t.id === submittedTicket.id);
    let updatedList: Ticket[];
    
    if (exists) {
      updatedList = tickets.map((t) => (t.id === submittedTicket.id ? submittedTicket : t));
    } else {
      updatedList = [submittedTicket, ...tickets];
    }
    
    setTickets(updatedList);
    setIsEditing(false);
    setSelectedTicket(submittedTicket); // Show review worksheet
    
    appendSystemLog(
      `Workflow Shift! Ticket #${submittedTicket.ticketNumber} signed by '${submittedTicket.clientRepresentative}' and dispatched to supervisor gate.`,
      "success"
    );
  };

  // Supervisor actions (Dan Sullivan)
  const handleApproveTicket = (ticketId: string) => {
    const target = tickets.find((t) => t.id === ticketId);
    if (!target) return;

    const aggregateTotal = target.lineItems.reduce((sum, item) => sum + item.total, 0);
    // The employee's only earning from a ticket is the bonus (5% of eligible revenue);
    // hours bill the client. Same math as the bonus audit + Paylocity export.
    const bonusPay = computeBonus(target).bonus;

    const approvedTicket: Ticket = {
      ...target,
      status: "Approved",
      approvedAt: new Date().toISOString(),
      payrollAmount: bonusPay,
      billingAmount: aggregateTotal
    };

    setTickets((prev) => prev.map((t) => (t.id === ticketId ? approvedTicket : t)));

    // Feed the approved ticket into the live export grids below the app.
    setExportTicket(approvedTicket);

     // Step 6 Trigger (Simulate patching data & splitting to invoicing and ticket ledger ERP triggers)
    setTimeout(() => {
      appendSystemLog(
        `ERP PIPELINE SPLIT: Generated Client Invoice for ${target.clientName} [Amount: $${aggregateTotal.toLocaleString(undefined, {minimumFractionDigits:2})}]. Dispatching via secure billing release API.`,
        "system"
      );
    }, 600);

    setTimeout(() => {
      appendSystemLog(
        `BONUS LEDGER RELEASE Dispatched: Field Employee bonus processed [Bonus Pay: $${bonusPay.toFixed(2)}]. Live tracking ledger balanced.`,
        "success"
      );
    }, 1200);
  };

  const handleRejectTicket = (ticketId: string, notes: string) => {
    const target = tickets.find((t) => t.id === ticketId);
    if (!target) return;

    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: "Rejected",
              correctionNotes: notes
            }
          : t
      )
    );

    appendSystemLog(
      `QUALITY GATE REJECTED: Ticket #${target.ticketNumber} returned as Draft to user. Note: "${notes}"`,
      "warning"
    );
  };

  // Trigger editing workspace
  const handleEditDraftTicket = (ticketToEdit: Ticket) => {
    setIsEditing(true);
    setSelectedTicket(ticketToEdit);
    setExportTicket(null);
    appendSystemLog(`Locked into edits: Drafting Workspace for #${ticketToEdit.ticketNumber}`, "info");
  };

  return (
    <div className={`min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-amber-500 selection:text-black ${theme === "light" ? "demo-theme-light" : ""}`}>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* APPEARANCE TOGGLE */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200 cursor-pointer"
            title="Toggle light / dark theme"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        {/* RESPONSIBLE SINGLE-COLUMN WIZARD LAYOUT */}
        <div className="flex flex-col gap-6">

          {/* DISMISSIBLE / HIDDEN SUPERVISOR PORTAL QUICK-TOGGLE */}
          {isSupervisorToggleVisible ? (
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                  <Workflow size={18} className="animate-hoverPulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-350 flex items-center gap-2">
                    Operational Access Hub
                    <span className="bg-blue-500/10 text-blue-400 text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded border border-blue-500/20 uppercase tracking-widest">
                      Quick Link
                    </span>
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 max-w-md">
                    Enable Supervisor Portal instantly to endorse pending tickets or inspect full team logs. Hide this control bar anytime.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-855">
                  <button
                    id="toggle-fieldhand-mode"
                    onClick={() => {
                      setActiveRole("hand");
                      appendSystemLog("Switched Active View to Field Employee dashboard", "info");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
                      activeRole === "hand"
                        ? "bg-amber-500 text-black shadow-md font-extrabold"
                        : "text-zinc-500 hover:text-zinc-350"
                    }`}
                  >
                    Field Employee
                  </button>
                  <button
                    id="toggle-supervisor-mode"
                    onClick={() => {
                      setActiveRole("supervisor");
                      setSelectedTicket(null);
                      setIsEditing(false);
                      appendSystemLog("Switched Active View to Supervisor Gate", "success");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
                      activeRole === "supervisor"
                        ? "bg-blue-500 text-white shadow-md font-extrabold"
                        : "text-zinc-500 hover:text-zinc-350"
                    }`}
                  >
                    Supervisor
                  </button>
                </div>

                <button
                  id="hide-supervisor-portal-bar"
                  onClick={() => {
                    setIsSupervisorToggleVisible(false);
                    appendSystemLog("Supervisor Control bar dismissed. Toggle restored keys in bottom drawer.", "warning");
                  }}
                  className="text-zinc-500 hover:text-rose-450 px-2 py-1.5 bg-zinc-950 rounded-lg border border-zinc-850 hover:border-rose-900/40 transition cursor-pointer"
                  title="Hide this Switcher Panel"
                >
                  <span className="text-[10px] font-mono">✕ Hide</span>
                </button>
              </div>
            </div>
          ) : (
            /* Subtle Restore Hook so they can easily bring it back if hidden */
            <div className="flex justify-end -mb-4">
              <button
                id="restore-supervisor-portal-btn"
                onClick={() => {
                  setIsSupervisorToggleVisible(true);
                  appendSystemLog("Supervisor Access Hub restored.", "info");
                }}
                className="text-[9px] bg-zinc-900/60 hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-800 flex items-center gap-1.5 transition cursor-pointer shadow-sm"
              >
                <Workflow size={10} className="text-blue-500 animate-pulse" />
                Show Supervisor Hub Switcher
              </button>
            </div>
          )}

          {/* MAIN CONTAINER: THE ACTIVE MOBILE PHONE VIEW OR WIZARD VIEW */}
          <section className="w-full flex flex-col gap-4">
            
            <div className="bg-zinc-900 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl relative">
              {/* Phone Head Decorator (Technical Precision Feel) */}
              <div className="bg-zinc-950 border-b border-zinc-850 px-6 py-2.5 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <Database size={10} className="text-zinc-500" />
                  CRUDE_HR_API: SECURE_LOCAL_TUNNEL
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              </div>

              <div className="p-4 md:p-6 min-h-[580px]">
                
                {/* 1. TICKET ENTRY FORM */}
                {isEditing ? (
                  <TicketForm
                    initialTicket={selectedTicket}
                    activeRole={activeRole}
                    theme={theme}
                    onSaveDraft={handleSaveDraft}
                    onSubmitForReview={handleSubmitForReview}
                    onCancel={() => {
                      setIsEditing(false);
                      setSelectedTicket(null);
                      appendSystemLog("Exited Drafting Workspace safely. Settings restored.", "warning");
                    }}
                  />
                ) : selectedTicket ? (
                  /* 2. TICKET DETAIL SUMMARY & GATE CONTROLS */
                  <TicketDetailView
                    ticket={selectedTicket}
                    activeRole={activeRole}
                    onApprove={handleApproveTicket}
                    onReject={handleRejectTicket}
                    onEditDraft={handleEditDraftTicket}
                    onClose={() => {
                      setSelectedTicket(null);
                      appendSystemLog("Exited detailed worksheet review.", "info");
                    }}
                  />
                ) : (
                  /* 3. SEARCHABLE LIVE PIPELINE TRACKING DASHBOARD */
                  <HistoryDashboard
                    tickets={tickets}
                    activeRole={activeRole}
                    onSelectTicket={(ticket) => {
                      setSelectedTicket(ticket);
                      appendSystemLog(`Inspecting Ticket Worksheet: #${ticket.ticketNumber}`, "info");
                    }}
                    onCreateNewTicket={() => {
                      setIsEditing(true);
                      setSelectedTicket(null);
                      setExportTicket(null);
                      appendSystemLog("Initiated fresh new Digital Field Ticket sequence.", "info");
                    }}
                    onResetDatabase={handleResetDatabase}
                    onApproveTicket={handleApproveTicket}
                    onRejectTicket={handleRejectTicket}
                    onEditTicket={handleEditDraftTicket}
                  />
                )}
                
              </div>
            </div>
          </section>

          {/* LIVE EXPORT GRIDS: the approved ticket parsed into finance-ready rows.
              Back-office view only — never shown to the field employee. */}
          {activeRole === "supervisor" && <ExportGrids ticket={exportTicket} />}

        </div>
      </main>

      {/* Consistent System Footer decor matching the visual theme */}
      <footer className="h-8 bg-zinc-950 flex items-center justify-between px-6 border-t border-zinc-900 text-[9px] text-zinc-600 font-mono tracking-widest mt-12 lowercase select-none">
        <div className="flex gap-4">
          <span>status: <span className="text-green-500 font-bold">system active</span></span>
          <span>sync: <span>up-to-date</span></span>
        </div>
        <div>secure client ledger workflow</div>
      </footer>

    </div>
  );
}
