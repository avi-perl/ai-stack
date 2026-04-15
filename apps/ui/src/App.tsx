import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-foreground">
      <h1 className="text-4xl font-bold tracking-tight">Hello, world</h1>
      <p className="text-muted-foreground">
        Vite + React + Tailwind + shadcn/ui
      </p>
      <Button onClick={() => alert("hi")}>Click me</Button>
    </main>
  );
}
