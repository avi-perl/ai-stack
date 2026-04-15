from playwright.sync_api import Page, expect


def test_healthcheck_page_shows_server_online(page: Page, ui_url: str) -> None:
    page.goto(f"{ui_url}/healthcheck")
    expect(page.get_by_text("Server online")).to_be_visible()
