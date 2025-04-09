import { test, expect, type Page } from "@playwright/test";
import { login } from "../page/login";
import { AboutPage } from "../page/aboutpage";

test.describe("home page test", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await login(page, "standard_user", "secret_sauce");
  });

  test('should display the "Add to Cart" button for all products', async ({
    page,
  }) => {
    const addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
    await expect(addToCartButtons).toHaveCount(6);
  });

  test("should open the About page", async ({ page }) => {
    const aboutPage = new AboutPage(page);
    await aboutPage.openAboutPage();
    await expect(page).toHaveURL("https://saucelabs.com/");
  });
});
