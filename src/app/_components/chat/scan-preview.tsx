"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EyeIcon, ScanIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { MockPatient } from "./mock/eb-patient";

interface ScanPreviewProps {
  scans: MockPatient["scans"];
  onScanClick: (scan: MockPatient["scans"][0]) => void;
}

export function ScanPreview({ scans, onScanClick }: ScanPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (scans.length === 0) return null;

  const currentScan = scans[currentIndex];
  const hasMultiple = scans.length > 1;

  if (!currentScan) return null;

  const nextScan = () => {
    setCurrentIndex((prev) => (prev + 1) % scans.length);
  };

  const prevScan = () => {
    setCurrentIndex((prev) => (prev - 1 + scans.length) % scans.length);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanIcon className="size-4" />
            Recent Scans
            {hasMultiple && (
              <Badge variant="secondary" className="text-xs">
                {currentIndex + 1} of {scans.length}
              </Badge>
            )}
          </div>
          {hasMultiple && (
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={prevScan} className="h-6 w-6 p-0">
                <ChevronLeftIcon className="size-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={nextScan} className="h-6 w-6 p-0">
                <ChevronRightIcon className="size-3" />
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Large preview image */}
        <div className="relative group">
          <img
            src={currentScan.image}
            alt={`${currentScan.type} scan`}
            className="w-full h-48 object-cover rounded-lg bg-muted cursor-pointer"
            onClick={() => onScanClick(currentScan)}
            onError={(e) => {
              // Fallback to icon if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden h-48 flex items-center justify-center rounded-lg bg-muted">
            <ScanIcon className="size-8 text-muted-foreground" />
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer"
               onClick={() => onScanClick(currentScan)}>
            <div className="text-center text-white">
              <EyeIcon className="size-6 mx-auto mb-2" />
              <span className="text-sm">View Full Size</span>
            </div>
          </div>
        </div>

        {/* Scan details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{currentScan.type}</Badge>
            <span className="text-xs text-muted-foreground">
              {format(new Date(currentScan.date), "MMM d, yyyy")}
            </span>
          </div>
          
          {currentScan.description && (
            <p className="text-xs text-muted-foreground">
              {currentScan.description}
            </p>
          )}

          {currentScan.findings && currentScan.findings.length > 0 && (
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Key Findings:</span>
              <ul className="space-y-1">
                {currentScan.findings.slice(0, 2).map((finding, index) => (
                  <li key={index} className="text-xs flex items-start gap-2">
                    <div className="size-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    {finding}
                  </li>
                ))}
                {currentScan.findings.length > 2 && (
                  <li className="text-xs text-muted-foreground">
                    +{currentScan.findings.length - 2} more findings...
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Thumbnails for multiple scans */}
        {hasMultiple && (
          <div className="flex gap-2 pt-2">
            {scans.map((scan, index) => (
              <button
                key={scan.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative size-12 rounded overflow-hidden border-2 transition-colors ${
                  index === currentIndex 
                    ? 'border-primary' 
                    : 'border-transparent hover:border-muted-foreground/50'
                }`}
              >
                <img
                  src={scan.image}
                  alt={`${scan.type} scan`}
                  className="size-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden size-full flex items-center justify-center bg-muted">
                  <ScanIcon className="size-3 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
