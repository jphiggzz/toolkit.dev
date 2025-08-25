"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Calendar, 
  AlertTriangle, 
  FileText,
  Eye,
  Stethoscope,
  MessageCircle
} from "lucide-react";
import { ALL_PATIENTS } from "@/app/_components/chat/mock/patients";
import type { MockPatient } from "@/app/_components/chat/mock/patients";
import { format, differenceInYears } from "date-fns";

function PatientCard({ patient }: { patient: MockPatient }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();
  
  // Calculate age from DOB
  const age = differenceInYears(new Date(), new Date(patient.dob));
  
  // Generate initials from name
  const initials = patient.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
  
  // Profile image path
  const profileImagePath = `/patient-profiles/${patient.id.toLowerCase()}.png`;
  
  // Get urgency color for latest visit
  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'emergency': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-200 dark:border-red-700';
      case 'urgent': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/40 dark:text-orange-200 dark:border-orange-700';
      default: return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-200 dark:border-green-700';
    }
  };

  return (
    <div>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 bg-gradient-to-br from-background to-muted/20 hover:scale-[1.02]">
        <CardContent className="p-6">
          {/* Header with Avatar and Name */}
          <div className="flex items-start gap-4 mb-6">
            <div>
              <Avatar className="h-16 w-16">
                <AvatarImage 
                  src={profileImagePath} 
                  alt={patient.fullName}
                  onLoad={() => setImageLoaded(true)}
                />
                <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {patient.fullName}
              </h3>
              <p className="text-sm text-foreground/60 mb-2">
                Patient ID: {patient.id}
              </p>
              <div className="flex items-center gap-4 text-sm text-foreground/70">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>Age {age}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Last visit: {format(new Date(patient.lastVisit), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visit Status */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-foreground/60" />
              <span className="text-sm font-medium text-foreground">Current Visit</span>
            </div>
            <p className="text-sm text-foreground/80 mb-2">{patient.visitReason.primary}</p>
            <Badge variant="secondary" className={`text-xs ${getUrgencyColor(patient.visitReason.urgency)}`}>
              {patient.visitReason.urgency}
            </Badge>
          </div>

          {/* Active Concerns */}
          {patient.activeConcerns.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="h-4 w-4 text-foreground/60" />
                <span className="text-sm font-medium text-foreground">Active Concerns</span>
              </div>
              <div className="space-y-1">
                {patient.activeConcerns.slice(0, 2).map((concern, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <div className="size-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground/80">{concern}</span>
                  </div>
                ))}
                {patient.activeConcerns.length > 2 && (
                  <p className="text-xs text-foreground/60 ml-3.5">
                    +{patient.activeConcerns.length - 2} more concerns
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Allergies */}
          {patient.allergies.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-cyan-500" />
                <span className="text-sm font-medium text-foreground">Allergies</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {patient.allergies.map((allergy, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/60 dark:text-cyan-200 dark:border-cyan-700">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Treatment Summary */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-foreground/60" />
              <span className="text-sm font-medium text-foreground">Recent Treatments</span>
            </div>
            <p className="text-xs text-foreground/70">
              {patient.recentTreatments.length} treatment{patient.recentTreatments.length !== 1 ? 's' : ''} on record
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-2">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => router.push(`/?patient=${patient.id}`)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Simulation
            </Button>
            <Button 
              className="w-full" 
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/people/${patient.id}`)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PeoplePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dental Patients
        </h1>
        <p className="text-foreground/70">
          Mock patient profiles for dental AI simulation system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ALL_PATIENTS.map((patient) => (
          <PatientCard 
            key={patient.id} 
            patient={patient} 
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-foreground/60">
          Click on any patient card to view detailed medical history and begin simulation
        </p>
      </div>
    </div>
  );
}