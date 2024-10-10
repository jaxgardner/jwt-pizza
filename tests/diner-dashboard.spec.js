import { test, expect } from 'playwright-test-coverage';
import { mockLoginService, mockGetOrderService} from './mockService';

test('purchase with login', async ({ page }) => {
    await mockLoginService(page);
    await mockGetOrderService(page);
  
    await page.goto('/');
  
   // Go to login page
   await page.getByRole('link', { name: 'Login' }).click();
  
   // Login
   await page.getByPlaceholder('Email address').click();
   await page.getByPlaceholder('Email address').fill('d@jwt.com');
   await page.getByPlaceholder('Email address').press('Tab');
   await page.getByPlaceholder('Password').fill('a');
   await page.getByRole('button', { name: 'Login' }).click();

   // Go to dashboard page
    await page.getByRole('link', { name: 'KC' }).click();
    expect(page.getByText('Your pizza kitchen')).toBeVisible();
    expect(page.getByText('Kai Chen')).toBeVisible();
    expect(page.getByText('d@jwt.com')).toBeVisible();
    expect(page.getByText('diner', { exact: true })).toBeVisible();
  });