import { memo, useEffect, useState } from "react";
import { motion } from "motion/react";
import equal from "fast-deep-equal";
import { PreviewMessage, ThinkingMessage } from "./message";
import { SimulatedToolRun } from "./simulated-tool-run";
import { useMessages } from "@/app/_hooks/use-messages";
import { useChatContext } from "@/app/_contexts/chat-context";
import { cn } from "@/lib/utils";
import { SIMULATION_STEPS } from "../mock/eb-patient";

interface Props {
  chatId: string;
  isReadonly: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  endRef: React.RefObject<HTMLDivElement | null>;
  onViewportEnter: () => void;
  onViewportLeave: () => void;
  scrollToBottom: (behavior: ScrollBehavior) => void;
}

const PureMessages: React.FC<Props> = ({
  chatId,
  isReadonly,
  containerRef,
  endRef,
  onViewportEnter,
  onViewportLeave,
  scrollToBottom,
}) => {
  const { messages, status, streamStopped, simulationStep } = useChatContext();

  const { hasSentMessage } = useMessages({
    chatId,
    status,
    scrollToBottom,
  });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, [hasMounted]);

  const lastMessage = messages[messages.length - 1];

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-full min-w-0 flex-1 flex-col gap-6 overflow-y-scroll py-8",
        messages.length > 0 && "mb-20",
      )}
    >
      {messages
        .filter(
          (message) => {
            // Don't filter out simulation messages
            const hasSimulationTool = message.toolInvocations?.some(
              (invocation) => invocation.toolName === "simulated-patient-lookup"
            );
            if (hasSimulationTool) return true;

            // Filter out other empty messages
            return !(
              message.parts.length === 0 ||
              (message.parts?.length === 1 &&
                message.parts[0]?.type === "step-start")
            );
          },
        )
        .map((message, index) => {
          // Check if this is a simulation message
          const hasSimulationTool = message.toolInvocations?.some(
            (invocation) => invocation.toolName === "simulated-patient-lookup"
          );

          if (hasSimulationTool) {
            return (
              <SimulatedToolRun
                key={message.id}
                currentStepIndex={simulationStep >= 0 ? simulationStep : SIMULATION_STEPS.length}
                onComplete={() => {
                  // This will be handled by the chat context
                }}
              />
            );
          }

          return (
            <PreviewMessage
              key={message.id}
              message={message}
              isLoading={status === "streaming" && messages.length - 1 === index}
              isReadonly={isReadonly}
              requiresScrollPadding={
                hasSentMessage && index === messages.length - 1
              }
              chatId={chatId}
            />
          );
        })}

      {!streamStopped &&
        ((status === "submitted" &&
          messages.length > 0 &&
          lastMessage?.role === "user") ||
          (lastMessage?.role === "assistant" &&
            (lastMessage?.parts?.length === 0 ||
              (lastMessage?.parts?.length === 1 &&
                lastMessage?.parts?.[0]?.type === "step-start")))) && (
          <ThinkingMessage />
        )}

      <motion.div
        ref={endRef}
        className="min-h-[24px] min-w-[24px] shrink-0"
        onViewportLeave={onViewportLeave}
        onViewportEnter={onViewportEnter}
      />
    </div>
  );
};

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  return equal(prevProps, nextProps);
});
