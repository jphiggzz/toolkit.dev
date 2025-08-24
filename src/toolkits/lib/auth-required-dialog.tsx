import React from "react";

import { Code } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "@/components/ui/logo";
import { HStack, VStack } from "@/components/ui/stack";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  Icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  content: React.ReactNode;
}

export const AuthRequiredDialog: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  Icon,
  title,
  description,
  content,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center gap-8 text-center">
          <HStack className="gap-4">
            <Logo className="size-12" />
            <Code className="size-4" />
            <Icon className="size-12" />
          </HStack>
          <VStack className="gap-1">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          </VStack>
        </DialogHeader>
        {content}
        {content && (
          <DialogFooter className="justify-center md:justify-center">
            <p className="text-muted-foreground max-w-xs text-center text-xs">
              Your configuration will be saved securely by Dental.AI and can be
              deleted at any time.
            </p>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

interface AuthButtonProps {
  onClick: () => void;
  children: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <Button size="lg" onClick={onClick} className="user-message">
      {children}
    </Button>
  );
};
