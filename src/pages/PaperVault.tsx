import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Shield } from "lucide-react";

const PaperVault = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 cyber-glow">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Paper Vault</h1>
        <p className="text-muted-foreground max-w-md">
          Secure document storage and management. Access controlled examination papers with full audit trails.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default PaperVault;
