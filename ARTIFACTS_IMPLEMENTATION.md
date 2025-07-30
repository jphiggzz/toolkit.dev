# Artifacts System Implementation

## Overview

This document outlines the implementation of a ChatGPT Canvas-like artifacts system for the Toolkit.dev project. The system allows AI to generate rich, interactive content that displays in a split-view interface alongside the chat conversation.

## Architecture

The artifacts system follows the existing patterns and conventions in the repository:

- **Database**: Prisma ORM with SQLite (development) / PostgreSQL (production)
- **API**: tRPC for type-safe API routes
- **Frontend**: Next.js 15 with React 19, Tailwind CSS, and Radix UI
- **AI Integration**: Vercel AI SDK with tool calling
- **State Management**: React Context for artifact state

## Database Schema

### Artifact Model

```prisma
enum ArtifactType {
    document
    code
    image
    sheet
    chart
    diagram
}

model Artifact {
    id          String       @id @default(uuid())
    chatId      String
    messageId   String?      // Optional link to specific message that created this artifact
    type        ArtifactType
    title       String
    content     String
    metadata    Json?        // Store additional type-specific metadata
    createdAt   DateTime     @default(now())
    updatedAt   DateTime     @updatedAt
    chat        Chat         @relation(fields: [chatId], references: [id], onDelete: Cascade)
    message     Message?     @relation(fields: [messageId], references: [id], onDelete: SetNull)

    @@index([chatId])
    @@index([messageId])
}
```

### Relations

- **Chat → Artifacts**: One-to-many relationship
- **Message → Artifacts**: One-to-many relationship (optional)
- **User access**: Controlled through Chat ownership

## API Layer

### tRPC Router (`src/server/api/routers/artifacts.ts`)

Provides CRUD operations with proper authorization:

- `create`: Create new artifact
- `get`: Get artifact by ID
- `getByChatId`: Get all artifacts for a chat
- `update`: Update existing artifact
- `delete`: Delete artifact
- `getByType`: Get artifacts by type across all user chats

All operations verify user ownership through the associated chat.

## AI Tools Integration

### Artifact Generation Tools (`src/ai/tools/artifacts.ts`)

Four main tool types implemented:

1. **Document Tool** (`createDocument`)
   - For essays, articles, reports, substantial text
   - Supports markdown format
   - Metadata: word count, language, format

2. **Code Tool** (`createCode`)
   - For code examples, scripts, programming solutions
   - Supports syntax highlighting
   - Metadata: language, framework, dependencies, runnable flag

3. **Chart Tool** (`createChart`)
   - For data visualizations (placeholder implementation)
   - Metadata: chart type, data source, axis labels

4. **Diagram Tool** (`createDiagram`)
   - For Mermaid diagrams (placeholder implementation)
   - Metadata: diagram type, syntax

### Integration with Chat API

The chat API (`src/app/api/chat/route.ts`) has been enhanced to:

1. Include artifact tools in the available tools
2. Automatically persist artifacts to database when created
3. Provide comprehensive system prompt about artifact capabilities

## Frontend Components

### Core Components

1. **ArtifactViewer** (`src/components/artifacts/artifact-viewer.tsx`)
   - Main component for displaying artifacts
   - Handles different artifact types
   - Provides actions: copy, download, share, edit, delete

2. **SplitViewLayout** (`src/components/artifacts/split-view-layout.tsx`)
   - Responsive split-view layout
   - Resizable panels with drag handles
   - Maximize/minimize functionality
   - Smooth animations

3. **Viewer Components**
   - **DocumentViewer**: Renders markdown with syntax highlighting
   - **CodeViewer**: Syntax highlighting with Shiki
   - **ChartViewer**: Placeholder for chart rendering
   - **DiagramViewer**: Placeholder for Mermaid diagrams

### Context Management

**ArtifactProvider** (`src/contexts/artifact-context.tsx`):
- Manages artifact state across the application
- Handles CRUD operations with optimistic updates
- Auto-loads artifacts for active chat
- Provides hooks for component integration

