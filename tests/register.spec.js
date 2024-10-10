import { test, expect } from 'playwright-test-coverage';
import { mockRegisterService} from './mockService';

test('register a user', async ({ page }) => {
    await mockRegisterService(page);
  
    await page.goto('/');
  
    // Go to login page
    await page.getByRole('link', { name: 'Register' }).click();
  
    // Register
    await page.getByPlaceholder('Full name').fill('Kai Chen');
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Register' }).click();

    expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  });