export interface Person {
  id: string;
  name: string;
  age: number;
  avatar: string | null;
  bio: string;
  medicalHistory: string[];
  dentalConditions: string[];
  appointments: Appointment[];
  scans: DentalScan[];
}

export interface Appointment {
  id: string;
  date: Date;
  type: AppointmentType;
  dentist: string;
  duration: number; // minutes
  notes: string;
  status: AppointmentStatus;
  treatments: string[];
}

export interface DentalScan {
  id: string;
  type: ScanType;
  date: Date;
  imageUrl: string;
  findings: string[];
  recommendations: string[];
}

export type AppointmentType = 
  | "cleaning"
  | "checkup"
  | "filling"
  | "root-canal"
  | "crown"
  | "extraction"
  | "whitening"
  | "consultation";

export type AppointmentStatus = 
  | "scheduled"
  | "completed"
  | "cancelled"
  | "no-show";

export type ScanType = 
  | "bitewing"
  | "panoramic" 
  | "periapical"
  | "cbct"
  | "intraoral";