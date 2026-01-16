from playwright.sync_api import sync_playwright, expect

def verify_products(page):
    print("Navigating to home...")
    page.goto("http://localhost:3000")

    # Enter Protocol
    print("Clicking Enter Protocol...")
    page.get_by_text("Enter Protocol").click()

    # Wait for main content
    print("Waiting for main content...")
    page.wait_for_selector("text=PACMARSAN // PORTFOLIO")

    # Scroll to Products phase
    # Products is 0.64 to 0.78. Target 0.71.
    print("Scrolling to Products phase...")
    page.evaluate("""
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, maxScroll * 0.71);
    """)

    # Wait for phase transition to update HUD
    print("Waiting for HUD update...")
    # There are two "PRODUCTS" texts (Title and Label), so we target the heading or just check one exists.
    expect(page.get_by_role("heading", name="PRODUCTS")).to_be_visible()
    expect(page.get_by_text("WEB APPS & SYSTEMS")).to_be_visible()

    # Click the illustration to expand
    print("Clicking illustration...")
    page.locator('div[data-testid="hero-illustration-interactive"]').click()

    # Wait for ProductsArchive content
    print("Waiting for ProductsArchive...")
    expect(page.get_by_text("Deployed Systems")).to_be_visible()

    # Check for specific product
    print("Verifying product content...")
    expect(page.get_by_text("STASH IT")).to_be_visible()

    # Wait for iframe or fallback to stabilize (a bit of time for shimmer)
    page.wait_for_timeout(3000)

    # Take screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification/products_verification.png")
    print("Done.")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    try:
        verify_products(page)
    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")
    finally:
        browser.close()
