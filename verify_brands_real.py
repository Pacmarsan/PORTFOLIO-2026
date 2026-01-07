import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()

        print("Navigating to app...")
        await page.goto("http://localhost:3000")

        try:
            enter_button = page.get_by_text("ENTER PROTOCOL")
            if await enter_button.is_visible(timeout=5000):
                await enter_button.click()
                await page.wait_for_timeout(2000)
        except:
            pass

        scroll_height = await page.evaluate("document.documentElement.scrollHeight")
        viewport_height = await page.evaluate("window.innerHeight")
        target_progress = 0.36
        target_y = target_progress * (scroll_height - viewport_height)

        print(f"Scrolling to target Y: {target_y}")
        await page.evaluate(f"window.scrollTo(0, {target_y})")
        await page.wait_for_timeout(2000)

        if await page.locator("text=BRANDS").is_visible():
            print("Verified: Navigated to BRANDS phase.")
        else:
            print("Failed to navigate to BRANDS.")
            await page.screenshot(path="verification/brands_nav_fail.png")
            await browser.close()
            return

        print("Clicking illustration to expand...")
        illustration = page.get_by_testid("hero-illustration-interactive")
        await illustration.click(force=True)
        await page.wait_for_timeout(2000)

        ziro = page.get_by_text("ZIRO ROBOTICS")
        if await ziro.is_visible():
             print("Verified: Genome Map Revealed.")
             await page.screenshot(path="verification/brands_expanded.png")
        else:
             print("Failed to reveal Genome Map.")
             await page.screenshot(path="verification/brands_expand_fail.png")
             await browser.close()
             return

        print("Clicking brand 'ZIRO ROBOTICS'...")
        await ziro.click(force=True)
        await page.wait_for_timeout(2000)

        if await page.locator("text=Efficiency without inhumanity").is_visible():
            print("Verified: Focus Mode Active.")
            await page.screenshot(path="verification/brands_focus_mode.png")
        else:
            print("Failed to activate Focus Mode.")
            await page.screenshot(path="verification/brands_focus_fail.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
