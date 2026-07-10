import { ServiceLine, PriceBookItem, Ticket } from "./types";

export const MASTER_PRICE_BOOK: PriceBookItem[] = [
  // Wireline
  {
    id: "wl-eq-01",
    name: "Multi-Conductor Electric Wireline Cabin (12K PSI)",
    category: "equipment",
    serviceLine: ServiceLine.Wireline,
    unitRate: 295.0,
    unitMeasure: "hr"
  },
  {
    id: "wl-eq-02",
    name: "Telescopic Wireline Mast & Crane Truck",
    category: "equipment",
    serviceLine: ServiceLine.Wireline,
    unitRate: 110.0,
    unitMeasure: "hr"
  },
  {
    id: "sl-eq-01",
    name: "Standard Slickline Unit (Truck & Power Pack)",
    category: "equipment",
    serviceLine: ServiceLine.Wireline,
    unitRate: 185.0,
    unitMeasure: "hr"
  },
  {
    id: "sl-eq-02",
    name: "Dual-Barrier BOP System 3.06\" 10K",
    category: "equipment",
    serviceLine: ServiceLine.Wireline,
    unitRate: 450.0,
    unitMeasure: "day"
  },
  {
    id: "wl-mat-01",
    name: "High-Temp Casing Collar Locator (CCL)",
    category: "material",
    serviceLine: ServiceLine.Wireline,
    unitRate: 175.0,
    unitMeasure: "run"
  },
  {
    id: "wl-mat-02",
    name: "Super-Deep-Hole Perforating Charge 3-1/8\"",
    category: "material",
    serviceLine: ServiceLine.Wireline,
    unitRate: 55.0,
    unitMeasure: "ea"
  },
  {
    id: "wl-mat-03",
    name: "Gold-Pin Cable Head Connector Assembly",
    category: "material",
    serviceLine: ServiceLine.Wireline,
    unitRate: 140.0,
    unitMeasure: "ea"
  },
  {
    id: "sl-mat-01",
    name: "Premium Carbon Steel Slickline Wire (0.108\")",
    category: "material",
    serviceLine: ServiceLine.Wireline,
    unitRate: 0.35,
    unitMeasure: "ft"
  },
  {
    id: "sl-mat-02",
    name: "Heavy-Duty Tubing Swab Cup 2-7/8\"",
    category: "material",
    serviceLine: ServiceLine.Wireline,
    unitRate: 48.0,
    unitMeasure: "ea"
  },

  // Coil Tubing
  {
    id: "ct-eq-01",
    name: "High-Capacity 1.75\" Coiled Tubing Unit",
    category: "equipment",
    serviceLine: ServiceLine.CoilTubing,
    unitRate: 375.0,
    unitMeasure: "hr"
  },
  {
    id: "ct-eq-02",
    name: "Triplex Fluid Pump & Chemical Injection Skid",
    category: "equipment",
    serviceLine: ServiceLine.CoilTubing,
    unitRate: 145.0,
    unitMeasure: "hr"
  },
  {
    id: "ct-mat-01",
    name: "Nitrogen Gas Vaporizer Delivery (Bulk)",
    category: "material",
    serviceLine: ServiceLine.CoilTubing,
    unitRate: 6.5,
    unitMeasure: "mscf"
  },
  {
    id: "ct-mat-02",
    name: "Super-Glide Friction Reducer FR-180",
    category: "material",
    serviceLine: ServiceLine.CoilTubing,
    unitRate: 98.0,
    unitMeasure: "gal"
  },
  {
    id: "ct-mat-03",
    name: "Organic Acid Mud Descaler",
    category: "material",
    serviceLine: ServiceLine.CoilTubing,
    unitRate: 125.0,
    unitMeasure: "gal"
  },

  // Cementing
  {
    id: "cem-eq-01",
    name: "Twin-Pump Cementing Pumping Unit",
    category: "equipment",
    serviceLine: ServiceLine.Cementing,
    unitRate: 420.0,
    unitMeasure: "hr"
  },
  {
    id: "cem-mat-01",
    name: "Class H High-Yield Sulfate Resistant Cement",
    category: "material",
    serviceLine: ServiceLine.Cementing,
    unitRate: 18.25,
    unitMeasure: "sack"
  },
  {
    id: "cem-mat-02",
    name: "Calcium Chloride Cement Accelerator (50lb)",
    category: "material",
    serviceLine: ServiceLine.Cementing,
    unitRate: 24.50,
    unitMeasure: "bag"
  },

  // Stimulation/ Pumping
  {
    id: "stim-eq-01",
    name: "2500 HP High-Pressure Fracturing Pump Truck",
    category: "equipment",
    serviceLine: ServiceLine.StimulationPumping,
    unitRate: 550.0,
    unitMeasure: "hr"
  },
  {
    id: "stim-eq-02",
    name: "Proppant Blender Sand Control System",
    category: "equipment",
    serviceLine: ServiceLine.StimulationPumping,
    unitRate: 185.0,
    unitMeasure: "hr"
  },
  {
    id: "stim-mat-01",
    name: "Premium White Proppant Sand 40/70 Mesh",
    category: "material",
    serviceLine: ServiceLine.StimulationPumping,
    unitRate: 0.12,
    unitMeasure: "lb"
  },
  {
    id: "stim-mat-02",
    name: "Slickwater Gelling Agent FR-300",
    category: "material",
    serviceLine: ServiceLine.StimulationPumping,
    unitRate: 85.0,
    unitMeasure: "gal"
  },

  // Fishing
  {
    id: "fish-eq-01",
    name: "Heavy Duty Hydraulic Fishing Jar 4-3/4\"",
    category: "equipment",
    serviceLine: ServiceLine.Fishing,
    unitRate: 210.0,
    unitMeasure: "hr"
  },
  {
    id: "fish-mat-01",
    name: "Premium Overshot Guide Bowl & Grapple",
    category: "material",
    serviceLine: ServiceLine.Fishing,
    unitRate: 350.0,
    unitMeasure: "ea"
  },

  // Flowback
  {
    id: "flow-eq-01",
    name: "Four-Phase High-Pressure Flowback Separator",
    category: "equipment",
    serviceLine: ServiceLine.Flowback,
    unitRate: 180.0,
    unitMeasure: "hr"
  },
  {
    id: "flow-mat-01",
    name: "Corrosion Inhibitor CI-400 Treat Sheen",
    category: "material",
    serviceLine: ServiceLine.Flowback,
    unitRate: 65.0,
    unitMeasure: "gal"
  },

  // Drilling
  {
    id: "df-eq-01",
    name: "High-Shear Mud Mixing & Hopper System",
    category: "equipment",
    serviceLine: ServiceLine.Drilling,
    unitRate: 115.0,
    unitMeasure: "hr"
  },
  {
    id: "df-eq-02",
    name: "Solid Control Centrifuge & Dryer (Decanting)",
    category: "equipment",
    serviceLine: ServiceLine.Drilling,
    unitRate: 165.0,
    unitMeasure: "hr"
  },
  {
    id: "df-mat-01",
    name: "High-Purity Barite (Weighting Agent, 100lb Sock)",
    category: "material",
    serviceLine: ServiceLine.Drilling,
    unitRate: 28.5,
    unitMeasure: "sack"
  },
  {
    id: "df-mat-02",
    name: "Premium Bentonite Organic Gel (50lb Sack)",
    category: "material",
    serviceLine: ServiceLine.Drilling,
    unitRate: 22.0,
    unitMeasure: "sack"
  },
  {
    id: "df-mat-03",
    name: "Technical Caustic Soda Flakes (50lb Bag)",
    category: "material",
    serviceLine: ServiceLine.Drilling,
    unitRate: 46.5,
    unitMeasure: "bag"
  },

  // Completions
  {
    id: "comp-eq-01",
    name: "Completions Power Swivel System 150-Ton",
    category: "equipment",
    serviceLine: ServiceLine.Completions,
    unitRate: 320.0,
    unitMeasure: "hr"
  },
  {
    id: "comp-mat-01",
    name: "Production Isolation Packer 7\" 10K",
    category: "material",
    serviceLine: ServiceLine.Completions,
    unitRate: 1450.0,
    unitMeasure: "ea"
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: "tkt-001",
    ticketNumber: "TX-2026-6082",
    status: "Approved",
    createdAt: "2026-05-25T08:00:00Z",
    serviceLine: ServiceLine.Wireline,
    clientName: "Chevron USA",
    wellName: "Legacy North 14H",
    supervisorName: "Dan Sullivan",
    clientRepresentative: "Mark G. Vance",
    hoursWorked: 10,
    jsaVerified: true,
    tailgateVerified: true,
    gpsLocation: {
      lat: 31.8415,
      lng: -102.3121,
      formatted: "Midland County, Permian Basin (31.8415, -102.3121)"
    },
    bhaTally: [
      { id: "tool-1", name: "Slickline Rope Socket", od: 1.5, idInner: 0.5, length: 1.2 },
      { id: "tool-2", name: "Stem Bar (Heavy Weight)", od: 1.5, idInner: 0.0, length: 5.0 },
      { id: "tool-3", name: "Hydraulic Jar", od: 1.75, idInner: 0.75, length: 3.5 },
      { id: "tool-4", name: "Gauge Ring Tool 2.25\"", od: 2.25, idInner: 1.5, length: 1.5 }
    ],
    lineItems: [
      {
        id: "li-1",
        priceBookItemId: "sl-eq-01",
        name: "Standard Slickline Unit (Truck & Power Pack)",
        category: "equipment",
        unitRate: 185.0,
        unitMeasure: "hr",
        quantity: 10,
        total: 1850.0
      },
      {
        id: "li-2",
        priceBookItemId: "sl-mat-02",
        name: "Heavy-Duty Tubing Swab Cup 2-7/8\"",
        category: "material",
        unitRate: 48.0,
        unitMeasure: "ea",
        quantity: 4,
        total: 192.0
      }
    ],
    signatureData: "MOCK_SIGNATURE_CHEVRON_VANCE_DATE_5_25",
    approvedAt: "2026-05-25T18:30:00Z",
    payrollAmount: 450.00,
    billingAmount: 2042.00,
    fieldHandName: "Cody Rogers"
  },
  {
    id: "tkt-002",
    ticketNumber: "TX-2026-6085",
    status: "Pending Review",
    createdAt: "2026-05-28T14:15:00Z",
    serviceLine: ServiceLine.CoilTubing,
    clientName: "Occidental Petroleum (OXY)",
    wellName: "Red Hawk State 03-A",
    supervisorName: "Dan Sullivan",
    clientRepresentative: "Johnathan Mercer",
    hoursWorked: 12,
    jsaVerified: true,
    tailgateVerified: true,
    gpsLocation: {
      lat: 32.2458,
      lng: -103.5512,
      formatted: "Lea County, Delaware Basin (32.2458, -103.5512)"
    },
    bhaTally: [
      { id: "tool-b1", name: "CT Connector 1-3/4\"", od: 1.75, idInner: 1.0, length: 1.8 },
      { id: "tool-b2", name: "Motor Head Assembly", od: 2.125, idInner: 1.25, length: 4.8 },
      { id: "tool-b3", name: "Dual Flapper Backpressure Valve", od: 2.125, idInner: 1.25, length: 2.1 },
      { id: "tool-b4", name: "Washover Jetting Nozzle", od: 2.25, idInner: 0.75, length: 1.1 }
    ],
    lineItems: [
      {
        id: "li-ct1",
        priceBookItemId: "ct-eq-01",
        name: "High-Capacity 1.75\" Coiled Tubing Unit",
        category: "equipment",
        unitRate: 375.0,
        unitMeasure: "hr",
        quantity: 12,
        total: 4500.0
      },
      {
        id: "li-ct2",
        priceBookItemId: "ct-eq-02",
        name: "Triplex Fluid Pump & Chemical Injection Skid",
        category: "equipment",
        unitRate: 145.0,
        unitMeasure: "hr",
        quantity: 12,
        total: 1740.0
      },
      {
        id: "li-ct3",
        priceBookItemId: "ct-mat-02",
        name: "Super-Glide Friction Reducer FR-180",
        category: "material",
        unitRate: 98.0,
        unitMeasure: "gal",
        quantity: 15,
        total: 1470.0
      }
    ],
    signatureData: "MOCK_SIGNATURE_OXY_MERCER_DATE_5_28",
    billingAmount: 7710.00,
    fieldHandName: "Jack McCoy"
  },
  {
    id: "tkt-003",
    ticketNumber: "TX-2026-6080",
    status: "Rejected",
    createdAt: "2026-05-24T06:30:00Z",
    serviceLine: ServiceLine.Drilling,
    clientName: "EOG Resources",
    wellName: "Wolfcamp Unit 09-U",
    supervisorName: "Dan Sullivan",
    clientRepresentative: "Gary Martinez",
    hoursWorked: 8,
    jsaVerified: true,
    tailgateVerified: false,
    gpsLocation: {
      lat: 31.1124,
      lng: -101.9922,
      formatted: "Reagan County, TX (31.1124, -101.9922)"
    },
    bhaTally: [
      { id: "tool-x1", name: "Tri-Cone Drill Collar Section", od: 6.5, idInner: 3.25, length: 30.5 }
    ],
    lineItems: [
      {
        id: "li-df1",
        priceBookItemId: "df-eq-01",
        name: "High-Shear Mud Mixing & Hopper System",
        category: "equipment",
        unitRate: 115.0,
        unitMeasure: "hr",
        quantity: 8,
        total: 920.0
      },
      {
        id: "li-df2",
        priceBookItemId: "df-mat-01",
        name: "High-Purity Barite (Weighting Agent, 100lb Sock)",
        category: "material",
        unitRate: 28.5,
        unitMeasure: "sack",
        quantity: 120,
        total: 3420.0
      }
    ],
    signatureData: "MOCK_SIGNATURE_EOG_MARTINEZ",
    correctionNotes: "Safety compliance error: Tailgate check was logged as unverified! Please run the toolbox meeting with drilling team and check the Tailgate Verification box.",
    billingAmount: 4340.00,
    fieldHandName: "Jimmy Vance"
  }
];
