from playwright.sync_api import sync_playwright, expect
import time

def verify_read_links():
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
        # Try to click the illustration
        illustration = page.locator('[data-testid="hero-illustration-interactive"]')
        if illustration.count() > 0:
            illustration.click()
        else:
            page.mouse.click(300, 300)

        page.wait_for_timeout(1500)

        # Helper to check link
        def check_link(book_name, expected_url):
            print(f"Checking {book_name}...")
            # Click the book
            # Retry mechanism if click fails
            try:
                page.get_by_text(book_name, exact=True).click(timeout=5000)
            except:
                print(f"Retry clicking {book_name}")
                page.get_by_text(book_name, exact=True).click()

            page.wait_for_timeout(1000)

            # Check for Read Here button
            read_button = page.get_by_text("Read Here")
            expect(read_button).to_be_visible()

            # Check href
            link = page.locator("a", has_text="Read Here")
            href = link.get_attribute("href")

            if href == expected_url:
                print(f"PASS: {book_name} link is correct.")
            else:
                print(f"FAIL: {book_name} link mismatch. Expected {expected_url}, got {href}")

            # Screenshot of the button
            safe_name = book_name.replace(" ", "_").replace("—", "").lower()[:20]
            page.screenshot(path=f"verification/read_link_{safe_name}.png")

            # Close detail
            page.get_by_text("Return to Shelf").click()
            page.wait_for_timeout(1000)

        # Verify all released mangas
        check_link("ALL HALLOWS EVE", "https://mangaplus-creators.jp/episodes/qf2410041822304070025580017")
        check_link("SPECTER", "https://mangaplus-creators.jp/episodes/na2411040411010370026609448")
        check_link("FIRST BITE", "https://mangaplus-creators.jp/episodes/sb2412252117006130026909136")
        check_link("BLOODMOON ZERO", "https://mangaplus-creators.jp/episodes/ek2507150148560027245996")
        check_link("OMINOUS — CHAPTER 1 (PART 1)", "https://mangaplus-creators.jp/episodes/su2512262012330026609448")

        browser.close()

if __name__ == "__main__":
    verify_read_links()
