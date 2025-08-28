// Mock citation data for dental simulation system
import type { CitationData } from "../citation-dialog";

// Clinical Summary Citations
export const CLINICAL_SUMMARY_CITATIONS: CitationData[] = [
  {
    id: "cs-001",
    title: "Comprehensive Oral Health Assessment - EB-0001",
    type: "medical_record",
    source: "DentistryPro EMR System",
    date: "2025-07-10",
    author: "Dr. Sarah Chen, DDS",
    institution: "Downtown Dental Associates",
    excerpt: "Patient presents with well-maintained oral hygiene and stable periodontal status. Veneer restorations #7-10 show excellent integration with surrounding tissues. No signs of secondary caries or margin deterioration observed.",
    fullData: {
      patientId: "EB-0001",
      findings: [
        "Excellent oral hygiene with minimal plaque accumulation",
        "Healthy gingival tissues with no signs of inflammation",
        "Veneer margins well-sealed and polished",
        "Occlusion stable with no premature contacts",
        "No signs of bruxism or parafunction"
      ],
      recommendations: [
        "Continue current oral hygiene regimen",
        "Regular 6-month recall appointments",
        "Consider night guard for bruxism prevention",
        "Annual veneer assessment and polish"
      ],
      diagnosticCodes: ["Z01.20", "Z87.891", "K02.9"],
      clinicalNotes: [
        "Patient reports satisfaction with veneer esthetics",
        "No sensitivity or discomfort reported",
        "Bite feels comfortable and natural"
      ],
      metadata: {
        examType: "Comprehensive",
        duration: "45 minutes",
        bloodPressure: "118/76",
        medicalHistory: "Updated - no changes"
      }
    }
  },
  {
    id: "cs-002", 
    title: "Periodontal Assessment Report - EB-0001",
    type: "clinical_note",
    source: "Periodontal Charting System v3.2",
    date: "2025-07-10",
    author: "Jennifer Martinez, RDH",
    institution: "Downtown Dental Associates",
    excerpt: "Full mouth periodontal probing completed. Pocket depths range from 1-3mm throughout. Bleeding on probing minimal (<10%). Excellent patient compliance with home care recommendations.",
    fullData: {
      patientId: "EB-0001",
      findings: [
        "Average pocket depth: 2.1mm",
        "Bleeding on probing: 8%",
        "Clinical attachment level: Stable",
        "Furcation involvement: None detected",
        "Mobility: Grade 0 throughout"
      ],
      recommendations: [
        "Continue current oral hygiene routine",
        "Maintain 6-month prophylaxis schedule",
        "Consider power toothbrush upgrade"
      ],
      diagnosticCodes: ["K05.00", "Z87.891"],
      clinicalNotes: [
        "Patient demonstrates excellent brushing technique",
        "Flossing compliance reported as daily",
        "No areas of concern identified"
      ],
      metadata: {
        probingForce: "25g",
        probeType: "UNC-15",
        calculus: "Minimal subgingival"
      }
    }
  }
];

// Recommended Actions Citations  
export const RECOMMENDED_ACTIONS_CITATIONS: CitationData[] = [
  {
    id: "ra-001",
    title: "Evidence-Based Veneer Maintenance Protocol",
    type: "guideline",
    source: "American Academy of Cosmetic Dentistry",
    date: "2024-03-15",
    author: "AACD Clinical Guidelines Committee",
    institution: "American Academy of Cosmetic Dentistry",
    excerpt: "Regular assessment of veneer margins is essential for long-term success. Clinical examination should include visual inspection, tactile examination, and radiographic evaluation at 6-month intervals during the first two years post-placement.",
    fullData: {
      findings: [
        "Veneer longevity directly correlates with maintenance frequency",
        "Early detection of margin deterioration prevents major complications",
        "Patient compliance with recall schedule improves outcomes by 34%"
      ],
      recommendations: [
        "Biannual clinical examinations for first 2 years",
        "Annual bitewing radiographs to assess margin integrity",
        "Professional polishing with appropriate abrasives",
        "Patient education on proper home care techniques"
      ],
      diagnosticCodes: ["Z01.20", "Z08"],
      clinicalNotes: [
        "Level of evidence: Systematic review and meta-analysis",
        "Recommendation strength: Strong",
        "Clinical applicability: High"
      ],
      metadata: {
        evidenceLevel: "1A",
        studyPopulation: "2,847 patients",
        followUpPeriod: "5 years",
        successRate: "94.2%"
      }
    }
  },
  {
    id: "ra-002",
    title: "Occlusal Analysis Report - Post-Veneer Assessment",
    type: "imaging_report",
    source: "T-Scan Digital Occlusal Analysis",
    date: "2025-07-10", 
    author: "Dr. Michael Rodriguez, DDS, MS",
    institution: "Downtown Dental Associates",
    excerpt: "Digital occlusal analysis reveals balanced contact distribution with no premature contacts on veneer restorations. Force distribution within normal parameters. Recommend continued monitoring.",
    fullData: {
      patientId: "EB-0001",
      imagingFindings: [
        "Contact time sequence: Normal progression",
        "Force distribution: 52% right, 48% left",
        "Maximum intercuspation: Achieved in 0.3 seconds",
        "No premature contacts detected on veneers #7-10",
        "Center of force within normal range"
      ],
      recommendations: [
        "Continue current occlusal scheme",
        "Monitor for any changes in contact patterns",
        "Consider night guard if bruxism signs develop",
        "Re-evaluate in 6 months"
      ],
      diagnosticCodes: ["K07.59"],
      metadata: {
        scanType: "T-Scan III HD",
        calibration: "Verified",
        biteForce: "156N average",
        contactArea: "12.4mm²"
      }
    }
  }
];

