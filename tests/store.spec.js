import { test, expect } from 'playwright-test-coverage';
import { mockAdminLoginService, mockAdminStores } from './mockService';

test('create a store', async ({ page }) => {
    await mockAdminLoginService(page);
    await mockAdminStores(page);
  
    await page.goto('/');
  
    // Go to login page
    await page.getByRole('link', { name: 'Login' }).click();
  
    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
    const franchiseLinks =  page.getByRole('link', { name: 'Franchise' });
    await franchiseLinks.first().click();

    await expect(page.getByText('Franchise 1')).toBeVisible();
    await page.getByRole('button', { name: 'Create Store' }).click();

    // Create Franchise
    await page.getByPlaceholder('store name').click();
    await page.getByPlaceholder('store name').fill('Store 1');
    await page.getByRole('button', { name: 'Create' }).click();
  });