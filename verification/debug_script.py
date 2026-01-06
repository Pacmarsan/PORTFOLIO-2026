from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the app
    page.goto("http://localhost:3000")

    # Wait for the app to load - use a more robust check if "WORLDS" text is flaky due to animations
    # We will use the approach from verify_synopsis.py which seems to work
    page.wait_for_selector('[data-testid="hero-illustration-interactive"]', state="visible", timeout=10000)

    # Try to find the "WORLDS" element specifically.
    # It might be in the PhaseIllustration component.
    # In `verify_synopsis.py` we probably navigate there. Let's see how `verify_synopsis.py` does it.
    # It seems I don't have access to read `verify_synopsis.py` directly without `read_file` but I can infer it worked.
    # I'll try to click the WORLDS illustration if it has a specific test id or text.

    # Let's try to locate the "WORLDS" text again, but maybe it's "Worlds" or inside a span.
    # Or we can scroll to it?

    # Actually, the user starts at Hero phase. We need to navigate to Worlds phase?
    # No, the "WORLDS" phase is one of the satellites in the contacts/home view?
    # Wait, the prompt says "Entry Interaction (SVG -> Subpage)". "User clicks the WORLDS SVG".

    # Let's assume the starting state is "contacts" or "hero".
    # If "hero", we see "WHO I AM".
    # To see "WORLDS", maybe we are in the "contacts" phase where satellites are?
    # Or maybe "WORLDS" is a phase we scroll to?

    # Let's try to scroll down to find "WORLDS" if it's a section, or click if it's a nav item.
    # The app seems to be a single page scrollable.

    # Let's try finding "WORLDS" anywhere.
    # If it's not found, maybe we need to scroll.

    # Attempt to scroll to the bottom or through phases
    # But `verify_synopsis.py` passed, so it knows how to get there.
    # I'll try to just wait for "WORLDS" with a longer timeout and maybe scroll.

    # Actually, let's just use the `verify_synopsis.py` logic if I can see it.
    # Since I can't see it right now without reading it, I'll read it first.
    pass

with sync_playwright() as playwright:
    run(playwright)
