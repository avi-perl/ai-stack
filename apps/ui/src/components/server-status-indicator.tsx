import { cn } from "@/lib/utils";
import type { ServerHealthStatus } from "@/hooks/use-server-health";

const LABELS: Record<ServerHealthStatus, string> = {
  checking: "Checking…",
  online: "Server online",
  offline: "Server offline",
};

const DOT_CLASSES: Record<ServerHealthStatus, string> = {
  checking: "bg-muted-foreground animate-pulse",
  online: "bg-emerald-500",
  offline: "bg-destructive",
};

export interface ServerStatusIndicatorProps {
  status: ServerHealthStatus;
  className?: string;
}

export function ServerStatusIndicator({
  status,
  className,
}: ServerStatusIndicatorProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-2 w-2 rounded-full", DOT_CLASSES[status])}
      />
      <span className="font-medium">{LABELS[status]}</span>
    </div>
  );
}
