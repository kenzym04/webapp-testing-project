import { test, expect } from '@playwright/test';

function uniqueText(base: string) {
  return `${base} ${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

test.describe('Todo App UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Fill login form
    await page.fill('input[placeholder="Username"]', 'admin');
    await page.fill('input[placeholder="Password"]', 'password');
    await page.click('button:has-text("Login")');
    // Wait for todo input to appear
    await page.waitForSelector('input[placeholder="New item"]');
  });

  test('Add a new item', async ({ page }) => {
    const itemText = uniqueText('UI Test Item');
    await page.fill('input[placeholder="New item"]', itemText);
    await page.click('button:has-text("Add")');
    await expect(page.locator('li', { hasText: itemText })).toHaveCount(1);
  });

  test('Add item with empty text (should not add)', async ({ page }) => {
    const countBefore = await page.locator('li').count();
    await page.fill('input[placeholder="New item"]', '');
    await page.click('button:has-text("Add")');
    // Try to click Save if an input appears (should not in this case)
    const editInput = page.locator('li input');
    if (await editInput.count() > 0) {
      await page.locator('button:has-text("Save")').click();
    }
    const countAfter = await page.locator('li').count();
    expect(countAfter).toBe(countBefore);
  });

  test('Edit an item', async ({ page }) => {
    const originalText = uniqueText('Edit Me');
    const editedText = uniqueText('Edited via UI');
    await page.fill('input[placeholder="New item"]', originalText);
    await page.click('button:has-text("Add")');
    // Click Edit for the correct item
    await page.locator('li', { hasText: originalText }).first().locator('button:has-text("Edit")').click();
    // Wait for any input to appear (global, not just inside item)
    const input = page.locator('input').last();
    await input.waitFor({ state: 'visible', timeout: 5000 });
    await input.fill(editedText);
    await page.locator('button:has-text("Save")').click();
    await expect(page.locator('li', { hasText: editedText })).toHaveCount(1);
  });

  test('Delete an item', async ({ page }) => {
    const itemText = uniqueText('Delete Me');
    await page.fill('input[placeholder="New item"]', itemText);
    await page.click('button:has-text("Add")');
    const item = page.locator('li', { hasText: itemText }).first();
    await item.locator('button:has-text("Delete")').click();
    await expect(page.locator('li', { hasText: itemText })).toHaveCount(0);
  });

  test('Presence of expected data after actions', async ({ page }) => {
    const itemText = uniqueText('Presence Test');
    await page.fill('input[placeholder="New item"]', itemText);
    await page.click('button:has-text("Add")');
    await expect(page.locator('li', { hasText: itemText })).toHaveCount(1);
  });

  test.describe('Todo App - Edge Case UI Tests', () => {
  test('should not add an empty or whitespace-only todo', async ({ page }) => {
    const countBefore = await page.locator('li').count();
    await page.fill('input[placeholder="New item"]', '   ');
    await page.getByRole('button', { name: 'Add' }).click();
    const countAfter = await page.locator('li').count();
    expect(countAfter).toBe(countBefore);
  });

  test('should handle a very long todo item', async ({ page }) => {
    const longText = 'A'.repeat(1000);
    await page.fill('input[placeholder="New item"]', longText);
    await page.getByRole('button', { name: 'Add' }).click();
    const addedItem = await page.locator('li').last();
    await expect(addedItem).toContainText(longText);
  });

  test('should safely display special characters in todo item', async ({ page }) => {
    const xss = `<img src=x onerror=alert("XSS") />`;
    await page.fill('input[placeholder="New item"]', xss);
    await page.getByRole('button', { name: 'Add' }).click();
    const addedItem = await page.locator('li').last();
    await expect(addedItem).toContainText(xss);
  });

  test('should allow deleting the last item without errors', async ({ page }) => {
    const uniqueText = `Only item ${Date.now()}`;
    await page.fill('input[placeholder="New item"]', uniqueText);
    await page.getByRole('button', { name: 'Add' }).click();
    await page.locator('li', { hasText: uniqueText }).getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator('li', { hasText: uniqueText })).toHaveCount(0);
  });

});

});