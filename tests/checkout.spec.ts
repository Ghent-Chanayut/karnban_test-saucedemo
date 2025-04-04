import { test, expect } from "@playwright/test";
import { login } from "../page/login";
import { addToCart } from "../page/addtocart";
import { fillCheckoutForm, completeCheckout } from "../page/checkoutHelper";

test.describe("user can checkout", () => {
  test.beforeEach(async ({ page }) => {
    // ไปที่หน้าหลักและทำการล็อกอิน
    await page.goto("https://www.saucedemo.com/");
    await login(page, "standard_user", "secret_sauce");

    // เพิ่มสินค้าลงในตะกร้า
    await addToCart(page, '[data-test="add-to-cart-sauce-labs-backpack"]');
  });

  test("user can checkout complete after add item to cart", async ({
    page,
  }) => {
    // ไปที่หน้าชำระเงิน
    await page.locator('[data-test="checkout"]').click();

    // กรอกข้อมูลในฟอร์มเช็คเอาท์
    await fillCheckoutForm(page, "Admin", "Admin", "Admin");

    // กดปุ่ม finish เพื่อทำการชำระเงิน
    await completeCheckout(page);
  });

  test("should show error message when checkout form is incomplete", async ({
    page,
  }) => {
    // ไปที่หน้าชำระเงิน
    await page.locator('[data-test="checkout"]').click();

    // ทดสอบกรณีที่ไม่กรอกข้อมูลในฟอร์ม
    await page.locator('[data-test="continue"]').click();
    let errorMessage = page.locator(".error-message-container");
    await expect(errorMessage).toHaveText("Error: First Name is required");

    // กรอกแค่ First Name และทดสอบ
    await page.locator('[data-test="firstName"]').fill("chanayut");
    await page.locator('[data-test="continue"]').click();
    errorMessage = page.locator(".error-message-container");
    await expect(errorMessage).toHaveText("Error: Last Name is required");

    // กรอก Last Name และทดสอบ
    await page.locator('[data-test="lastName"]').fill("jumpee");
    await page.locator('[data-test="continue"]').click();
    errorMessage = page.locator(".error-message-container");
    await expect(errorMessage).toHaveText("Error: Postal Code is required");
  });
});
