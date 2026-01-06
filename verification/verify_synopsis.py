from playwright.sync_api import sync_playwright, expect
import time

def verify_synopsis_updates():
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

        # Helper to verify book synopsis
        def verify_book_synopsis(book_name, snippet):
            print(f"Verifying {book_name}...")
            # Click the book
            page.get_by_text(book_name, exact=True).click()
            page.wait_for_timeout(1000)

            # Verify the snippet exists
            expect(page.get_by_text(snippet)).to_be_visible()

            # Screenshot
            safe_name = book_name.replace(" ", "_").replace("—", "").lower()[:20]
            page.screenshot(path=f"verification/synopsis_{safe_name}.png")
            print(f"Verified {book_name}")

            # Close detail
            page.get_by_text("Return to Shelf").click()
            page.wait_for_timeout(1000)

        # Verify Updates
        verify_book_synopsis("ALL HALLOWS EVE", "A world plunged into sorrow and despair")
        verify_book_synopsis("SPECTER", "When the darkness stirs, something awakens")
        verify_book_synopsis("FIRST BITE", "In a world overrun with the undead")
        verify_book_synopsis("BLOODMOON ZERO", "When Life puts you on the edge of edges")
        verify_book_synopsis("OMINOUS — CHAPTER 1 (PART 1)", "Confronted by monstrous entities called the \"Plague\"")

        browser.close()

if __name__ == "__main__":
    verify_synopsis_updates()
