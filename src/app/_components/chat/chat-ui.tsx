"use client";

import { ChatLayout } from "./layout";
import { ChatContent } from "./chat";

interface ChatUIProps {
  id: string;
  isReadonly: boolean;
  hasInitialMessages: boolean;
}

export function ChatUI({ id, isReadonly, hasInitialMessages }: ChatUIProps) {
  return (
    <ChatLayout>
      <ChatContent
        id={id}
        isReadonly={isReadonly}
        hasInitialMessages={hasInitialMessages}
      />
    </ChatLayout>
  );
}
