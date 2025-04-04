import { test, expect } from "@playwright/test";
import { login } from "../page/login";
import { removeItemFromCart } from "../page/cartHelper";
import { addToCart } from "../page/addtocart";

test.describe("User can add a product to the cart, remove it from the cart, and continue shopping after adding the item to the cart.", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await login(page, "standard_user", "secret_sauce");
    await addToCart(page, '[data-test="add-to-cart-sauce-labs-backpack"]');
  });

  test("user can add product to cart", async ({ page }) => {
    const cartItem = page.locator(".cart_list .cart_item");
    await expect(cartItem).toContainText("Sauce Labs Backpack");
  });

  test("user can remove product from cart", async ({ page }) => {
    await removeItemFromCart(page, '[data-test="remove-sauce-labs-backpack"]');
    const cartItemsCount = await page.locator(".cart_list .cart_item").count();
    expect(cartItemsCount).toBe(0);
  });
});
