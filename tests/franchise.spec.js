import { test, expect } from 'playwright-test-coverage';
import { mockAdminLoginService, mockAdminFranchises } from './mockService';

test('create a franchise', async ({ page }) => {
    await mockAdminLoginService(page);
    await mockAdminFranchises(page);
    //await mockCreateFranchiseService(page);
  
    await page.goto('/');
  
    // Go to login page
    await page.getByRole('link', { name: 'Login' }).click();
  
    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'Admin' }).click();

    await expect(page.getByText('Keep the dough rolling and the franchises signing up.')).toBeVisible();
    await page.getByRole('button', { name: 'Add Franchise' }).click();

    // Create Franchise
    await page.getByPlaceholder('franchise name').click();
    await page.getByPlaceholder('franchise name').fill('Franchise 1');
    await page.getByPlaceholder('franchisee admin email').click();
    await page.getByPlaceholder('franchisee admin email').fill('d@jwt.com');
    await page.getByRole('button', { name: 'Create' }).click();

    // Check franchise
    await expect(page.getByRole('cell', { name: 'Franchise 1' })).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
  });