### Chat Integration

**Layout Integration**:
- `ChatLayout` now includes `ArtifactProvider`
- Automatically renders split-view when artifacts are active
- Seamless integration with existing chat flow

**Message Rendering**:
- `ArtifactToolInvocation` component handles artifact tool calls
- Shows loading states during generation
- Auto-opens artifacts when created
- Provides manual "View Artifact" buttons

## Usage Flow

### For Users

1. **Request Creation**: "Write me an essay about AI"
2. **AI Processing**: Model decides to use `createDocument` tool
3. **Generation**: Tool generates content with metadata
4. **Persistence**: Artifact saved to database
5. **Display**: Split-view opens with artifact on right side
6. **Interaction**: User can view, copy, download, or edit

### For Developers

1. **New Artifact Types**: Add to `ArtifactType` enum
2. **New Tools**: Create in `artifactTools` object
3. **New Viewers**: Implement viewer component
4. **Integration**: Update viewer routing in `ArtifactViewer`

## Extensibility

The system is designed for easy extension:

### Adding New Artifact Types

1. Add type to `ArtifactType` enum in schema
2. Create corresponding tool in `src/ai/tools/artifacts.ts`
3. Implement viewer component in `src/components/artifacts/viewers/`
4. Add to viewer routing in `ArtifactViewer`
5. Update icons and metadata handling

### Metadata Schema

Each artifact type can have custom metadata:

```typescript
interface DocumentMetadata {
  wordCount?: number;
  language?: string;
  format?: 'markdown' | 'html' | 'plain';
}

interface CodeMetadata {
  language: string;
  framework?: string;
  dependencies?: string[];
  runnable?: boolean;
}
```

## Current Limitations & Future Enhancements

### Implemented
- ✅ Document artifacts with markdown rendering
- ✅ Code artifacts with syntax highlighting
- ✅ Split-view layout with resizing
- ✅ Database persistence
- ✅ Auto-opening of new artifacts
- ✅ Basic CRUD operations

### Planned Enhancements
- 🔄 Chart rendering with Recharts
- 🔄 Mermaid diagram rendering
- 🔄 Image artifact support
- 🔄 Spreadsheet/table artifacts
- 🔄 Real-time collaborative editing
- 🔄 Artifact versioning
- 🔄 Export to various formats
- 🔄 Artifact sharing and permissions

## Testing

To test the artifacts system:

1. Start the development server: `pnpm dev`
2. Create a new chat
3. Ask for content like:
   - "Write me an essay about renewable energy"
   - "Create a Python function to sort a list"
   - "Make a flowchart showing the software development process"

The AI should automatically create appropriate artifacts and display them in the split-view interface.

## File Structure

```
src/
├── components/artifacts/
│   ├── artifact-viewer.tsx          # Main artifact display component
│   ├── split-view-layout.tsx        # Split-view layout component
│   ├── viewers/
│   │   ├── document-viewer.tsx      # Markdown document renderer
│   │   ├── code-viewer.tsx          # Code with syntax highlighting
│   │   ├── chart-viewer.tsx         # Chart placeholder
│   │   └── diagram-viewer.tsx       # Diagram placeholder
│   └── index.ts                     # Component exports
├── contexts/
│   └── artifact-context.tsx         # Artifact state management
├── lib/types/
│   └── artifacts.ts                 # TypeScript type definitions
├── ai/tools/
│   └── artifacts.ts                 # AI tools for artifact generation
├── server/api/routers/
│   └── artifacts.ts                 # tRPC API routes
└── app/_components/chat/
    ├── layout.tsx                   # Updated with artifact integration
    └── messages/
        └── artifact-tool-invocation.tsx  # Tool invocation renderer
```

This implementation provides a solid foundation for the artifacts system while maintaining consistency with the existing codebase patterns and allowing for future extensibility.