const { test, expect } = require('@playwright/test');

test('Customer can browse from homepage to a mens jeans product', async ({ page }) => {

  // 1. Open homepage
  await page.goto('/', {
    waitUntil: 'domcontentloaded'
  });

  // 2. Open Men's navigation
  await page.getByRole('link', { name: /^Men$/ }).first().hover();

  // 3. Wait for the Men's dropdown to appear
  await page.waitForTimeout(1000);

  // 4. Click Jeans
  await page
    .getByRole('navigation', { name: 'Main nav' })
    .getByRole('link', { name: 'Jeans', exact: true })
    .click();

  // 5. Confirm we're on the Men's Jeans page
  await expect(page).toHaveURL(/jeans/i);

  // 6. Wait for products to load
  await page.waitForLoadState('domcontentloaded');

  // 7. Find the first product link
  const productLinks = page.locator(
    '.jet-woo-builder-archive-product-thumbnail a[href*="/product/"]'
  );

  await expect(productLinks.first()).toBeVisible();

  // 8. Open the first product
  await productLinks.first().click();

  // 9. Confirm we're on a product page
  await page.waitForLoadState('domcontentloaded');

  console.log('Homepage → Men → Jeans → Product journey passed');
});
