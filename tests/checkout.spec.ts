import { test, expect } from "@playwright/test";
import { login } from "../page/login";
import { CheckoutPage } from "../page/checkoutHelper";
import { addToCart } from "../page/addtocart";

test.describe("user can checkout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await login(page, "standard_user", "secret_sauce");
    await addToCart(page, '[data-test="add-to-cart-sauce-labs-backpack"]');
  });

  test("user can checkout complete after add item to cart", async ({
    page,
  }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.startCheckout();
    await checkoutPage.fillCheckoutForm("Admin", "Admin", "Admin");
  });

  test("should show error message when checkout form is incomplete", async ({
    page,
  }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.startCheckout();
    await checkoutPage.submitForm();
    await checkoutPage.checkErrorMessage("Error: First Name is required");

    await checkoutPage.firstNameInput.fill("chanayut");
    await checkoutPage.submitForm();
    await checkoutPage.checkErrorMessage("Error: Last Name is required");

    await checkoutPage.lastNameInput.fill("jumpee");
    await checkoutPage.submitForm();
    await checkoutPage.checkErrorMessage("Error: Postal Code is required");
  });
});
