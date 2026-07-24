import { Ticket } from "../types";

// ---------------------------------------------------------------------------
// Shape the transform functions consume. This is the object described in the
// export spec; `ticketToExportInput` below adapts the app's real Ticket into it.
// ---------------------------------------------------------------------------
export interface ExportLineItem {
  item: string;
  code: string;
  qty: number;
  uom: string;
  rate: number;
}

export interface ExportInput {
  id: string;
  customer: string;
  well: string;
  serviceLine: string;
  location: string;
  hand: { id: string; name: string };
  days: number;
  hoursPerDay: number;
  hourlyRate: number;
  perDiemPerDay: number;
  multiDayBonus: number;
  costCenter: string;
  lineItems: ExportLineItem[];
}

export type NetSuiteRow = ReturnType<typeof toNetSuite>["rows"][number];
export type PaylocityRow = ReturnType<typeof toPaylocity>["rows"][number];

// --- Billing export: one row per line item -> NetSuite --- (verbatim from spec)
export function toNetSuite(t: ExportInput) {
  const rows = t.lineItems.map((li, i) => ({
    ExternalID: `${t.id}-${i + 1}`,
    Customer:   t.customer,
    Item:       li.item,
    Memo:       t.well,
    Qty:        li.qty,
    UoM:        li.uom,
    Rate:       li.rate,
    Amount:     li.qty * li.rate,
    Location:   t.location,
  }));
  const total = rows.reduce((s, r) => s + r.Amount, 0);
  return { rows, total };
}

// Canonical field-employee BONUS math — the single source shared by the ticket
// bonus figure, the supervisor bonus audit, and the Paylocity export, so they
// always reconcile. The ticket captures hours for BILLING, not payroll: the only
// amount that flows to the employee here is the bonus = 5% of bonus-eligible
// revenue (3rd-party pass-throughs — freight, chemicals, fuel — excluded).
export function computeBonus(t: Ticket) {
  const eligibleSubtotal = t.lineItems
    .filter((li) => !li.isThirdParty)
    .reduce((s, li) => s + li.total, 0);
  const bonus = +(eligibleSubtotal * 0.05).toFixed(2);
  return { eligibleSubtotal, bonus };
}

// Next bonus disbursement date (bonuses run on the 15th) from an approval date.
export function nextBonusPayDate(fromISO?: string): string {
  const base = fromISO ? new Date(fromISO) : new Date();
  const PAY_DAY = 15;
  const target = base.getDate() <= PAY_DAY
    ? new Date(base.getFullYear(), base.getMonth(), PAY_DAY)
    : new Date(base.getFullYear(), base.getMonth() + 1, PAY_DAY);
  return target.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

// --- Payroll export -> Paylocity. Bonus pay only (no base/REG hours, no
//     multi-day line): the ticket's hours bill the client, they don't pay the hand. ---
export function toPaylocity(t: Ticket) {
  const name = t.fieldHandName || "Cody Rogers";
  const { bonus } = computeBonus(t);

  const rows: Array<{
    EmployeeID: string; Employee: string; WorkDate: string;
    EarningCode: string; Hours: number | string; Rate: number | string;
    Amount: number; CostCenter: string;
  }> = [
    {
      EmployeeID: empIdFromName(name), Employee: name, WorkDate: "2026-07-20",
      EarningCode: "BONUS", Hours: "", Rate: "",
      Amount: bonus, CostCenter: costCenterFor(t),
    },
  ];
  return { rows, gross: bonus };
}

// Serialize export rows to CSV text (raw, finance-ready values — no $ formatting).
export function rowsToCsv(rows: Array<Record<string, unknown>>): string {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const esc = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = cols.join(",");
  const body = rows.map((r) => cols.map((c) => esc(r[c])).join(",")).join("\n");
  return `${header}\n${body}\n`;
}

// ---------------------------------------------------------------------------
// Adapter: map the app's real Ticket onto the ExportInput the functions expect.
// Real ticket values are used wherever the app captures them. Fields the app
// does not track are derived from the app's own existing logic or from stable
// demo constants (marked below) — the transform functions are never altered.
// ---------------------------------------------------------------------------

// Stable EMP-#### derived from the field hand's name (same name -> same id).
export function empIdFromName(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  return `EMP-${1000 + (h % 9000)}`;
}

function costCenterFor(t: Ticket): string {
  const prefix = t.serviceLine.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase() || "FLD";
  const wellTail = (t.wellName || "").trim().split(/\s+/).pop() || "OPS";
  return `${prefix}-${wellTail.toUpperCase()}`;
}

const HOURLY_RATE = 35;      // matches the rate the app's own approve logic already uses
const PER_DIEM_PER_DAY = 55; // demo constant (app does not capture per diem)
const DEFAULT_MULTIDAY_HOURS = 8;

export function ticketToExportInput(t: Ticket): ExportInput {
  const name = t.fieldHandName || "Cody Rogers";
  const days = t.isOngoing ? (t.runningDaysTally || 1) : 1;
  const hoursPerDay = t.isOngoing ? DEFAULT_MULTIDAY_HOURS : (t.hoursWorked || 0);

  return {
    id: t.ticketNumber,
    customer: t.clientName,
    well: t.wellName,
    serviceLine: t.serviceLine,
    location: `${t.serviceLine} : Field Ops`,
    hand: { id: empIdFromName(name), name },
    days,
    hoursPerDay,
    hourlyRate: HOURLY_RATE,
    perDiemPerDay: PER_DIEM_PER_DAY,
    multiDayBonus: t.isOngoing ? (t.runningDaysTally || 1) * 150 : 0,
    costCenter: costCenterFor(t),
    lineItems: t.lineItems.map((li) => ({
      item: li.name,
      code: li.priceBookItemId,
      qty: li.quantity,
      uom: li.unitMeasure,
      rate: li.unitRate,
    })),
  };
}