// Visit Reason Citations
export const VISIT_REASON_CITATIONS: CitationData[] = [
  {
    id: "vr-001",
    title: "Post-Veneer Follow-up Protocol - Clinical Standards",
    type: "guideline",
    source: "International Federation of Esthetic Dentistry",
    date: "2024-01-20",
    author: "IFED Clinical Standards Committee",
    institution: "International Federation of Esthetic Dentistry",
    excerpt: "Six-month post-veneer follow-up appointments should focus on margin integrity, occlusal stability, and patient satisfaction. This critical evaluation period determines long-term success rates.",
    fullData: {
      findings: [
        "6-month evaluation is critical for veneer longevity assessment",
        "Early intervention for margin issues improves 10-year survival rates",
        "Patient satisfaction correlates with functional outcomes"
      ],
      recommendations: [
        "Comprehensive clinical examination of veneer margins",
        "Occlusal assessment and adjustment if necessary",
        "Patient satisfaction survey completion",
        "Radiographic evaluation for margin adaptation",
        "Professional maintenance and polishing"
      ],
      diagnosticCodes: ["Z09", "Z87.891"],
      clinicalNotes: [
        "Standard of care for post-veneer management",
        "Evidence-based protocol with 15-year data",
        "Recommended by 94% of surveyed practitioners"
      ],
      metadata: {
        consensusLevel: "Strong agreement",
        evidenceQuality: "High",
        implementationRate: "87%",
        patientSatisfaction: "96.3%"
      }
    }
  },
  {
    id: "vr-002",
    title: "Patient Appointment History - EB-0001",
    type: "medical_record",
    source: "Practice Management System",
    date: "2025-05-02",
    author: "System Generated",
    institution: "Downtown Dental Associates",
    excerpt: "Veneer placement completed successfully on 2025-05-02. Patient scheduled for standard 6-month follow-up per practice protocol. No interim appointments or concerns reported.",
    fullData: {
      patientId: "EB-0001",
      findings: [
        "Veneer placement completed without complications",
        "Patient tolerated procedure well",
        "Post-operative instructions provided and understood",
        "No adverse reactions to materials reported",
        "Healing progressed as expected"
      ],
      recommendations: [
        "Follow standard post-veneer care protocol",
        "Schedule 6-month follow-up examination",
        "Maintain excellent oral hygiene",
        "Avoid hard foods for first 48 hours",
        "Contact office if any concerns arise"
      ],
      diagnosticCodes: ["Z98.811", "Z87.891"],
      clinicalNotes: [
        "Procedure time: 2.5 hours",
        "Anesthesia: Local infiltration, well-tolerated",
        "Patient education completed",
        "Follow-up appointment scheduled"
      ],
      metadata: {
        treatmentCode: "D2962 x4",
        insurance: "Pre-authorized",
        paymentStatus: "Completed",
        nextAppt: "2025-07-10"
      }
    }
  }
];

// Utility function to get citations by section type
export function getCitationsBySection(section: "clinical_summary" | "recommended_actions" | "visit_reason"): CitationData[] {
  switch (section) {
    case "clinical_summary":
      return CLINICAL_SUMMARY_CITATIONS;
    case "recommended_actions": 
      return RECOMMENDED_ACTIONS_CITATIONS;
    case "visit_reason":
      return VISIT_REASON_CITATIONS;
    default:
      return [];
  }
}

// Function to get random citations for a section
export function getRandomCitations(section: "clinical_summary" | "recommended_actions" | "visit_reason", count: number = 2): CitationData[] {
  const citations = getCitationsBySection(section);
  const shuffled = [...citations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, citations.length));
}
