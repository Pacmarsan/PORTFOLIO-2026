
import os
import re
from playwright.sync_api import sync_playwright, expect

def verify_brand_card_3(page):
    page.set_viewport_size({"width": 1920, "height": 1080})

    print("Navigating...")
    page.goto("http://localhost:3000")

    try:
        page.get_by_text("ENTER PROTOCOL").click(timeout=3000)
        print("Clicked ENTER PROTOCOL")
    except:
        print("Enter Protocol button not found or already clicked")

    # Scroll to trigger BRANDS phase
    # Total height is 600vh.
    # BRANDS is roughly 3rd phase.
    # Let's scroll step by step until we see "BRANDS" active or the illustration.
    # The illustration is usually fixed on the left.

    print("Scrolling to Brands section...")
    # Scroll to 40%
    page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.40)")
    page.wait_for_timeout(2000)

    # Check if we are in brands phase.
    # The active phase determines the illustration.
    # We look for the interactive illustration.

    brands_illustration = page.get_by_test_id("hero-illustration-interactive")

    # If not found, maybe scroll a bit more or less.
    if not brands_illustration.is_visible():
        print("Illustration not visible, adjusting scroll...")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.35)")
        page.wait_for_timeout(2000)

    if not brands_illustration.is_visible():
        print("Illustration still not visible, adjusting scroll to 0.45...")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.45)")
        page.wait_for_timeout(2000)

    expect(brands_illustration).to_be_visible(timeout=5000)
    print("Brands illustration found.")

    # Click to expand
    brands_illustration.click()
    print("Clicked illustration.")

    # Wait for Card 3
    # ID: 03
    card_3 = page.locator(".group").filter(has_text="ID: 03").first
    expect(card_3).to_be_visible(timeout=10000)
    print(f"Card 3 HTML: {card_3.inner_html()}")

    image_tag = card_3.locator("image")
    expect(image_tag).to_be_visible()

    href = image_tag.get_attribute("href")
    print(f"Card 3 Image Href: {href}")

    if href != "/assets/card-3-visual.jpg":
        print(f"ERROR: Image href mismatch! Found {href}")
        raise Exception("Image mismatch")
    else:
        print("SUCCESS: Image href matches.")

    os.makedirs("/home/jules/verification", exist_ok=True)
    page.screenshot(path="/home/jules/verification/verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_brand_card_3(page)
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
