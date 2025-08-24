// Mock patient data for EB appointment simulation
export interface MockPatient {
  id: string;
  name: string;
  fullName: string;
  dob: string;
  allergies: string[];
  notes: string[];
  lastVisit: string;
  activeConcerns: string[];
  visitReason: {
    primary: string;
    concerns: string[];
    symptoms: string[];
    duration: string;
    urgency: "routine" | "urgent" | "emergency";
    referringProvider: string | null;
  };
  scans: Array<{
    id: string;
    type: string;
    date: string;
    image: string; // Single image path for both thumbnail and full view
    description?: string;
    findings?: string[];
  }>;
  recentTreatments: Array<{
    id: string;
    date: string;
    name: string;
    type: string;
    teeth: string[];
    description: string;
    materials: string[];
    notes: string[];
    followUp?: string;
    cost?: string;
  }>;
  clinicalSummary: string;
}

export const EB_PATIENT: MockPatient = {
  id: "EB-0001",
  name: "E. B.",
  fullName: "EB Plumeri",
  dob: "2001-03-04",
  allergies: ["Penicillin"],
  notes: ["Mild dental anxiety"],
  lastVisit: "2025-07-10",
  activeConcerns: ["Veneers, #7–10"],
  visitReason: {
    primary: "Veneer follow-up examination",
    concerns: ["Check veneer margins", "Assess occlusion", "Address any sensitivity"],
    symptoms: ["None reported"],
    duration: "6 months post-treatment",
    urgency: "routine",
    referringProvider: null
  },
  scans: [
    { 
      id: "scan-1", 
      type: "CBCT", 
      date: "2025-06-15", 
      image: "/dental-scans/cbct.png",
      description: "3D cone beam CT scan of maxilla and mandible",
      findings: ["Adequate bone density for implants", "No pathology detected", "Veneer preparations visible"]
    },
    { 
      id: "scan-2", 
      type: "Bitewing", 
      date: "2025-07-10", 
      image: "/dental-scans/bitewing.png",
      description: "Posterior bitewing radiographs",
      findings: ["No caries detected", "Bone levels stable", "Restorations intact"]
    },
  ],
  recentTreatments: [
    { 
      id: "treatment-1",
      date: "2025-05-02", 
      name: "Veneer placement #7–10",
      type: "Restorative",
      teeth: ["#7", "#8", "#9", "#10"],
      description: "Porcelain veneer placement on anterior maxillary teeth for esthetic improvement",
      materials: ["IPS e.max Press", "Shade A1", "Bis-GMA resin cement"],
      notes: [
        "Patient satisfied with shade match",
        "Margins sealed and polished",
        "Occlusion adjusted for proper function"
      ],
      followUp: "6-month check for margin integrity",
      cost: "$2,800"
    },
    { 
      id: "treatment-2",
      date: "2025-06-15", 
      name: "Occlusion check and polish",
      type: "Maintenance",
      teeth: ["#7", "#8", "#9", "#10"],
      description: "Routine follow-up to check veneer margins and polish surfaces",
      materials: ["Diamond polishing paste", "Prophy cup"],
      notes: [
        "Margins intact with no microleakage",
        "Surfaces polished to high gloss",
        "Patient reports no sensitivity"
      ],
      followUp: "Annual check-up",
      cost: "$150"
    },
  ],
  clinicalSummary: "No mobility or sensitivity reported, margins intact. Shade A1 matched. Patient reports satisfaction with esthetics and function.",
};

// Simulation steps configuration
export const SIMULATION_STEPS = [
  { id: "patient", label: "pulling patient info...", duration: 500 },
  { id: "scans", label: "gathering recent scans", duration: 700 },
  { id: "treatments", label: "fetching recent treatments", duration: 600 },
  { id: "notes", label: "compiling clinical notes", duration: 800 },
] as const;

export type SimulationStep = typeof SIMULATION_STEPS[number];

// Enable/disable simulation feature
export const ENABLE_DEMO_SCENARIOS = true;
