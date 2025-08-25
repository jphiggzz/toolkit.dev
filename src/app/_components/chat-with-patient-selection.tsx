"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
import { ChatWithProvider } from "@/app/_components/chat/chat-with-provider";
import { ChatUI } from "@/app/_components/chat/chat-ui";
import { useChatContext } from "@/app/_contexts/chat-context";
import { getPatientById } from "@/app/_components/chat/mock/patients";
import type { ChatPreferences } from "@/lib/cookies/types";

interface ChatWithPatientSelectionProps {
  chatId: string;
  preferences?: ChatPreferences;
}

function PatientSelectionLogic() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPatientContext, startPatientSimulation } = useChatContext();
  const hasProcessedRef = useRef(false);
  
  const patientId = searchParams.get('patient');

  useEffect(() => {
    // Only process if we have a patientId and haven't processed it yet
    if (patientId && !hasProcessedRef.current) {
      const patient = getPatientById(patientId);
      if (patient) {
        hasProcessedRef.current = true;
        
        // Set the patient context first
        setPatientContext(patient);
        
        // Start simulation after a brief delay to ensure context is set
        const timeoutId = setTimeout(() => {
          startPatientSimulation(patient);
        }, 100);

        // Clean up URL parameter after processing
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('patient');
        router.replace(newUrl.pathname, { scroll: false });

        // Cleanup function to clear timeout if component unmounts
        return () => clearTimeout(timeoutId);
      }
    }
  }, [patientId]); // Minimal dependency array

  // Reset the flag when patientId changes to a new value
  useEffect(() => {
    if (patientId) {
      hasProcessedRef.current = false;
    }
  }, [patientId]);

  return null; // This component only handles logic, no UI
}

export function ChatWithPatientSelection({ chatId, preferences }: ChatWithPatientSelectionProps) {
  return (
    <ChatWithProvider
      id={chatId}
      initialVisibilityType="private"
      hasInitialMessages={false}
      initialMessages={[]}
      preferences={preferences}
    >
      <PatientSelectionLogic />
      <ChatUI
        id={chatId}
        isReadonly={false}
        hasInitialMessages={false}
      />
    </ChatWithProvider>
  );
}