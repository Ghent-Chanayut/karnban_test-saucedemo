import { test, expect, type Page } from "@playwright/test";
import { login } from "../page/login"; // นำเข้าฟังก์ชัน login

test.describe("home page test", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await login(page, "standard_user", "secret_sauce");
  });

  test("should display all products on product list page", async ({ page }) => {
    // เลือกการจัดเรียงสินค้าจากราคาต่ำไปสูง
    await page
      .locator(".product_sort_container")
      .selectOption({ value: "lohi" });

    // ดึงราคาสินค้า
    const prices = await page
      .locator(".inventory_item_price")
      .allTextContents();
    const priceNumbers = prices.map((price) =>
      parseFloat(price.replace("$", ""))
    );

    // ตรวจสอบว่า ราคาสินค้าถูกจัดเรียงจากน้อยไปมาก
    const sorted = [...priceNumbers].sort((a, b) => a - b);
    expect(priceNumbers).toEqual(sorted);
  });

  test('should display the "Add to Cart" button for all products', async ({
    page,
  }) => {
    // ตรวจสอบว่ามีปุ่ม "Add to Cart" อยู่ทั้งหมด 6 ปุ่ม
    const addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
    await expect(addToCartButtons).toHaveCount(6);
  });

  test("should open the About page", async ({ page }) => {
    // คลิกเปิดเมนู
    await page.getByRole("button", { name: "Open Menu" }).click();

    // คลิกที่ลิงค์ About
    await page.locator('[data-test="about-sidebar-link"]').click();

    // ตรวจสอบว่า URL เปลี่ยนไปที่หน้า About
    await expect(page).toHaveURL("https://saucelabs.com/");
  });
});
