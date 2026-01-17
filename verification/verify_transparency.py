from playwright.sync_api import sync_playwright, expect
import time

def verify_transparency(page):
    print("Navigating to page...")
    page.goto("http://localhost:3000")

    # Wait for Enter Protocol button
    print("Waiting for Enter Protocol button...")
    enter_button = page.get_by_role("button", name="Enter Protocol")
    expect(enter_button).to_be_visible(timeout=15000)
    print("Clicking Enter Protocol...")
    enter_button.click()

    # Wait for the main content to appear.
    # The text "WHO I AM" should appear in the terminal.
    print("Waiting for 'WHO I AM'...")
    # Using a selector that targets the text within the terminal
    expect(page.get_by_text("WHO I AM")).to_be_visible(timeout=15000)

    # Give it a moment for the transition to finish
    print("Waiting for animations...")
    time.sleep(3)

    # Take a screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification/transparency_check.png")
    print("Screenshot saved.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to ensure desktop view
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        try:
            verify_transparency(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_state.png")
        finally:
            browser.close()
