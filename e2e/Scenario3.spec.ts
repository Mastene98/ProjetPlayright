import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.jettours.com/');
  await page.getByTestId('modalPrivacyAccept').click();
  await page.locator('button').filter({ hasText: 'Destinations' }).click();
  await page.locator('#bs-select-1-4').click();
  await page.locator('button').filter({ hasText: 'Ville de départ' }).click();
  await page.locator('#bs-select-2-8').click();
  await page.getByRole('textbox', { name: 'JJ/MM/AAAA' }).click();
  await page.getByRole('button', { name: 'Mois prochain' }).click();
  await page.getByRole('button', { name: '13' }).nth(1).click();
  await page.locator('button').filter({ hasText: 'Durée du séjour' }).click();
  await page.locator('#bs-select-4-3').click();
  await page.getByTestId('searchSubmit').click();
  await page.getByRole('checkbox', { name: 'Majorque' }).check();
  await page.getByRole('checkbox', { name: '3 * Sup' }).check();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Découvrir' }).click();
  const page1 = await page1Promise;
  await page1.locator('#image_1').click();
  await page1.getByRole('button', { name: 'Close gallery' }).click();
  await page1.getByText('1Sat A partir de 1 497€ 1 744').click();
  await page1.getByTestId('productToResaButton').click();
});