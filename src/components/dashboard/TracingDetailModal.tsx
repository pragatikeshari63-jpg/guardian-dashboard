import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  ArrowRight, 
  MapPin, 
  AlertTriangle,
  Server,
  Monitor,
  Usb,
  Upload,
  Camera,
  Mail,
  Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LeakEvidence {
  id: string;
  paperId: string;
  sourceCenter: string;
  similarityScore: number;
  detectedAt: string;
  platform: string;
  thumbnailPlaceholder: string;
  originalText: string;
  leakedText: string;
  versionId: string;
  mappingPath: string[];
}

interface TracingDetailModalProps {
  evidence: LeakEvidence | null;
  open: boolean;
  onClose: () => void;
}

const pathIcons: Record<string, typeof Server> = {
  "Document Server": Server,
  "Gateway": Monitor,
  "Terminal": Monitor,
  "USB": Usb,
  "Upload": Upload,
  "Camera": Camera,
  "Email": Mail,
  "Screenshot": Camera,
  "default": Smartphone,
};

function getPathIcon(step: string) {
  for (const [key, Icon] of Object.entries(pathIcons)) {
    if (step.toLowerCase().includes(key.toLowerCase())) {
      return Icon;
    }
  }
  return pathIcons.default;
}

export function TracingDetailModal({ evidence, open, onClose }: TracingDetailModalProps) {
  if (!evidence) return null;

  const highlightDifferences = (original: string, leaked: string) => {
    // Simple word-level diff visualization
    const originalWords = original.split(' ');
    const leakedWords = leaked.split(' ');
    
    return {
      original: originalWords,
      leaked: leakedWords,
    };
  };

  const diff = highlightDifferences(evidence.originalText, evidence.leakedText);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <DialogTitle className="text-xl text-foreground">
                Leak Tracing Report
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Evidence ID: {evidence.id} • Paper: {evidence.paperId}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Header Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="cyber-card p-4">
              <span className="text-xs text-muted-foreground block mb-1">Similarity Score</span>
              <span className={cn(
                "text-2xl font-bold font-mono",
                evidence.similarityScore >= 90 ? "text-destructive" : "text-warning"
              )}>
                {evidence.similarityScore}%
              </span>
            </div>
            <div className="cyber-card p-4">
              <span className="text-xs text-muted-foreground block mb-1">Source Center</span>
              <span className="text-lg font-semibold text-foreground">
                {evidence.sourceCenter}
              </span>
            </div>
            <div className="cyber-card p-4">
              <span className="text-xs text-muted-foreground block mb-1">Version ID</span>
              <span className="text-sm font-mono text-primary">
                {evidence.versionId}
              </span>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Linguistic Watermark Comparison */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Linguistic Watermark Comparison
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="cyber-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-success/20 text-success border-0">Original</Badge>
                </div>
                <p className="text-sm text-foreground leading-relaxed font-mono">
                  {evidence.originalText}
                </p>
              </div>
              
              <div className="cyber-card p-4 border-destructive/30">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-destructive/20 text-destructive border-0">Leaked</Badge>
                </div>
                <p className="text-sm text-foreground leading-relaxed font-mono">
                  {evidence.leakedText}
                </p>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-xs text-warning">
                <strong>Watermark Analysis:</strong> Minor text variations detected including punctuation changes, 
                superscript formatting, and word substitutions consistent with version {evidence.versionId}.
              </p>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Mapping Path */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Leak Mapping Path
            </h3>

            <div className="cyber-card p-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {evidence.mappingPath.map((step, index) => {
                  const Icon = getPathIcon(step);
                  const isLast = index === evidence.mappingPath.length - 1;
                  
                  return (
                    <div key={index} className="flex items-center shrink-0">
                      <div className={cn(
                        "flex flex-col items-center p-3 rounded-lg border min-w-[100px]",
                        isLast 
                          ? "border-destructive/50 bg-destructive/10" 
                          : "border-border bg-muted/30"
                      )}>
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
                          isLast ? "bg-destructive/20" : "bg-primary/20"
                        )}>
                          <Icon className={cn(
                            "w-4 h-4",
                            isLast ? "text-destructive" : "text-primary"
                          )} />
                        </div>
                        <span className="text-[10px] text-center text-foreground leading-tight">
                          {step}
                        </span>
                      </div>
                      
                      {!isLast && (
                        <ArrowRight className="w-4 h-4 text-border mx-2 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Tracing Summary:</strong> Document originated from {evidence.mappingPath[0]}, 
                  passed through {evidence.sourceCenter.split(' - ')[0]} infrastructure, and was exfiltrated via{' '}
                  {evidence.mappingPath[evidence.mappingPath.length - 1].toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
