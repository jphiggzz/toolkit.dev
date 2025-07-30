'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SplitViewLayoutProps {
  chatContent: React.ReactNode;
  artifactContent: React.ReactNode;
  isArtifactOpen: boolean;
  onCloseArtifact: () => void;
  className?: string;
  defaultSplitRatio?: number; // 0-1, percentage of screen for chat
}

export function SplitViewLayout({
  chatContent,
  artifactContent,
  isArtifactOpen,
  onCloseArtifact,
  className = '',
  defaultSplitRatio = 0.5,
}: SplitViewLayoutProps) {
  const [splitRatio, setSplitRatio] = useState(defaultSplitRatio);
  const [isDragging, setIsDragging] = useState(false);
  const [isArtifactMaximized, setIsArtifactMaximized] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const containerWidth = window.innerWidth;
    const newRatio = Math.max(0.2, Math.min(0.8, e.clientX / containerWidth));
    setSplitRatio(newRatio);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const toggleArtifactMaximize = () => {
    setIsArtifactMaximized(!isArtifactMaximized);
  };

  if (!isArtifactOpen) {
    return (
      <div className={cn('h-full', className)}>
        {chatContent}
      </div>
    );
  }

  return (
    <div className={cn('h-full flex', className)}>
      {/* Chat Panel */}
      <AnimatePresence>
        {!isArtifactMaximized && (
          <motion.div
            initial={{ width: `${splitRatio * 100}%` }}
            animate={{ width: `${splitRatio * 100}%` }}
            exit={{ width: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 relative"
            style={{ width: `${splitRatio * 100}%` }}
          >
            {chatContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resizer */}
      {!isArtifactMaximized && (
        <div
          className={cn(
            'w-1 bg-border hover:bg-primary/50 cursor-col-resize transition-colors relative group',
            isDragging && 'bg-primary'
          )}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center">
            <div className="w-3 h-8 bg-muted border rounded-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-0.5 h-4 bg-muted-foreground/50 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* Artifact Panel */}
      <motion.div
        initial={{ width: isArtifactMaximized ? '100%' : `${(1 - splitRatio) * 100}%` }}
        animate={{ width: isArtifactMaximized ? '100%' : `${(1 - splitRatio) * 100}%` }}
        transition={{ duration: 0.2 }}
        className="flex-1 relative bg-background"
      >
        {/* Artifact Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Artifact
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              {!isArtifactMaximized && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSplitRatio(0.2)}
                  className="h-7 w-7 p-0"
                  title="Minimize chat"
                >
                  <PanelLeftClose className="h-3 w-3" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleArtifactMaximize}
                className="h-7 w-7 p-0"
                title={isArtifactMaximized ? "Restore" : "Maximize"}
              >
                {isArtifactMaximized ? (
                  <Minimize2 className="h-3 w-3" />
                ) : (
                  <Maximize2 className="h-3 w-3" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onCloseArtifact}
                className="h-7 w-7 p-0"
                title="Close artifact"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Artifact Content */}
        <div className="h-full pt-12">
          {artifactContent}
        </div>
      </motion.div>
      
      {/* Overlay for dragging */}
      {isDragging && (
        <div className="fixed inset-0 z-50 cursor-col-resize" />
      )}
    </div>
  );
}