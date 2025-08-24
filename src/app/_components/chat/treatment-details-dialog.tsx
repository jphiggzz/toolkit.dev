"use client";

import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CalendarIcon, 
  StethoscopeIcon, 
  WrenchIcon, 
  FileTextIcon, 
  DollarSignIcon,
  ClockIcon
} from "lucide-react";
import type { MockPatient } from "./mock/eb-patient";

interface TreatmentDetailsDialogProps {
  treatment: MockPatient["recentTreatments"][0] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TreatmentDetailsDialog({ 
  treatment, 
  open, 
  onOpenChange 
}: TreatmentDetailsDialogProps) {
  if (!treatment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <WrenchIcon className="size-5 text-primary" />
            {treatment.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="size-4 text-muted-foreground" />
              <span className="font-medium">Date:</span>
              <span>{format(new Date(treatment.date), "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline">{treatment.type}</Badge>
            </div>
          </div>

          {/* Teeth Involved */}
          <Card>
            <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
              <StethoscopeIcon className="size-4 text-primary" />
              Teeth Involved
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {treatment.teeth.map((tooth) => (
                  <Badge key={tooth} variant="secondary" className="text-xs">
                    {tooth}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileTextIcon className="size-4 text-primary" />
                Treatment Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {treatment.description}
              </p>
            </CardContent>
          </Card>

          {/* Materials Used */}
          <Card>
            <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
              <WrenchIcon className="size-4 text-primary" />
              Materials Used
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {treatment.materials.map((material, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="size-2 bg-primary rounded-full" />
                    {material}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clinical Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileTextIcon className="size-4 text-primary" />
                Clinical Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {treatment.notes.map((note, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="size-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{note}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Follow-up & Cost */}
          <div className="grid grid-cols-2 gap-4">
            {treatment.followUp && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ClockIcon className="size-4 text-primary" />
                    Follow-up
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {treatment.followUp}
                  </p>
                </CardContent>
              </Card>
            )}
            
            {treatment.cost && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <DollarSignIcon className="size-4 text-primary" />
                    Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary">
                    {treatment.cost}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
