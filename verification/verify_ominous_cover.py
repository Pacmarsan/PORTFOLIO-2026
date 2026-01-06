from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the app
    page.goto("http://localhost:3000")

    # Wait for the app to load
    page.wait_for_selector("text=WORLDS")

    # Click the WORLDS text/illustration to open the archive
    # We might need to click the illustration specifically if the text isn't the trigger
    # But usually the whole group is interactive.
    # Let's try clicking the "WORLDS" text.
    page.click("text=WORLDS")

    # Wait for the ARCHIVE header to appear
    page.wait_for_selector("text=ARCHIVE")

    # Find the book "OMINOUS — CHAPTER 1 (PART 1)"
    # We need to click the spine to open it.
    # The spine has the title in it.
    page.click("text=OMINOUS — CHAPTER 1 (PART 1)")

    # Wait for the detail view to populate
    # The large title should be visible
    page.wait_for_selector("h2 >> text=OMINOUS — CHAPTER 1 (PART 1)")

    # Short wait for animation
    page.wait_for_timeout(1000)

    # Take a screenshot
    page.screenshot(path="verification/ominous_chapter1_cover.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
