from playwright.sync_api import sync_playwright, expect
import time

def verify_first_bite_cover():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Navigate to app
        page.goto("http://localhost:3000")

        # Wait for "Enter Protocol" button and click it
        page.get_by_text("Enter Protocol").click()

        # Wait for main content to load
        page.wait_for_timeout(2000)

        # Scroll to WORLDS phase (approx 20% down)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.20)")
        page.wait_for_timeout(2000)

        # Open Worlds Archive
        illustration = page.locator('[data-testid="hero-illustration-interactive"]')
        if illustration.count() > 0:
            illustration.click()
        else:
            page.mouse.click(1000, 300) # Fallback

        page.wait_for_timeout(1500)

        # Click "FIRST BITE"
        page.get_by_text("FIRST BITE", exact=True).click()
        page.wait_for_timeout(1000)

        # Take screenshot
        page.screenshot(path="verification/first_bite_cover.png")
        print("Captured verification/first_bite_cover.png")

        browser.close()

if __name__ == "__main__":
    verify_first_bite_cover()
