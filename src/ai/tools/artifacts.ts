import { tool as createTool } from 'ai';
import { z } from 'zod';
import type { ArtifactType } from '@prisma/client';

// Document/Essay generation tool
export const createDocumentTool = createTool({
  description: 'Create a document or essay artifact that will be displayed in a split-view interface. Use this when the user asks for written content like essays, articles, reports, or any substantial text document.',
  parameters: z.object({
    title: z.string().describe('A clear, descriptive title for the document'),
    content: z.string().describe('The full content of the document in markdown format'),
    wordCount: z.number().optional().describe('Estimated word count of the document'),
    language: z.string().default('en').describe('Language of the document (e.g., en, es, fr)'),
    format: z.enum(['markdown', 'html', 'plain']).default('markdown').describe('Format of the content'),
  }),
  execute: async ({ title, content, wordCount, language, format }) => {
    // Calculate word count if not provided
    const calculatedWordCount = wordCount || content.split(/\s+/).filter(word => word.length > 0).length;
    
    return {
      type: 'document' as ArtifactType,
      title,
      content,
      metadata: {
        wordCount: calculatedWordCount,
        language,
        format,
      },
    };
  },
});

// Code generation tool
export const createCodeTool = createTool({
  description: 'Create a code artifact that will be displayed in a split-view interface with syntax highlighting. Use this when the user asks for code examples, scripts, or programming solutions.',
  parameters: z.object({
    title: z.string().describe('A clear, descriptive title for the code artifact'),
    content: z.string().describe('The code content'),
    language: z.string().describe('Programming language (e.g., javascript, python, typescript, html, css)'),
    framework: z.string().optional().describe('Framework or library used (e.g., React, Vue, Express)'),
    dependencies: z.array(z.string()).optional().describe('List of dependencies or imports needed'),
    runnable: z.boolean().default(false).describe('Whether this code can be executed directly'),
  }),
  execute: async ({ title, content, language, framework, dependencies, runnable }) => {
    return {
      type: 'code' as ArtifactType,
      title,
      content,
      metadata: {
        language,
        framework,
        dependencies,
        runnable,
      },
    };
  },
});

// Chart/Data visualization tool
export const createChartTool = createTool({
  description: 'Create a chart or data visualization artifact. Use this when the user asks for charts, graphs, or data visualizations.',
  parameters: z.object({
    title: z.string().describe('A clear, descriptive title for the chart'),
    content: z.string().describe('Chart configuration or data in JSON format'),
    chartType: z.enum(['bar', 'line', 'pie', 'scatter', 'area']).describe('Type of chart to create'),
    dataSource: z.string().optional().describe('Description of the data source'),
    xAxis: z.string().optional().describe('Label for X-axis'),
    yAxis: z.string().optional().describe('Label for Y-axis'),
  }),
  execute: async ({ title, content, chartType, dataSource, xAxis, yAxis }) => {
    return {
      type: 'chart' as ArtifactType,
      title,
      content,
      metadata: {
        chartType,
        dataSource,
        xAxis,
        yAxis,
      },
    };
  },
});

// Diagram creation tool
export const createDiagramTool = createTool({
  description: 'Create a diagram artifact using Mermaid syntax. Use this for flowcharts, sequence diagrams, mind maps, or other visual diagrams.',
  parameters: z.object({
    title: z.string().describe('A clear, descriptive title for the diagram'),
    content: z.string().describe('Mermaid diagram syntax'),
    diagramType: z.enum(['flowchart', 'sequence', 'class', 'state', 'er', 'gantt', 'pie', 'mindmap']).describe('Type of Mermaid diagram'),
  }),
  execute: async ({ title, content, diagramType }) => {
    return {
      type: 'diagram' as ArtifactType,
      title,
      content,
      metadata: {
        diagramType,
        syntax: 'mermaid',
      },
    };
  },
});

// Export all artifact tools
export const artifactTools = {
  createDocument: createDocumentTool,
  createCode: createCodeTool,
  createChart: createChartTool,
  createDiagram: createDiagramTool,
};