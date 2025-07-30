'use client';

import React, { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Copy, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ArtifactWithRelations, CodeMetadata } from '@/lib/types/artifacts';

interface CodeViewerProps {
  artifact: ArtifactWithRelations;
}

export function CodeViewer({ artifact }: CodeViewerProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  
  const metadata = artifact.metadata as CodeMetadata | undefined;
  const language = metadata?.language || 'text';
  const framework = metadata?.framework;
  const dependencies = metadata?.dependencies || [];
  const runnable = metadata?.runnable || false;

  useEffect(() => {
    const highlightCode = async () => {
      try {
        setIsLoading(true);
        const html = await codeToHtml(artifact.content, {
          lang: language,
          theme: 'github-dark',
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        // Fallback to plain text
        setHighlightedCode(`<pre><code>${artifact.content}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    highlightCode();
  }, [artifact.content, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(artifact.content);
      // TODO: Add toast notification
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleRun = () => {
    // TODO: Implement code execution (if runnable)
    console.log('Run code functionality not implemented yet');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Code metadata and actions */}
      <div className="flex-shrink-0 border-b bg-muted/30 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {language}
            </Badge>
            {framework && (
              <Badge variant="outline" className="text-xs">
                {framework}
              </Badge>
            )}
            {dependencies.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {dependencies.length} dependencies
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 px-2"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
            {runnable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRun}
                className="h-7 px-2"
              >
                <Play className="h-3 w-3 mr-1" />
                Run
              </Button>
            )}
          </div>
        </div>
        
        {dependencies.length > 0 && (
          <div className="mt-2 pt-2 border-t">
            <div className="text-xs text-muted-foreground mb-1">Dependencies:</div>
            <div className="flex flex-wrap gap-1">
              {dependencies.map((dep, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {dep}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Code content */}
      <ScrollArea className="flex-1">
        <div 
          className="code-viewer-content"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          style={{
            // Override shiki styles to match our theme
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        />
      </ScrollArea>
      
      <style jsx global>{`
        .code-viewer-content pre {
          margin: 0;
          padding: 1rem;
          background: transparent !important;
          overflow-x: auto;
        }
        
        .code-viewer-content code {
          font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .code-viewer-content .line {
          display: block;
          min-height: 1.5em;
        }
        
        /* Dark theme adjustments */
        .dark .code-viewer-content pre {
          color: #e1e5e9;
        }
        
        /* Light theme adjustments */
        .light .code-viewer-content pre {
          color: #24292e;
        }
      `}</style>
    </div>
  );
}