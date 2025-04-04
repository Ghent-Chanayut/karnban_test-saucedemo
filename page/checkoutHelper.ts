// checkoutHelper.ts
// checkoutHelper.ts
import { expect, type Page } from "@playwright/test";

export async function fillCheckoutForm(
  page: Page,
  firstName: string,
  lastName: string,
  postalCode: string
) {
  await page.locator('[data-test="firstName"]').fill(firstName);
  await page.locator('[data-test="lastName"]').fill(lastName);
  await page.locator('[data-test="postalCode"]').fill(postalCode);
  await page.locator('[data-test="continue"]').click();
}

export async function completeCheckout(page: Page) {
  await page.locator('[data-test="finish"]').click();
  const thankYouMessage = page.locator(".complete-header");
  await expect(thankYouMessage).toHaveText("Thank you for your order!");
}
