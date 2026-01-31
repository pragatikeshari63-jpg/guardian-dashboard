import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AgentWorkflowTracker } from "@/components/dashboard/AgentWorkflowTracker";
import { PaperManagementTable } from "@/components/dashboard/PaperManagementTable";
import { LiveThreatFeed } from "@/components/dashboard/LiveThreatFeed";
import { EvidenceVault } from "@/components/dashboard/EvidenceVault";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Agent Workflow Tracker */}
        <AgentWorkflowTracker />

        {/* Main Grid: Paper Table + Live Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PaperManagementTable />
          </div>
          <div className="lg:col-span-1 min-h-[400px]">
            <LiveThreatFeed />
          </div>
        </div>

        {/* Evidence Vault */}
        <EvidenceVault />
      </div>
    </DashboardLayout>
  );
};

export default Index;
