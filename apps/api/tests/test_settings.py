from api.settings import Settings


def test_defaults():
    s = Settings(_env_file=None)
    assert s.app_title == "ai-stack api"
    assert s.cors_origins == ["http://localhost:5173"]


def test_env_overrides(monkeypatch):
    monkeypatch.setenv("API_APP_TITLE", "override")
    monkeypatch.setenv(
        "API_CORS_ORIGINS", '["https://example.com","https://other.com"]'
    )
    s = Settings(_env_file=None)
    assert s.app_title == "override"
    assert s.cors_origins == ["https://example.com", "https://other.com"]
