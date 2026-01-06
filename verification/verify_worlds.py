from playwright.sync_api import sync_playwright, expect
import time

def verify_worlds_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Grant permissions for audio to avoid potential issues (though headless might ignore)
        context = browser.new_context()
        page = context.new_page()

        # Navigate to app
        page.goto("http://localhost:3000")

        # Wait for "Enter Protocol" button and click it
        page.get_by_text("Enter Protocol").click()

        # Wait for main content to load
        page.wait_for_timeout(2000)

        # Scroll to WORLDS phase (approx 20-25% down)
        # Total height is 600vh. WORLDS is 0.16 to 0.30.
        # Let's scroll to 20%
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.20)")

        # Wait for scroll and animation
        page.wait_for_timeout(2000)

        # Verify WORLDS text is visible
        # expect(page.get_by_text("WORLDS", exact=True)).to_be_visible() # This is ambiguous
        expect(page.get_by_role("heading", name="WORLDS")).to_be_visible()

        # Take screenshot of WORLDS phase initial state
        page.screenshot(path="verification/worlds_phase.png")
        print("Captured worlds_phase.png")

        # Click the interactive illustration
        # Assuming the illustration is clickable and has the data-testid I added
        illustration = page.locator('[data-testid="hero-illustration-interactive"]')

        # Ensure it's the one currently visible or just click it (there's only one rendered at a time)
        if illustration.count() > 0:
            illustration.click()
        else:
            print("Interactive illustration not found! Trying generic click on center right.")
            page.mouse.click(1000, 300) # Fallback

        # Wait for expansion animation (0.8s)
        page.wait_for_timeout(1500)

        # Verify Archive Header
        expect(page.get_by_text("ARCHIVE")).to_be_visible()
        expect(page.get_by_text("Released Mangas")).to_be_visible()

        # Take screenshot of Bookshelf
        page.screenshot(path="verification/worlds_bookshelf.png")
        print("Captured worlds_bookshelf.png")

        # Click a book: "ALL HALLOWS EVE"
        page.get_by_text("ALL HALLOWS EVE").click()

        # Wait for detail animation
        page.wait_for_timeout(1000)

        # Verify Detail View
        expect(page.get_by_text("manga / released")).to_be_visible()
        # Synopsis part
        expect(page.get_by_text("On the night when the veil is thinnest")).to_be_visible()

        # Take screenshot of Detail View
        page.screenshot(path="verification/worlds_detail.png")
        print("Captured worlds_detail.png")

        # Close Detail View
        page.get_by_text("Return to Shelf").click()
        page.wait_for_timeout(1000)

        # Verify back to shelf
        expect(page.get_by_text("Released Mangas")).to_be_visible()

        # Close Archive
        page.get_by_label("Close Archive").click()
        page.wait_for_timeout(1000)

        # Verify back to main view
        expect(page.get_by_text("WORLDS", exact=True)).to_be_visible()

        browser.close()

if __name__ == "__main__":
    verify_worlds_page()
