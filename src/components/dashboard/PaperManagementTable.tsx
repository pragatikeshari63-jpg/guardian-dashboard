import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Lock, LockOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Paper {
  id: string;
  targetCenter: string;
  watermarkVersion: string;
  accessWindow: {
    start: string;
    end: string;
    status: "locked" | "active" | "expired";
  };
}

const papers: Paper[] = [
  {
    id: "MATH-2024-001",
    targetCenter: "Center A - Delhi",
    watermarkVersion: "v3.2.1-α",
    accessWindow: { start: "09:00", end: "12:00", status: "locked" },
  },
  {
    id: "PHY-2024-002",
    targetCenter: "Center B - Mumbai",
    watermarkVersion: "v3.2.1-β",
    accessWindow: { start: "14:00", end: "17:00", status: "active" },
  },
  {
    id: "CHEM-2024-003",
    targetCenter: "Center C - Bangalore",
    watermarkVersion: "v3.2.1-γ",
    accessWindow: { start: "09:00", end: "12:00", status: "locked" },
  },
  {
    id: "BIO-2024-004",
    targetCenter: "Center D - Chennai",
    watermarkVersion: "v3.2.1-δ",
    accessWindow: { start: "14:00", end: "17:00", status: "expired" },
  },
  {
    id: "ENG-2024-005",
    targetCenter: "Center E - Kolkata",
    watermarkVersion: "v3.2.1-ε",
    accessWindow: { start: "09:00", end: "12:00", status: "locked" },
  },
];

const statusConfig = {
  locked: {
    icon: Lock,
    label: "Locked",
    className: "bg-muted text-muted-foreground",
  },
  active: {
    icon: LockOpen,
    label: "Active",
    className: "bg-success/20 text-success",
  },
  expired: {
    icon: Clock,
    label: "Expired",
    className: "bg-warning/20 text-warning",
  },
};

export function PaperManagementTable() {
  return (
    <div className="cyber-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Paper Management</h2>
        <Badge variant="outline" className="font-mono text-xs">
          {papers.length} Papers
        </Badge>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted/30">
              <TableHead className="text-muted-foreground font-semibold">Paper ID</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Target Center</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Watermark Ver.</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Access Window</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {papers.map((paper) => {
              const status = statusConfig[paper.accessWindow.status];
              const StatusIcon = status.icon;

              return (
                <TableRow 
                  key={paper.id} 
                  className="border-border hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="font-mono text-sm text-primary">
                    {paper.id}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {paper.targetCenter}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {paper.watermarkVersion}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {paper.accessWindow.start} - {paper.accessWindow.end}
                  </TableCell>
                  <TableCell>
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                      status.className
                    )}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
