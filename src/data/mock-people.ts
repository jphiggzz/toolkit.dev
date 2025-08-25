import type { Person } from "@/types/people";

export const mockPeople: Person[] = [
  {
    id: "eb-0001",
    name: "EB Plumeri",
    age: 45,
    avatar: null,
    bio: "Long-time patient with excellent dental hygiene habits. Regular checkups and proactive about dental health.",
    medicalHistory: [
      "No known allergies",
      "Hypertension (controlled with medication)",
      "Previous wisdom tooth extraction (2019)"
    ],
    dentalConditions: [
      "Mild gingivitis",
      "Slight wear on molars",
      "Previous filling on upper left molar"
    ],
    appointments: [
      {
        id: "apt-001",
        date: new Date("2024-03-15T09:00:00"),
        type: "checkup",
        dentist: "Dr. Sarah Johnson",
        duration: 60,
        notes: "Routine checkup, no issues found. Recommended whitening treatment.",
        status: "completed",
        treatments: ["Cleaning", "Fluoride treatment"]
      },
      {
        id: "apt-002",
        date: new Date("2024-06-20T14:30:00"),
        type: "cleaning",
        dentist: "Dr. Michael Chen",
        duration: 45,
        notes: "Standard cleaning, slight plaque buildup on lower molars.",
        status: "completed",
        treatments: ["Deep cleaning", "Polishing"]
      },
      {
        id: "apt-003",
        date: new Date("2024-09-25T10:15:00"),
        type: "whitening",
        dentist: "Dr. Sarah Johnson",
        duration: 90,
        notes: "Professional whitening treatment completed successfully.",
        status: "scheduled",
        treatments: ["Professional whitening"]
      }
    ],
    scans: [
      {
        id: "scan-001",
        type: "panoramic",
        date: new Date("2024-03-15T09:30:00"),
        imageUrl: "/dental-scans/panoramic.png",
        findings: [
          "No cavities detected",
          "Slight bone loss in posterior region",
          "All teeth present except wisdom teeth"
        ],
        recommendations: [
          "Continue regular cleanings",
          "Monitor bone loss progression",
          "Consider night guard for teeth grinding"
        ]
      }
    ]
  },
  {
    id: "trump-0001", 
    name: "Donald Trump",
    age: 78,
    avatar: null,
    bio: "High-profile patient requiring discrete, premium dental care. Prefers gold crowns and maintains an immaculate smile.",
    medicalHistory: [
      "No known drug allergies",
      "Cardiac history - requires antibiotic prophylaxis",
      "Multiple cosmetic dental procedures"
    ],
    dentalConditions: [
      "Multiple gold crowns",
      "Veneers on anterior teeth",
      "History of gum recession"
    ],
    appointments: [
      {
        id: "apt-trump-001",
        date: new Date("2024-02-28T16:00:00"),
        type: "checkup",
        dentist: "Dr. Beverly Hills",
        duration: 120,
        notes: "VIP appointment. Crown maintenance and polish. Discussed implant options.",
        status: "completed",
        treatments: ["Crown polish", "Gum treatment", "Consultation"]
      },
      {
        id: "apt-trump-002",
        date: new Date("2024-05-15T15:30:00"),
        type: "crown",
        dentist: "Dr. Beverly Hills",
        duration: 180,
        notes: "Replacement of molar crown with premium gold. Excellent healing.",
        status: "completed",
        treatments: ["Crown replacement", "Gold crown fitting"]
      }
    ],
    scans: [
      {
        id: "scan-trump-001",
        type: "cbct",
        date: new Date("2024-02-28T16:30:00"),
        imageUrl: "/dental-scans/cbct.png",
        findings: [
          "Excellent bone density",
          "Multiple restorations in good condition",
          "No active decay"
        ],
        recommendations: [
          "Continue premium care routine",
          "Schedule bi-annual cleanings",
          "Monitor gum health closely"
        ]
      }
    ]
  },
  {
    id: "kissinger-0001",
    name: "Henry Kissinger", 
    age: 100,
    avatar: null,
    bio: "Distinguished elder statesman requiring gentle, comprehensive dental care. Extensive medical coordination needed.",
    medicalHistory: [
      "Multiple medications - anticoagulants",
      "Cardiovascular disease",
      "Osteoporosis",
      "Previous stroke (2019)"
    ],
    dentalConditions: [
      "Advanced periodontal disease",
      "Multiple missing teeth",
      "Partial dentures upper and lower",
      "Dry mouth (xerostomia)"
    ],
    appointments: [
      {
        id: "apt-hk-001",
        date: new Date("2024-01-10T11:00:00"),
        type: "consultation",
        dentist: "Dr. Geriatric Specialist",
        duration: 90,
        notes: "Comprehensive evaluation. Discussed denture adjustments and medication effects.",
        status: "completed",
        treatments: ["Medical consultation", "Denture assessment"]
      },
      {
        id: "apt-hk-002", 
        date: new Date("2024-04-05T10:30:00"),
        type: "checkup",
        dentist: "Dr. Geriatric Specialist",
        duration: 75,
        notes: "Gentle cleaning. Adjusted partial dentures for better fit.",
        status: "completed",
        treatments: ["Gentle cleaning", "Denture adjustment", "Fluoride gel"]
      }
    ],
    scans: [
      {
        id: "scan-hk-001",
        type: "panoramic",
        date: new Date("2024-01-10T11:45:00"),
        imageUrl: "/dental-scans/panoramic.png",
        findings: [
          "Significant bone loss",
          "Remaining teeth stable",
          "Dentures well-positioned"
        ],
        recommendations: [
          "Conservative treatment approach",
          "Regular denture maintenance",
          "Soft tissue care protocol"
        ]
      }
    ]
  },
  {
    id: "kramer-0001",
    name: "Cosmo Kramer",
    age: 65,
    avatar: null,
    bio: "Eccentric patient with unique dental history. Often arrives with unusual complaints and creative treatment requests.",
    medicalHistory: [
      "Allergic to latex",
      "History of unusual accidents",
      "Self-medicates with various remedies",
      "Vitamin deficiency"
    ],
    dentalConditions: [
      "Uneven tooth wear from unusual habits",
      "Frequent chipped teeth",
      "TMJ from jaw clicking",
      "Staining from unknown substances"
    ],
    appointments: [
      {
        id: "apt-kramer-001",
        date: new Date("2024-02-14T13:45:00"),
        type: "consultation", 
        dentist: "Dr. Quirky Specialist",
        duration: 105,
        notes: "Patient arrived with homemade mouth guard. Discussed proper dental hygiene extensively.",
        status: "completed",
        treatments: ["Emergency consultation", "Custom mouth guard fitting"]
      },
      {
        id: "apt-kramer-002",
        date: new Date("2024-05-22T14:15:00"),
        type: "filling",
        dentist: "Dr. Quirky Specialist", 
        duration: 120,
        notes: "Repaired chipped incisor. Patient insisted on discussing conspiracy theories during procedure.",
        status: "completed",
        treatments: ["Composite filling", "Teeth whitening", "Oral hygiene education"]
      },
      {
        id: "apt-kramer-003",
        date: new Date("2024-08-30T11:30:00"),
        type: "checkup",
        dentist: "Dr. Quirky Specialist",
        duration: 90,
        notes: "Routine check postponed due to patient's unusual request for 'all-natural' anesthesia.",
        status: "cancelled",
        treatments: []
      }
    ],
    scans: [
      {
        id: "scan-kramer-001",
        type: "bitewing",
        date: new Date("2024-02-14T14:30:00"),
        imageUrl: "/dental-scans/bitewing.png",
        findings: [
          "Multiple small cavities",
          "Unusual wear pattern on canines",
          "Evidence of teeth grinding"
        ],
        recommendations: [
          "Regular dental cleanings",
          "Night guard for bruxism",
          "Dietary consultation",
          "Stress management techniques"
        ]
      }
    ]
  }
];