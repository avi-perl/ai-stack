.DEFAULT_GOAL := help

UI_PORT ?= 5173
API_PORT ?= 8000
API_HOST ?= 127.0.0.1

.PHONY: help install ui api dev test storybook build build-storybook clean

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install all dependencies (pnpm + uv)
	pnpm install
	uv sync --all-packages

ui: ## Run the UI dev server
	pnpm --filter ui dev

api: ## Run the API dev server (with reload)
	uv run --directory apps/api uvicorn api.main:app --reload --host $(API_HOST) --port $(API_PORT)

dev: ## Run api + ui + storybook in parallel (Ctrl+C stops all)
	@$(MAKE) -j 3 api ui storybook

test: ## Run API tests
	uv run --directory apps/api pytest

storybook: ## Run Storybook
	pnpm --filter ui storybook

build: ## Build the UI for production
	pnpm --filter ui build

build-storybook: ## Build static Storybook
	pnpm --filter ui build-storybook

clean: ## Remove build artifacts (not node_modules / .venv)
	rm -rf apps/ui/dist apps/ui/storybook-static apps/ui/coverage
