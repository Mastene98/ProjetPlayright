import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';



// Premier scenatio de test, parfois y'a des erreurs alors avec le mode debug aucun soucis 
// ou bien en augmantant le retry 
// et en vrai le probleme c est juste le temps d exec qui est par defaut a 30 sec 
// en l'ayyant augmenté a 120 sec on peut eviter les erreurs de timeout

test('Rechercher un sejour en Espagne depuis Paris', async ({ page }) => {

  const homePage = new HomePage(page);

  await homePage.ouvrir();
  await expect(page).toHaveURL(/jettours/);

  await homePage.accepterCookies();
  await expect(page.getByTestId('modalPrivacyAccept')).toBeHidden();

  await page.locator('button').filter({ hasText: 'Destinations' }).click();

  await page.getByRole('combobox', { name: 'Search' }).click();
  await homePage.saisirDestination('espa');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  await page.locator('button').filter({ hasText: 'Ville de départ' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('paris');
  await page.locator('#bs-select-2-8').click();
  await page.getByRole('textbox', { name: 'JJ/MM/AAAA' }).click();
  await page.getByText('7 jours').click();
  await page.getByRole('button', { name: '15' }).nth(1).click();
  await page.locator('button').filter({ hasText: 'Type de voyage' }).click();
  await page.locator('#bs-select-3-0').click();
  await page.locator('button').filter({ hasText: 'Durée du séjour' }).click();
  await page.locator('#bs-select-4-2').click();
  await page.getByTestId('searchSubmit').click();
  await expect(page).toHaveURL(/searchProduct/);

  await page.locator('#price-max').fill('1947');

  await page.getByRole('checkbox', { name: 'Catalogne' }).check();
  await page.getByRole('checkbox', { name: 'Malaga' }).check();
  await page.getByRole('checkbox', { name: 'Séjours' }).check();
  await page.getByRole('checkbox', { name: 'Hôtels' }).check();
  await page.getByRole('checkbox', { name: '4 * Sup' }).check();
  await page.locator('#listmeal').getByText('Petit Déjeuner').click();
  await page.locator('.select_tri').selectOption('base_price_desc');
  const page1Promise = page.waitForEvent('popup');

  await expect( page.locator('a').filter({ hasText: 'Htop Pineda Palace 4* sup' })).toBeVisible();
  await page.locator('a').filter({ hasText: 'Htop Pineda Palace 4* sup' }).click();

  const page1 = await page1Promise;
  await page1.locator('#image_1').click();
  await page1.getByRole('button', { name: 'Close gallery' }).click();
  await page1.getByTestId('calendar').getByTestId('price-min').click();
  await page1.getByTestId('productToResaButton').click();
  await page1.getByRole('button', { name: 'Retour au produit' }).click();
});