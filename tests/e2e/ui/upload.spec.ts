import { test, expect } from '@playwright/test';
import path from 'path';

test('should show loading status after uploading file', async ({ page }) => {
  await page.goto('/');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByText('Upload CSV record').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.resolve('./tests/fixtures/record.csv'));
  await expect(page.getByText("Analysing record ...")).toHaveCount(1);
});

test('should process file after uploading it', async ({ page }) => {
  await page.goto('/');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByText('Upload CSV record').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.resolve('./tests/fixtures/record.min.csv'));
  await expect(page.getByText("MEAN HEART RATE")).toHaveCount(1);
  await expect(page.getByText("MINIMUM HEART RATE")).toHaveCount(1);
  await expect(page.getByText("MAXIMUM HEART RATE")).toHaveCount(1);
  await expect(page.getByText("2bpm")).toHaveCount(1);  
});
