from playwright.sync_api import sync_playwright

def verify_hero_text():
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Set viewport large enough
        page.set_viewport_size({"width": 1920, "height": 1080})

        print("Navigating to http://localhost:3000")
        page.goto("http://localhost:3000")

        # Wait for the Enter Protocol button explicitly
        try:
            enter_btn = page.wait_for_selector('button:has-text("ENTER PROTOCOL")', timeout=10000)
            if enter_btn:
                print("Found ENTER PROTOCOL button. Clicking...")
                enter_btn.click()
                # Wait for transition
                page.wait_for_timeout(2000)
                print("Entered main interface.")
        except Exception as e:
            print(f"Error entering protocol: {e}")
            page.screenshot(path="verification/error_entry.png")

        # Now we are in the main interface.
        # The Hero Illustration is in the right half of the screen (50% to 100%).
        # Its center should be around 75% width.
        print("Clicking hero illustration area (75% width)...")

        # Try clicking by selector first, it's safer
        try:
            loc = page.locator('[data-testid="hero-illustration-interactive"]')
            if loc.count() > 0:
                print("Found interactive hero illustration via testid, clicking...")
                loc.click()
            else:
                print("TestID not found, clicking coordinates (1440, 540)...")
                page.mouse.click(1440, 540)
        except:
            print("Error finding locator, clicking coordinates...")
            page.mouse.click(1440, 540)

        # Wait for new content
        print("Waiting for 'Final Message'...")
        try:
            # We look for the unique text added
            page.wait_for_selector("text=Final Message", timeout=5000)
            print("Hero Identity revealed successfully.")
        except:
            print("Timed out waiting for 'Final Message'. Capturing screenshot anyway.")

        print("Taking final screenshot...")
        page.screenshot(path="verification/hero_identity_updated.png")
        print("Screenshot saved to verification/hero_identity_updated.png")

        browser.close()

if __name__ == "__main__":
    verify_hero_text()
