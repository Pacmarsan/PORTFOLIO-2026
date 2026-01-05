import time
from playwright.sync_api import sync_playwright

def verify_contacts():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to app...")
            page.goto("http://localhost:3000", timeout=60000)

            # Wait for splash screen interaction
            print("Waiting for splash screen...")
            page.wait_for_selector("text=Enter Protocol", timeout=30000)
            page.click("text=Enter Protocol")

            # Wait for main content
            page.wait_for_selector("text=PACMARSAN // PORTFOLIO", timeout=10000)

            print("Scrolling to bottom...")
            # Scroll to the bottom to reach contacts
            # Total height is 600vh, so scroll significantly
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

            # Wait for scrolling to settle and illustration to appear
            time.sleep(2)

            print("Taking screenshot...")
            page.screenshot(path="verification/contacts_section.png")
            print("Screenshot saved to verification/contacts_section.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_contacts()
