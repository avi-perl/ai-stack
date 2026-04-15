import { ServerStatusIndicator } from "@/components/server-status-indicator";
import { useServerHealth } from "@/hooks/use-server-health";

export default function HealthcheckPage() {
  const { status } = useServerHealth();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <ServerStatusIndicator status={status} />
    </main>
  );
}
