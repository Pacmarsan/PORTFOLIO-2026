from playwright.sync_api import sync_playwright, expect
import time

def verify_mobile(page):
    print("Navigating to app...")
    page.goto("http://localhost:3000")

    # Wait for splash screen
    print("Waiting for Enter Protocol...")
    # The splash screen takes a while (2000ms timeout in App.tsx + animations)
    # Button appears after isReady is true.
    # Note: Text is "Enter Protocol" (uppercase in CSS but source is "Enter Protocol")
    enter_btn = page.get_by_role("button", name="Enter Protocol")
    enter_btn.wait_for(timeout=10000)
    enter_btn.click()

    print("Entered Protocol. Waiting for HUD...")
    time.sleep(2) # Wait for animations

    # Check for "EXPLORE HERO" button
    # The button text is `EXPLORE {activePhase.name.toUpperCase()}`
    explore_btn = page.get_by_role("button", name="EXPLORE HERO")
    expect(explore_btn).to_be_visible()

    print("Found Explore button. Clicking...")
    explore_btn.click()

    print("Clicked Explore. Waiting for overlay...")
    # Overlay should appear. It has `fixed inset-0`.
    # HeroIdentity has "Creative Architect" text.
    # Note: There might be duplicate elements in DOM (one hidden desktop, one visible mobile).
    # .first found the hidden desktop one. Let's try .last (mobile one).
    overlay_text = page.get_by_text("Creative Architect").last
    expect(overlay_text).to_be_visible()

    print("Taking screenshot of Hero Overlay...")
    page.screenshot(path="verification/mobile_hero_v6.png")

    # Close it
    print("Closing overlay...")
    close_btn = page.get_by_label("Close Identity").last
    close_btn.click()

    # Wait for close
    time.sleep(1)
    print("Verification complete.")

def run():
    with sync_playwright() as p:
        # iPhone 12 Pro viewport
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()

        try:
            verify_mobile(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    run()
