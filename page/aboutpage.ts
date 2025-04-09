import { Page, expect } from "@playwright/test";

export class AboutPage {
  constructor(private page: Page) {}

  async openAboutPage() {
    await this.page.getByRole("button", { name: "Open Menu" }).click();
    await this.page.locator('[data-test="about-sidebar-link"]').click();
  }
}
