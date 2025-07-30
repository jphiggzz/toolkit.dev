'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { GitBranch } from 'lucide-react';
import type { ArtifactWithRelations } from '@/lib/types/artifacts';

interface DiagramViewerProps {
  artifact: ArtifactWithRelations;
}

export function DiagramViewer({ artifact }: DiagramViewerProps) {
  const metadata = artifact.metadata as any;
  const diagramType = metadata?.diagramType || 'flowchart';
  const syntax = metadata?.syntax || 'mermaid';

  // TODO: Implement actual Mermaid diagram rendering
  // For now, show a placeholder with the diagram source
  
  return (
    <div className="h-full flex flex-col">
      {/* Diagram metadata */}
      <div className="flex-shrink-0 border-b bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {diagramType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {syntax}
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Placeholder for diagram */}
          <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25 mb-6">
            <GitBranch className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-2">Diagram Viewer</p>
            <p className="text-sm text-muted-foreground/75">
              Mermaid diagram rendering will be implemented
            </p>
          </div>
          
          {/* Show source code */}
          <div>
            <h4 className="text-sm font-medium mb-2">Diagram Source:</h4>
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap font-mono">
              {artifact.content}
            </pre>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}