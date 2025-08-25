import { format, differenceInYears } from "date-fns";
import type { MockPatient } from "../mock/patients";

export function formatPatientContextForAI(patient: MockPatient): string {
  const age = differenceInYears(new Date(), new Date(patient.dob));
  
  return `

## PATIENT CONTEXT
You are currently assisting with patient ${patient.fullName} (${patient.name}, ID: ${patient.id}).

**Patient Details:**
- Full Name: ${patient.fullName}
- Patient ID: ${patient.id}  
- Date of Birth: ${patient.dob}
- Age: ${age} years old
- Allergies: ${patient.allergies.length > 0 ? patient.allergies.join(", ") : "None reported"}
- Clinical Notes: ${patient.notes.length > 0 ? patient.notes.join(", ") : "None"}
- Last Visit: ${format(new Date(patient.lastVisit), "MMM d, yyyy")}
- Active Concerns: ${patient.activeConcerns.join(", ")}

**Recent Scans:**
${patient.scans.map(scan => 
  `- ${scan.type} (${format(new Date(scan.date), "MMM d, yyyy")}): ${scan.description || "No description"}
    Findings: ${scan.findings?.join(", ") || "No findings noted"}`
).join("\n")}

**Recent Treatments:**
${patient.recentTreatments.map(treatment => 
  `- ${treatment.name} on ${format(new Date(treatment.date), "MMM d, yyyy")}`
).join("\n")}

**Clinical Summary:** ${patient.clinicalSummary}

**Instructions:**
- When answering questions about this patient, use the above information
- Refer to the patient by name (${patient.fullName} or ${patient.name})
- Provide specific, relevant details from their medical record
- If asked about treatments, scans, or medical history, reference the specific dates and details provided
- Maintain patient confidentiality and professionalism in all responses
- If asked about information not in this record, clearly state that you don't have that specific information available`;
}
