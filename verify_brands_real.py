
import os
import time
from playwright.sync_api import sync_playwright, expect

def verify_brands_card_image():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a larger viewport to ensure visibility of side elements
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()

        print("Navigating to app...")
        page.goto("http://localhost:3000")

        # 1. Wait for "Enter Protocol" button and click it
        print("Waiting for Enter Protocol button...")
        enter_button = page.get_by_role("button", name="Enter Protocol")
        enter_button.wait_for(state="visible", timeout=10000)
        enter_button.click()
        print("Clicked Enter Protocol")

        # 2. Wait for main content to load
        # We can look for the HUD border or similar element
        page.locator(".hud-border").wait_for(state="visible", timeout=5000)
        print("Main HUD loaded")

        # 3. Scroll to the BRANDS section
        # The app uses scroll-linked navigation. Brands is likely the 3rd phase.
        # We can simulate scrolling or just scroll to a specific Y position.
        # Based on PHASES in types.ts (not visible but usually 0.32-0.46 for brands)
        # Let's scroll significantly.
        # Or better, we can locate the Phase Illustration for Brands if it's visible.
        # However, the Phase Illustration changes based on scroll.
        # Let's scroll until we see "BRANDS" text in the Phase Indicator or similar.

        # Let's try scrolling step by step until the "BRANDS" text appears in the terminal
        print("Scrolling to Brands section...")

        # We can cheat by looking at the source code, Brands is usually around 30-40% scroll.
        # Height is 600vh. 35% of 600vh is roughly 2.1vh.
        # Let's scroll to 2500px approx.
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.38)")
        time.sleep(2) # Wait for scroll animations and state updates

        # Check if the text "BRANDS" (phase name) is visible in the terminal
        # The terminal text is inside .hud-border
        # Expect "BRANDS" (uppercase)
        # Note: TerminalText component might render char by char.
        print("Checking for BRANDS phase...")

        # Sometimes it might be uppercase or lowercase depending on code.
        # App.tsx says: activePhase.name.toUpperCase() -> "BRANDS"
        # We relax exact=True because strict mode found multiple "BRANDS" which means it's definitely there.
        # We just want to ensure we are in the brands phase.
        expect(page.get_by_role("heading", name="BRANDS")).to_be_visible(timeout=5000)
        print("BRANDS phase active")

        # 4. Click the Robot Illustration to expand
        # The illustration uses data-testid "hero-illustration-interactive"
        print("Clicking interactive illustration...")
        # Note: get_by_testid is standard, but the error said 'Page' has no attribute 'get_by_testid'.
        # This usually means using locator with test-id selector or verify playwright version.
        # But 'get_by_test_id' is the method name in some versions (camelCase vs snake_case).
        # Actually in python it is get_by_test_id usually.
        illustration = page.get_by_test_id("hero-illustration-interactive")
        illustration.click()

        # 5. Wait for the Brands Grid to appear
        print("Waiting for Brands grid...")
        # The grid has a header "Strategic Identifiers"
        expect(page.get_by_text("Strategic Identifiers")).to_be_visible(timeout=5000)

        # 6. Verify Card 5 Image
        # Card 5 should have text "Card 5" (from CARDS data: title `Card ${i + 1}`)
        print("Verifying Card 5...")
        card_5_locator = page.get_by_text("Card 5", exact=True)
        # The card component contains the image.
        # We need to find the parent container of "Card 5" text and check for the image.
        # Structure: motion.div (card) -> div (bg) -> svg -> image

        # Let's find the card container first
        # We can use xpath to go up from text
        card_5_element = page.locator("//div[contains(@class, 'group') and .//h3[text()='Card 5']]")
        expect(card_5_element).to_be_visible()

        # Check if it has an <image> tag with the correct href
        image_element = card_5_element.locator("image")
        expect(image_element).to_be_visible()

        href = image_element.get_attribute("href")
        print(f"Card 5 Image HREF: {href}")

        if href == "/assets/card-5-visual.png":
            print("SUCCESS: Card 5 has correct image.")
        else:
            print(f"FAILURE: Card 5 has incorrect image: {href}")
            exit(1)

        # 7. Take Screenshot
        print("Taking screenshot...")
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/brands_verification.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_brands_card_image()
