import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Activity } from "lucide-react";

const AgentStatus = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 cyber-glow">
          <Activity className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Agent Status</h1>
        <p className="text-muted-foreground max-w-md">
          Real-time monitoring of all 8 security agents. View detailed logs, performance metrics, and health status.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default AgentStatus;
