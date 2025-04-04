import { test, expect, type Page } from "@playwright/test";
import { login } from "../page/login"; // นำเข้าฟังก์ชัน login

// ทดสอบการเข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง
test.describe("ผู้ใช้สามารถเข้าสู่ระบบได้สำเร็จด้วยชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง", () => {
  // ทำการล็อกอินก่อนการทดสอบทุกครั้ง
  test.beforeEach(async ({ page }: { page: Page }) => {
    await login(page, "standard_user", "secret_sauce");
  });

  // ทดสอบการเข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง
  test("กรอกชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง", async ({ page }) => {
    // ตรวจสอบว่า element ของหน้าหลักแสดงผลได้ถูกต้อง
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });

  // ทดสอบการออกจากระบบ
  test("ผู้ใช้สามารถออกจากระบบ", async ({ page }) => {
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });
});

// ทดสอบกรณีที่ไม่สามารถเข้าสู่ระบบได้สำเร็จด้วยชื่อผู้ใช้และรหัสผ่านที่ไม่ถูกต้อง
test.describe("ผู้ใช้ไม่สามารถเข้าสู่ระบบได้สำเร็จด้วยชื่อผู้ใช้และรหัสผ่านที่ไม่ถูกต้อง", () => {
  // ทำการล็อกอินก่อนการทดสอบทุกครั้งด้วยข้อมูลที่ไม่ถูกต้อง
  test.beforeEach(async ({ page }: { page: Page }) => {
    await login(page, "xxx@#$@!$123xx", "xxx@#$@!$123xx");
    // ตรวจสอบว่าอยู่ในหน้าที่กรอกข้อมูลเข้าสู่ระบบ
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  // ทดสอบการกรอกชื่อผู้ใช้และรหัสผ่านที่ไม่ถูกต้อง
  test("กรอกชื่อผู้ใช้และรหัสผ่านที่ไม่ถูกต้อง", async ({ page }) => {
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  // ทดสอบการกรอกชื่อผู้ใช้และรหัสผ่านที่มีอักขระพิเศษ
  test("กรอกชื่อผู้ใช้และรหัสผ่านที่มีอักขระพิเศษ", async ({ page }) => {
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
