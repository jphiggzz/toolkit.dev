import type { Artifact, ArtifactType } from '@prisma/client';

export type { ArtifactType } from '@prisma/client';

// Extended artifact type with relations
export interface ArtifactWithRelations extends Artifact {
  chat?: {
    id: string;
    title: string;
  };
  message?: {
    id: string;
    role: string;
  };
}

// Artifact creation input
export interface CreateArtifactInput {
  chatId: string;
  messageId?: string;
  type: ArtifactType;
  title: string;
  content: string;
  metadata?: Record<string, any>;
}

// Artifact update input
export interface UpdateArtifactInput {
  title?: string;
  content?: string;
  metadata?: Record<string, any>;
}

// Artifact template interface for extensibility
export interface ArtifactTemplate {
  type: ArtifactType;
  name: string;
  description: string;
  icon: string;
  defaultTitle: string;
  contentValidator?: (content: string) => boolean;
  metadataSchema?: Record<string, any>;
}

// Document-specific metadata
export interface DocumentMetadata {
  wordCount?: number;
  language?: string;
  format?: 'markdown' | 'html' | 'plain';
}

// Code-specific metadata
export interface CodeMetadata {
  language: string;
  framework?: string;
  dependencies?: string[];
  runnable?: boolean;
}

// Chart-specific metadata
export interface ChartMetadata {
  chartType: 'bar' | 'line' | 'pie' | 'scatter' | 'area';
  dataSource?: string;
  xAxis?: string;
  yAxis?: string;
}

// Union type for all metadata types
export type ArtifactMetadata = DocumentMetadata | CodeMetadata | ChartMetadata | Record<string, any>;

// Artifact display props
export interface ArtifactDisplayProps {
  artifact: ArtifactWithRelations;
  isEditable?: boolean;
  onUpdate?: (updates: UpdateArtifactInput) => void;
  onDelete?: () => void;
}

// Split view layout state
export interface SplitViewState {
  isOpen: boolean;
  activeArtifactId?: string;
  width: number; // Percentage of screen width
}