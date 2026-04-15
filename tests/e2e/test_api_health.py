import httpx


def test_api_health_returns_ok(api_url: str) -> None:
    response = httpx.get(f"{api_url}/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
