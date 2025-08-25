// Shared mock dental data for patient details pages
// This represents typical data found in Dentrix modules

export interface DocumentCenterItem {
  id: string;
  name: string;
  type: "scan" | "upload" | "form" | "insurance";
  date: string;
  size: string;
  category: string;
}

export interface ImageModuleItem {
  id: string;
  type: "radiograph" | "photo" | "scan";
  name: string;
  date: string;
  teeth?: string[];
  description: string;
  imageUrl: string;
  findings?: string[];
}

export interface ChartNote {
  id: string;
  date: string;
  type: "clinical" | "perio" | "treatment_plan" | "hygiene";
  provider: string;
  notes: string;
  teeth?: string[];
  procedures?: string[];
}

export interface LedgerEntry {
  id: string;
  date: string;
  type: "charge" | "payment" | "insurance" | "adjustment";
  description: string;
  amount: number;
  balance: number;
  insurance?: {
    carrier: string;
    claimStatus: "pending" | "processed" | "denied" | "paid";
    claimNumber?: string;
  };
}

// Mock data that will be shared across all patients
export const MOCK_DOCUMENT_CENTER: DocumentCenterItem[] = [
  {
    id: "doc-001",
    name: "Insurance Card - Front",
    type: "scan",
    date: "2024-01-15",
    size: "2.1 MB",
    category: "Insurance"
  },
  {
    id: "doc-002",
    name: "Insurance Card - Back",
    type: "scan",
    date: "2024-01-15",
    size: "1.8 MB",
    category: "Insurance"
  },
  {
    id: "doc-003",
    name: "Medical History Form",
    type: "form",
    date: "2024-01-10",
    size: "1.2 MB",
    category: "Forms"
  },
  {
    id: "doc-004",
    name: "Consent for Treatment",
    type: "form",
    date: "2024-01-10",
    size: "856 KB",
    category: "Forms"
  },
  {
    id: "doc-005",
    name: "Referral Letter - Orthodontist",
    type: "upload",
    date: "2024-02-20",
    size: "1.5 MB",
    category: "Referrals"
  }
];

export const MOCK_IMAGE_MODULE: ImageModuleItem[] = [
  {
    id: "img-001",
    type: "radiograph",
    name: "Bitewing Radiographs",
    date: "2024-01-15",
    teeth: ["13", "14", "15", "16", "17", "18", "19", "20"],
    description: "Routine bitewing radiographs for caries detection",
    imageUrl: "/dental-scans/bitewing.png",
    findings: ["No interproximal caries detected", "Adequate bone levels", "Previous restorations intact"]
  },
  {
    id: "img-002",
    type: "radiograph",
    name: "Panoramic Radiograph",
    date: "2024-01-15",
    description: "Full mouth panoramic radiograph",
    imageUrl: "/dental-scans/panoramic.png",
    findings: ["All permanent teeth present", "No pathology detected", "TMJ appears normal"]
  },
  {
    id: "img-003",
    type: "scan",
    name: "CBCT - Upper Jaw",
    date: "2024-02-10",
    teeth: ["11", "12", "13", "14", "15", "16", "17", "18"],
    description: "3D CBCT scan for implant planning",
    imageUrl: "/dental-scans/cbct.png",
    findings: ["Adequate bone density", "No sinus involvement", "Ideal implant site at #14"]
  },
  {
    id: "img-004",
    type: "photo",
    name: "Intraoral Photos - Anterior",
    date: "2024-01-15",
    teeth: ["11", "12", "13", "21", "22", "23"],
    description: "Clinical photographs of anterior teeth",
    imageUrl: "/dental-scans/intraoral-anterior.svg",
    findings: ["Mild gingival inflammation", "Plaque accumulation", "Enamel wear on incisors"]
  }
];

export const MOCK_CHART_NOTES: ChartNote[] = [
  {
    id: "note-001",
    date: "2024-01-15",
    type: "clinical",
    provider: "Dr. Smith",
    notes: "Routine examination and cleaning. Patient reports no pain or sensitivity. Oral hygiene fair - instructed on proper flossing technique. Small cavity detected on #14 mesial surface.",
    teeth: ["14"],
    procedures: ["Adult Prophy", "Comprehensive Exam", "Bitewing X-rays"]
  },
  {
    id: "note-002",
    date: "2024-01-15",
    type: "perio",
    provider: "Sarah RDH",
    notes: "Periodontal charting completed. Generalized 2-3mm pockets with BOP in posterior regions. Recommended more frequent cleanings and water flosser.",
    procedures: ["Periodontal Charting", "Oral Hygiene Instruction"]
  },
  {
    id: "note-003",
    date: "2024-02-01",
    type: "treatment_plan",
    provider: "Dr. Smith",
    notes: "Treatment plan presented: 1) Composite filling #14 mesial 2) Routine cleaning in 6 months 3) Consider fluoride treatment for sensitivity. Patient accepted plan.",
    teeth: ["14"],
    procedures: ["Treatment Plan Presentation"]
  },
  {
    id: "note-004",
    date: "2024-02-15",
    type: "clinical",
    provider: "Dr. Smith",
    notes: "Composite restoration completed on #14 mesial. Local anesthesia administered without complications. Post-op instructions given. Patient tolerated procedure well.",
    teeth: ["14"],
    procedures: ["Composite Filling - 1 Surface", "Local Anesthesia"]
  }
];

export const MOCK_LEDGER: LedgerEntry[] = [
  {
    id: "ledger-001",
    date: "2024-01-15",
    type: "charge",
    description: "Comprehensive Oral Evaluation",
    amount: 180.00,
    balance: 180.00,
    insurance: {
      carrier: "Delta Dental",
      claimStatus: "processed",
      claimNumber: "DD240115001"
    }
  },
  {
    id: "ledger-002",
    date: "2024-01-15",
    type: "charge",
    description: "Adult Prophylaxis",
    amount: 120.00,
    balance: 300.00,
    insurance: {
      carrier: "Delta Dental",
      claimStatus: "processed",
      claimNumber: "DD240115002"
    }
  },
  {
    id: "ledger-003",
    date: "2024-01-15",
    type: "charge",
    description: "Bitewing Radiographs (4)",
    amount: 85.00,
    balance: 385.00,
    insurance: {
      carrier: "Delta Dental",
      claimStatus: "processed",
      claimNumber: "DD240115003"
    }
  },
  {
    id: "ledger-004",
    date: "2024-01-20",
    type: "insurance",
    description: "Insurance Payment - Delta Dental",
    amount: -270.00,
    balance: 115.00,
    insurance: {
      carrier: "Delta Dental",
      claimStatus: "paid",
      claimNumber: "DD240115001-003"
    }
  },
  {
    id: "ledger-005",
    date: "2024-01-25",
    type: "payment",
    description: "Patient Payment - Cash",
    amount: -115.00,
    balance: 0.00
  },
  {
    id: "ledger-006",
    date: "2024-02-15",
    type: "charge",
    description: "Composite Filling - 1 Surface",
    amount: 195.00,
    balance: 195.00,
    insurance: {
      carrier: "Delta Dental",
      claimStatus: "pending",
      claimNumber: "DD240215001"
    }
  }
];
