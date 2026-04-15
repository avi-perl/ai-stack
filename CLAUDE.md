# ai-stack

Monorepo for a FastAPI backend (`apps/api`) and a React/Vite frontend (`apps/ui`), plus Playwright-based e2e tests (`tests/e2e`). Each workspace has its own `CLAUDE.md` with details — this file is for the repo as a whole.

## Layout

```
ai-stack/
├── apps/
│   ├── api/          # FastAPI (uv-managed, Python 3.13)
│   └── ui/           # React 19 + Vite 6 + Tailwind v4 + shadcn (pnpm)
├── tests/e2e/        # Playwright end-to-end tests (uv workspace member)
├── Makefile          # Canonical task runner — prefer over raw pnpm/uv
├── pyproject.toml    # Root: ruff + ty + uv workspace config
├── pnpm-workspace.yaml
└── uv.lock / pnpm-lock.yaml
```

Python uses uv workspaces; members are `apps/*` and `tests/e2e`. **`apps/ui` is excluded from the uv workspace** — it's pnpm-only.

## Tooling

- **Python:** uv, ruff (lint+format), ty (typecheck), pytest
- **JS:** pnpm workspaces, ESLint flat config, `tsc -b`
- **Pre-commit:** ruff + eslint hooks, installed via `make hooks`

## Commands

Run from the repo root. The `Makefile` is the canonical entry point — extend it rather than documenting new ad-hoc `uv run` / `pnpm` incantations.

- `make setup` — one-shot: install deps, git hooks, Playwright browsers (run once after clone)
- `make dev` — run api + ui + storybook in parallel (Ctrl+C stops all)
- `make api` / `make ui` / `make storybook` — run one service
- `make test` — API pytest
- `make e2e` — Playwright tests (requires services running, e.g. via `make dev`)
- `make lint` — ruff check+format-check + eslint
- `make format` — ruff format + autofix
- `make typecheck` — ty (Python) + tsc (UI)
- `make build` — production UI build

Default ports: UI `5173`, API `8000` (override with `UI_PORT` / `API_PORT` env vars).

## Conventions

- **Prefer editing `Makefile`** over duplicating commands into scripts or docs. If a workflow is worth documenting, it's worth a target.
- **Python 3.13, strict ruff ruleset** (`E,F,I,W,UP,B,SIM`). Run `make format` before committing if you don't have the pre-commit hook installed.
- **API talks to UI via CORS** — origins are set in `apps/api/api/settings.py` (`API_CORS_ORIGINS` env var to override). Default allows `http://localhost:5173`.
- **Secrets / env:** API loads `.env` from its own working dir via `pydantic-settings` with `API_` prefix.

## Gotchas

- This repo lives under OneDrive. OneDrive sync has caused `EBUSY` symlink errors during `pnpm install` and occasional file-lock flakiness. Re-running usually works; pausing OneDrive sync for the repo is the durable fix.
- `uv sync --all-packages` is required (not plain `uv sync`) to install all workspace members including `tests/e2e`. `make install` already does this.

## Self-maintenance

Update this file as patterns of development emerge. When you notice a recurring convention, workflow, command, or decision that would help future sessions, add it here. Prefer updating existing sections over appending new ones, and remove guidance that becomes stale. Workspace-specific details belong in `apps/api/CLAUDE.md` or `apps/ui/CLAUDE.md`, not here.
