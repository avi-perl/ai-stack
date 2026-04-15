import os

import pytest


@pytest.fixture(scope="session")
def ui_url() -> str:
    return os.environ.get("UI_URL", "http://localhost:5173")


@pytest.fixture(scope="session")
def api_url() -> str:
    return os.environ.get("API_URL", "http://localhost:8000")
