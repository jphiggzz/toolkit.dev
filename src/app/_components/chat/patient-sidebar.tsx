"use client";

import { useState } from "react";
import { format, differenceInYears } from "date-fns";
import { motion, AnimatePresence } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileTextIcon, ScanIcon, PillIcon, EyeIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { ScanViewer } from "./scan-viewer";
import { ScanPreview } from "./scan-preview";
import { TreatmentDetailsDialog } from "./treatment-details-dialog";
import type { MockPatient } from "./mock/eb-patient";

interface PatientSidebarProps {
  patient: MockPatient | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PatientSidebar({ patient, open, onOpenChange }: PatientSidebarProps) {
  const [selectedScan, setSelectedScan] = useState<MockPatient["scans"][0] | null>(null);
  const [scanViewerOpen, setScanViewerOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<MockPatient["recentTreatments"][0] | null>(null);
  const [treatmentDialogOpen, setTreatmentDialogOpen] = useState(false);

  if (!patient) return null;

  const age = differenceInYears(new Date(), new Date(patient.dob));

  const handleScanClick = (scan: MockPatient["scans"][0]) => {
    setSelectedScan(scan);
    setScanViewerOpen(true);
  };

  const handleTreatmentClick = (treatment: MockPatient["recentTreatments"][0]) => {
    setSelectedTreatment(treatment);
    setTreatmentDialogOpen(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300,
              opacity: { duration: 0.2 }
            }}
            className="fixed right-0 top-0 z-50 h-full w-[400px] max-w-[90vw] bg-background border-l border-border flex flex-col shadow-xl"
          >
          {/* Header */}
          <div className="px-6 py-4 border-b flex-shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">
                  {patient.name}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{patient.fullName}</div>
                <div className="text-sm text-muted-foreground">
                  {patient.id} • {age} years old
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 space-y-6">
          {/* Demographics & Allergies */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileTextIcon className="size-4" />
                Patient Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">DOB:</span>
                <span>{format(new Date(patient.dob), "MMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Visit:</span>
                <span>{format(new Date(patient.lastVisit), "MMM d, yyyy")}</span>
              </div>
              {patient.allergies.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Allergies:</span>
                  <div className="flex flex-wrap gap-1">
                    {patient.allergies.map((allergy) => (
                      <Badge key={allergy} variant="destructive" className="text-xs">
                        <PillIcon className="size-3 mr-1" />
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {patient.notes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Notes:</span>
                  <div className="flex flex-wrap gap-1">
                    {patient.notes.map((note) => (
                      <Badge key={note} variant="secondary" className="text-xs">
                        {note}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Concerns */}
          {patient.activeConcerns.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileTextIcon className="size-4" />
                  Active Concerns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patient.activeConcerns.map((concern) => (
                    <Badge key={concern} variant="outline" className="text-xs">
                      {concern}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Scans */}
          {patient.scans.length > 0 && (
            <ScanPreview 
              scans={patient.scans} 
              onScanClick={handleScanClick}
            />
          )}

          {/* Recent Treatments */}
          {patient.recentTreatments.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CalendarIcon className="size-4" />
                  Recent Treatments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {patient.recentTreatments.map((treatment, index) => (
                  <button
                    key={treatment.id}
                    onClick={() => handleTreatmentClick(treatment)}
                    className="w-full text-left space-y-1 hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{treatment.name}</div>
                      <ChevronRightIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(treatment.date), "MMM d, yyyy")}
                    </div>
                    {index < patient.recentTreatments.length - 1 && (
                      <Separator className="mt-2" />
                    )}
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
          </div>
        </div>

        {/* Scan Viewer Modal */}
        <ScanViewer
          scan={selectedScan}
          open={scanViewerOpen}
          onOpenChange={setScanViewerOpen}
        />

        {/* Treatment Details Dialog */}
        <TreatmentDetailsDialog
          treatment={selectedTreatment}
          open={treatmentDialogOpen}
          onOpenChange={setTreatmentDialogOpen}
        />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
