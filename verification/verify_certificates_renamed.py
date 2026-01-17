
import os
import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1920, "height": 1080})
    page = context.new_page()

    try:
        print("Navigating to app...")
        page.goto("http://localhost:3000")

        # 1. Enter Protocol
        print("Waiting for 'Enter Protocol'...")
        enter_button = page.get_by_text("Enter Protocol")
        enter_button.wait_for(timeout=15000)
        enter_button.click()
        print("Clicked 'Enter Protocol'")

        # 2. Wait for initial HUD (Identity/Hero phase)
        print("Waiting for HUD...")
        page.get_by_text("WHO I AM").wait_for(timeout=15000)
        print("HUD loaded.")

        # 3. Scroll to Experiences Phase
        # Experiences is 0.48 - 0.62. Target 0.55.
        print("Scrolling to Experiences phase...")
        page.evaluate("""
            const height = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo(0, height * 0.55);
        """)

        # 4. Wait for HUD to update to "EXPERIENCES"
        # The HUD title is an h2
        print("Waiting for HUD to show 'EXPERIENCES'...")
        # We look for the large HUD text.
        # Note: The archive also has "EXPERIENCES" as h1. The HUD has h2.
        hud_title = page.locator("h2").filter(has_text="EXPERIENCES")
        hud_title.wait_for(timeout=10000)
        print("Arrived at Experiences phase.")

        # 5. Expand the phase
        print("Clicking illustration to expand...")
        illustration = page.get_by_test_id("hero-illustration-interactive")
        illustration.wait_for(state="visible", timeout=5000)
        illustration.click()

        # 6. Wait for Archive to open
        print("Waiting for Archive content...")
        # The archive header is h1
        # Use .first or filter by visibility to avoid strict mode error
        archive_header = page.locator("h1").filter(has_text="EXPERIENCES").first
        archive_header.wait_for(state="visible", timeout=10000)
        print("Archive opened.")

        # 7. Check for Certificates
        # They might be off-screen in the scrollable archive container, but Playwright locator checks usually work if in DOM.
        # However, if virtualization is used (unlikely here), they might not be.
        # Let's scroll the archive container just in case.

        # The container has class 'custom-scrollbar' inside the expanded view
        # We can just scroll to the bottom of that container
        print("Scrolling archive to reveal certificates...")
        archive_container = page.locator(".custom-scrollbar").first
        archive_container.evaluate("el => el.scrollTop = el.scrollHeight")
        time.sleep(1) # Allow scroll render

        print("Verifying certificates...")

        # Check specific titles
        expectations = [
            "Manga of the Month",
            "HP AI for beginners",
            "Effective Leadership",
            "AI Starter Kit"
        ]

        for title in expectations:
            if page.get_by_text(title).count() > 0:
                print(f"✅ Found certificate: {title}")
            else:
                print(f"❌ Missing certificate: {title}")
                # Take screenshot for debug
                page.screenshot(path="verification/missing_cert_error.png")
                raise Exception(f"Certificate '{title}' not found!")

        print("All certificates verified successfully!")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")
        raise e
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
