"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Chat } from "@/app/_components/chat";
import { useChatContext } from "@/app/_contexts/chat-context";
import { getPatientById } from "@/app/_components/chat/mock/patients";

interface ChatWithPatientSelectionProps {
  chatId: string;
}

export function ChatWithPatientSelection({ chatId }: ChatWithPatientSelectionProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPatientContext, startEbAppointmentSimulation } = useChatContext();
  
  const patientId = searchParams.get('patient');

  useEffect(() => {
    if (patientId) {
      const patient = getPatientById(patientId);
      if (patient) {
        // Set the patient context first
        setPatientContext(patient);
        
        // Start simulation after a brief delay to ensure context is set
        setTimeout(() => {
          startEbAppointmentSimulation();
        }, 100);

        // Clean up URL parameter after processing
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('patient');
        router.replace(newUrl.pathname, { scroll: false });
      }
    }
  }, [patientId, setPatientContext, startEbAppointmentSimulation, router]);

  return (
    <Chat
      key={chatId}
      id={chatId}
      initialVisibilityType="private"
      isReadonly={false}
      isNew={true}
    />
  );
}