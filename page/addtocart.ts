import type { Page } from "@playwright/test";

export const addToCart = async (
  page: Page,
  productLocator: string
): Promise<void> => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  page.locator(".shopping_cart_link").click();
};
