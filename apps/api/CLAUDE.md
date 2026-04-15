# apps/api

FastAPI backend for ai-stack. Serves the React UI (`apps/ui`) over HTTP with CORS.

## Stack

- **Framework:** FastAPI (>=0.115)
- **Server:** uvicorn (with `--reload` in dev)
- **Config:** `pydantic-settings` — env-driven, `API_` prefix, loads `.env` from CWD
- **Python:** 3.13, managed by uv (workspace member of the repo root)
- **Tests:** pytest + httpx `TestClient`

## Layout

```
apps/api/
├── api/
│   ├── __init__.py
│   ├── main.py       # FastAPI app, CORS middleware, /health
│   └── settings.py   # Settings(BaseSettings) — single source of config
├── tests/
│   ├── test_health.py
│   └── test_settings.py
└── pyproject.toml    # package=false; pytest testpaths=["tests"]
```

The package is named `api` (not `apps.api`). Imports look like `from api.settings import settings`.

## Commands

Run from repo root (uses the Makefile) or from `apps/api/`:

- `make api` — dev server with reload on `127.0.0.1:8000` (override via `API_HOST` / `API_PORT`)
- `make test` — pytest for this package
- `uv run --directory apps/api pytest tests/test_health.py -k health` — run a subset

Tests are **not** discovered from the repo root — `pyproject.toml` pins `testpaths = ["tests"]` and uv runs from `apps/api`.

## Conventions

- **Config goes through `Settings`**, never `os.environ` directly. Add new fields to `api/settings.py` with a default; override via `API_<FIELD>` env vars or a `.env` file in the API working directory.
- **List/dict env values** are parsed as JSON by pydantic-settings. Example: `API_CORS_ORIGINS='["https://a.com","https://b.com"]'`.
- **Test isolation from the developer's `.env`:** settings tests must `monkeypatch.chdir(tmp_path)` and delete `API_*` env vars before instantiating `Settings()`. See `tests/test_settings.py::_isolate` — reuse this helper for any new settings test, otherwise local `.env` files leak in and flake CI.
- **CORS origins** default to `http://localhost:5173` (Vite dev). When adding a new frontend origin, update the `Settings.cors_origins` default or set `API_CORS_ORIGINS` — do not hardcode origins in `main.py`.
- **Type hints on every public function**, including return types. ty runs in `make typecheck`.

## Adding an endpoint

1. Define the route in `api/main.py` (or a new module imported from `main.py` once the file grows).
2. Use Pydantic models for request/response bodies — FastAPI will handle validation and OpenAPI docs automatically.
3. Add a test in `tests/` using FastAPI's `TestClient` (see `test_health.py` for the pattern).
4. If the endpoint needs new config, add it to `Settings` with a sensible default.

## Gotchas

- The app module path is `api.main:app`, not `apps.api.main:app` — uvicorn must be run with `--directory apps/api` (the Makefile handles this).
- `pydantic-settings` silently accepts unknown env vars because `extra="ignore"` — if a setting isn't taking effect, check the env var name matches `API_<FIELD>` exactly.
