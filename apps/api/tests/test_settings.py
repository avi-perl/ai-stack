import os

from api.settings import Settings


def _isolate(monkeypatch, tmp_path):
    monkeypatch.chdir(tmp_path)
    for key in list(os.environ):
        if key.startswith("API_"):
            monkeypatch.delenv(key)


def test_defaults(monkeypatch, tmp_path):
    _isolate(monkeypatch, tmp_path)
    s = Settings()
    assert s.app_title == "ai-stack api"
    assert s.cors_origins == ["http://localhost:5173"]


def test_env_overrides(monkeypatch, tmp_path):
    _isolate(monkeypatch, tmp_path)
    monkeypatch.setenv("API_APP_TITLE", "override")
    monkeypatch.setenv(
        "API_CORS_ORIGINS", '["https://example.com","https://other.com"]'
    )
    s = Settings()
    assert s.app_title == "override"
    assert s.cors_origins == ["https://example.com", "https://other.com"]
