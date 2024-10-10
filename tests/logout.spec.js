import { test, expect } from 'playwright-test-coverage';
import { mockLoginService } from './mockService';

test('logout', async ({ page }) => {
    await mockLoginService(page);
  
    await page.goto('/');
  
   // Go to login page
   await page.getByRole('link', { name: 'Login' }).click();
  
   // Login
   await page.getByPlaceholder('Email address').click();
   await page.getByPlaceholder('Email address').fill('d@jwt.com');
   await page.getByPlaceholder('Email address').press('Tab');
   await page.getByPlaceholder('Password').fill('a');
   await page.getByRole('button', { name: 'Login' }).click();

   // Logout
    await page.getByRole('link', { name: 'Logout' }).click();

    expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  });