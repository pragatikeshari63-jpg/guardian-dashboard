import { useState } from "react";
import { FileWarning, ExternalLink, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TracingDetailModal } from "./TracingDetailModal";

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

const evidenceData: LeakEvidence[] = [
  {
    id: "EVD-001",
    paperId: "PHY-2024-002",
    sourceCenter: "Center B - Mumbai",
    similarityScore: 92,
    detectedAt: "2024-03-15 14:32",
    platform: "Telegram",
    thumbnailPlaceholder: "PHY",
    originalText: "The acceleration due to gravity on Earth's surface is approximately 9.8 m/s². Calculate the time taken for a freely falling object to reach the ground from a height of 45 meters.",
    leakedText: "The acceleration due to gravity on the Earth surface is approximately 9.8 m/s2. Calculate the time taken by a freely falling object to reach the ground from height of 45 meters.",
    versionId: "v3.2.1-β-B-Mumbai",
    mappingPath: ["Document Server", "Center B Gateway", "Admin Terminal B-7", "USB Device #4521", "External Upload"],
  },
  {
    id: "EVD-002",
    paperId: "MATH-2024-001",
    sourceCenter: "Center A - Delhi",
    similarityScore: 87,
    detectedAt: "2024-03-15 13:45",
    platform: "WhatsApp",
    thumbnailPlaceholder: "MATH",
    originalText: "Solve the quadratic equation: 2x² + 5x - 3 = 0 using the quadratic formula. Show all steps.",
    leakedText: "Solve the quadratic equation 2x^2 + 5x - 3 = 0 by using quadratic formula. Show all the steps.",
    versionId: "v3.2.1-α-A-Delhi",
    mappingPath: ["Document Server", "Center A Gateway", "Print Station A-3", "Camera Capture", "WhatsApp Forward"],
  },
  {
    id: "EVD-003",
    paperId: "CHEM-2024-003",
    sourceCenter: "Center C - Bangalore",
    similarityScore: 95,
    detectedAt: "2024-03-15 12:18",
    platform: "Twitter",
    thumbnailPlaceholder: "CHEM",
    originalText: "Balance the following redox reaction in acidic medium: MnO4⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺",
    leakedText: "Balance the following redox reaction in acidic medium: MnO4- + Fe2+ → Mn2+ + Fe3+",
    versionId: "v3.2.1-γ-C-Bangalore",
    mappingPath: ["Document Server", "Center C Gateway", "Exam Coordinator PC", "Email Attachment", "Twitter Post"],
  },
  {
    id: "EVD-004",
    paperId: "ENG-2024-005",
    sourceCenter: "Center E - Kolkata",
    similarityScore: 78,
    detectedAt: "2024-03-15 11:02",
    platform: "Facebook",
    thumbnailPlaceholder: "ENG",
    originalText: "Write an essay on the importance of renewable energy sources in combating climate change.",
    leakedText: "Write essay on importance of renewable energy source in combating climate changes.",
    versionId: "v3.2.1-ε-E-Kolkata",
    mappingPath: ["Document Server", "Center E Gateway", "Staff Laptop E-12", "Screenshot", "Facebook Group"],
  },
];

function getSeverityColor(score: number): string {
  if (score >= 90) return "text-destructive";
  if (score >= 80) return "text-warning";
  return "text-muted-foreground";
}

function getSeverityBg(score: number): string {
  if (score >= 90) return "bg-destructive/20";
  if (score >= 80) return "bg-warning/20";
  return "bg-muted";
}

export function EvidenceVault() {
  const [selectedEvidence, setSelectedEvidence] = useState<LeakEvidence | null>(null);

  return (
    <>
      <div className="cyber-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileWarning className="w-5 h-5 text-destructive" />
            <h2 className="text-lg font-semibold text-foreground">Evidence Vault</h2>
          </div>
          <Badge variant="destructive" className="font-mono">
            {evidenceData.length} Confirmed Leaks
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {evidenceData.map((evidence) => (
            <div
              key={evidence.id}
              className="cyber-card-hover p-4 cursor-pointer group"
              onClick={() => setSelectedEvidence(evidence)}
            >
              <div className="flex gap-4">
                {/* Thumbnail Placeholder */}
                <div className="w-20 h-20 rounded-lg bg-muted/50 border border-border flex items-center justify-center shrink-0 overflow-hidden">
                  <div className="text-center">
                    <span className="text-xs font-mono text-muted-foreground block">
                      {evidence.thumbnailPlaceholder}
                    </span>
                    <span className="text-[10px] text-muted-foreground">LEAKED</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {evidence.paperId}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {evidence.sourceCenter}
                      </p>
                    </div>
                    <div className={cn(
                      "px-2 py-1 rounded text-sm font-bold font-mono",
                      getSeverityBg(evidence.similarityScore),
                      getSeverityColor(evidence.similarityScore)
                    )}>
                      {evidence.similarityScore}%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span className="font-mono">{evidence.detectedAt}</span>
                    <span>•</span>
                    <span>{evidence.platform}</span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs gap-1.5 text-primary hover:text-primary group-hover:bg-primary/10"
                  >
                    <Eye className="w-3 h-3" />
                    View Details
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TracingDetailModal
        evidence={selectedEvidence}
        open={!!selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
      />
    </>
  );
}
