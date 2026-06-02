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
    try {
      await boutonCookies.waitFor({ state: 'visible', timeout: 10000 });
      await boutonCookies.click();
      await boutonCookies.waitFor({ state: 'hidden', timeout: 10000 }); // ← attendre fermeture
    } catch {
      // pas de modal, on continue
    }
  }

  async refuserCookies() {
    const boutonCookies = this.page.getByTestId('modalPrivacyDecline');

    if (await boutonCookies.isVisible().catch(() => false)) {
      await boutonCookies.click();
    }
  }



  async saisirDestination(destination: string) {
    await this.page.getByRole('combobox', { name: 'Search' }).fill(destination);
  }



}