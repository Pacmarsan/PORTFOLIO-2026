

import re
from playwright.sync_api import Page, expect

def test_verify_brand_card_3_image(page: Page):
    """
    Verifies that the 3rd Brand Card (Index 2) displays the correct image
    (/assets/card-3-visual.jpg).
    """
    # 1. Navigate to the page
    # Since the brands section is part of the main page but requires interaction to reveal,
    # we need to simulate that. Or we can just check if the code logic is correct by inspecting the React state/DOM if accessible,
    # but Playwright tests the DOM.
    # The Brands section is at the bottom or accessible via scrolling.
    # However, the user instruction implies we just need to verify the *presence* of the image in the DOM
    # when the component is rendered.

    # We'll load the app.
    page.goto("http://localhost:3000")

    # Click "Enter Protocol" if it exists
    try:
        page.get_by_text("ENTER PROTOCOL").click(timeout=2000)
    except:
        pass # Maybe already entered or not present

    # The BrandsArchive is revealed when 'expandedPhase' is 'brands'.
    # We can try to click the brands illustration (robot) to open it.
    # The robot is usually at the third position in the scroll or we can just scroll to it.
    # But clicking the illustration is the way to open the 'archive' view where the cards are.

    # Wait for the brands illustration to be visible.
    # It usually has an alt text or we can find it by test id if available.
    # Based on memory, "Accessing the 'Brands' archive content requires clicking the 'Brands' phase illustration (robot)".

    # Let's try to find the robot image or a specific clickable area.
    # The 'PhaseIllustration' usually renders the SVG/Image.

    # Scroll down to reveal the brands section.
    # Brands is usually the 3rd phase (Hero -> Worlds -> Brands).
    # We can scroll.
    page.mouse.wheel(0, 2000)
    page.wait_for_timeout(1000)

    # Try to find the brands illustration.
    # The brands illustration uses 'ziro-robot-3d.png' according to memory.
    # We can look for that image.

    brands_illustration = page.locator('img[src*="ziro-robot-3d.png"]')
    if brands_illustration.count() > 0:
        brands_illustration.first.click()
    else:
        # Fallback: maybe click something with text "BRANDS"
        # The phase label "BRANDS" might be clickable?
        # Actually, let's just inspect the DOM for the *hidden* or *rendered* cards if they are there.
        # But BrandsArchive is only rendered when `expandedPhase === 'brands'`.
        pass

    # Wait for the BrandsArchive to appear.
    page.wait_for_timeout(1000)

    # Now look for the 3rd card.
    # The cards have text "ID: 03".
    # And we expect an image tag inside it with href or src pointing to the jpg.

    # Locate the card with ID 03
    # Text: "ID: 03"
    card_03 = page.locator("div", has_text="ID: 03").last

    # Check for the image
    # The component uses <image href="..."> inside an svg.
    image_tag = card_03.locator("image")

    expect(image_tag).to_be_visible()

    href = image_tag.get_attribute("href")
    assert href == "/assets/card-3-visual.jpg", f"Expected /assets/card-3-visual.jpg, but got {href}"

    print("Verification Successful: Card 3 displays /assets/card-3-visual.jpg")

if __name__ == "__main__":
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        test_verify_brand_card_3_image(page)
        browser.close()
