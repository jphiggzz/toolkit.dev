"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserIcon, XIcon } from "lucide-react";
import { useChatContext } from "@/app/_contexts/chat-context";
import type { MockPatient } from "./mock/eb-patient";

interface PatientContextIndicatorProps {
  patient: MockPatient;
  onClear: () => void;
}

export function PatientContextIndicator({ patient, onClear }: PatientContextIndicatorProps) {
  const { setPatientSidebarOpen } = useChatContext();

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50 rounded-md">
      <UserIcon className="size-3 text-blue-600/70 dark:text-blue-400/70" />
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-xs font-medium text-blue-900/80 dark:text-blue-100/80">
          Patient Context:
        </span>
        <Badge variant="secondary" className="text-xs py-0 px-2 h-5">
          {patient.name}
        </Badge>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPatientSidebarOpen(true)}
          className="text-blue-600/70 dark:text-blue-400/70 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 h-6 px-2 text-xs"
        >
          View
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-blue-600/70 dark:text-blue-400/70 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 h-6 w-6 p-0"
        >
          <XIcon className="size-3" />
        </Button>
      </div>
    </div>
  );
}
