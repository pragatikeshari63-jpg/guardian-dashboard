import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Eye } from "lucide-react";

const LiveMonitoring = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 cyber-glow">
          <Eye className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Live Monitoring</h1>
        <p className="text-muted-foreground max-w-md">
          Active surveillance of social media channels, messaging platforms, and dark web sources for potential leaks.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default LiveMonitoring;
