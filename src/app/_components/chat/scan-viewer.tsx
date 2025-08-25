"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ZoomInIcon, ZoomOutIcon, RotateCwIcon, DownloadIcon, XIcon } from "lucide-react";
import type { MockPatient } from "./mock/eb-patient";

interface ScanViewerProps {
  scan: MockPatient["scans"][0] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScanViewer({ scan, open, onOpenChange }: ScanViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  if (!scan) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(100);
    setRotation(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[50vw] min-w-[50vw] h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <div>
              <span className="text-lg font-semibold">{scan.type} Scan</span>
              <span className="text-sm text-muted-foreground ml-2">
                {format(new Date(scan.date), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOutIcon className="size-4" />
              </Button>
              <span className="text-sm font-mono w-12 text-center">{zoom}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomInIcon className="size-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleRotate}>
                <RotateCwIcon className="size-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex gap-4 min-h-0">
          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center bg-black rounded-lg overflow-hidden">
            <div 
              className="transition-transform duration-200"
              style={{ 
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'center'
              }}
            >
              <img
                src={scan.image}
                alt={`${scan.type} scan`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  (e.target as HTMLImageElement).src = "/icons/xray.png";
                }}
              />
            </div>
          </div>

          {/* Sidebar with scan details */}
          <div className="w-80 flex-shrink-0 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Scan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline">{scan.type}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{format(new Date(scan.date), "MMM d, yyyy")}</span>
                </div>
                {scan.description && (
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Description:</span>
                    <p className="text-sm">{scan.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {scan.findings && scan.findings.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Clinical Findings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {scan.findings.map((finding, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <div className="size-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {finding}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <DownloadIcon className="size-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                <XIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
