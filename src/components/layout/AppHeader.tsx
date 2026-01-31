import { AlertTriangle, Shield, Activity, Wifi, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SystemStatus {
  database: "online" | "degraded" | "offline";
  agents: "online" | "degraded" | "offline";
  network: "online" | "degraded" | "offline";
}

const systemStatus: SystemStatus = {
  database: "online",
  agents: "online",
  network: "online",
};

const statusConfig = {
  online: { color: "bg-success", label: "Online" },
  degraded: { color: "bg-warning", label: "Degraded" },
  offline: { color: "bg-destructive", label: "Offline" },
};

export function AppHeader() {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-semibold text-foreground">
          Leak Prevention Command Center
        </h1>
        <div className="flex items-center gap-4">
          <StatusIndicator 
            icon={Shield} 
            label="Database" 
            status={systemStatus.database} 
          />
          <StatusIndicator 
            icon={Activity} 
            label="Agents" 
            status={systemStatus.agents} 
          />
          <StatusIndicator 
            icon={Wifi} 
            label="Network" 
            status={systemStatus.network} 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>3 unread alerts</TooltipContent>
        </Tooltip>

        <Button 
          variant="destructive" 
          className="gap-2 font-semibold threat-pulse"
        >
          <AlertTriangle className="w-4 h-4" />
          PANIC MODE
        </Button>
      </div>
    </header>
  );
}

function StatusIndicator({ 
  icon: Icon, 
  label, 
  status 
}: { 
  icon: typeof Shield; 
  label: string; 
  status: keyof typeof statusConfig;
}) {
  const config = statusConfig[status];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 text-sm">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <div className={`w-2 h-2 rounded-full ${config.color}`} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {label}: {config.label}
      </TooltipContent>
    </Tooltip>
  );
}
