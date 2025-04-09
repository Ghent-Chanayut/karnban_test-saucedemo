import { Page } from "@playwright/test";

export async function addItemToCart(page: Page, productLocator: string) {
  await page.locator(productLocator).click();
}

export async function removeItemFromCart(page: Page, productLocator: string) {
  const removeButton = page.locator(productLocator);
  await removeButton.click();
}
