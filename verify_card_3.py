import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()

        print("Navigating to app...")
        await page.goto("http://localhost:3000")
        await page.wait_for_timeout(3000)

        # Handle Enter Protocol if present
        try:
            enter_button = page.get_by_text("ENTER PROTOCOL")
            if await enter_button.is_visible():
                await enter_button.click()
                await page.wait_for_timeout(2000)
        except:
            pass

        # Scroll to Brands section
        # Based on previous scripts, Brands is around 36%
        # But we need to click the illustration to open the archive.

        # However, the previous script scrolled to target_y.
        # Let's try to just find the "BRANDS" text or "Strategic Identifiers" if already visible?
        # No, the archive is hidden behind the interaction.

        scroll_height = await page.evaluate("document.documentElement.scrollHeight")
        viewport_height = await page.evaluate("window.innerHeight")
        target_progress = 0.38
        target_y = target_progress * (scroll_height - viewport_height)

        print(f"Scrolling to target Y: {target_y}")
        await page.evaluate(f"window.scrollTo(0, {target_y})")
        await page.wait_for_timeout(2000)

        # Click the robot/illustration to open the archive
        # The test id 'hero-illustration-interactive' was used in the previous script but that sounds like the HERO phase illustration.
        # The brands illustration might be different.
        # Let's try to find an element that looks clickable or the robot.

        # In App.tsx (implied), clicking the illustration activates the phase.
        # Let's try clicking the center of the screen if we are at the right scroll position.

        # Alternatively, let's look for the element with data-testid if it exists, or just click.
        # The previous script used 'hero-illustration-interactive' but that name is suspicious for Brands.
        # Let's try to find the robot image.

        # Or let's assume the previous script was correct about the test id usage for the *active* phase illustration.
        illustration = page.locator("[data-testid='hero-illustration-interactive']")
        if await illustration.count() > 0:
             await illustration.first.click(force=True)
        else:
             # Fallback: click center screen
             await page.mouse.click(1920/2, 1080/2)

        await page.wait_for_timeout(2000)

        # Check for "Neon City"
        print("Checking for 'Neon City'...")
        neon_city = page.get_by_text("Neon City")

        if await neon_city.is_visible():
            print("SUCCESS: Found 'Neon City'")
            await page.screenshot(path="verification/card_3_success.png")

            # Click it to open detail view
            await neon_city.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path="verification/card_3_detail.png")
        else:
            print("FAILURE: 'Neon City' not found")
            await page.screenshot(path="verification/card_3_fail.png")

            # Dump page content to see what's there
            # print(await page.content())

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
