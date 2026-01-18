from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use iPhone 12 Pro dimensions
        context = browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()

        print("Navigating to home...")
        page.goto("http://localhost:3000")

        print("Waiting for Enter Protocol button...")
        enter_button = page.get_by_role("button", name="Enter Protocol")
        enter_button.wait_for(state="visible", timeout=15000)
        enter_button.click()

        print("Waiting for Explore button...")
        explore_button = page.get_by_role("button", name="Explore")
        explore_button.wait_for(state="visible", timeout=10000)
        explore_button.click()

        print("Waiting for Hero Identity content...")
        # Debug: wait a bit and screenshot regardless of text visibility
        page.wait_for_timeout(5000)
        print("Taking debug screenshot...")
        page.screenshot(path="verification/hero_mobile_debug.png")

        # Check for the Name
        # Use substring and locator to avoid strict mode issues with TerminalText
        name_text = page.locator("h1").filter(has_text="Pascal").first
        # name_text.wait_for(state="visible", timeout=10000)

        print("Taking screenshot 1 (Section 0)...")
        page.screenshot(path="verification/hero_mobile_1.png")

        # Find Scroll Button using the specific class logic or hierarchy
        # It's an absolute button at bottom-8. Use last to handle duplicates/overlays
        scroll_button = page.locator("button.absolute.bottom-8").last

        print("Clicking Scroll Button 1...")
        if scroll_button.is_visible():
            scroll_button.click()
            page.wait_for_timeout(1500) # Wait for scroll
            print("Taking screenshot 2 (Section 1)...")
            page.screenshot(path="verification/hero_mobile_2.png")

            print("Clicking Scroll Button 2...")
            scroll_button.click()
            page.wait_for_timeout(1500)
            print("Taking screenshot 3 (Section 2)...")
            page.screenshot(path="verification/hero_mobile_3.png")

            print("Clicking Scroll Button 3...")
            scroll_button.click()
            page.wait_for_timeout(1500)
            print("Taking screenshot 4 (Section 3)...")
            page.screenshot(path="verification/hero_mobile_4.png")

            # Now button should be gone
            page.wait_for_timeout(500)
            if not scroll_button.is_visible():
                print("Scroll button hidden correctly at end.")
            else:
                print("Warning: Scroll button still visible?")
        else:
            print("Scroll button not found!")

        browser.close()

if __name__ == "__main__":
    run()
