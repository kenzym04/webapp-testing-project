import { test, expect } from '@playwright/test';

function uniqueText(base: string) {
  return `${base} ${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

test.describe('Todo App UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
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
});