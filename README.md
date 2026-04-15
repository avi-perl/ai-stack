# ai-stack

This repo is my attempt to set up a starter app using opinionated defaults I like and standard well documented
frameworks so that I can use Claude to write apps. 

## Setup

```
make setup   # install deps, git hooks, Playwright browsers
make dev     # api + ui + storybook in parallel
```

UI on `:5173`, API on `:8000`, Storybook on `:6006`.

Other targets: `make test`, `make e2e`, `make lint`, `make format`, `make typecheck`, `make build`. `make` on its own
lists them.

## Stack

**Backend — `apps/api`**

- FastAPI + uvicorn
- `pydantic-settings` for config (env-driven)
- pytest + httpx `TestClient`
- Python 3.13, managed by uv

**Frontend — `apps/ui`**

- React 19 + TypeScript (strict)
- Vite 6
- Tailwind CSS v4 (no config file — theme in `src/index.css`)
- shadcn/ui (new-york, neutral, copied into the repo)
- Storybook 10

**Repo**

- Monorepo: uv workspaces for Python, pnpm workspaces for JS
- Ruff (lint + format) and ty (typecheck) for Python
- ESLint flat config + `tsc -b` for TS
- Pre-commit hooks for both
- Playwright e2e tests in `tests/e2e`
- `Makefile` as the canonical task runner — one command to rule them all

## Layout

```
ai-stack/
├── apps/
│   ├── api/    # FastAPI backend
│   └── ui/     # React frontend
├── tests/e2e/  # Playwright
└── Makefile
```

Per-workspace details live in `apps/api/CLAUDE.md` and `apps/ui/CLAUDE.md`.
