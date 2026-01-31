import { 
  Fingerprint, 
  FileKey, 
  Clock, 
  ScanText, 
  Brain, 
  UserX, 
  MapPin, 
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

type AgentStatus = "idle" | "running" | "alert";

interface Agent {
  id: number;
  name: string;
  shortName: string;
  icon: typeof Fingerprint;
  status: AgentStatus;
  lastActivity?: string;
}

const agents: Agent[] = [
  { id: 1, name: "Watermarking Agent", shortName: "Watermark", icon: Fingerprint, status: "running", lastActivity: "2 min ago" },
  { id: 2, name: "Decoy/Honeytoken Agent", shortName: "Honeytoken", icon: FileKey, status: "running", lastActivity: "5 min ago" },
  { id: 3, name: "Time-Lock Agent", shortName: "Time-Lock", icon: Clock, status: "idle", lastActivity: "12 min ago" },
  { id: 4, name: "OCR Scanner Agent", shortName: "OCR", icon: ScanText, status: "running", lastActivity: "1 min ago" },
  { id: 5, name: "NLP Matching Agent", shortName: "NLP", icon: Brain, status: "alert", lastActivity: "Just now" },
  { id: 6, name: "Behavior Anomaly Agent", shortName: "Anomaly", icon: UserX, status: "running", lastActivity: "3 min ago" },
  { id: 7, name: "Source Tracing Agent", shortName: "Tracing", icon: MapPin, status: "alert", lastActivity: "Just now" },
  { id: 8, name: "Alert & Evidence Agent", shortName: "Evidence", icon: AlertCircle, status: "running", lastActivity: "30 sec ago" },
];

const statusStyles = {
  idle: {
    badge: "status-badge status-idle",
    card: "border-border",
    icon: "text-muted-foreground",
    glow: "",
  },
  running: {
    badge: "status-badge status-running",
    card: "border-primary/30",
    icon: "text-primary",
    glow: "cyber-glow-subtle",
  },
  alert: {
    badge: "status-badge status-alert",
    card: "border-destructive/50",
    icon: "text-destructive",
    glow: "threat-glow",
  },
};

export function AgentWorkflowTracker() {
  return (
    <div className="cyber-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Agent Workflow Pipeline</h2>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground" />
            <span className="text-muted-foreground">Idle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Running</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Alert</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {agents.map((agent, index) => {
          const styles = statusStyles[agent.status];
          const Icon = agent.icon;

          return (
            <div key={agent.id} className="flex items-center shrink-0">
              <div 
                className={cn(
                  "flex flex-col items-center p-4 rounded-lg border bg-card/50 min-w-[120px] transition-all duration-300 hover:bg-card",
                  styles.card,
                  styles.glow
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                  agent.status === "idle" ? "bg-muted" : agent.status === "running" ? "bg-primary/20" : "bg-destructive/20"
                )}>
                  <Icon className={cn("w-5 h-5", styles.icon)} />
                </div>
                <span className="text-xs font-medium text-foreground text-center mb-2">
                  {agent.shortName}
                </span>
                <span className={styles.badge}>
                  {agent.status === "idle" && "Idle"}
                  {agent.status === "running" && "Running"}
                  {agent.status === "alert" && "Alert"}
                </span>
                <span className="text-[10px] text-muted-foreground mt-2 font-mono">
                  {agent.lastActivity}
                </span>
              </div>
              
              {index < agents.length - 1 && (
                <ArrowRight className="w-5 h-5 text-border mx-1 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
