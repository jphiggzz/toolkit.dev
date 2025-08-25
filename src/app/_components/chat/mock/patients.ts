// Mock patient data for dental AI simulation system
import { format, differenceInYears } from "date-fns";

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

// EB Plumeri - Original patient (Dental professional)
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

// Donald Trump - High-profile patient with complex dental history
export const TRUMP_PATIENT: MockPatient = {
  id: "DT-0002", 
  name: "D. Trump",
  fullName: "Donald Trump",
  dob: "1946-06-14",
  allergies: [],
  notes: ["Prefers morning appointments", "Requests expedited service"],
  lastVisit: "2025-06-28",
  activeConcerns: ["Crown replacement #8", "Teeth whitening maintenance"],
  visitReason: {
    primary: "Crown replacement and cosmetic consultation",
    concerns: ["Replace loose crown", "Maintain bright smile", "Check overall oral health"],
    symptoms: ["Slight discomfort when chewing"],
    duration: "2 weeks",
    urgency: "urgent", 
    referringProvider: null
  },
  scans: [
    {
      id: "scan-dt-1",
      type: "Panoramic",
      date: "2025-06-28", 
      image: "/dental-scans/panoramic.png",
      description: "Full mouth panoramic radiograph",
      findings: ["Crown #8 shows marginal gap", "Multiple existing crowns in good condition", "No active caries detected"]
    }
  ],
  recentTreatments: [
    {
      id: "treatment-dt-1",
      date: "2025-04-15",
      name: "Professional whitening treatment",
      type: "Cosmetic",
      teeth: ["All anterior teeth"],
      description: "In-office bleaching with custom whitening protocol",
      materials: ["40% hydrogen peroxide gel", "LED light activation"],
      notes: [
        "Achieved 4 shades lighter",
        "No sensitivity reported",
        "Patient very satisfied with results"
      ],
      followUp: "3-month touch-up appointment", 
      cost: "$800"
    },
    {
      id: "treatment-dt-2", 
      date: "2025-01-20",
      name: "Routine cleaning and exam",
      type: "Preventive",
      teeth: ["Full mouth"],
      description: "Professional prophylaxis and comprehensive examination",
      materials: ["Ultrasonic scaler", "Fluoride treatment"],
      notes: [
        "Moderate tartar buildup removed",
        "Oral hygiene instruction provided",
        "Crown #8 showing early signs of wear"
      ],
      followUp: "6-month cleaning",
      cost: "$250"
    }
  ],
  clinicalSummary: "Multiple crowns and extensive restorative work. Patient maintains excellent oral hygiene with professional support. Crown #8 requires attention."
};

// Henry Kissinger - Senior patient with complex medical history  
export const KISSINGER_PATIENT: MockPatient = {
  id: "HK-0003",
  name: "H. Kissinger", 
  fullName: "Henry Kissinger",
  dob: "1923-05-27",
  allergies: ["Latex", "Aspirin"],
  notes: ["Requires antibiotic prophylaxis", "Heart condition - coordinate with cardiologist"],
  lastVisit: "2025-06-05",
  activeConcerns: ["Denture adjustment", "Dry mouth management"],
  visitReason: {
    primary: "Denture maintenance and oral health consultation",
    concerns: ["Improve denture fit", "Address dry mouth symptoms", "Routine oral cancer screening"],
    symptoms: ["Denture irritation", "Dry mouth", "Difficulty eating certain foods"],
    duration: "3 months",
    urgency: "routine",
    referringProvider: "Dr. Sarah Chen, Cardiology"
  },
  scans: [
    {
      id: "scan-hk-1",
      type: "Panoramic", 
      date: "2025-06-05",
      image: "/dental-scans/panoramic.png",
      description: "Edentulous panoramic radiograph",
      findings: ["Good bone density for denture support", "No pathology detected", "Bilateral TMJ changes consistent with age"]
    }
  ],
  recentTreatments: [
    {
      id: "treatment-hk-1",
      date: "2025-03-15",
      name: "Denture reline and adjustment",
      type: "Prosthetic",
      teeth: ["Complete upper and lower dentures"],
      description: "Soft reline of existing dentures with occlusal adjustment",
      materials: ["Soft acrylic resin liner", "Articulating paper"],
      notes: [
        "Improved retention and comfort",
        "Balanced occlusion achieved", 
        "Patient education on denture care provided"
      ],
      followUp: "3-month comfort check",
      cost: "$450"
    },
    {
      id: "treatment-hk-2",
      date: "2025-01-10", 
      name: "Oral cancer screening",
      type: "Diagnostic",
      teeth: ["Soft tissue examination"],
      description: "Comprehensive soft tissue examination and oral cancer screening",
      materials: ["ViziLite enhanced oral assessment"],
      notes: [
        "No suspicious lesions detected",
        "Minor tissue irritation from dentures noted",
        "Advised on dry mouth management"
      ],
      followUp: "Annual screening",
      cost: "$180"
    }
  ],
  clinicalSummary: "Well-maintained edentulous patient with complete dentures. Requires careful management due to medical complexity and age-related changes."
};

