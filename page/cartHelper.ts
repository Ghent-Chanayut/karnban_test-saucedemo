import { expect, type Page } from "@playwright/test";

// ฟังก์ชันเพิ่มสินค้าไปยังตะกร้า
export async function addItemToCart(page: Page, productLocator: string) {
  await page.locator(productLocator).click();
}

// ฟังก์ชันลบสินค้าจากตะกร้า
export async function removeItemFromCart(page: Page, productLocator: string) {
  const removeButton = page.locator(productLocator);
  await removeButton.click();
}
