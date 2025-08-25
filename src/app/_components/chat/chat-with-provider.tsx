"use client";

import { ChatProvider } from "@/app/_contexts/chat-context";
import type { Workbench } from "@prisma/client";
import type { UIMessage } from "ai";
import { clientToolkits } from "@/toolkits/toolkits/client";
import type { ClientToolkit } from "@/toolkits/types";
import type { z } from "zod";
import type { PersistedToolkit, ChatPreferences } from "@/lib/cookies/types";

interface ChatWithProviderProps {
  id: string;
  initialVisibilityType: "public" | "private";
  hasInitialMessages: boolean;
  workbench?: Workbench;
  initialMessages: UIMessage[];
  preferences?: ChatPreferences;
  children: React.ReactNode;
}

export function ChatWithProvider({
  id,
  initialVisibilityType,
  hasInitialMessages,
  workbench,
  initialMessages,
  preferences = {},
  children,
}: ChatWithProviderProps) {
  // Convert preferences to the format expected by ChatProvider
  const initialPreferences = {
    selectedChatModel: preferences.selectedChatModel,
    imageGenerationModel: preferences.imageGenerationModel,
    useNativeSearch: preferences.useNativeSearch,
    toolkits: preferences.toolkits
      ?.map((persistedToolkit: PersistedToolkit) => {
        const clientToolkit =
          clientToolkits[persistedToolkit.id as keyof typeof clientToolkits];
        if (clientToolkit) {
          return {
            id: persistedToolkit.id,
            parameters: persistedToolkit.parameters,
          };
        }
        return null;
      })
      .filter(
        (
          toolkit,
        ): toolkit is {
          id: string;
          toolkit: ClientToolkit;
          parameters: z.infer<ClientToolkit["parameters"]>;
        } => toolkit !== null,
      ),
  };

  return (
    <ChatProvider
      id={id}
      initialMessages={initialMessages}
      initialVisibilityType={initialVisibilityType}
      autoResume={hasInitialMessages}
      workbench={workbench}
      initialPreferences={initialPreferences}
    >
      {children}
    </ChatProvider>
  );
}
