from playwright.sync_api import sync_playwright, expect
import time

def verify_gramophone():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Using a large height to enable scrolling
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()

        # Capture console logs
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"BROWSER ERROR: {err}"))

        print("Navigating to app...")
        page.goto("http://localhost:3000")

        # Wait for initial load
        page.wait_for_timeout(3000)

        # 1. Enter the Portfolio
        enter_button = page.get_by_text("ENTER PROTOCOL")
        if enter_button.is_visible():
            print("Clicking Enter Protocol...")
            enter_button.click()
            page.wait_for_timeout(2000)

        # 2. Scroll to "BRANDS" phase
        print("Scrolling to BRANDS phase...")
        doc_height = page.evaluate("document.body.scrollHeight")
        viewport_height = page.evaluate("window.innerHeight")
        scrollable_height = doc_height - viewport_height
        target_scroll = scrollable_height * 0.39
        page.evaluate(f"window.scrollTo(0, {target_scroll})")
        page.wait_for_timeout(3000)

        # 3. Locate the Gramophone Illustration
        vinyl_group = page.locator("#vinyl-group")
        print("Checking for Vinyl Group...")
        expect(vinyl_group).to_be_visible(timeout=5000)
        print("SUCCESS: Vinyl Group found.")

        # 4. Interact: Click a Card
        cards = page.locator(".holo-card-group")
        count = cards.count()
        print(f"Found {count} HoloCards")

        if count > 0:
            print("Clicking the top-most card (last in DOM)...")
            # Force click because the element is animating (unstable)
            cards.last.click(force=True)

            # Wait for animation (1s duration)
            page.wait_for_timeout(3000)

            # Check if metadata panel appeared
            print("Checking for Expanded View...")
            back_button = page.get_by_text("Back to List")

            try:
                expect(back_button).to_be_visible(timeout=5000)
                print("SUCCESS: Metadata Panel revealed.")

                # Take screenshot of Focused State
                print("Taking screenshot of Focused State...")
                page.screenshot(path="verification/gramophone_focus.png")
            except Exception as e:
                print(f"FAILURE: Metadata Panel not found. {e}")
                page.screenshot(path="verification/gramophone_focus_fail.png")

        browser.close()

if __name__ == "__main__":
    verify_gramophone()
