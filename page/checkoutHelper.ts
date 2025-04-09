import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  constructor(public page: Page) {}

  public get checkoutButton() {
    return this.page.locator('[data-test="checkout"]');
  }

  public get firstNameInput() {
    return this.page.locator('[data-test="firstName"]');
  }

  public get lastNameInput() {
    return this.page.locator('[data-test="lastName"]');
  }

  public get postalCodeInput() {
    return this.page.locator('[data-test="postalCode"]');
  }

  public get continueButton() {
    return this.page.locator('[data-test="continue"]');
  }

  public get finishButton() {
    return this.page.locator('[data-test="finish"]');
  }

  public get errorMessage() {
    return this.page.locator(".error-message-container");
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutForm(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async submitForm() {
    await this.continueButton.click();
  }

  async completeCheckout() {
    await this.finishButton.click();
  }

  async checkErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
}
