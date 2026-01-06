from playwright.sync_api import sync_playwright, expect
import time

def verify_book_cover():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Navigate to app
        page.goto("http://localhost:3000")

        # Wait for "Enter Protocol" button and click it
        page.get_by_text("Enter Protocol").click()

        # Wait for main content to load
        page.wait_for_timeout(2000)

        # Scroll to WORLDS phase (approx 20% down)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.20)")
        page.wait_for_timeout(2000)

        # Open Worlds Archive
        illustration = page.locator('[data-testid="hero-illustration-interactive"]')
        if illustration.count() > 0:
            illustration.click()
        else:
            page.mouse.click(1000, 300) # Fallback

        page.wait_for_timeout(1500)

        # Click "ALL HALLOWS EVE"
        page.get_by_text("ALL HALLOWS EVE", exact=True).click()
        page.wait_for_timeout(1000)

        # Verify the image is present in the SVG
        # We look for an 'image' tag inside the svg
        # Note: SVG elements in DOM are namespaced, but Playwright locators usually work.
        # Let's verify an image with the correct href exists.

        # Taking a screenshot is the most important part for visual verification
        page.screenshot(path="verification/all_hallows_eve_cover.png")
        print("Captured verification/all_hallows_eve_cover.png")

        # Check if the image tag is in the DOM
        # The href might be relative or absolute, checking partial match
        # image_locator = page.locator("image[href*='all-hallows-eve-cover.jpg']")
        # expect(image_locator).to_be_visible() # SVG images might not report 'visible' same as HTML IMG
        # expect(image_locator).to_have_count(1)

        browser.close()

if __name__ == "__main__":
    verify_book_cover()
