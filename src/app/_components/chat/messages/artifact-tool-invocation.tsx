'use client';

import React, { useEffect } from 'react';
import { FileText, Code, BarChart3, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useArtifacts } from '@/components/artifacts';
import { api } from '@/trpc/react';
import type { ArtifactType } from '@prisma/client';

interface ArtifactToolInvocationProps {
  toolCallId: string;
  toolName: string;
  args: any;
  result?: any;
  state: 'partial-call' | 'call' | 'result';
}

const artifactIcons = {
  document: FileText,
  code: Code,
  chart: BarChart3,
  diagram: GitBranch,
  image: FileText,
  sheet: FileText,
};

const toolToArtifactType: Record<string, ArtifactType> = {
  createDocument: 'document',
  createCode: 'code',
  createChart: 'chart',
  createDiagram: 'diagram',
};

export function ArtifactToolInvocation({
  toolCallId,
  toolName,
  args,
  result,
  state,
}: ArtifactToolInvocationProps) {
  const { openArtifact } = useArtifacts();
  const artifactType = toolToArtifactType[toolName];
  
  // Query to get the artifact if we have an artifactId in the result
  const { data: artifact } = api.artifacts.get.useQuery(
    { id: result?.artifactId },
    { enabled: !!result?.artifactId }
  );

  const Icon = artifactIcons[artifactType] || FileText;

  // Auto-open artifact when it's created
  useEffect(() => {
    if (artifact && state === 'result') {
      openArtifact(artifact);
    }
  }, [artifact, state, openArtifact]);

  if (state === 'partial-call' || state === 'call') {
    return (
      <Card className="my-2 border-dashed">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground animate-pulse" />
            <span className="text-sm font-medium">Creating {artifactType}...</span>
            {args?.title && (
              <Badge variant="outline" className="text-xs">
                {args.title}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>
            <span>Generating content</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === 'result' && result) {
    return (
      <Card className="my-2 border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Created {artifactType}</span>
              <Badge variant="secondary" className="text-xs">
                {result.title}
              </Badge>
            </div>
            {artifact && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => openArtifact(artifact)}
                className="h-7 text-xs"
              >
                View Artifact
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <p>
              {artifactType === 'document' && result.metadata?.wordCount && 
                `${result.metadata.wordCount} words • `}
              {artifactType === 'code' && result.metadata?.language && 
                `${result.metadata.language} • `}
              Artifact created and ready to view
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}