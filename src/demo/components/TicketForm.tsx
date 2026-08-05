import { useState, useEffect } from "react";
import { 
  ServiceLine, 
  PriceBookItem, 
  BHATool, 
  LineItem, 
  Ticket 
} from "../types";
import { MASTER_PRICE_BOOK } from "../data";
import { 
  MapPin, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Clock, 
  FileText, 
  TrendingUp, 
  Info,
  ChevronRight,
  Zap,
  Hammer
} from "lucide-react";
import SignaturePad from "./SignaturePad";

const PRESET_BHA_TOOLS = [
  { name: "PDC Drill Bit 8.5\"", od: 8.5, idInner: 2.5, length: 1.5 },
  { name: "Tri-Cone Rock Bit 8.75\"", od: 8.75, idInner: 2.5, length: 1.2 },
  { name: "PDM Mud Motor 6.5\"", od: 6.5, idInner: 3.0, length: 28.0 },
  { name: "Directional MWD Tool", od: 6.5, idInner: 2.25, length: 15.0 },
  { name: "Non-Mag Drill Collar Monel", od: 6.25, idInner: 2.75, length: 30.0 },
  { name: "Integral Blade Stabilizer", od: 8.25, idInner: 2.875, length: 6.0 },
  { name: "Drilling Jar (Hydraulic)", od: 6.5, idInner: 2.75, length: 32.0 },
  { name: "Heavy Weight Drill Pipe (HWDP)", od: 4.5, idInner: 2.75, length: 30.5 },
  { name: "Crossover Sub (X-Over)", od: 6.5, idInner: 2.5, length: 3.0 },
  { name: "Float Sub (Float Valve)", od: 6.25, idInner: 2.25, length: 2.5 }
];

const JOB_TYPES_BY_SERVICE_LINE: Record<ServiceLine, Array<{ id: string; name: string; category: "material" | "equipment" | "labor"; unitRate: number; unitMeasure: string }>> = {
  [ServiceLine.Wireline]: [
    { id: "jt-wl-01", name: "Casing Perforating Run", category: "material", unitRate: 2500.00, unitMeasure: "run" },
    { id: "jt-wl-02", name: "Radial Cement Bond Log", category: "equipment", unitRate: 1800.00, unitMeasure: "run" },
    { id: "jt-wl-03", name: "Slickline Plug Set/Retrieve", category: "equipment", unitRate: 1200.00, unitMeasure: "run" }
  ],
  [ServiceLine.CoilTubing]: [
    { id: "jt-ct-01", name: "Wellbore Cleanout Service", category: "equipment", unitRate: 3200.00, unitMeasure: "day" },
    { id: "jt-ct-02", name: "Acid Wash & Stimulation", category: "material", unitRate: 4500.00, unitMeasure: "job" },
    { id: "jt-ct-03", name: "Thru-Tubing Milling", category: "equipment", unitRate: 2800.00, unitMeasure: "day" }
  ],
  [ServiceLine.Cementing]: [
    { id: "jt-cem-01", name: "Production Casing Cement", category: "material", unitRate: 5500.00, unitMeasure: "job" },
    { id: "jt-cem-02", name: "Surface Casing Plug", category: "material", unitRate: 3800.00, unitMeasure: "job" },
    { id: "jt-cem-03", name: "Remedial Squeeze Cement", category: "equipment", unitRate: 2400.00, unitMeasure: "run" }
  ],
  [ServiceLine.StimulationPumping]: [
    { id: "jt-stim-01", name: "Cody Rogers (Operator)", category: "labor", unitRate: 1480.00, unitMeasure: "day" },
    { id: "jt-stim-02", name: "Mileage (Longview & Back)", category: "equipment", unitRate: 230.85, unitMeasure: "day" },
    { id: "jt-stim-03", name: "Air foam unit (Unit #1)", category: "equipment", unitRate: 2500.00, unitMeasure: "day" },
    { id: "jt-stim-04", name: "Soap @ 45. per gallon (chem)", category: "material", unitRate: 45.00, unitMeasure: "gal" },
    { id: "jt-stim-05", name: "Inhibitor @ 35. per gallon (chem)", category: "material", unitRate: 35.00, unitMeasure: "gal" },
    { id: "jt-stim-06", name: "Diesel Fuel @ 5.50 per gallon (fuel)", category: "material", unitRate: 5.50, unitMeasure: "gal" },
    { id: "jt-stim-07", name: "Delivery/Return Trucking on foam air unit (trucking)", category: "equipment", unitRate: 600.00, unitMeasure: "trip" }
  ],
  [ServiceLine.Fishing]: [
    { id: "jt-fish-01", name: "Overshot Fishing Run", category: "equipment", unitRate: 3500.00, unitMeasure: "day" },
    { id: "jt-fish-02", name: "Casing Patch Milling", category: "equipment", unitRate: 4200.00, unitMeasure: "run" },
    { id: "jt-fish-03", name: "Wireline GR/CCL Fish recovery", category: "equipment", unitRate: 2900.00, unitMeasure: "job" }
  ],
  [ServiceLine.Flowback]: [
    { id: "jt-flow-01", name: "Well Test Flowback 24Hr Ops", category: "equipment", unitRate: 1600.00, unitMeasure: "day" },
    { id: "jt-flow-02", name: "Sand Separator Cleanout", category: "equipment", unitRate: 750.00, unitMeasure: "ea" },
    { id: "jt-flow-03", name: "Pason Telemetry Hookup", category: "material", unitRate: 450.00, unitMeasure: "ea" }
  ],
  [ServiceLine.Drilling]: [
    { id: "jt-dr-01", name: "Directional Drilling Control", category: "equipment", unitRate: 4800.00, unitMeasure: "day" },
    { id: "jt-dr-02", name: "BHA Torque & Drag Monitoring", category: "equipment", unitRate: 1200.00, unitMeasure: "day" },
    { id: "jt-dr-03", name: "Reamer Tool Run", category: "material", unitRate: 3100.00, unitMeasure: "ea" }
  ],
  [ServiceLine.Completions]: [
    { id: "jt-comp-01", name: "Composite Frac Plug Drillout", category: "equipment", unitRate: 5000.00, unitMeasure: "day" },
    { id: "jt-comp-02", name: "Toe Sleeve Hydraulic Actuation", category: "material", unitRate: 4000.00, unitMeasure: "ea" },
    { id: "jt-comp-03", name: "Packer/Anchor Tool Setting", category: "equipment", unitRate: 2200.00, unitMeasure: "run" }
  ]
};

