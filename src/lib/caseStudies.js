// Structured case-study data. Each study is rendered by src/pages/CaseStudy.jsx
// into the site's dark navy / burnt-orange theme, and summarized on the
// Portfolio and Case Studies pages via src/components/CaseStudyCard.jsx.
//
// These are anonymized, scenario-based "forensic breakdowns" (county-level
// locations, ticket numbers, no named clients) — cleared to publish under the
// metrics + anonymized case studies rule.

import ticket107559 from '../assets/case-studies/ticket-107559.jpg';
import exhibitOnboarding from '../assets/case-studies/exhibit-onboarding.webp';
import exhibitMarginNote from '../assets/case-studies/exhibit-margin-note.webp';
import exhibitJsa from '../assets/case-studies/exhibit-jsa.webp';

export const caseStudies = [
  {
    slug: 'digital-field-ticket',
    eyebrow: 'Billing, Payroll & Field Operations',
    category: 'Field Ticketing',
    caseStudyType: 'Anonymized field scenario',
    industry: 'Oilfield services',
    featured: true,
    title:
      "One paper ticket held $42,821.80 hostage for 11 days. Here's what it cost — and how digital field tickets fix it.",
    summary:
      'A forensic breakdown of a real oilfield services field ticket — and the case for moving billing, invoicing, and crew pay onto a digital field ticket workflow.',
    heroMetrics: [
      { value: '11 days', label: 'billing lag on one ticket', tone: 'accent' },
      { value: '$42,821.80', label: 'riding on a single sheet of paper', tone: 'plain' },
      { value: '< 24 hrs', label: 'field-to-invoice, digitally', tone: 'positive' },
    ],
    problem: {
      heading: 'Anatomy of a slow dollar',
      paragraphs: [
        'Ticket #107559 was written by hand at a wellsite in Lea County, NM on 10/26/2023. The billing codes that made it invoiceable — AFE 23106, Cost Code 9582 — weren’t added until 11/6/23. For 11 days, nearly $43K in completed work sat in a truck cab, uninvoiced.',
        'Multiply that across dozens of simultaneous jobs and manual ticketing quietly locks up millions in working capital — before you count the tickets that get lost, oil-stained, or mis-keyed.',
      ],
      cards: [
        {
          label: 'Revenue leakage',
          text: 'One keystroke — 142 gal of diesel instead of 1,420 — is a $7,029 billing miss.',
        },
        {
          label: 'High-value paper',
          text: "Lose the sheet, lose the job — recovery means awkward calls to the customer's Company Man.",
        },
        {
          label: 'Seven line items, by hand',
          text: 'Hourly labor, rentals, per-gallon chemicals, fuel pass-throughs, trucking — all re-typed by hand before it ever reaches accounting.',
        },
        {
          label: 'Coding disconnect',
          text: 'AFE and cost codes were added in highlighter, back at the office. No codes, no invoice.',
        },
      ],
      exhibit: {
        label: 'Exhibit A — Ticket #107559',
        caption:
          'Handwritten codes and sign-off date visible in highlighter, added 11 days after the work.',
        image: ticket107559,
      },
    },
    fix: {
      heading: 'From weeks of paper friction to hours',
      intro:
        'When a ticket goes digital, every handoff that used to take days happens at submission: GPS-stamped sign-off, an approximate price pulled from historical rates, and validated AFE codes — queued for a scheduled transmission to NetSuite and Paylocity through a self-hosted workflow, no manual re-entry required.',
      columns: ['Pipeline stage', 'Manual paper', 'Crude HR digital'],
      rows: [
        ['Ticket generation', 'Operator handwrites details at the wellsite', 'Mobile app entry, historical rate pre-filled'],
        ['Wellsite sign-off', 'Paper hand-signed by the Company Man', 'Digital sign-off with live GPS stamp'],
        ['Office delivery', '3–7 days, physically couriered', 'Instant, over cell or satellite'],
        ['AFE / cost coding', '2–4 days of manual review and highlighting', 'Pre-validated at submission'],
        ['ERP & payroll entry', '1–3 days of clerk typing', 'Scheduled transmission to NetSuite & Paylocity'],
      ],
      totalRow: ['Total invoicing lag', '6–14 days', 'Under 24 hours'],
      math: 'Cutting 10 days of invoicing lag on $1.5M of monthly billing frees roughly $500,000 in liquid cash flow — immediately reinvestable.',
    },
    ledger: {
      left: {
        eyebrow: 'Payroll',
        heading: 'Split ledgers, without the spreadsheet gymnastics',
        intro:
          'Bonuses on this ticket are owed only on the $26,840 of labor and rentals — not the $15,981.80 of pass-through chemicals, fuel, and trucking. The app flags pass-throughs at the line item and splits the ledger automatically at submission; final dollar amounts sync once the supervisor-approved price clears NetSuite. No manual math, no bonus disputes.',
        lines: [
          { label: 'Ticket total', value: '$42,821.80', tone: 'head' },
          { label: '├─ Bonus-eligible: labor & rental', value: '$26,840.00', tone: 'pos' },
          { label: '└─ Excluded pass-throughs', value: '$15,981.80', tone: 'muted' },
        ],
      },
      right: {
        eyebrow: 'Crew Trust',
        heading: 'Your operators see their money before payday',
        intro:
          'Skilled operators leave over late and murky bonuses. With pending earnings and estimated next check on their phone, "did my ticket get approved?" stops being a phone call to the office.',
        statuses: [
          { label: 'Ticket #107559', status: 'Pending Review', tone: 'neg' },
          { label: 'Ticket #107559', status: 'Approved & Settled', tone: 'pos' },
        ],
        highlight: { label: 'Estimated next check', value: '$3,218.80' },
      },
    },
    deepDive: [
      {
        title: 'Forced compliance gatekeeping',
        text: 'No JSA check, no submission. The app blocks a ticket until safety documentation is complete and a live GPS stamp proves the operator is at the designated wellsite — safety stops being retroactive paperwork.',
      },
      {
        title: 'Audit-ready in seconds',
        text: 'Every safety check, signature, and location stamp archives to secure cloud storage. An OSHA audit or billing dispute is a search, not a week in the filing cabinets.',
      },
    ],
    bottomLine: [
      { value: '11+d → <1d', text: 'Processing cycle time. Faster cash, less working capital tied up.' },
      { value: '1.5–3.0%', text: 'Margin recovered when estimates start from historical rates instead of memory.' },
      { value: '1–2 FTEs', text: 'Reallocated from data entry to higher-value work.' },
      { value: '100%', text: 'Tickets with JSA checks, GPS stamps, and audit-ready records.' },
    ],
    tools: ['Mobile field ticketing app', 'Historical rate pre-fill', 'GPS-stamped digital sign-off', 'NetSuite & Paylocity sync'],
    relatedServices: ['Business Process Automation', 'Workflow and Systems Consulting', 'Fractional HR Support'],
    cta: {
      heading: 'Stop chasing paper. Start collecting.',
      text: "We'll map your ticket workflow, load your historical rates, and show you the payback math for your operation.",
    },
  },
  {
    slug: 'field-onboarding',
    eyebrow: 'Digitized Field Onboarding & Rig Readiness',
    category: 'Hiring and Onboarding',
    caseStudyType: 'Anonymized field scenario',
    industry: 'Oilfield services',
    featured: true,
    title:
      "A 12-day paper onboarding delay cost $18,400 in idle payroll per hand. Here's how a digitized workflow put crews on-site in 48 hours.",
    summary:
      'A forensic breakdown of a new-hire onboarding backlog in the Delaware Basin — and how replacing paper binders with custom-built mobile forms eliminated non-productive time.',
    heroMetrics: [
      { value: '12 days', label: 'paper onboarding lead time', tone: 'accent' },
      { value: '$18,400', label: 'idle payroll & lost billable rate per hand', tone: 'plain' },
      { value: '< 48 hrs', label: 'offer letter to fully cleared on-site', tone: 'positive' },
    ],
    problem: {
      heading: 'Anatomy of an idle crew',
      paragraphs: [
        'A wireline operator in Loving County, TX was hired on 01/12/2026 to support a 4-man crew deployment for a major operator. The onboarding packet — paper I-9 forms, DISA drug test chain-of-custody, PEC SafeLand cards, and DOT physical records — was physically couriered to the regional HR desk in Midland.',
        "Because DISA results and PEC credentials had to be manually cross-referenced across three web portals and re-typed into the ERP, the worker sat idle in the yard for nearly two weeks on guarantee pay. When the crew finally arrived at the operator's gate on 01/24/2026, a missing physical H2S certification copy caused an immediate turn-away.",
      ],
      cards: [
        {
          label: 'Idle payroll drag',
          text: 'Paid $32/hr base plus per-diem for 12 days while waiting on manual background and drug test verification.',
        },
        {
          label: 'Operator gate turn-aways',
          text: 'Missing physical copies of PEC/H2S cards meant immediate site rejection by the Company Man.',
        },
        {
          label: 'Compliance re-keying',
          text: 'HR spent 4.5 hours per hire re-typing paper forms into the ERP and uploading files to Veriforce.',
        },
        {
          label: 'Revenue loss',
          text: 'The company lost 10 days of billable day-rate revenue because the 4th crew slot remained unverified.',
        },
      ],
      exhibit: {
        label: 'Exhibit A — New-hire onboarding packet',
        caption:
          'Paper I-9s, DISA chain-of-custody, and PEC/H2S cards couriered to Midland for manual cross-referencing.',
        image: exhibitOnboarding,
      },
    },
    fix: {
      heading: 'From paper packets to custom mobile clearance',
      intro:
        'By mapping the bottlenecks and building a bespoke digital workflow, the heavy lifting of onboarding shifts from the HR desk to automated systems. New hires complete I-9s, tax forms, safety policies, and document uploads via mobile-friendly forms before they ever step foot in the yard.',
      columns: ['Onboarding stage', 'Legacy paper & binders', 'Digitized workflow (via Crude HR)'],
      rows: [
        ['Document collection', 'Paper packets filled out in breakroom', 'Custom mobile self-onboarding forms'],
        ['Background & DISA screening', 'Manual paper chain-of-custody tracking', 'Automated status tracking dashboards'],
        ['Safety certifications', 'Photocopies of physical PEC / H2S cards', 'Digital credential wallets'],
        ['Operator gate verification', 'Paper binder in truck glove box', 'Live digital credential checks'],
      ],
      totalRow: ['Total onboarding lead time', '12–14 days', 'Under 48 hours'],
      math: 'Cutting onboarding lag from 12 days down to 2 days across 50 annual field hires saves over $140,000 in unbillable idle wage expenses while accelerating time-to-revenue.',
    },
    ledger: {
      left: {
        eyebrow: 'Idle Wage Ledger',
        heading: 'Every idle day, priced out',
        intro:
          "Guarantee pay plus lost day-rate revenue on this single hire adds up fast. Crude HR's clearance dashboard collapses the wait to hours, not weeks.",
        lines: [
          { label: 'Idle payroll exposure', value: '$18,400.00', tone: 'head' },
          { label: '├─ Guarantee pay, 12 days @ $32/hr + per-diem', value: '12 days', tone: 'neg' },
          { label: '└─ Lost billable day-rate revenue', value: '10 days', tone: 'muted' },
        ],
      },
      right: {
        eyebrow: 'Crew Readiness',
        heading: "Dispatch sees exactly who's clear to roll",
        intro:
          "A live credential dashboard means the truck never leaves the yard for a crew member who isn't gate-ready.",
        statuses: [
          { label: 'Wireline Operator, Slot 4', status: 'Gate Turn-Away', tone: 'neg' },
          { label: 'Wireline Operator, Slot 4', status: 'Cleared & Mobilized', tone: 'pos' },
        ],
        highlight: { label: 'Time to fully cleared', value: '< 48 hrs' },
      },
    },
    deepDive: [
      {
        title: 'Automated credential clearance — zero gate rejections at the wellsite',
        text: "Instead of hoping a paper copy makes it to the truck, custom API integrations can sync with industry databases (DISA, Veriforce, SafeLand) to build a live, centralized dashboard. Before a truck rolls to the rig, dispatch can verify that every crew member meets the host operator's specific site-access matrix.",
      },
      {
        title: 'Mobile-first field onboarding — hire, verify, and mobilize from any smartphone',
        text: 'Using tailored digital forms, new hires complete their paperwork and upload photo IDs on their own devices. Submitted data is automatically routed to the correct HR folders and payroll systems without a single keystroke from office administration, stopping gate turn-aways cold.',
      },
    ],
    bottomLine: [
      { value: '12d → <48h', text: 'Time from signed offer letter to fully cleared, billable deployment.' },
      { value: '$2,800+', text: 'Direct savings per new hire in eliminated idle wage and admin overhead.' },
      { value: '100%', text: 'Gate compliance rate with instant digital certification verification.' },
      { value: '75%', text: 'Reduction in HR administrative hours spent chasing paper forms and certificates.' },
    ],
    tools: ['Custom mobile onboarding forms', 'API integrations (DISA, Veriforce, SafeLand)', 'Credential status dashboards'],
    relatedServices: ['Fractional HR Support', 'Business Process Automation', 'Workflow and Systems Consulting'],
    cta: {
      heading: 'Stop paying crews to wait. Start mobilizing in hours.',
      text: "We'll map your onboarding workflow and show you the payback math for your operation.",
    },
  },

  {
    slug: 'pass-through-recovery',
    eyebrow: 'Pass-Throughs & Unbilled Standby',
    category: 'Billing and Revenue',
    caseStudyType: 'Anonymized field scenario',
    industry: 'Oilfield services',
    featured: true,
    title:
      '$38,200 in standby sat forgotten in a cab. Here\'s how automated price books recovered 100% of pass-through margin.',
    summary:
      'A forensic breakdown of an unbilled equipment rental ticket in Reeves County, TX — and how replacing margin notes with custom automated line items stops revenue leakage.',
    heroMetrics: [
      { value: '18 days', label: 'unbilled standby lag', tone: 'accent' },
      { value: '$38,200', label: 'omitted pass-through revenue', tone: 'plain' },
      { value: '100%', label: 'margin recovered with Crude HR', tone: 'positive' },
    ],
    problem: {
      heading: 'Anatomy of a forgotten line item',
      paragraphs: [
        'Ticket #30911 was executed in Reeves County, TX on 03/12/2026. The job included 48 hours of pump standby and $12,400 in third-party chemical pass-throughs. The operator wrote the base labor on the main ticket, but squeezed the pass-through charges into an oil-stained margin note.',
        'The back office missed the handwritten note entirely, keying only the base rate into the ERP.',
      ],
      cards: [
        {
          label: 'Revenue leakage',
          text: '$12,400 in chemical pass-throughs omitted completely from the initial customer invoice.',
        },
        {
          label: 'Pricing disconnect',
          text: 'Standby rates billed at $125/hr instead of the contracted $185/hr tier due to bad handwriting.',
        },
        {
          label: 'Awkward recovery',
          text: 'Re-billing a customer 3 weeks later for missed charges creates friction and payment delays.',
        },
        {
          label: 'Re-keying errors',
          text: 'Pass-through receipts manually re-typed by hand into ERP accounting software.',
        },
      ],
      exhibit: {
        label: 'Exhibit A — Ticket #30911',
        caption:
          'Pass-through charges squeezed into an oil-stained margin note, missed entirely by the office.',
        image: exhibitMarginNote,
      },
    },
    fix: {
      heading: 'From handwritten margin notes to automated price books',
      intro:
        "By auditing the ticketing process, Crude HR designs custom mobile inputs where pass-through expenses and standby tiers are selected from pre-loaded dropdowns linked directly to a client's specific contract price books.",
      columns: ['Pipeline stage', 'Manual paper', 'Digitized workflow (via Crude HR)'],
      rows: [
        ['Standby tracking', 'Handwritten margin notes', 'Pre-loaded digital selector with automated rate tiers'],
        ['Pass-through billing', 'Receipts stapled to paper tickets', 'Instant photo upload linked to billing line-item'],
        ['Contract rate verification', 'Manual lookup in office binder', 'Automated pre-validated price book lock'],
        ['ERP data entry', '2–3 days manual clerk keying', 'Direct API export into accounting software'],
      ],
      totalRow: ['Total invoicing lag', '18 days', 'Under 24 hours'],
      math: 'Stopping a 2.5% revenue leakage across $2M in annual pass-through billing recovers $50,000 in direct bottom-line profit.',
    },
    ledger: {
      left: {
        eyebrow: 'Recovery Ledger',
        heading: 'Every missed dollar, itemized and reclaimed',
        intro:
          'Crude HR traces each unbilled or underbilled category on this ticket back to its source, so recovery is a documented line item — not a guess.',
        lines: [
          { label: 'Total unbilled exposure', value: '$38,200.00', tone: 'head' },
          { label: '├─ Chemical pass-throughs omitted', value: '$12,400.00', tone: 'pos' },
          { label: '├─ Standby rate shortfall (48 hrs)', value: '$2,880.00', tone: 'pos' },
          { label: '└─ Additional missed line items', value: '$22,920.00', tone: 'muted' },
        ],
      },
      right: {
        eyebrow: 'Billing Confidence',
        heading: 'Customers get one clean invoice, not a rebill',
        intro:
          'Pre-loaded price books mean the first invoice is the right invoice — no awkward follow-up calls asking for more money weeks after the job.',
        statuses: [
          { label: 'Ticket #30911', status: 'Underbilled — Disputed', tone: 'neg' },
          { label: 'Ticket #30911', status: 'Rebilled & Paid', tone: 'pos' },
        ],
        highlight: { label: 'Margin recovered', value: '100%' },
      },
    },
    deepDive: [
      {
        title: 'Pre-loaded price books — eliminate rate disputes before submission',
        text: 'Custom digital architecture locks in contracted customer rate sheets. Field operators select the exact equipment or pass-through tier from a dropdown on their phones, preventing accidental under-billing or rate mismatches at the source.',
      },
      {
        title: 'Digital proof of cost — instant pass-through backing docs',
        text: "Third-party vendor receipts are photographed in the field, attached to the digital form, and auto-routed to the client's specific AFE folder. Customers receive fully backed invoices without the administrative drag of scanning and matching paper receipts.",
      },
    ],
    bottomLine: [
      { value: '18d → <1d', text: 'Billing cycle time for complex multi-line tickets.' },
      { value: '2.5–4.0%', text: 'Margin recovered across all pass-through and rental billings.' },
      { value: '100%', text: 'Pass-through charges billed with complete backing documentation.' },
      { value: '1 FTE', text: 'Office staff reallocated from manual invoice auditing to core growth.' },
    ],
    tools: ['Custom mobile ticketing', 'Pre-loaded contract price books', 'API export to ERP / accounting'],
    relatedServices: ['Business Process Automation', 'Workflow and Systems Consulting', 'Fractional HR Support'],
    cta: {
      heading: 'Stop leaking margin. Start locking in rates.',
      text: "We'll load your contract price books and show you the payback math for your operation.",
    },
  },

  {
    slug: 'safety-gatekeeping',
    eyebrow: 'Safety & Compliance Gatekeeping',
    category: 'Safety and Compliance',
    caseStudyType: 'Anonymized field scenario',
    industry: 'Oilfield services',
    featured: true,
    title:
      "A missing JSA held a $68,450 payout hostage for 14 days. Here's what it cost — and how automated gatekeeping fixed it.",
    summary:
      'A forensic breakdown of an unbilled job from Eddy County, NM — and the case for bundling safety compliance directly into billing through custom digital workflows built by Crude HR.',
    heroMetrics: [
      { value: '14 days', label: 'safety audit lag', tone: 'accent' },
      { value: '$68,450', label: 'riding on a missing paper JSA', tone: 'plain' },
      { value: '< 24 hrs', label: 'work completed to customer invoice', tone: 'positive' },
    ],
    problem: {
      heading: 'Anatomy of a compliance bottleneck',
      paragraphs: [
        'Ticket #20482 was completed on 02/14/2026 at a wellsite in Eddy County, NM. The crew performed $68,450.00 in work, but the handwritten Job Safety Analysis (JSA) form remained crammed in the back of a crew truck cab. When billing attempted to invoice the Company Man on 02/18/2026, sign-off was rejected: no verified JSA on file meant no invoice approval.',
        'Multiply that across multiple rigs, and missing paperwork quietly locks up tens of thousands in working capital — while exposing your company to massive audit penalties.',
      ],
      cards: [
        {
          label: 'Safety disconnect',
          text: 'JSA completed on paper, but never made it to the office with the billing ticket.',
        },
        {
          label: 'Retroactive risk',
          text: 'Paper JSA signatures created post-incident create massive OSHA liability during audits.',
        },
        {
          label: 'Manual cross-referencing',
          text: 'Admin spent 6 hours hunting down the operator to confirm tailgate meeting notes.',
        },
        {
          label: 'Invoicing stagnation',
          text: '$68.4K sitting in unbilled limbo for two full weeks over a single missing sheet.',
        },
      ],
      exhibit: {
        label: 'Exhibit A — Ticket #20482',
        caption:
          'Handwritten JSA never left the crew truck — billing rejected sign-off 4 days after job completion.',
        image: exhibitJsa,
      },
    },
    fix: {
      heading: 'From retroactive paperwork to forced gatekeeping',
      intro:
        'When safety and ticketing are unified through tailored automation, work cannot begin without a geotagged JSA. A custom-built workflow lets approval happen live at the wellsite, attaching safety docs directly to the invoice bundle automatically.',
      columns: ['Pipeline stage', 'Manual paper', 'Digitized workflow (via Crude HR)'],
      rows: [
        ['JSA generation', 'Paper form filled out in truck cab', 'Mandatory mobile flow before ticket creation'],
        ['Wellsite verification', 'Unverified time/location on paper', 'Live GPS stamp & pre-job crew sign-off'],
        ['Safety audit trail', '10–14 days physical filing lag', 'Instant cloud archive routed by job ID'],
        ['Operator billing approval', 'Rejected due to missing JSA', 'Pre-validated safety bundle attached to invoice'],
      ],
      totalRow: ['Total invoicing lag', '14 days', 'Under 24 hours'],
      math: 'Eliminating 13 days of compliance-related billing delays across $1.2M in monthly revenue releases roughly $520,000 in liquid cash flow — immediately.',
    },
    ledger: {
      left: {
        eyebrow: 'Billing Gate',
        heading: 'No verified JSA, no released invoice',
        intro:
          'The full $68,450.00 on this ticket sat blocked behind one missing safety form. Crude HR flags the hold at submission and releases the invoice automatically the moment the geotagged JSA lands. No manual chasing, no billing surprises.',
        lines: [
          { label: 'Ticket total', value: '$68,450.00', tone: 'head' },
          { label: '├─ Blocked: no verified JSA on file', value: '14 days', tone: 'neg' },
          { label: '└─ Released: JSA verified & attached', value: '< 24 hrs', tone: 'pos' },
        ],
      },
      right: {
        eyebrow: 'Crew Trust',
        heading: 'Operators see the gate close and open in real time',
        intro:
          'A crew that knows exactly why a ticket is held — and exactly when it clears — stops calling the office to ask what happened.',
        statuses: [
          { label: 'Ticket #20482', status: 'Rejected — No JSA', tone: 'neg' },
          { label: 'Ticket #20482', status: 'Approved & Settled', tone: 'pos' },
        ],
        highlight: { label: 'OSHA audit exposure', value: '$0' },
      },
    },
    deepDive: [
      {
        title: 'Compliance gatekeeping — no JSA? No ticket. No exceptions.',
        text: 'Custom digital forms can be configured to block ticket creation until the safety checklist is completed, geotagged, and signed by the crew via their own devices. Safety shifts from a delayed administrative chore into an automated, mandatory gatekeeper for billing.',
      },
      {
        title: 'Audit-ready in seconds — one-click compliance packages',
        text: "When an OSHA auditor or client representative asks for safety records, you don't hunt through filing cabinets. Automated routing bundles the GPS-verified JSA, operator signatures, and line-item ticket into a single PDF instantly stored in your existing cloud drive.",
      },
    ],
    bottomLine: [
      { value: '14d → <1d', text: 'Compliance processing time. Faster invoicing, zero missing JSA holds.' },
      { value: '100%', text: 'JSAs pre-validated with live GPS timestamps before work starts.' },
      { value: '1.5 FTEs', text: 'Admin time reallocated from chasing paper forms to strategic ops.' },
      { value: '$0', text: 'OSHA audit exposure from missing or retroactively signed safety forms.' },
    ],
    tools: ['Mandatory mobile JSA flow', 'GPS-verified crew sign-off', 'One-click compliance packages'],
    relatedServices: ['Business Process Automation', 'Workflow and Systems Consulting', 'Fractional HR Support'],
    cta: {
      heading: 'Stop chasing paper. Start collecting.',
      text: "We'll map your ticket workflow, build the compliance gate, and show you the payback math for your operation.",
    },
  },
];

export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getRelatedCaseStudies(study, limit = 2) {
  return caseStudies.filter((candidate) => candidate.slug !== study.slug).slice(0, limit);
}