// Kramer from Seinfeld - Eccentric character with unique dental situations
export const KRAMER_PATIENT: MockPatient = {
  id: "KR-0004",
  name: "C. Kramer",
  fullName: "Cosmo Kramer", 
  dob: "1955-11-03",
  allergies: ["Novocaine sensitivity"],
  notes: ["Extremely nervous patient", "Prefers detailed explanations", "Unusual dietary habits"],
  lastVisit: "2025-07-08",
  activeConcerns: ["Chipped tooth from pretzel incident", "Gum irritation"],
  visitReason: {
    primary: "Emergency visit for chipped tooth",
    concerns: ["Repair chipped incisor", "Address gum inflammation", "Discuss dietary impact on teeth"],
    symptoms: ["Sharp edge cutting tongue", "Bleeding gums when brushing"],
    duration: "3 days",
    urgency: "urgent",
    referringProvider: null
  },
  scans: [
    {
      id: "scan-kr-1",
      type: "Bitewing",
      date: "2025-07-08",
      image: "/dental-scans/bitewing.png", 
      description: "Posterior bitewing radiographs",
      findings: ["Fractured enamel #9", "Generalized gingivitis", "No caries detected"]
    }
  ],
  recentTreatments: [
    {
      id: "treatment-kr-1", 
      date: "2025-07-08",
      name: "Emergency bonding repair",
      type: "Restorative", 
      teeth: ["#9"],
      description: "Composite bonding repair of fractured central incisor",
      materials: ["Composite resin shade A2", "Bonding agent", "Etch gel"],
      notes: [
        "Smooth restoration achieved",
        "Patient practiced opening mouth movements",
        "Advised to avoid hard foods temporarily"
      ],
      followUp: "2-week check for healing",
      cost: "$385"
    },
    {
      id: "treatment-kr-2",
      date: "2025-04-22",
      name: "Routine cleaning with oral hygiene instruction", 
      type: "Preventive",
      teeth: ["Full mouth"],
      description: "Professional prophylaxis with extensive patient education",
      materials: ["Ultrasonic scaler", "Fluoride foam", "Educational models"],
      notes: [
        "Heavy plaque accumulation removed",
        "Patient very engaged in learning proper technique",
        "Demonstrated flossing with enthusiasm"
      ],
      followUp: "3-month recall due to gingivitis",
      cost: "$220"
    }
  ],
  clinicalSummary: "Enthusiastic but inconsistent with oral hygiene. Recent trauma from unusual eating habits. Responds well to detailed explanations and demonstrations."
};

// All patients array for easy iteration
export const ALL_PATIENTS: MockPatient[] = [
  EB_PATIENT,
  TRUMP_PATIENT, 
  KISSINGER_PATIENT,
  KRAMER_PATIENT
];

// Get patient by ID helper
export function getPatientById(id: string): MockPatient | undefined {
  return ALL_PATIENTS.find(patient => patient.id === id);
}

// Get patient by name helper  
export function getPatientByName(name: string): MockPatient | undefined {
  return ALL_PATIENTS.find(patient => 
    patient.name.toLowerCase().includes(name.toLowerCase()) ||
    patient.fullName.toLowerCase().includes(name.toLowerCase())
  );
}

// Simulation steps configuration (shared across all patients)
export const SIMULATION_STEPS = [
  { id: "patient", label: "pulling patient info...", duration: 500 },
  { id: "scans", label: "gathering recent scans", duration: 700 },
  { id: "treatments", label: "fetching recent treatments", duration: 600 },
  { id: "notes", label: "compiling clinical notes", duration: 800 },
] as const;

export type SimulationStep = typeof SIMULATION_STEPS[number];

// Enable/disable simulation feature
export const ENABLE_DEMO_SCENARIOS = true;

// Helper function to generate patient-specific simulation message
export function generatePatientSimulationMessage(patient: MockPatient): string {
  const age = differenceInYears(new Date(), new Date(patient.dob));
  
  return `## Patient ${patient.name} - ${patient.visitReason.primary}

**Patient Overview:**
- ${patient.fullName} (${patient.id})
- Age: ${age}
- Allergies: ${patient.allergies.join(", ") || "None reported"}
- Last visit: ${format(new Date(patient.lastVisit), "MMM d, yyyy")}

**Visit Reason:**
- **Primary:** ${patient.visitReason.primary}
- **Specific Concerns:** ${patient.visitReason.concerns.join(", ")}
- **Duration:** ${patient.visitReason.duration}
- **Urgency:** ${patient.visitReason.urgency.charAt(0).toUpperCase() + patient.visitReason.urgency.slice(1)}
${patient.visitReason.symptoms.length > 0 && patient.visitReason.symptoms[0] !== "None reported" ? `- **Symptoms:** ${patient.visitReason.symptoms.join(", ")}` : ""}
${patient.visitReason.referringProvider ? `- **Referred by:** ${patient.visitReason.referringProvider}` : ""}

**Recent Activity:**
- **Scans:** ${patient.scans.length} recent scans available (${patient.scans.map(s => s.type).join(", ")})
- **Treatments:** Last treatment was "${patient.recentTreatments[0]?.name}" on ${format(new Date(patient.recentTreatments[0]?.date || new Date()), "MMM d, yyyy")}

**Clinical Summary:**
${patient.clinicalSummary}

**Recommended Actions:**
- Review recent scans in sidebar
- Address visit concerns: ${patient.visitReason.concerns.join(", ")}
${patient.notes.length > 0 ? `- Consider patient notes: ${patient.notes.join(", ").toLowerCase()}` : ""}
- Document findings and schedule follow-up if needed`;
}

