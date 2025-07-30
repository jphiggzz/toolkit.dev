'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';
import type { ArtifactWithRelations, ChartMetadata } from '@/lib/types/artifacts';

interface ChartViewerProps {
  artifact: ArtifactWithRelations;
}

export function ChartViewer({ artifact }: ChartViewerProps) {
  const metadata = artifact.metadata ? (artifact.metadata as unknown as ChartMetadata) : undefined;
  const chartType = metadata?.chartType || 'bar';
  const dataSource = metadata?.dataSource;
  const xAxis = metadata?.xAxis;
  const yAxis = metadata?.yAxis;

  // TODO: Implement actual chart rendering with recharts or similar
  // For now, show a placeholder with the chart data
  
  let chartData;
  try {
    chartData = JSON.parse(artifact.content);
  } catch (error) {
    chartData = null;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chart metadata */}
      <div className="flex-shrink-0 border-b bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {chartType} chart
          </Badge>
          {dataSource && (
            <span className="text-xs text-muted-foreground">
              Source: {dataSource}
            </span>
          )}
        </div>
        {(xAxis || yAxis) && (
          <div className="mt-2 text-xs text-muted-foreground">
            {xAxis && <span>X: {xAxis}</span>}
            {xAxis && yAxis && <span className="mx-2">•</span>}
            {yAxis && <span>Y: {yAxis}</span>}
          </div>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Placeholder for chart */}
          <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
            <BarChart3 className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-2">Chart Viewer</p>
            <p className="text-sm text-muted-foreground/75">
              Chart rendering will be implemented with recharts
            </p>
          </div>
          
          {/* Show raw data for now */}
          {chartData && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Chart Data:</h4>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                {JSON.stringify(chartData, null, 2)}
              </pre>
            </div>
          )}
          
          {!chartData && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Raw Content:</h4>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap">
                {artifact.content}
              </pre>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}