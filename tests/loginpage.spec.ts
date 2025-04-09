import { test, expect, type Page } from "@playwright/test";
import { login, logout } from "../page/login";

test.describe("ผู้ใช้สามารถเข้าสู่ระบบได้สำเร็จด้วยชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await login(page, "standard_user", "secret_sauce");
  });

  test("ผู้ใช้สามารถเข้าสู่ระบบได้สำเร็จด้วยชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง", async ({
    page,
  }) => {
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("ผู้ใช้สามารถออกจากระบบ", async ({ page }) => {
    await logout(page);
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });
});

test.describe("ผู้ใช้ไม่สามารถเข้าสู่ระบบได้สำเร็จด้วยชื่อผู้ใช้และรหัสผ่านที่ไม่ถูกต้อง", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await login(page, "xxx@#$@!$123xx", "xxx@#$@!$123xx");
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test("กรอกชื่อผู้ใช้และรหัสผ่านที่ไม่ถูกต้อง", async ({ page }) => {
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("กรอกชื่อผู้ใช้และรหัสผ่านที่มีอักขระพิเศษ", async ({ page }) => {
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
