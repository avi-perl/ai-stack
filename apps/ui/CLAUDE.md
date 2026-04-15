# apps/ui

Frontend for ai-stack. Talks to the Python/FastAPI backend over HTTP.

## Stack

- **Build:** Vite 6
- **Framework:** React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`, no `tailwind.config.js` — theme lives in `src/index.css` under `@theme inline`)
- **Components:** shadcn/ui (new-york style, neutral base, CSS variables). Components are copied into `src/components/ui/`, not imported from a package — edit them directly.
- **Icons:** lucide-react
- **Stories:** Storybook 10 with `@storybook/react-vite`
- **Path alias:** `@/*` → `src/*`

## Layout

```
apps/ui/
├── .storybook/           # main.ts, preview.ts (preview imports ../src/index.css)
├── src/
│   ├── components/ui/    # shadcn components + colocated *.stories.tsx
│   ├── lib/utils.ts      # cn() helper
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css         # Tailwind v4 import + shadcn CSS variables
├── components.json       # shadcn config
└── vite.config.ts        # also defines a Vitest browser-mode project for Storybook tests
```

`src/stories/` contains Storybook's init demo files (Button, Header, Page). They are unrelated to real components and can be deleted.

## Commands

Run from repo root (or `apps/ui/`):

- `pnpm dev` — Vite dev server with HMR on http://localhost:5173
- `pnpm build` — type-check then build to `dist/`
- `pnpm storybook` — Storybook on http://localhost:6006
- `pnpm build-storybook` — static Storybook build

Add a shadcn component:
```
pnpm --filter ui dlx shadcn@latest add <name>
```
(e.g. `card`, `dialog`, `input`, `dropdown-menu`)

## Conventions

- **Colocate stories** with components: `button.tsx` and `button.stories.tsx` live next to each other under `src/components/ui/`. Do not put new stories in `src/stories/`.
- **Edit shadcn components freely** — they live in your repo, not in `node_modules`. Customize directly rather than wrapping.
- **Theming** is via CSS variables in `src/index.css` (`:root` for light, `.dark` for dark). Tailwind utilities like `bg-background` and `text-foreground` map to those variables through the `@theme inline` block.
- **Storybook global styles:** `.storybook/preview.ts` imports `../src/index.css` so Tailwind/shadcn theming applies inside stories. If a new story renders unstyled, that import is the first thing to check.

## Gotchas

- This folder is under OneDrive. `pnpm install` has occasionally hit `EBUSY` symlink errors on first run because OneDrive is syncing. Re-running `pnpm install` resolves it; pausing OneDrive sync for the repo is the durable fix.
- Storybook init pulled in Playwright + `@vitest/browser-playwright` for `addon-vitest`'s browser-mode component testing. If browser-based component tests aren't wanted, those deps and the `test.projects` block in `vite.config.ts` can be removed.
