from playwright.sync_api import sync_playwright, expect
import time

def verify_ominous_cover():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Navigate to app
        page.goto("http://localhost:3000")

        # Wait for "Enter Protocol" button and click it
        enter_button = page.get_by_text("Enter Protocol")
        if enter_button.is_visible():
            enter_button.click()

        # Wait for main content to load
        page.wait_for_timeout(2000)

        # Scroll to WORLDS phase (approx 20% down)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.20)")
        page.wait_for_timeout(2000)

        # Open Worlds Archive
        # Trying the same selector logic as verify_synopsis.py
        illustration = page.locator('[data-testid="hero-illustration-interactive"]')
        if illustration.count() > 0:
            illustration.click()
        else:
            # If testid not found, maybe just try clicking center-left area where svg usually is
            # or try finding text "WORLDS" if visible
            page.mouse.click(300, 300)

        page.wait_for_timeout(1500)

        # Find and click "OMINOUS — CHAPTER 1 (PART 1)"
        book_name = "OMINOUS — CHAPTER 1 (PART 1)"
        page.get_by_text(book_name, exact=True).click()
        page.wait_for_timeout(1000)

        # Verify title is visible
        expect(page.get_by_role("heading", name=book_name)).to_be_visible()

        # Take screenshot to verify cover
        page.screenshot(path="verification/ominous_chapter1_cover_check.png")
        print("Screenshot captured: verification/ominous_chapter1_cover_check.png")

        browser.close()

if __name__ == "__main__":
    verify_ominous_cover()
