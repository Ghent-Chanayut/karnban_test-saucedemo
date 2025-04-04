import type { Page } from "@playwright/test";

// ฟังก์ชันสำหรับการเข้าสู่ระบบ
export async function login(
  page: Page,
  username: string,
  password: string
): Promise<void> {
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
}

// ฟังก์ชันเรียงสินค้าตามราคาจากต่ำไปสูง
export async function sortProductsByPriceLowToHigh(
  page: Page
): Promise<number[]> {
  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption("lohi");
  const prices = await page.locator(".inventory_item_price").allTextContents();
  return prices.map((price) => parseFloat(price.replace("$", "")));
}

// ฟังก์ชันเรียงสินค้าตามราคาจากสูงไปต่ำ
export async function sortProductsByPriceHighToLow(
  page: Page
): Promise<number[]> {
  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption("hilo");
  const prices = await page.locator(".inventory_item_price").allTextContents();
  return prices.map((price) => parseFloat(price.replace("$", "")));
}

// ฟังก์ชันเรียงสินค้าตามชื่อจาก A ถึง Z
export async function sortProductsByNameAZ(page: Page): Promise<string[]> {
  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption({ value: "az" });
  return await page.locator(".inventory_item_name").allTextContents();
}

// ฟังก์ชันเรียงสินค้าตามชื่อจาก Z ถึง A
export async function sortProductsByNameZA(page: Page): Promise<string[]> {
  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption({ value: "za" });
  return await page.locator(".inventory_item_name").allTextContents();
}
