import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FileWarning } from "lucide-react";

const EvidenceReports = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center mb-4 threat-glow">
          <FileWarning className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Evidence Reports</h1>
        <p className="text-muted-foreground max-w-md">
          Comprehensive incident reports with forensic evidence, chain of custody documentation, and legal-ready exports.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default EvidenceReports;
