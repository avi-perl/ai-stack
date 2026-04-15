import { useCallback, useEffect, useState } from "react";

export type ServerHealthStatus = "checking" | "online" | "offline";

const DEFAULT_API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export function useServerHealth(apiUrl: string = DEFAULT_API_URL) {
  const [status, setStatus] = useState<ServerHealthStatus>("checking");

  const check = useCallback(async () => {
    setStatus("checking");
    try {
      const res = await fetch(`${apiUrl}/health`);
      const body = (await res.json()) as { status?: string };
      setStatus(res.ok && body.status === "ok" ? "online" : "offline");
    } catch {
      setStatus("offline");
    }
  }, [apiUrl]);

  useEffect(() => {
    check();
  }, [check]);

  return { status, refresh: check };
}
