import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

type ApiStatus = "checking" | "online" | "offline";

export default function App() {
  const [status, setStatus] = useState<ApiStatus>("checking");

  async function checkHealth() {
    setStatus("checking");
    try {
      const res = await fetch(`${API_URL}/health`);
      const body = (await res.json()) as { status?: string };
      setStatus(res.ok && body.status === "ok" ? "online" : "offline");
    } catch {
      setStatus("offline");
    }
  }

  useEffect(() => {
    checkHealth();
  }, []);

  const label = {
    checking: "Checking…",
    online: "API is running",
    offline: "API is not reachable",
  }[status];

  const dotClass = {
    checking: "bg-muted-foreground animate-pulse",
    online: "bg-emerald-500",
    offline: "bg-destructive",
  }[status];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-foreground">
      <h1 className="text-4xl font-bold tracking-tight">Hello, world</h1>
      <p className="text-muted-foreground">
        Vite + React + Tailwind + shadcn/ui
      </p>
      <div className="flex items-center gap-3 rounded-lg border px-4 py-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <Button variant="outline" onClick={checkHealth}>
        Re-check
      </Button>
    </main>
  );
}