interface TicketFormProps {
  initialTicket?: Ticket | null;
  activeRole?: string;
  theme?: "dark" | "light";
  onSaveDraft: (ticket: Ticket) => void;
  onSubmitForReview: (ticket: Ticket) => void;
  onCancel: () => void;
}

export default function TicketForm({
  initialTicket,
  activeRole = "hand",
  theme = "dark",
  onSaveDraft,
  onSubmitForReview,
  onCancel
}: TicketFormProps) {
  const isSupervisor = activeRole === "supervisor";
  // 1. Job Metadata
  const [ticketNumber, setTicketNumber] = useState("");
  const [selectedServiceLine, setSelectedServiceLine] = useState<ServiceLine>(ServiceLine.Wireline);
  const [clientName, setClientName] = useState("");
  const [wellName, setWellName] = useState("");
  const [supervisorName, setSupervisorName] = useState("Dan Sullivan");
  const [clientRepresentative, setClientRepresentative] = useState("");
  const [hoursWorked, setHoursWorked] = useState<number>(8);
  const [isOngoing, setIsOngoing] = useState(false);
  const [runningDaysTally, setRunningDaysTally] = useState<number>(1);
  const [isJobFinished, setIsJobFinished] = useState(false);
  const [fieldHandName, setFieldHandName] = useState("Cody Rogers");
  const [routeFrom, setRouteFrom] = useState("");
  const [routeTo, setRouteTo] = useState("");
  
  // Safety compliance
  const [jsaVerified, setJsaVerified] = useState(false);
  const [tailgateVerified, setTailgateVerified] = useState(false);
  
  // Location
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsLocation, setGpsLocation] = useState<Ticket["gpsLocation"]>(null);

  // 3. Financials & Auto Price Book mapping
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  // Validation feedback
  const [validationError, setValidationError] = useState("");

  // Seed default or edit form state
  useEffect(() => {
    if (initialTicket) {
      setTicketNumber(initialTicket.ticketNumber);
      setSelectedServiceLine(initialTicket.serviceLine);
      setClientName(initialTicket.clientName);
      setWellName(initialTicket.wellName);
      setSupervisorName(initialTicket.supervisorName);
      setClientRepresentative(initialTicket.clientRepresentative);
      setHoursWorked(initialTicket.hoursWorked);
      setJsaVerified(initialTicket.jsaVerified);
      setTailgateVerified(initialTicket.tailgateVerified);
      setGpsLocation(initialTicket.gpsLocation);
      setLineItems(initialTicket.lineItems);
      setSignatureData(initialTicket.signatureData);
      setIsOngoing(initialTicket.isOngoing || false);
      setRunningDaysTally(initialTicket.runningDaysTally || 1);
      setIsJobFinished(initialTicket.isJobFinished || false);
      setFieldHandName(initialTicket.fieldHandName || "Cody Rogers");
      setRouteFrom(initialTicket.routeFrom || "");
      setRouteTo(initialTicket.routeTo || "");
    } else {
      // Generate standard realistic ticket number
      const randHex = Math.floor(1000 + Math.random() * 9000);
      setTicketNumber(`TX-2026-${randHex}`);
      setSelectedServiceLine(ServiceLine.Wireline);
      setClientName("Chevron USA");
      setWellName("Legacy North 14H");
      setSupervisorName("Dan Sullivan");
      setClientRepresentative("");
      setHoursWorked(8);
      setJsaVerified(false);
      setTailgateVerified(false);
      setGpsLocation(null);
      setLineItems([]);
      setSignatureData(null);
      setIsOngoing(false);
      setRunningDaysTally(1);
      setIsJobFinished(false);
      setFieldHandName("Cody Rogers");
      setRouteFrom("");
      setRouteTo("");
    }
  }, [initialTicket]);

  // GPS geolocation handler
  const handleGPSCapture = () => {
    setGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setGpsLocation({
            lat: parseFloat(latitude.toFixed(4)),
            lng: parseFloat(longitude.toFixed(4)),
            accuracy: Math.round(accuracy),
            formatted: `GPS Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) ±${Math.round(accuracy)}m`
          });
          setGpsLoading(false);
        },
        (error) => {
          console.warn("Permian GPS simulation trigger:", error);
          // Permian Basin realistic fallback coord values
          setTimeout(() => {
            const randomDeltaLat = (Math.random() - 0.5) * 0.05;
            const randomDeltaLng = (Math.random() - 0.5) * 0.05;
            const mockLat = +(31.8415 + randomDeltaLat).toFixed(4);
            const mockLng = +(-102.3121 + randomDeltaLng).toFixed(4);
            setGpsLocation({
              lat: mockLat,
              lng: mockLng,
              accuracy: 8,
              formatted: `Permian Bas. Zone (${mockLat}, ${mockLng})`
            });
            setGpsLoading(false);
          }, 600);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setTimeout(() => {
        setGpsLocation({
          lat: 31.9972,
          lng: -102.0779,
          accuracy: 15,
          formatted: `Ector County Node (31.9972, -102.0779)`
        });
        setGpsLoading(false);
      }, 500);
    }
  };

  // Template pre-fill matching physical ticket attachment
  const loadAttachedTicketTemplate = () => {
    setSelectedServiceLine(ServiceLine.StimulationPumping);
    setClientName("Chevron USA");
    setWellName("Legacy North 14H");
    setRouteFrom("Longview, TX");
    setRouteTo("Location and Back");
    setHoursWorked(8);
    setJsaVerified(true);
    setTailgateVerified(true);
    setClientRepresentative("Johnathan Mercer");
    
    // 7 line items precisely matching the physical ticket image.
    // Bonus-eligible company revenue = Operator ($11,840) + Air foam unit ($15,000) = $26,840.
    // Pass-through (non-bonus) = Mileage + chemicals + fuel + trucking = $15,981.80.
    // Together they total the $42,821.80 ticket.
    const attachedItems: LineItem[] = [
      {
        id: `attached-li-1`,
        priceBookItemId: "jt-stim-01",
        name: `${fieldHandName} (Operator)`,
        category: "labor",
        unitRate: 1480.00,
        unitMeasure: "day",
        quantity: 8.00,
        total: 11840.00
      },
      {
        id: `attached-li-2`,
        priceBookItemId: "jt-stim-02",
        name: "Mileage (Longview & Back)",
        category: "equipment",
        unitRate: 230.85,
        unitMeasure: "day",
        quantity: 8.00,
        total: 1846.80,
        isThirdParty: true
      },
      {
        id: `attached-li-3`,
        priceBookItemId: "jt-stim-03",
        name: "Air foam unit (Unit #1)",
        category: "equipment",
        unitRate: 2500.00,
        unitMeasure: "day",
        quantity: 6.00,
        total: 15000.00
      },
      {
        id: `attached-li-4`,
        priceBookItemId: "jt-stim-04",
        name: "Soap @ 45. per gallon (chem)",
        category: "material",
        unitRate: 45.00,
        unitMeasure: "gal",
        quantity: 75.00,
        total: 3375.00,
        isThirdParty: true
      },
      {
        id: `attached-li-5`,
        priceBookItemId: "jt-stim-05",
        name: "Inhibitor @ 35. per gallon (chem)",
        category: "material",
        unitRate: 35.00,
        unitMeasure: "gal",
        quantity: 50.00,
        total: 1750.00,
        isThirdParty: true
      },
      {
        id: `attached-li-6`,
        priceBookItemId: "jt-stim-06",
        name: "Diesel Fuel @ 5.50 per gallon (fuel)",
        category: "material",
        unitRate: 5.50,
        unitMeasure: "gal",
        quantity: 1420.00,
        total: 7810.00,
        isThirdParty: true
      },
      {
        id: `attached-li-7`,
        priceBookItemId: "jt-stim-07",
        name: "Delivery/Return Trucking on foam air unit (trucking)",
        category: "equipment",
        unitRate: 600.00,
        unitMeasure: "trip",
        quantity: 2.00,
        total: 1200.00,
        isThirdParty: true
      }
    ];
    setLineItems(attachedItems);
  };

  // Auto-pricing engine helper: add a item from price book dynamically
  const selectPriceBookItem = (item: PriceBookItem) => {
    // Check if item already exists as line item
    const existsIndex = lineItems.findIndex((li) => li.priceBookItemId === item.id);
    if (existsIndex >= 0) {
      // Increments quantity
      const updated = [...lineItems];
      updated[existsIndex].quantity += 1;
      updated[existsIndex].total = parseFloat(
        (updated[existsIndex].quantity * updated[existsIndex].unitRate).toFixed(2)
      );
      setLineItems(updated);
    } else {
      // Create fresh new standard mapped Line Item
      const newItem: LineItem = {
        id: `li-itm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        priceBookItemId: item.id,
        name: item.name,
        category: item.category,
        unitRate: item.unitRate,
        unitMeasure: item.unitMeasure,
        quantity: item.category === "equipment" ? hoursWorked : 1, // Default equipment qty maps to hoursWorked
        total: parseFloat(
          ((item.category === "equipment" ? hoursWorked : 1) * item.unitRate).toFixed(2)
        )
      };
      setLineItems([...lineItems, newItem]);
    }
  };

  // Sync equipment hours when hours worked changes
  const handleHoursWorkedChange = (hours: number) => {
    setHoursWorked(hours);
    const updated = lineItems.map((item) => {
      // Automatically adjust equipment quantities matching hours if they exist
      if (item.category === "equipment") {
        const qty = hours;
        return {
          ...item,
          quantity: qty,
          total: parseFloat((qty * item.unitRate).toFixed(2))
        };
      }
      return item;
    });
    setLineItems(updated);
  };

  // Modify individual line item quantities directly
  const updateLineItemQty = (id: string, qty: number) => {
    if (qty < 0.1) return; // Prevent negative or zero quantites
    setLineItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = parseFloat(qty.toFixed(2));
          return {
            ...item,
            quantity: newQty,
            total: parseFloat((newQty * item.unitRate).toFixed(2))
          };
        }
        return item;
      })
    );
  };

  const removeLineItem = (id: string) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleThirdParty = (id: string) => {
    setLineItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isThirdParty: !item.isThirdParty
          };
        }
        return item;
      })
    );
  };

  // Calculators
  const financialSubtotal = lineItems.reduce((acc, item) => acc + item.total, 0);

  // Form compile package helper
  const compileTicketData = (status: Ticket["status"]): Ticket => {
    // Estimations
    const activeSubtotal = lineItems
      .filter((item) => !item.isThirdParty)
      .reduce((acc, item) => acc + item.total, 0);

    // The employee earns the bonus only (5% of bonus-eligible revenue); the ticket
    // hours bill the client, they are not employee pay.
    const bonusPay = activeSubtotal * 0.05;

    return {
      id: initialTicket?.id || `tkt-${Date.now()}`,
      ticketNumber,
      status,
      createdAt: initialTicket?.createdAt || new Date().toISOString(),
      serviceLine: selectedServiceLine,
      clientName: clientName.trim() || "Unassigned Client",
      wellName: wellName.trim() || "Unspecified Well",
      supervisorName,
      clientRepresentative: clientRepresentative.trim() || "TBD Rep",
      hoursWorked,
      jsaVerified,
      tailgateVerified,
      gpsLocation,
      bhaTally: [],
      lineItems,
      signatureData,
      routeFrom: routeFrom.trim(),
      routeTo: routeTo.trim(),
      approvedAt: status === "Approved" ? new Date().toISOString() : undefined,
      payrollAmount: parseFloat(bonusPay.toFixed(2)),
      billingAmount: parseFloat(financialSubtotal.toFixed(2)),
      isOngoing,
      runningDaysTally: isOngoing ? runningDaysTally : undefined,
      isJobFinished: isOngoing ? isJobFinished : undefined,
      fieldHandName
    };
  };

  // Triggers final submit checks
  const handleFinalSubmit = () => {
    setValidationError("");
    if (!clientName.trim()) {
      setValidationError("Client Name is required.");
      return;
    }
    if (!wellName.trim()) {
      setValidationError("Well name / pad coordinates required.");
      return;
    }
    if (!clientRepresentative.trim()) {
      setValidationError("On-Site Client Representative (Company Man Name) is required.");
      return;
    }
    if (!jsaVerified || !tailgateVerified) {
      setValidationError("Safety Verification Incomplete. You must review and assert JSA & Tailgate meetings.");
      return;
    }
    if (lineItems.length === 0) {
      setValidationError("At least one pricing Line Item must be configured in the invoice worksheet.");
      return;
    }
    if (!signatureData) {
      setValidationError("Representative Pen Sign-Off is required for final workflow submission.");
      return;
    }

    const compiled = compileTicketData("Pending Review");
    onSubmitForReview(compiled);
  };

  const handleSaveDraftLocal = () => {
    const compiled = compileTicketData("Draft");
    onSaveDraft(compiled);
  };

  return (
    <div id="ticket-form-container" className="flex flex-col gap-5 px-1 py-1 text-zinc-200">
      
      {/* Visual Progress Header */}
      <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-amber-500 font-mono font-bold flex items-center gap-1">
            <Zap size={10} /> Active Entry Deck
          </span>
          <h2 className="text-base font-bold text-zinc-100 mt-1">
            {initialTicket ? `Edit Ticket #${ticketNumber}` : "New Digital Field Ticket"}
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs bg-zinc-950 border border-zinc-800 text-zinc-450 font-mono px-2 py-1 rounded">
            {ticketNumber}
          </span>
        </div>
      </div>

      {/* ERROR BANNER */}
      {validationError && (
        <div id="form-validation-error" className="bg-rose-950/40 border border-rose-900 text-rose-350 p-3 rounded-lg text-xs flex items-start gap-2 animate-pulse">
          <Info size={16} className="text-rose-455 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold uppercase tracking-wider text-[9px] text-rose-200 block mb-0.5">Required Action Pending:</strong>
            <span className="font-mono text-[11px]">{validationError}</span>
          </div>
        </div>
      )}

      {/* Meta parameters Panel */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-center gap-1.5 border-b border-zinc-850 pb-2 mb-1 justify-between flex-wrap">
          <div className="flex items-center gap-1.5">
            <FileText size={13} className="text-amber-500" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">1. Operational Parameters &amp; Details</span>
          </div>
          <button
            id="load-attached-ticket-tpl"
            type="button"
            onClick={loadAttachedTicketTemplate}
            className="px-2.5 py-1 text-[9px] font-mono font-bold tracking-wider bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 border border-amber-500/20 hover:border-amber-500/40 rounded transition flex items-center gap-1 cursor-pointer"
            title="Import exact operator, mileage, chemical, air foam unit pricing items from the physical ticket attachment"
          >
            <Zap size={11} className="animate-pulse text-amber-400" />
            LOAD AIR FOAM FIELD TICKET TEMPLATE
          </button>
        </div>

        {/* Client & Well info split */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Customer Brand</label>
            <select
              id="input-client-name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="px-3 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none focus:border-amber-500 hover:border-zinc-700 cursor-pointer transition-all font-mono"
            >
              <option className="bg-zinc-955 text-zinc-200" value="Chevron USA">Chevron USA</option>
              <option className="bg-zinc-955 text-zinc-200" value="ConocoPhillips">ConocoPhillips</option>
              <option className="bg-zinc-955 text-zinc-200" value="Occidental Petroleum (OXY)">Occidental Petroleum (OXY)</option>
              <option className="bg-zinc-955 text-zinc-200" value="EOG Resources">EOG Resources</option>
              <option className="bg-zinc-955 text-zinc-200" value="ExxonMobil (XTO)">ExxonMobil (XTO)</option>
              <option className="bg-zinc-955 text-zinc-200" value="Devon Energy">Devon Energy</option>
              <option className="bg-zinc-955 text-zinc-200" value="Diamondback Energy">Diamondback Energy</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Well Name &amp; Wellpath</label>
            <select
              id="input-well-name"
              value={wellName}
              onChange={(e) => setWellName(e.target.value)}
              className="px-3 py-2.5 text-xs bg-zinc-955 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none focus:border-amber-500 hover:border-zinc-700 cursor-pointer transition-all font-mono"
            >
              <option className="bg-zinc-955 text-zinc-200" value="Legacy North 14H">Legacy North 14H</option>
              <option className="bg-zinc-955 text-zinc-200" value="Red Hawk State 03-A">Red Hawk State 03-A</option>
              <option className="bg-zinc-955 text-zinc-200" value="Wolfcamp Unit 09-U">Wolfcamp Unit 09-U</option>
              <option className="bg-zinc-955 text-zinc-200" value="University 22-04H">University 22-04H</option>
              <option className="bg-zinc-955 text-zinc-200" value="Federal 12-B">Federal 12-B</option>
              <option className="bg-zinc-955 text-zinc-200" value="Permian Deep 10H">Permian Deep 10H</option>
              <option className="bg-zinc-955 text-zinc-200" value="Devon State 16-2H">Devon State 16-2H</option>
              <option className="bg-zinc-955 text-zinc-200" value="Pecos River 08H">Pecos River 08H</option>
            </select>
          </div>
        </div>

        {/* Route Details */}
        <div className="grid grid-cols-2 gap-3.5 border-t border-zinc-850/60 pt-3 mt-1">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Route Origin (From)</label>
            <input
              id="input-route-from"
              type="text"
              placeholder="e.g. Longview, TX"
              value={routeFrom}
              onChange={(e) => setRouteFrom(e.target.value)}
              className="px-3 py-2 text-xs bg-zinc-955 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-amber-500 transition-all font-mono font-bold"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Route Destination (To)</label>
            <input
              id="input-route-to"
              type="text"
              placeholder="e.g. Location and Back"
              value={routeTo}
              onChange={(e) => setRouteTo(e.target.value)}
              className="px-3 py-2 text-xs bg-zinc-955 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-amber-500 transition-all font-mono font-bold"
            />
          </div>
        </div>

        {/* Representatives metadata split */}
        <div className="flex flex-col gap-3 p-3 bg-zinc-950/40 border border-zinc-850 rounded-xl transition-all duration-300 hover:border-zinc-700/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Salesman Name</label>
              <select
                id="select-supervisor"
                value={supervisorName}
                onChange={(e) => setSupervisorName(e.target.value)}
                className="px-3 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer hover:border-zinc-700 transition font-mono w-full"
              >
                <option className="bg-zinc-950 text-zinc-200" value="Dan Sullivan">Dan Sullivan</option>
                <option className="bg-zinc-950 text-zinc-200" value="Randy Orton">Randy Orton</option>
                <option className="bg-zinc-950 text-zinc-200" value="Steve Austin">Steve Austin</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Field Employee / Direct Report</label>
              <div className="relative">
                <input
                  id="input-field-hand"
                  type="text"
                  disabled
                  value={fieldHandName}
                  className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-900 rounded-lg text-zinc-400 font-mono focus:outline-none cursor-not-allowed opacity-80"
                  title="Auto-populated based on active field credential"
                />
                <span className="absolute right-2 top-2 text-[8px] bg-amber-500/10 text-amber-500 font-bold tracking-widest uppercase px-1 rounded border border-amber-500/25">
                  Logged In
                </span>
              </div>
            </div>
          </div>
          {/* Ongoing multi-day section */}
          <div className="border-t border-zinc-900 pt-3 mt-1.5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-zinc-900 border border-zinc-850 p-3 rounded-lg">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  id="checkbox-is-ongoing"
                  type="checkbox"
                  checked={isOngoing}
                  onChange={(e) => {
                    setIsOngoing(e.target.checked);
                    setRunningDaysTally(e.target.checked ? 1 : 1);
                  }}
                  className="rounded border-zinc-800 text-amber-500 focus:ring-0 focus:ring-offset-0 h-4.5 w-4.5 bg-zinc-950 cursor-pointer mt-0.5"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-200">Ongoing Multi-Day Session</span>
                  <span className="text-[9px] text-zinc-500 font-mono">Qualifies crew for incremental multi-day bonus pool</span>
                </div>
              </label>

              {isOngoing && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 transition-all animate-fadeIn duration-200 w-full lg:w-auto">
                  <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300">
                    <span>Tally Current Status:</span>
                    <span className="text-amber-500 font-bold">1 Active Day Tally</span>
                    <span className="text-[9px] bg-amber-500/10 text-amber-500 px-1 py-0.5 rounded border border-amber-500/20">
                      Multi-Day Tally
                    </span>
                  </div>

                  {/* Terminal Day Marker (End of Multi-Day Job) */}
                  <label className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-750 px-3 py-1.5 rounded-lg cursor-pointer transition-all select-none">
                    <input
                      id="checkbox-job-finished"
                      type="checkbox"
                      checked={isJobFinished}
                      onChange={(e) => setIsJobFinished(e.target.checked)}
                      className="rounded border-zinc-805 text-rose-500 focus:ring-0 focus:ring-offset-0 h-4.5 w-4.5 bg-zinc-950 cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-zinc-200">Terminal Day (End Ongoing Job)</span>
                      <span className="text-[9px] text-zinc-500 leading-none">Notifies payroll this is the final tally day</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Operational Time & GPS Panel */}
        <div className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-850 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Clock size={13} className="text-amber-500" /> Time Logged &amp; Geonav
            </label>
            <div className="flex items-center gap-2">
              <input
                id="input-hours-worked"
                type="number"
                min="1"
                max="24"
                value={hoursWorked}
                onChange={(e) => handleHoursWorkedChange(parseInt(e.target.value) || 8)}
                className="w-12 text-center py-0.5 text-xs font-bold font-mono bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-zinc-500 font-mono">hrs</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-zinc-900 pt-2.5">
            <div className="flex items-center gap-2">
              <button
                id="capture-gps-btn"
                type="button"
                onClick={handleGPSCapture}
                disabled={gpsLoading}
                className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded bg-zinc-90 w-auto border border-zinc-800 hover:border-amber-500 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all disabled:opacity-40 cursor-pointer"
              >
                <MapPin size={13} className={gpsLoading ? "animate-bounce text-amber-500" : "text-green-500"} />
                {gpsLoading ? "Resolving Sensors..." : "Capture Live GPS"}
              </button>
              {gpsLocation ? (
                <div className="text-[10px] font-mono text-green-450 truncate flex-1 text-right">
                  {gpsLocation.formatted}
                </div>
              ) : (
                <div className="text-[9px] text-zinc-650 font-mono flex-1 text-right italic">
                  [ GPS coordinate tag required ]
                </div>
              )}
            </div>
          </div>
        </div>

        {/* JSA Tailgate safety verification checklists */}
        <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-850 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1 font-mono">
            <ShieldCheck size={13} className="text-amber-500" />
            Safety Alignment (Mandatory)
          </span>
          <div className="flex flex-col gap-2 mt-1">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-400 hover:text-zinc-200">
              <input
                id="checkbox-jsa-verified"
                type="checkbox"
                checked={jsaVerified}
                onChange={(e) => setJsaVerified(e.target.checked)}
                className="rounded border-zinc-800 text-amber-500 focus:ring-0 focus:ring-offset-0 h-4 w-4 bg-zinc-905 cursor-pointer"
              />
              <span>JSA (Job Safety Analysis) Checked &amp; Filed</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-400 hover:text-zinc-200">
              <input
                id="checkbox-tailgate-verified"
                type="checkbox"
                checked={tailgateVerified}
                onChange={(e) => setTailgateVerified(e.target.checked)}
                className="rounded border-zinc-800 text-amber-500 focus:ring-0 focus:ring-offset-0 h-4 w-4 bg-zinc-905 cursor-pointer"
              />
              <span>Field Tailgate Safety Meeting Logged</span>
            </label>
          </div>
        </div>

        {/* Moved Service Line Trigger Selection down right above BHA tool tally */}
        <div className="border-t border-zinc-850 pt-4 flex flex-col gap-3">
          <h3 className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase flex items-center gap-1.5 font-mono">
            <FileText size={13} className="text-amber-500" />
            1. Job &amp; Operational Metadata
          </h3>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Service Line (Locks Price Book Filters)</label>
            <select
              id="select-service-line"
              value={selectedServiceLine}
              onChange={(e) => setSelectedServiceLine(e.target.value as ServiceLine)}
              className="w-full px-3 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none focus:border-amber-500 hover:border-zinc-700 cursor-pointer transition-all font-bold tracking-wide uppercase font-mono"
            >
              {Object.values(ServiceLine).map((sl) => (
                <option 
                  key={sl} 
                  value={sl}
                  className="bg-zinc-950 text-zinc-200 lowercase font-mono py-1.5 font-bold"
                >
                  {sl}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Auto-Pricing & Ledger System */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-4">
        <div>
          <h3 className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase flex items-center gap-1.5 font-mono">
            <TrendingUp size={13} className="text-zinc-400" />
            3. Job Type Catalog
          </h3>
          <p className="text-[11px] text-zinc-400 mt-1">
            Tap on any of the 3 job types below for <span className="text-amber-500 font-bold">{selectedServiceLine}</span> to instantly log it as a contract line item on the invoice worksheet.
          </p>
        </div>

        {/* Dynamic Job Types Box */}
        <div id="dynamic-chips-gallery" className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-850">
          {(JOB_TYPES_BY_SERVICE_LINE[selectedServiceLine] || []).map((item) => (
            <button
              id={`chip-${item.id}`}
              key={item.id}
              type="button"
              onClick={() => selectPriceBookItem({
                id: item.id,
                name: item.name,
                category: item.category,
                serviceLine: selectedServiceLine,
                unitRate: item.unitRate,
                unitMeasure: item.unitMeasure
              })}
              className="p-3 bg-zinc-900 hover:bg-zinc-850/60 border border-zinc-800 hover:border-amber-500/50 rounded-xl flex flex-col justify-between gap-3 text-left transition-all active:scale-[0.98] select-none cursor-pointer group"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`text-[8px] uppercase tracking-wider font-mono font-bold px-1.5 py-0.5 rounded border self-start ${
                  item.category === "equipment" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : item.category === "labor" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-zinc-800 text-zinc-400 border-zinc-750"
                }`}>
                  {item.category}
                </span>
                <span className="text-xs font-bold text-zinc-200 group-hover:text-amber-400 transition-colors leading-snug">{item.name}</span>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-800/60 pt-2 text-[10px] font-mono mt-1">
                <span className="text-zinc-500">Logs in:</span>
                <span className="text-zinc-300 font-bold uppercase tracking-wider">{item.unitMeasure}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Invoice Worksheet / colLineItems */}
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2 font-mono">Invoice Worksheet (colLineItems)</label>
          {lineItems.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-zinc-800 rounded-lg text-xs italic text-zinc-650">
              Select contract chips from the pricing gallery above to add operational line items.
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto border border-zinc-850 rounded p-1 bg-zinc-950">
              {lineItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-lg flex flex-col gap-2 relative group hover:border-zinc-700 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center flex-wrap gap-1">
                        <span className={`text-[8px] uppercase tracking-wider font-mono font-bold px-1.5 py-0.5 rounded border ${
                          item.category === "equipment" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : item.category === "labor" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-zinc-800 text-zinc-400 border-zinc-750"
                        }`}>
                          {item.category}
                        </span>
                        {item.isThirdParty && (
                          <span className="text-[8px] uppercase tracking-wider font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/25">
                            Third Party (No Bonus)
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-zinc-200 mt-1 block leading-tight">{item.name}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLineItem(item.id)}
                      className="text-zinc-550 hover:text-rose-455 p-0.5 cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Third Party toggle trigger */}
                  <div className="flex items-center justify-between border-t border-zinc-950 pt-1.5 text-[10px] font-mono">
                    <label className="flex items-center gap-1.5 cursor-pointer text-zinc-450 hover:text-zinc-300 select-none">
                      <input
                        type="checkbox"
                        checked={item.isThirdParty || false}
                        onChange={() => toggleThirdParty(item.id)}
                        className="rounded border-zinc-800 text-rose-500 focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5 bg-zinc-950 cursor-pointer"
                      />
                      <span>Mark as 3rd Party / Pass-through Charge</span>
                    </label>
                  </div>

                  {/* Quantity logging only — unit rates & totals are decoupled from the field-hand view */}
                  <div className="flex items-center justify-between border-t border-zinc-950 pt-2 text-[11px] font-mono">
                    <div className="text-zinc-500 flex items-center gap-1">
                      <span>Unit:</span>
                      <span className="text-zinc-300 font-semibold uppercase tracking-wider">{item.unitMeasure}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">Qty:</span>
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateLineItemQty(item.id, item.quantity - (item.category === "equipment" ? 1 : 5))}
                          className="px-2 py-0.5 hover:bg-zinc-900 text-zinc-500 cursor-pointer"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateLineItemQty(item.id, parseFloat(e.target.value) || 1)}
                          className="w-12 text-center bg-transparent border-none text-zinc-205 text-xs focus:ring-0 focus:ring-offset-0 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => updateLineItemQty(item.id, item.quantity + (item.category === "equipment" ? 1 : 5))}
                          className="px-2 py-0.5 hover:bg-zinc-900 text-zinc-500 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Operational log summary — contract pricing is applied downstream at the supervisor gate, not shown in the field-hand view */}
        <div className="border border-zinc-850 flex items-center justify-between bg-zinc-950 p-3.5 rounded-lg">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono">Operational Line Items Logged:</span>
          <span className="text-xs font-bold font-mono text-zinc-300">
            {lineItems.length} {lineItems.length === 1 ? "entry" : "entries"} · priced at supervisor gate
          </span>
        </div>
      </div>

      {/* 4. On-Site Client Proof-of-Work Verification */}
      <div className="bg-zinc-900 border border-zinc-805 rounded-xl p-4 flex flex-col gap-4">
        <h3 className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase flex items-center gap-1.5 font-mono">
          <ShieldCheck size={13} className="text-zinc-400" />
          4. On-Site Client Proof-of-Work Verification
        </h3>

        <p className="text-[11px] text-zinc-400 leading-normal">
          Authorized representative signature acknowledges performance of logged operational services under contract.
        </p>

        {/* Operational scope card for signature verification — pricing stays decoupled from the on-site view */}
        <div className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-850 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Customer Brand:</span>
            <span className="text-zinc-300 font-bold">{clientName || "(Not Configured)"}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Well Identifier:</span>
            <span className="text-zinc-300 font-bold">{wellName || "(Not Configured)"}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-900 pt-2.5 mt-2">
            <span className="font-bold uppercase tracking-wider text-[9px] text-zinc-500">Operational Scope Logged:</span>
            <span className="text-xs font-bold font-mono text-zinc-300">
              {lineItems.length} {lineItems.length === 1 ? "line item" : "line items"} · {hoursWorked} hrs
            </span>
          </div>
        </div>

        {/* Side-by-side verification: Name input and Stylus pad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start border-t border-zinc-850/60 pt-4">
          <div className="flex flex-col gap-1.5 bg-zinc-950 border border-zinc-850 p-4 rounded-xl">
            <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">
              Company Man Representative Name
            </label>
            <p className="text-[10px] text-zinc-500 mb-2">Print your full name here to authenticate authorization.</p>
            <input
              id="input-client-rep"
              type="text"
              placeholder="Johnathan Mercer"
              value={clientRepresentative}
              onChange={(e) => setClientRepresentative(e.target.value)}
              className="px-3.5 py-2.5 text-xs bg-zinc-900 border border-zinc-805 rounded-lg text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-amber-500 transition-all font-mono w-full font-bold"
            />
          </div>

          <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl flex flex-col gap-1.5">
            <SignaturePad
              initialValue={signatureData}
              onSave={(data) => setSignatureData(data)}
              onClear={() => setSignatureData(null)}
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* 5. PHYSICAL TICKET REGULATORY DISCLAIMER */}
      <div id="physical-regulatory-disclaimer" className="bg-yellow-500/10 border border-yellow-500/25 p-3.5 rounded-xl border-dashed flex flex-col items-center justify-center text-center font-mono">
        <span className="text-yellow-500 font-extrabold text-xs tracking-widest uppercase animate-pulse">
          THIS IS NOT AN INVOICE
        </span>
        <p className="text-[10px] text-zinc-400 mt-1 max-w-lg leading-normal">
          Authorized signature acknowledges performance of described services under contract rates. This physical-style receipt is an operational entry voucher for general ledger clearing and routing only.
        </p>
      </div>

      {/* Workflow trigger actions button bar */}
      <div className="border-t border-zinc-850 pt-5 flex flex-col md:flex-row items-center gap-3">
        <button
          id="draft-cancel-btn"
          type="button"
          onClick={onCancel}
          className="w-full md:flex-1 py-3 text-[10px] text-rose-450 border border-zinc-800 hover:border-rose-900 bg-zinc-950 hover:bg-zinc-900/50 rounded uppercase tracking-widest font-black transition cursor-pointer text-center"
        >
          Cancel &amp; Exit
        </button>
        {!isSupervisor && (
          <button
            id="draft-save-btn"
            type="button"
            onClick={handleSaveDraftLocal}
            className="w-full md:flex-1 py-3 text-[10px] text-zinc-400 font-bold uppercase tracking-widest rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-805 hover:text-white transition cursor-pointer"
          >
            Save Ticket Draft
          </button>
        )}
        <button
          id="workflow-submit-btn"
          type="button"
          onClick={handleFinalSubmit}
          className="w-full md:flex-1 py-3 text-[10px] text-black font-black uppercase tracking-widest rounded bg-amber-500 hover:bg-amber-400 transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10 cursor-pointer"
        >
          <ChevronRight size={13} /> {isSupervisor ? "Save Ticket Changes" : "Submit To Supervisor"}
        </button>
      </div>
      
    </div>
  );
}
