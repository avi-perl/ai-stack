import { Link } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { ServerStatusIndicator } from "@/components/server-status-indicator";
import { useServerHealth } from "@/hooks/use-server-health";

export default function HomePage() {
  const { status, refresh } = useServerHealth();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-foreground">
      <h1 className="text-4xl font-bold tracking-tight">Hello, world</h1>
      <p className="text-muted-foreground">
        Vite + React + Tailwind + shadcn/ui
      </p>
      <ServerStatusIndicator status={status} />
      <div className="flex gap-3">
        <Button variant="outline" onClick={refresh}>
          Re-check
        </Button>
        <Link to="/healthcheck" className={buttonVariants({ variant: "ghost" })}>
          Healthcheck page
        </Link>
      </div>
    </main>
  );
}
