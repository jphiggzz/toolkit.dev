"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckIcon, Loader2Icon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/app/_contexts/chat-context";
import { SIMULATION_STEPS, type SimulationStep } from "../mock/eb-patient";

interface SimulatedToolRunProps {
  currentStepIndex: number;
  onComplete: () => void;
}

export function SimulatedToolRun({ currentStepIndex, onComplete }: SimulatedToolRunProps) {
  // The context manages the timing, we just display the current state
  const completedSteps = Array.from({ length: currentStepIndex }, (_, i) => i);
  const isCompleted = currentStepIndex >= SIMULATION_STEPS.length;
  const { patientSidebarOpen, setPatientSidebarOpen } = useChatContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="group/message mx-auto w-full max-w-3xl px-4"
    >
      <div className="flex w-full gap-4">
        <div className="flex w-full max-w-full flex-col gap-4">
          <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary/10">
                  {isCompleted ? (
                    <CheckIcon className="size-3 text-green-600" />
                  ) : (
                    <Loader2Icon className="size-3 animate-spin text-primary" />
                  )}
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {isCompleted ? "Patient records retrieved" : "Processing patient records..."}
                </span>
              </div>
              
              {isCompleted && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPatientSidebarOpen(!patientSidebarOpen)}
                  className="text-xs h-7"
                >
                  <UserIcon className="size-3 mr-1" />
                  {patientSidebarOpen ? "Hide" : "View"} Patient
                </Button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {SIMULATION_STEPS.map((step, index) => {
                  const isActive = !isCompleted && index === currentStepIndex;
                  const isStepCompleted = isCompleted || completedSteps.includes(index);
                  const isPending = !isCompleted && index > currentStepIndex;

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex size-5 items-center justify-center">
                        {isStepCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <CheckIcon className="size-4 text-green-600" />
                          </motion.div>
                        ) : isActive ? (
                          <Loader2Icon className="size-4 animate-spin text-primary" />
                        ) : isPending ? (
                          <div className="size-4 rounded-full border-2 border-muted-foreground/20" />
                        ) : null}
                      </div>
                      <span
                        className={`text-sm ${
                          isStepCompleted
                            ? "text-muted-foreground"
                            : isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground/60"
                        }`}
                      >
                        {step.label}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
