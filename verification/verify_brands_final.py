from playwright.sync_api import sync_playwright, expect
import time

def verify_brands_final():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Large viewport to minimize scroll quirks
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()

        print("Navigating to app...")
        page.goto("http://localhost:3000")

        # Enter
        enter_button = page.get_by_role("button", name="Enter Protocol")
        enter_button.wait_for(state="visible", timeout=10000)
        enter_button.click()

        page.wait_for_selector(".fixed.top-0.left-0", state="visible")
        time.sleep(2) # Stabilize

        # --- SMART NAVIGATION ---
        # Goal: Land on BRANDS phase (0.32 - 0.46)
        # Target: 0.39 (Center of phase)

        target_progress = 0.39

        # Calculate exact scroll position
        # scrolled = winScroll / (scrollHeight - innerHeight)
        # winScroll = scrolled * (scrollHeight - innerHeight)

        scroll_height = page.evaluate("document.documentElement.scrollHeight")
        viewport_height = page.viewport_size['height']
        max_scroll = scroll_height - viewport_height

        target_y = target_progress * max_scroll

        print(f"Scrolling to target Y: {target_y} (Progress: {target_progress})")
        page.evaluate(f"window.scrollTo(0, {target_y})")
        time.sleep(2)

        # Check current phase text
        max_attempts = 5
        found = False

        for i in range(max_attempts):
            content = page.content()
            if "PHASE: BRANDS" in content:
                print("Landed on BRANDS phase!")
                found = True
                break

            # Smart adjustments
            if "PHASE: WORLDS" in content:
                print("At WORLDS (too high), scrolling down...")
                page.mouse.wheel(0, 300)
            elif "PHASE: EXPERIENCES" in content:
                print("At EXPERIENCES (too low), scrolling up...")
                page.mouse.wheel(0, -300)
            elif "PHASE: PRODUCTS" in content:
                print("At PRODUCTS (way too low), scrolling up...")
                page.mouse.wheel(0, -1000)
            else:
                print("Unknown phase, adjusting...")
                page.mouse.wheel(0, 100)

            time.sleep(1.5)

        if not found:
            print("Failed to navigate to BRANDS. Taking debug screenshot.")
            page.screenshot(path="verification/brands_final_nav_fail.png")
            browser.close()
            return

        # --- IDLE STATE VERIFICATION ---
        print("Verifying Idle State (Vinyl)...")
        page.screenshot(path="verification/brands_final_idle.png")

        # Check for Gramophone Illustration
        wrapper = page.locator('[data-testid="hero-illustration-interactive"]')
        expect(wrapper).to_be_visible()

        # --- INTERACTION ---
        print("Clicking to enter Genome Map...")
        wrapper.click(force=True)
        time.sleep(2)

        # --- EXPANDED STATE VERIFICATION ---
        print("Verifying Genome Map...")
        page.screenshot(path="verification/brands_final_expanded.png")

        # Check for Strands text (SVG)
        strands = page.locator("text=IDENTITY STRAND")
        if strands.count() > 0:
            print("SUCCESS: Genome Strands visible.")
        else:
            print("FAILURE: Genome Strands NOT visible.")

        # Check for Brand List
        ziro = page.locator("text=ZIRO ROBOTICS")
        if ziro.count() > 0:
            print("SUCCESS: ZIRO ROBOTICS visible.")

            # --- FOCUS STATE VERIFICATION ---
            print("Clicking ZIRO to focus...")
            # Use specific locator for the clickable area/text
            ziro.click(force=True)
            time.sleep(2)
            page.screenshot(path="verification/brands_final_focus.png")

            # Check content
            details = page.locator("text=Autonomous delivery as an urban circulatory system")
            if details.count() > 0:
                print("SUCCESS: Focus details visible.")
            else:
                print("FAILURE: Focus details NOT visible.")

            # Check for close button
            close_btn = page.locator("text=Close Protocol")
            if close_btn.count() > 0:
                print("SUCCESS: Close button visible.")
        else:
            print("FAILURE: ZIRO ROBOTICS NOT visible.")

        browser.close()

if __name__ == "__main__":
    verify_brands_final()
