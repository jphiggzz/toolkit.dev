"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Markdown } from "@/components/ui/markdown";
import { User, Activity, CheckCircle, FileText, Stethoscope, Calendar, AlertTriangle, Clock, UserCheck, ScanIcon, ChevronRightIcon, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useChatContext } from "@/app/_contexts/chat-context";
import { ScanPreview } from "../scan-preview";
import { ScanViewer } from "../scan-viewer";
import { TreatmentDetailsDialog } from "../treatment-details-dialog";
import { CitationDialog, type CitationData } from "../citation-dialog";
import { getRandomCitations } from "../mock/citations";
import type { MockPatient } from "../mock/patients";

interface DentalSummaryCardsProps {
  content: string;
}

interface Section {
  title: string;
  content: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PatientInfo {
  name: string;
  id: string;
  age: string;
  allergies: string;
  lastVisit: string;
}

interface VisitReasonInfo {
  primary: string;
  concerns: string[];
  duration: string;
  urgency: string;
  symptoms?: string[];
  referringProvider?: string;
}

function PatientProfileCard({ patientInfo, delay = 0 }: { patientInfo: PatientInfo, delay?: number }) {
  // Generate initials from name
  const initials = patientInfo.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  // Generate profile image path based on patient ID (try PNG first, fallback to JPG)
  const profileImagePath = `/patient-profiles/${patientInfo.id.toLowerCase()}.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: [0.21, 1.11, 0.81, 0.99] // Custom easing for smoother feel
      }}
    >
      <Card className="transition-all duration-200 hover:shadow-sm border-border/50">
      <div className="px-4 py-2">
        <div className="flex items-start gap-4">
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.1, 
              duration: 0.3, 
              ease: [0.68, -0.55, 0.265, 1.55] // Bouncy easing for avatar
            }}
          >
            <Avatar className="h-16 w-16">
              <AvatarImage src={profileImagePath} alt={patientInfo.name} />
              <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          
          {/* Patient Info */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex-1 space-y-3"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground">{patientInfo.name}</h3>
              <p className="text-sm text-foreground/70">Patient ID: {patientInfo.id}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-foreground/60" />
                <span className="text-sm text-foreground/80">Age: {patientInfo.age}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-foreground/60" />
                <span className="text-sm text-foreground/80">Last visit: {patientInfo.lastVisit}</span>
              </div>
            </div>
            
            {/* Allergies */}
            {patientInfo.allergies && patientInfo.allergies !== "None reported" && (
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
                <div className="flex flex-wrap gap-1">
                  <span className="text-sm text-foreground/80">Allergies:</span>
                  {patientInfo.allergies.split(", ").map((allergy, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/60 dark:text-cyan-200 dark:border-cyan-700">
                      {allergy.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Card>
    </motion.div>
  );
}

function VisitReasonCard({ visitInfo }: { visitInfo: VisitReasonInfo }) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'emergency': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-200 dark:border-red-700';
      case 'urgent': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/40 dark:text-orange-200 dark:border-orange-700';
      default: return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-200 dark:border-green-700';
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-sm">
      <div className="px-4 py-2">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="size-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Visit Reason</h3>
        </div>
        <div className="space-y-4">
        {/* Primary Reason */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-1">Primary</h4>
          <p className="text-sm text-foreground/80">{visitInfo.primary}</p>
        </div>

        {/* Urgency Badge */}
        <div className="flex items-center gap-2">
          <Clock className="size-3 text-foreground/60" />
          <Badge variant="secondary" className={`text-xs ${getUrgencyColor(visitInfo.urgency)}`}>
            {visitInfo.urgency}
          </Badge>
          <span className="text-xs text-foreground/70">• {visitInfo.duration}</span>
        </div>

        {/* Specific Concerns */}
        {visitInfo.concerns.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Specific Concerns</h4>
            <div className="space-y-1">
              {visitInfo.concerns.map((concern, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="size-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground/80">{concern}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Symptoms (if any) */}
        {visitInfo.symptoms && visitInfo.symptoms.length > 0 && visitInfo.symptoms[0] !== "None reported" && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Symptoms</h4>
            <div className="flex flex-wrap gap-1">
              {visitInfo.symptoms.map((symptom, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Referring Provider (if any) */}
        {visitInfo.referringProvider && (
          <div className="flex items-center gap-2 text-sm">
            <UserCheck className="size-3 text-foreground/60" />
            <span className="text-foreground/80">Referred by: </span>
            <span className="font-medium text-foreground">{visitInfo.referringProvider}</span>
          </div>
        )}
        </div>
      </div>
    </Card>
  );
}

function RecentTreatments({ 
  treatments, 
  onTreatmentClick 
}: { 
  treatments: MockPatient["recentTreatments"];
  onTreatmentClick: (treatment: MockPatient["recentTreatments"][0]) => void;
}) {
  if (treatments.length === 0) return null;

  return (
    <Card className="transition-all duration-200 hover:shadow-sm">
      <div className="px-4 py-2">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="size-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Recent Treatments</h3>
        </div>
        <div className="space-y-3">
          {treatments.slice(0, 3).map((treatment, index) => (
            <button
              key={treatment.id}
              onClick={() => onTreatmentClick(treatment)}
              className="w-full text-left space-y-1 hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{treatment.name}</div>
                <ChevronRightIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="text-xs text-muted-foreground">
                {format(new Date(treatment.date), "MMM d, yyyy")}
              </div>
              {treatment.notes && (
                <div className="text-xs text-muted-foreground/80 line-clamp-2">
                  {treatment.notes}
                </div>
              )}
              {index < treatments.slice(0, 3).length - 1 && (
                <Separator className="mt-2" />
              )}
            </button>
          ))}
          {treatments.length > 3 && (
            <div className="text-xs text-muted-foreground text-center pt-2">
              +{treatments.length - 3} more treatments...
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export function DentalSummaryCards({ content }: DentalSummaryCardsProps) {
  // Parse the content to extract the three main sections
  const sections = parseDentalSections(content);
  const patientInfo = parsePatientInfo(content);
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const { patientContext } = useChatContext();
  
  // Dialog state
  const [selectedScan, setSelectedScan] = useState<MockPatient["scans"][0] | null>(null);
  const [scanViewerOpen, setScanViewerOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<MockPatient["recentTreatments"][0] | null>(null);
  const [treatmentDialogOpen, setTreatmentDialogOpen] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<CitationData | null>(null);
  const [citationDialogOpen, setCitationDialogOpen] = useState(false);

  // Dialog handlers
  const handleScanClick = (scan: MockPatient["scans"][0]) => {
    setSelectedScan(scan);
    setScanViewerOpen(true);
  };

  const handleTreatmentClick = (treatment: MockPatient["recentTreatments"][0]) => {
    setSelectedTreatment(treatment);
    setTreatmentDialogOpen(true);
  };

  const handleCitationClick = (sectionType: "clinical_summary" | "recommended_actions" | "visit_reason") => {
    const citations = getRandomCitations(sectionType, 1);
    if (citations.length > 0 && citations[0]) {
      setSelectedCitation(citations[0]);
      setCitationDialogOpen(true);
    }
  };
  
  // Calculate total items (title + sections + patient components)
  const title = getTitle(content);
  const hasPatientComponents = patientContext && (patientContext.scans.length > 0 || patientContext.recentTreatments.length > 0);
  const patientComponentsCount = hasPatientComponents ? 
    (patientContext.scans.length > 0 ? 1 : 0) + (patientContext.recentTreatments.length > 0 ? 1 : 0) : 0;
  const totalItems = (title ? 1 : 0) + sections.length + patientComponentsCount;
  
  if (sections.length === 0) {
    // Fallback to regular markdown if parsing fails
    return <Markdown>{content}</Markdown>;
  }

  // Start streaming animation when component mounts
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    const streamItems = () => {
      for (let i = 0; i <= totalItems; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(i);
        }, i * 150); // 150ms delay between each item for faster streaming
        timeouts.push(timeout);
      }
    };
    
    streamItems();
    
    // Cleanup timeouts on unmount
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [totalItems]);

  return (
    <div className="space-y-4">
      {/* Render title if present */}
      <AnimatePresence>
        {title && visibleItems > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.21, 1.11, 0.81, 0.99] // Custom easing for smoother feel
            }}
            className="mb-4"
          >
            <h2 className="text-lg font-semibold text-foreground">
              {title}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Render sections in a natural flowing layout */}
      <div className="space-y-3">
        <AnimatePresence>
          {sections.map((section, index) => {
            const itemIndex = (title ? 1 : 0) + index + 1;
            const isVisible = visibleItems >= itemIndex;
            const delay = 0; // We handle timing with the visibility state
            
            if (!isVisible) return null;
            
            // Special handling for Patient Overview - render as profile card
            if (section.title === "Patient Overview" && patientInfo) {
              return <PatientProfileCard key={index} patientInfo={patientInfo} delay={delay} />;
            }
            
            // Special handling for Recent Activity - replace with actual components
            if (section.title === "Recent Activity" && patientContext) {
              return (
                <div key={index} className="space-y-3">
                  {patientContext.scans.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay,
                        ease: [0.21, 1.11, 0.81, 0.99]
                      }}
                    >
                      <ScanPreview 
                        scans={patientContext.scans} 
                        onScanClick={handleScanClick}
                      />
                    </motion.div>
                  )}
                  {patientContext.recentTreatments.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: delay + 0.1,
                        ease: [0.21, 1.11, 0.81, 0.99]
                      }}
                    >
                      <RecentTreatments 
                        treatments={patientContext.recentTreatments} 
                        onTreatmentClick={handleTreatmentClick}
                      />
                    </motion.div>
                  )}
                </div>
              );
            }
            
            // Regular card for other sections
            const shouldShowCitation = section.title === "Clinical Summary" || 
                                     section.title === "Recommended Actions" || 
                                     section.title === "Visit Reason";
            const getSectionType = (title: string): "clinical_summary" | "recommended_actions" | "visit_reason" => {
              if (title === "Clinical Summary") return "clinical_summary";
              if (title === "Recommended Actions") return "recommended_actions";
              return "visit_reason";
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay,
                  ease: [0.21, 1.11, 0.81, 0.99] // Custom easing for smoother feel
                }}
              >
                <Card className="transition-all duration-200 hover:shadow-sm">
                  <div className="px-4 py-2">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: 0.1, 
                            duration: 0.3, 
                            ease: [0.68, -0.55, 0.265, 1.55] // Bouncy easing for icon
                          }}
                        >
                          <section.icon className="size-4 text-primary" />
                        </motion.div>
                        <h3 className="text-sm font-medium text-foreground">
                          {section.title}
                        </h3>
                      </div>
                      {shouldShowCitation && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCitationClick(getSectionType(section.title))}
                          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                        >
                          <Quote className="h-3 w-3 mr-1" />
                          Cite
                        </Button>
                      )}
                    </div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="prose prose-sm max-w-none dark:prose-invert [&>*]:text-sm [&>ul]:my-1 [&>p]:my-1 [&>li]:my-0.5 text-foreground/80 leading-relaxed"
                    >
                      <Markdown>{section.content}</Markdown>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Dialog Components */}
      <ScanViewer
        scan={selectedScan}
        open={scanViewerOpen}
        onOpenChange={setScanViewerOpen}
      />
      
      <TreatmentDetailsDialog
        treatment={selectedTreatment}
        open={treatmentDialogOpen}
        onOpenChange={setTreatmentDialogOpen}
      />

      <CitationDialog
        citation={selectedCitation}
        open={citationDialogOpen}
        onOpenChange={setCitationDialogOpen}
      />
    </div>
  );
}

function getTitle(content: string): string | null {
  const titleMatch = content.match(/^##\s+(.+)$/m);
  return titleMatch ? titleMatch[1] || null : null;
}

function parsePatientInfo(content: string): PatientInfo | null {
  // Extract patient overview section
  const overviewMatch = content.match(/\*\*Patient Overview:\*\*\s*([\s\S]*?)(?=\n\s*\*\*[^*]+:\*\*|$)/i);
  if (!overviewMatch || !overviewMatch[1]) return null;
  
  const overviewContent = overviewMatch[1];
  
  // Parse individual fields using regex
  const nameMatch = overviewContent.match(/([A-Za-z\s]+)\s*\(([^)]+)\)/);
  const ageMatch = overviewContent.match(/Age:\s*(\d+)/i);
  const allergiesMatch = overviewContent.match(/Allergies:\s*([^\n\r]+)/i);
  const lastVisitMatch = overviewContent.match(/Last visit:\s*([^\n\r]+)/i);
  
  if (!nameMatch) return null;
  
  return {
    name: nameMatch[1]?.trim() || "Unknown",
    id: nameMatch[2]?.trim() || "Unknown",
    age: ageMatch?.[1] || "Unknown",
    allergies: allergiesMatch?.[1]?.trim() || "None reported",
    lastVisit: lastVisitMatch?.[1]?.trim() || "Unknown"
  };
}

function parseDentalSections(content: string): Section[] {
  const sections: Section[] = [];
  
  // Define section patterns and their corresponding icons
  const sectionConfigs = [
    {
      pattern: /\*\*Patient Overview:\*\*\s*([\s\S]*?)(?=\n\s*\*\*[^*]+:\*\*|$)/i,
      title: "Patient Overview",
      icon: User
    },
    {
      pattern: /\*\*Visit Reason:\*\*\s*([\s\S]*?)(?=\n\s*\*\*[^*]+:\*\*|$)/i,
      title: "Visit Reason",
      icon: FileText
    },
    {
      pattern: /\*\*Recent Activity:\*\*\s*([\s\S]*?)(?=\n\s*\*\*[^*]+:\*\*|$)/i,
      title: "Recent Activity", 
      icon: Activity
    },
    {
      pattern: /\*\*Clinical Summary:\*\*\s*([\s\S]*?)(?=\n\s*\*\*[^*]+:\*\*|$)/i,
      title: "Clinical Summary",
      icon: Stethoscope
    },
    {
      pattern: /\*\*Recommended Actions:\*\*\s*([\s\S]*?)(?=\n\s*\*\*[^*]+:\*\*|$)/i,
      title: "Recommended Actions",
      icon: CheckCircle
    }
  ];

  // Extract each section
  for (const config of sectionConfigs) {
    const match = content.match(config.pattern);
    if (match && match[1]) {
      const sectionContent = match[1].trim();
      // Always include sections, even if they appear empty (they might have formatting issues)
      sections.push({
        title: config.title,
        content: sectionContent || "No information available",
        icon: config.icon
      });
    }
  }

  return sections;
}

// Helper function to detect if content is a dental simulation message
export function isDentalSimulationMessage(content: string): boolean {
  const hasPatientOverview = /\*\*Patient Overview:\*\*/i.test(content);
  const hasRecentActivity = /\*\*Recent Activity:\*\*/i.test(content);
  const hasRecommendedActions = /\*\*Recommended Actions:\*\*/i.test(content);
  
  // Must have at least 2 of the 3 sections to be considered a dental simulation
  return [hasPatientOverview, hasRecentActivity, hasRecommendedActions].filter(Boolean).length >= 2;
}
