// Today's appointment schedule for demo purposes
import { format, addHours, startOfDay } from "date-fns";
import { EB_PATIENT, TRUMP_PATIENT, WHATLEY_PATIENT, KRAMER_PATIENT, type MockPatient } from "./patients";

export interface TodaysAppointment {
  id: string;
  patient: MockPatient;
  time: string; // HH:mm format
  timeDisplay: string; // "9:00 AM" format
  duration: number; // minutes
  type: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  notes?: string;
}

// Generate today's appointments for all 4 demo patients
const today = startOfDay(new Date());

export const TODAYS_APPOINTMENTS: TodaysAppointment[] = [
  {
    id: "appt-1",
    patient: EB_PATIENT,
    time: "09:00",
    timeDisplay: "9:00 AM",
    duration: 45,
    type: "Veneer Follow-up",
    status: "completed",
    notes: "Routine check-up for veneer margins"
  },
  {
    id: "appt-2", 
    patient: TRUMP_PATIENT,
    time: "10:30",
    timeDisplay: "10:30 AM", 
    duration: 60,
    type: "Crown Replacement",
    status: "in-progress",
    notes: "Urgent crown replacement #8"
  },
  {
    id: "appt-3",
    patient: WHATLEY_PATIENT,
    time: "14:00",
    timeDisplay: "2:00 PM",
    duration: 30,
    type: "Professional Consultation", 
    status: "scheduled",
    notes: "Colleague consultation and routine exam"
  },
  {
    id: "appt-4",
    patient: KRAMER_PATIENT,
    time: "15:30", 
    timeDisplay: "3:30 PM",
    duration: 45,
    type: "Emergency Bonding",
    status: "scheduled", 
    notes: "Urgent repair for chipped tooth"
  }
];

// Helper to get appointments sorted by time
export function getTodaysAppointmentsSorted(): TodaysAppointment[] {
  return [...TODAYS_APPOINTMENTS].sort((a, b) => a.time.localeCompare(b.time));
}

// Helper to get current appointment status
export function getCurrentAppointmentStatus(): string {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
  
  const sortedAppointments = getTodaysAppointmentsSorted();
  
  for (const appointment of sortedAppointments) {
    if (currentTime < appointment.time) {
      return `Next: ${appointment.patient.name} at ${appointment.timeDisplay}`;
    }
  }
  
  return "All appointments completed for today";
}
