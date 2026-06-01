import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async ouvrir() {
    await this.page.goto('https://www.jettours.com/');
  }

  async accepterCookies() {
    const boutonCookies = this.page.getByTestId('modalPrivacyAccept');

    if (await boutonCookies.isVisible().catch(() => false)) {
      await boutonCookies.click();
    }
  }

  async refuserCookies() {
    const boutonCookies = this.page.getByTestId('modalPrivacyDecline');

    if (await boutonCookies.isVisible().catch(() => false)) {
      await boutonCookies.click();
    }
  }

  async destinations() {
    await this.page.locator('button').filter({ hasText: 'Destinations' }).click();
  }

  async saisirDestination(destination: string) {
    await this.page.getByRole('combobox', { name: 'Search' }).fill(destination);
  }



}