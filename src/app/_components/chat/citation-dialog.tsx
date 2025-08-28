"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Calendar, User, Building2, ExternalLink, Copy, Check } from "lucide-react";
import { format } from "date-fns";

export interface CitationData {
  id: string;
  title: string;
  type: "medical_record" | "lab_report" | "imaging_report" | "clinical_note" | "research_paper" | "guideline";
  source: string;
  date: string;
  author?: string;
  institution?: string;
  excerpt: string;
  fullData?: {
    patientId?: string;
    findings?: string[];
    recommendations?: string[];
    diagnosticCodes?: string[];
    labValues?: Array<{
      test: string;
      value: string;
      range: string;
      status: "normal" | "high" | "low" | "critical";
    }>;
    imagingFindings?: string[];
    clinicalNotes?: string[];
    metadata?: Record<string, string>;
  };
}

interface CitationDialogProps {
  citation: CitationData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeIcons = {
  medical_record: FileText,
  lab_report: FileText,
  imaging_report: FileText,
  clinical_note: FileText,
  research_paper: FileText,
  guideline: FileText,
};

const typeLabels = {
  medical_record: "Medical Record",
  lab_report: "Lab Report",
  imaging_report: "Imaging Report", 
  clinical_note: "Clinical Note",
  research_paper: "Research Paper",
  guideline: "Clinical Guideline",
};

const typeBadgeColors = {
  medical_record: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-700",
  lab_report: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-200 dark:border-green-700",
  imaging_report: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/40 dark:text-purple-200 dark:border-purple-700",
  clinical_note: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/40 dark:text-orange-200 dark:border-orange-700",
  research_paper: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-200 dark:border-cyan-700",
  guideline: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/40 dark:text-pink-200 dark:border-pink-700",
};

export function CitationDialog({ citation, open, onOpenChange }: CitationDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!citation) return null;

  const Icon = typeIcons[citation.type];

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderLabValues = (labValues: Array<{
    test: string;
    value: string;
    range: string;
    status: "normal" | "high" | "low" | "critical";
  }> | undefined) => {
    if (!labValues || labValues.length === 0) return null;

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Lab Values</h4>
        <div className="space-y-2">
          {labValues.map((lab, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-sm">{lab.test}</div>
                <div className="text-xs text-muted-foreground">Range: {lab.range}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">{lab.value}</span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    lab.status === "normal" ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-200" :
                    lab.status === "critical" ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-200" :
                    "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-200"
                  }`}
                >
                  {lab.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListSection = (title: string, items: string[] | undefined, fieldKey: string) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(items.join('\n'), fieldKey)}
            className="h-8 px-2"
          >
            {copiedField === fieldKey ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <span className="flex-1">{citation.title}</span>
            <Badge variant="outline" className={`text-xs ${typeBadgeColors[citation.type]}`}>
              {typeLabels[citation.type]}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4">
            {/* Source Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Source:</span>
                <span className="text-sm font-medium">{citation.source}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Date:</span>
                <span className="text-sm font-medium">
                  {format(new Date(citation.date), "MMM d, yyyy")}
                </span>
              </div>
              {citation.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Author:</span>
                  <span className="text-sm font-medium">{citation.author}</span>
                </div>
              )}
              {citation.institution && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Institution:</span>
                  <span className="text-sm font-medium">{citation.institution}</span>
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground">Excerpt</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(citation.excerpt, 'excerpt')}
                  className="h-8 px-2"
                >
                  {copiedField === 'excerpt' ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-sm text-muted-foreground italic border-l-4 border-primary">
                "{citation.excerpt}"
              </div>
            </div>

            <Separator />

            {/* Full Data Section */}
            {citation.fullData && (
              <div className="space-y-4">
                <h3 className="text-base font-medium text-foreground">Detailed Information</h3>
                
                {citation.fullData.patientId && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Patient ID:</span>
                    <span className="font-mono bg-muted/50 px-2 py-1 rounded">
                      {citation.fullData.patientId}
                    </span>
                  </div>
                )}

                {renderLabValues(citation.fullData.labValues)}
                
                {renderListSection("Clinical Findings", citation.fullData.findings, "findings")}
                {renderListSection("Imaging Findings", citation.fullData.imagingFindings, "imagingFindings")}
                {renderListSection("Recommendations", citation.fullData.recommendations, "recommendations")}
                {renderListSection("Clinical Notes", citation.fullData.clinicalNotes, "clinicalNotes")}
                
                {citation.fullData.diagnosticCodes && citation.fullData.diagnosticCodes.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Diagnostic Codes</h4>
                    <div className="flex flex-wrap gap-2">
                      {citation.fullData.diagnosticCodes.map((code, index) => (
                        <Badge key={index} variant="outline" className="text-xs font-mono">
                          {code}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {citation.fullData.metadata && Object.keys(citation.fullData.metadata).length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Additional Metadata</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      {Object.entries(citation.fullData.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-2 bg-muted/30 rounded">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                          </span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="default" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View Full Record
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
