from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to verify desktop layout
        page = browser.new_page(viewport={"width": 1920, "height": 1080})

        print("Navigating to app...")
        page.goto("http://localhost:3000")

        # Wait for splash screen "Enter Protocol" button
        print("Waiting for Enter Protocol...")
        enter_btn = page.get_by_role("button", name="Enter Protocol")
        enter_btn.click()

        # Wait for main UI to load
        print("Waiting for HUD...")
        expect(page.get_by_text("SYSTEM:")).to_be_visible()

        # Scroll to Contacts section (approx 90%)
        print("Scrolling to Contacts phase...")
        page.evaluate("window.scrollTo(0, document.documentElement.scrollHeight * 0.9)")
        time.sleep(2) # Wait for scroll handler

        # Expand Contacts phase
        print("Expanding Contacts phase...")
        illustration = page.locator('[data-testid="hero-illustration-interactive"]')
        expect(illustration).to_be_visible()
        illustration.click()

        # Wait for ContactsArchive content
        print("Waiting for content...")
        # Use .first to avoid strict mode violation if multiple exist (mobile/desktop hidden/shown)
        expect(page.get_by_text("Email Me").first).to_be_visible()

        # Wait for animations to settle
        time.sleep(2)

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/contacts_desktop.png")

        browser.close()
        print("Done.")

if __name__ == "__main__":
    run()
