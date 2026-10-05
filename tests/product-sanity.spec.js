const { test, expect } = require('@playwright/test');

const products = [
  {
    name: 'The Pitch Loose Jeans',
    url: '/product/the-pitch-loose-jeans-2/',
  },
  {
    name: 'The Beat 70S Inspired Bootcut',
    url: '/product/the-beat-70s-inspired-bootcut/',
  },
];

for (const product of products) {
  test(`Product sanity: ${product.name}`, async ({ page }) => {
    const response = await page.goto(product.url, { waitUntil: 'domcontentloaded' });
    const productPage = page.locator('.elementor-location-single');

    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveURL(new URL(product.url, 'https://scotch-soda.co.za').href);

    const name = productPage.locator('h5.ha-page-title');
    await expect(name).toBeVisible();
    await expect(name).toHaveText(product.name);

    await expect(productPage.locator('p.price')).toContainText(/R\s?[\d,]+\.\d{2}/);

    const description = productPage
      .locator('.jet-listing-dynamic-field__content')
      .filter({ hasText: /\b\d+%\s+(cotton|lyocell)\b/i })
      .first();
    await expect(description).toBeVisible();

    const mainImage = productPage.locator('img.wp-post-image').filter({ visible: true }).first();
    await expect(mainImage).toBeVisible();
    expect(await mainImage.evaluate(image => image.naturalWidth)).toBeGreaterThan(0);

    const sizeRow = productPage.locator('.variations tr').filter({ hasText: 'Size' });
    const sizes = sizeRow.locator('[role="radio"]');
    if (await sizes.count()) {
      await expect(sizes.first()).toBeVisible();
      const anotherSize = sizes.locator('[aria-checked="false"]').first();
      if (await anotherSize.count()) {
        await anotherSize.click();
        await expect(anotherSize).toHaveAttribute('aria-checked', 'true');
      }
    }

    const isInStock = await productPage.evaluate(element => element.classList.contains('instock'));
    const isOutOfStock = await productPage.evaluate(element => element.classList.contains('outofstock'));
    expect(isInStock || isOutOfStock).toBeTruthy();

    const addToBasket = productPage.getByRole('button', { name: /add to basket/i });
    await expect(addToBasket).toBeVisible();
    if (isInStock) {
      await expect(addToBasket).toBeEnabled();
    } else {
      await expect(addToBasket).toBeDisabled();
    }
  });
}
