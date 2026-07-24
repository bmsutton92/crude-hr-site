export enum ServiceLine {
  Wireline = "Wireline",
  CoilTubing = "Coil Tubing",
  Cementing = "Cementing",
  StimulationPumping = "Stimulation/ Pumping",
  Fishing = "Fishing",
  Flowback = "Flowback",
  Drilling = "Drilling",
  Completions = "Completions"
}

export interface PriceBookItem {
  id: string;
  name: string;
  category: "material" | "equipment" | "labor";
  serviceLine: ServiceLine;
  unitRate: number;
  unitMeasure: string;
}

export interface BHATool {
  id: string;
  name: string;
  od: number; // Outer Diameter in inches
  idInner: number; // Inner Diameter in inches
  length: number; // Length in feet
}

export interface LineItem {
  id: string;
  priceBookItemId: string;
  name: string;
  category: "material" | "equipment" | "labor";
  unitRate: number;
  unitMeasure: string;
  quantity: number;
  total: number;
  isThirdParty?: boolean;
}

export type TicketStatus = "Draft" | "Pending Review" | "Approved" | "Rejected";

export interface Ticket {
  id: string;
  ticketNumber: string;
  status: TicketStatus;
  createdAt: string;
  serviceLine: ServiceLine;
  clientName: string;
  wellName: string;
  supervisorName: string;
  clientRepresentative: string;
  hoursWorked: number;
  jsaVerified: boolean;
  tailgateVerified: boolean;
  gpsLocation: {
    lat: number;
    lng: number;
    accuracy?: number;
    formatted?: string;
  } | null;
  bhaTally: BHATool[];
  lineItems: LineItem[];
  signatureData: string | null; // Base64 signature sketch or data points
  routeFrom?: string; // Route origin e.g. "Longview, TX"
  routeTo?: string; // Route destination e.g. "Location and Back"
  correctionNotes?: string;
  approvedAt?: string;
  payrollAmount?: number; // Calculated employee payroll portion
  billingAmount?: number; // Calculated client invoice total
  isOngoing?: boolean;
  runningDaysTally?: number;
  isJobFinished?: boolean;
  fieldHandName?: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "system";
}
