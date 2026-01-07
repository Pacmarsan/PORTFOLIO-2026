from playwright.sync_api import sync_playwright

def verify_brand_image():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a larger viewport to ensure "BRANDS" phase is reachable or visible
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()

        print("Navigating to app...")
        page.goto("http://localhost:3000")
        page.wait_for_timeout(3000)

        # Click 'Enter Protocol'
        try:
            enter_btn = page.get_by_text("Enter Protocol", exact=False)
            if enter_btn.is_visible():
                print("Clicking Enter Protocol...")
                enter_btn.click()
                page.wait_for_timeout(2000)
        except Exception as e:
            print(f"Enter Protocol error: {e}")

        print("Scrolling to find BRANDS...")
        found = False

        # Scroll slowly
        for i in range(100):
            # Check for the big header AND the phase label to be sure
            # Use specific locator for the HUD text
            if page.get_by_text("PHASE:").is_visible():
                # Get the text next to it or the big header
                # checking if "BRANDS" is the big header
                if page.locator("h2").filter(has_text="BRANDS").is_visible():
                     print("Found BRANDS header.")
                     found = True
                     break

            page.mouse.wheel(0, 100)
            page.wait_for_timeout(100)

        if found:
            print("BRANDS phase active. Waiting for settle...")
            page.wait_for_timeout(1000)

            # Verify we didn't overshoot to Experiences
            if page.locator("h2").filter(has_text="EXPERIENCES").is_visible():
                 print("Overshot to EXPERIENCES! Scrolling back up...")
                 page.mouse.wheel(0, -500)
                 page.wait_for_timeout(1000)

            # Click illustration (Right side of screen)
            print("Clicking illustration...")
            # x=1400, y=500 is good for 1920x1080
            page.mouse.click(1400, 500)
            page.wait_for_timeout(2000)

            # Check expansion
            if page.get_by_text("Strategic Identifiers").is_visible():
                print("Expanded successfully.")

                # Check Card 1 - Exact match needed
                # "Card 1" might match "Card 10" partially if strict mode is on for text?
                # Use regular expression or exact=True
                card1_text = page.get_by_text("Card 1", exact=True)

                if card1_text.is_visible():
                    print("Card 1 visible.")
                    card1_text.scroll_into_view_if_needed()
                    page.screenshot(path="verification/brands_grid_success.png")

                    # Click to detail
                    card1_text.click()
                    page.wait_for_timeout(1000)
                    page.screenshot(path="verification/brands_detail_success.png")
                else:
                    print("Card 1 not found in grid.")
                    page.screenshot(path="verification/brands_grid_fail.png")
            else:
                print("Did not expand.")
                page.screenshot(path="verification/brands_expand_fail_2.png")
        else:
            print("BRANDS phase never found.")
            page.screenshot(path="verification/brands_search_fail.png")

        browser.close()

if __name__ == "__main__":
    verify_brand_image()
