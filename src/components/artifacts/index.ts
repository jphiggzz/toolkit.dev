// Main components
export { ArtifactViewer } from './artifact-viewer';
export { SplitViewLayout } from './split-view-layout';

// Viewer components
export { DocumentViewer } from './viewers/document-viewer';
export { CodeViewer } from './viewers/code-viewer';
export { ChartViewer } from './viewers/chart-viewer';
export { DiagramViewer } from './viewers/diagram-viewer';

// Context
export { ArtifactProvider, useArtifacts } from '../contexts/artifact-context';

// Types (re-export for convenience)
export type {
  ArtifactWithRelations,
  CreateArtifactInput,
  UpdateArtifactInput,
  ArtifactTemplate,
  ArtifactDisplayProps,
  SplitViewState,
  DocumentMetadata,
  CodeMetadata,
  ChartMetadata,
  ArtifactMetadata,
} from '@/lib/types/artifacts';