// login.ts
import type { Page } from "@playwright/test";

export async function login(page: Page, username: string, password: string) {
  await page.goto("https://www.saucedemo.com/");
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
}
