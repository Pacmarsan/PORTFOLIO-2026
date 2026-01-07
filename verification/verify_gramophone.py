from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000")
            page.wait_for_timeout(3000)

            # Click Enter Protocol
            btn = page.locator('button:has-text("Enter Protocol")')
            if btn.is_visible():
                btn.click()
                print("Clicked Enter Protocol")
                page.wait_for_timeout(3000)

            # Scroll to Brands (approx 35-40% of page)
            # 600vh total. Brands is 3rd phase (index 2).
            # 0-16%: Hero
            # 16-32%: Worlds
            # 32-48%: Brands
            # Let's scroll to 38%

            page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.38)")
            page.wait_for_timeout(3000)

            page.screenshot(path="verification/1_brands_scroll.png")
            print("Captured scroll screenshot")

            # Check for the image in the DOM
            # The component GramophoneIllustration should be mounted.
            # It contains <image href="/assets/ziro-new.png" ... />

            # Note: in HTML, href might be xlink:href or just href. Playwright locator 'image' matches <image> tag.
            # We look for attribute href containing ziro-new.png

            images = page.locator('image')
            count = images.count()
            print(f"Found {count} SVG images")

            found = False
            for i in range(count):
                href = images.nth(i).get_attribute('href')
                print(f"Image {i} href: {href}")
                if href and 'ziro-new.png' in href:
                    found = True

            if found:
                print("SUCCESS: Verified ziro-new.png is rendered in the SVG")
            else:
                print("FAILURE: ziro-new.png not found in SVG images")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
