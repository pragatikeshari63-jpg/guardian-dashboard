import { useEffect, useState } from "react";
import { AlertTriangle, Info, AlertCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type ThreatLevel = "critical" | "warning" | "info" | "safe";

interface ThreatEvent {
  id: string;
  timestamp: string;
  message: string;
  level: ThreatLevel;
  source: string;
}

const initialEvents: ThreatEvent[] = [
  {
    id: "1",
    timestamp: "14:32:15",
    message: "Decoy paper PHY-2024-002-D detected on Telegram channel",
    level: "critical",
    source: "Honeytoken Agent",
  },
  {
    id: "2",
    timestamp: "14:31:42",
    message: "Unauthorized early access attempt at Center B - Mumbai",
    level: "critical",
    source: "Time-Lock Agent",
  },
  {
    id: "3",
    timestamp: "14:30:18",
    message: "High-similarity match (92%) found on WhatsApp forward",
    level: "warning",
    source: "NLP Matching Agent",
  },
  {
    id: "4",
    timestamp: "14:28:55",
    message: "Unusual access pattern detected: User ID 4521",
    level: "warning",
    source: "Behavior Anomaly Agent",
  },
  {
    id: "5",
    timestamp: "14:25:33",
    message: "OCR scan complete for 156 images from monitoring channels",
    level: "info",
    source: "OCR Scanner Agent",
  },
  {
    id: "6",
    timestamp: "14:22:10",
    message: "New watermark version v3.2.1-ζ deployed successfully",
    level: "safe",
    source: "Watermarking Agent",
  },
  {
    id: "7",
    timestamp: "14:20:45",
    message: "Source traced: Leak originated from Center C workstation",
    level: "critical",
    source: "Source Tracing Agent",
  },
];

const levelConfig = {
  critical: {
    icon: AlertTriangle,
    className: "border-l-destructive text-destructive",
    bgClass: "bg-destructive/5",
  },
  warning: {
    icon: AlertCircle,
    className: "border-l-warning text-warning",
    bgClass: "bg-warning/5",
  },
  info: {
    icon: Info,
    className: "border-l-primary text-primary",
    bgClass: "bg-primary/5",
  },
  safe: {
    icon: Shield,
    className: "border-l-success text-success",
    bgClass: "bg-success/5",
  },
};

export function LiveThreatFeed() {
  const [events, setEvents] = useState<ThreatEvent[]>(initialEvents);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newEvent: ThreatEvent = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString("en-US", { 
          hour12: false, 
          hour: "2-digit", 
          minute: "2-digit", 
          second: "2-digit" 
        }),
        message: getRandomMessage(),
        level: getRandomLevel(),
        source: getRandomSource(),
      };
      setEvents((prev) => [newEvent, ...prev.slice(0, 19)]);
    }, 8000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="cyber-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Live Threat Feed</h2>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isLive ? "bg-success animate-pulse" : "bg-muted-foreground"
          )} />
          <span className="text-xs text-muted-foreground font-mono">
            {isLive ? "LIVE" : "PAUSED"}
          </span>
        </div>
      </div>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-2">
          {events.map((event, index) => {
            const config = levelConfig[event.level];
            const Icon = config.icon;

            return (
              <div
                key={event.id}
                className={cn(
                  "p-3 rounded-lg border-l-2 transition-all duration-300",
                  config.className,
                  config.bgClass,
                  index === 0 && "animate-slide-in-right"
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-tight">
                      {event.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {event.timestamp}
                      </span>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <span className="text-[10px] text-muted-foreground truncate">
                        {event.source}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

function getRandomMessage(): string {
  const messages = [
    "Suspicious activity detected on monitoring network",
    "New image scan queued from social media crawl",
    "Behavioral pattern analysis complete",
    "Watermark integrity verified for batch B-23",
    "Access attempt logged from unauthorized IP",
    "Decoy document triggered alert sequence",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomLevel(): ThreatLevel {
  const levels: ThreatLevel[] = ["critical", "warning", "info", "safe"];
  const weights = [0.15, 0.25, 0.4, 0.2];
  const random = Math.random();
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random < sum) return levels[i];
  }
  return "info";
}

function getRandomSource(): string {
  const sources = [
    "OCR Scanner Agent",
    "NLP Matching Agent",
    "Behavior Anomaly Agent",
    "Watermarking Agent",
    "Source Tracing Agent",
  ];
  return sources[Math.floor(Math.random() * sources.length)];
}
