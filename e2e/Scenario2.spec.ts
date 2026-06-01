import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';



test('Sejour bon plans crete depuis paris', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.ouvrir();
  await homePage.refuserCookies();

  await page.getByRole('button', { name: 'Les bons plans ' }).click();
  await page.getByTestId('menu').getByRole('link', { name: 'Crète' }).click();

  await page.locator('button').filter({ hasText: 'Ville de départ' }).click();
  await page.locator('#bs-select-2-6').click();

  await page.getByRole('textbox', { name: 'JJ/MM/AAAA' }).click();
  await page.getByText('15 jours').click();
  await page.getByRole('button', { name: 'Mois prochain' }).click();
  await page.getByRole('button', { name: '14' }).nth(1).click();

  await page.locator('#listFORMULE').getByText('Croisières').click();
  await page.locator('#listGAMME').getByText('Jet tours Signature').click();
  await page.locator('#listGAMME').getByText('Club Coralia', { exact: true }).click();

  await page.getByRole('checkbox', { name: 'Jet tours Signature' }).uncheck();
  await page.getByRole('checkbox', { name: 'Croisières' }).uncheck();
  await page.getByRole('checkbox', { name: 'Club Coralia' }).uncheck();

  await page.getByRole('checkbox', { name: 'Croisières' }).check();
  await page.getByRole('checkbox', { name: 'Séjours' }).check();
  await page.getByRole('checkbox', { name: '4 *', exact: true }).check();
  await page.getByRole('checkbox', { name: '3 *' }).check();
  await page.getByRole('checkbox', { name: '5 *' }).check();
  await page.getByRole('checkbox', { name: '3 *', exact: true }).uncheck();
  await page.getByRole('checkbox', { name: 'Adult Only' }).check();

  await page.getByRole('checkbox', { name: 'Petit Déjeuner' }).check();
  await page.getByRole('checkbox', { name: 'Pension Complète' }).check();
  await page.getByRole('checkbox', { name: 'Petit Déjeuner' }).uncheck();

  await page.locator('#listmeal').getByText('Pension Complète').click();

  await page.locator('.select_tri').selectOption('base_price_desc');
  await page.locator('.select_tri').selectOption('base_price');

  const page1Promise = page.waitForEvent('popup');
  await page.locator('a').filter({ hasText: 'Saint George Gournes Bay 4*' }).click();
  const page1 = await page1Promise;

  await page1.locator('#image_3').click();
  await page1.getByRole('button', { name: 'View actual size' }).click();
  await page1.locator('.lg-object').first().click();
  await page1.getByRole('button', { name: 'Close gallery' }).click();

  await page1.locator('#image_3').click();
  await page1.getByRole('button', { name: 'Next slide' }).click();
  await page1.getByRole('button', { name: 'Next slide' }).click();
  await page1.getByRole('button', { name: 'Next slide' }).click();
  await page1.getByRole('button', { name: 'Close gallery' }).click();

  await page1.getByRole('link', { name: 'Descriptif' }).click();
  await page1.getByRole('link', { name: 'Destination', exact: true }).click();
  await page1.getByRole('link', { name: 'Résumé' }).click();

  await page1.locator('p').filter({ hasText: 'mer. 3 juin 26 sam. 6 juin' }).first()
    .evaluate((element) => {
      const bloc = element.closest('div') as HTMLElement;
      bloc.click();
    });

  await page1.getByTestId('productToResaButton').click();

  // Gestion de la popup Information si elle apparaît
  const boutonContinuer = page1.getByRole('button', { name: 'Continuer' });

  await boutonContinuer.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

  if (await boutonContinuer.isVisible().catch(() => false)) {
    await boutonContinuer.click();
  }

  await page1.goto('https://resa.jettours.com/salesprocess-v3/quotedRateDetails.to?profile=WBWPwBmq9XDXeNuNdGQ7Rtq8y3IvIOzDjNeCHkf5L8DjqyKz7jRbxEI80ioWc%2FxeCAMcIbkCTJU%3D&allElementsMatched=true#/srn_quote');

  await page1.getByRole('radio', { name: 'x Chambre 1 adulte' }).check();

  await page1.getByRole('group')
    .filter({ hasText: '5BagagesAjouter des' })
    .getByLabel('Voir plus')
    .click();

  await page1.locator('.placeholder').first().click();
  await page1.getByRole('button', { name: 'Fermer la fenêtre' }).click();

  await page1.getByRole('button', { name: 'Ajouter des bagages' }).click();
  await page1.getByRole('button', { name: 'Fermer la fenêtre' }).click();

  await page1.getByRole('radio', { name: 'Chambre 2 adultes' }).check();
});