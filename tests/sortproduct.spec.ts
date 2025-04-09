import { test, expect, type Page } from "@playwright/test";
import {
  login,
  sortProductsByPriceLowToHigh,
  sortProductsByPriceHighToLow,
  sortProductsByNameAZ,
  sortProductsByNameZA,
} from "../page/sortUtils";

test.describe("ผู้ใช้สามารถเรียงลำดับสินค้าตามราคาและชื่อสินค้าได้", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto("https://www.saucedemo.com/");
    await login(page, "standard_user", "secret_sauce");
  });

  test("ควรเรียงสินค้าตามราคาจากต่ำไปสูง", async ({ page }: { page: Page }) => {
    const priceNumbers = await sortProductsByPriceLowToHigh(page);
    const sorted = [...priceNumbers].sort((a, b) => a - b);
    expect(priceNumbers).toEqual(sorted);
  });

  test("ควรเรียงสินค้าตามราคาจากสูงไปต่ำ", async ({ page }: { page: Page }) => {
    const priceNumbers = await sortProductsByPriceHighToLow(page);
    const sorted = [...priceNumbers].sort((a, b) => b - a);
    expect(priceNumbers).toEqual(sorted);
  });

  test("ควรเรียงสินค้าตามชื่อจาก A ถึง Z", async ({ page }: { page: Page }) => {
    const productNames = await sortProductsByNameAZ(page);
    const sorted = [...productNames].sort();
    expect(productNames).toEqual(sorted);
  });

  test("ควรเรียงสินค้าตามชื่อจาก Z ถึง A", async ({ page }: { page: Page }) => {
    const productNames = await sortProductsByNameZA(page);
    const sorted = [...productNames].sort((a, b) => b.localeCompare(a));
    expect(productNames).toEqual(sorted);
  });
});
