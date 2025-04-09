import type { Page } from "@playwright/test";

export async function login(
  page: Page,
  username: string,
  password: string
): Promise<void> {
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
}

export async function sortProductsByPriceLowToHigh(
  page: Page
): Promise<number[]> {
  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption("lohi");
  const prices = await page.locator(".inventory_item_price").allTextContents();
  return prices.map((price) => parseFloat(price.replace("$", "")));
  const priceNumbers = await sortProductsByPriceLowToHigh(page);
  const sorted = [...priceNumbers].sort((a, b) => a - b);
}

export async function sortProductsByPriceHighToLow(
  page: Page
): Promise<number[]> {
  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption("hilo");
  const prices = await page.locator(".inventory_item_price").allTextContents();
  return prices.map((price) => parseFloat(price.replace("$", "")));
}

export async function sortProductsByNameAZ(page: Page): Promise<string[]> {
  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption({ value: "az" });
  return await page.locator(".inventory_item_name").allTextContents();
}

export async function sortProductsByNameZA(page: Page): Promise<string[]> {
  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption({ value: "za" });
  return await page.locator(".inventory_item_name").allTextContents();
}
