from playwright.sync_api import sync_playwright, expect
import time

def verify_brands_genome():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a taller viewport to make scrolling easier to predict
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()

        print("Navigating to app...")
        page.goto("http://localhost:3000")

        # Wait for loading
        enter_button = page.get_by_role("button", name="Enter Protocol")
        enter_button.wait_for(state="visible", timeout=10000)
        enter_button.click()

        page.wait_for_selector(".fixed.top-0.left-0", state="visible")

        # Scroll to Brands section (approx 40%)
        # Doc height is 600vh (6 * 1080 = 6480 approx)
        # 40% is roughly 2500px.

        print("Scrolling to Brands phase...")
        page.evaluate("window.scrollTo(0, document.documentElement.scrollHeight * 0.39)")
        time.sleep(1)

        # Verify we are in BRANDS phase
        # Check text
        try:
            expect(page.get_by_text("PHASE: BRANDS")).to_be_visible(timeout=5000)
            print("Successfully arrived at BRANDS phase.")
        except:
            print("Failed to arrive at BRANDS phase. Dumping screenshot.")
            page.screenshot(path="verification/brands_nav_fail.png")
            # Print current text content to debug
            # print(page.content())
            return

        time.sleep(1)
        page.screenshot(path="verification/brands_phase_idle.png")

        # Click the illustration (Vinyl)
        # It should correspond to the 'brands' phase illustration
        # The illustration container has data-testid="hero-illustration-interactive"

        print("Clicking illustration...")
        illustration = page.locator('[data-testid="hero-illustration-interactive"]')
        illustration.click(force=True)

        time.sleep(2)

        # Verify expansion
        # BrandsArchive should be visible
        print("Verifying Genome Map...")
        page.screenshot(path="verification/brands_genome_expanded.png")

        # Check for 'IDENTITY STRAND' text in SVG
        if page.locator("text=IDENTITY STRAND").count() > 0:
            print("Confirmed: Genome Strands visible.")
        else:
            print("Error: Genome Strands NOT visible.")

        # Check for a brand
        brand_locator = page.locator("text=ZIRO ROBOTICS")
        if brand_locator.count() > 0:
            print("Confirmed: Brand 'ZIRO ROBOTICS' visible.")
            # Click it
            print("Clicking brand to focus...")
            brand_locator.click(force=True)
            time.sleep(1)
            page.screenshot(path="verification/brands_genome_focus.png")

            # Check details
            if page.locator("text=Autonomous delivery as an urban circulatory system").count() > 0:
                print("Confirmed: Focus mode content visible.")
            else:
                 print("Error: Focus mode content NOT visible.")

        else:
            print("Error: Brand 'ZIRO ROBOTICS' NOT visible.")

        browser.close()

if __name__ == "__main__":
    verify_brands_genome()
