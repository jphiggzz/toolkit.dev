'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Code, 
  BarChart3, 
  Share, 
  Download, 
  Edit3,
  Trash2,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import type { ArtifactWithRelations } from '@/lib/types/artifacts';
import { DocumentViewer } from './viewers/document-viewer';
import { CodeViewer } from './viewers/code-viewer';
import { ChartViewer } from './viewers/chart-viewer';
import { DiagramViewer } from './viewers/diagram-viewer';

interface ArtifactViewerProps {
  artifact: ArtifactWithRelations;
  isEditable?: boolean;
  onUpdate?: (updates: { title?: string; content?: string; metadata?: Record<string, any> }) => void;
  onDelete?: () => void;
  onShare?: () => void;
  className?: string;
}

const artifactIcons = {
  document: FileText,
  code: Code,
  chart: BarChart3,
  diagram: BarChart3,
  image: FileText,
  sheet: FileText,
};

export function ArtifactViewer({
  artifact,
  isEditable = false,
  onUpdate,
  onDelete,
  onShare,
  className = '',
}: ArtifactViewerProps) {
  const Icon = artifactIcons[artifact.type];

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(artifact.content);
      // TODO: Add toast notification
    } catch (error) {
      console.error('Failed to copy content:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([artifact.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${artifact.title}.${getFileExtension(artifact.type)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileExtension = (type: string): string => {
    switch (type) {
      case 'document':
        return 'md';
      case 'code':
        return 'txt';
      case 'chart':
        return 'json';
      case 'diagram':
        return 'mmd';
      default:
        return 'txt';
    }
  };

  const renderViewer = () => {
    switch (artifact.type) {
      case 'document':
        return <DocumentViewer artifact={artifact} />;
      case 'code':
        return <CodeViewer artifact={artifact} />;
      case 'chart':
        return <ChartViewer artifact={artifact} />;
      case 'diagram':
        return <DiagramViewer artifact={artifact} />;
      default:
        return (
          <div className="p-4 text-center text-muted-foreground">
            <p>Unsupported artifact type: {artifact.type}</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`h-full flex flex-col ${className}`}
    >
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex-shrink-0 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold truncate">{artifact.title}</h2>
              </div>
              <Badge variant="secondary" className="text-xs">
                {artifact.type}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyContent}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  {onShare && (
                    <DropdownMenuItem onClick={onShare}>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                  )}
                  {isEditable && onUpdate && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => {/* TODO: Implement edit mode */}}>
                        <Edit3 className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    </>
                  )}
                  {isEditable && onDelete && (
                    <DropdownMenuItem 
                      onClick={onDelete}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Created {new Date(artifact.createdAt).toLocaleDateString()}</span>
            {artifact.metadata && typeof artifact.metadata === 'object' && (
              <>
                {(artifact.metadata as any).wordCount && (
                  <span>{(artifact.metadata as any).wordCount} words</span>
                )}
                {(artifact.metadata as any).language && artifact.type === 'code' && (
                  <Badge variant="outline" className="text-xs">
                    {(artifact.metadata as any).language}
                  </Badge>
                )}
              </>
            )}
          </div>
        </CardHeader>
        
        <Separator />
        
        <CardContent className="flex-1 p-0 overflow-hidden">
          {renderViewer()}
        </CardContent>
      </Card>
    </motion.div>
  );
}