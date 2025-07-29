import { test, expect, request } from '@playwright/test';

const baseURL = 'http://localhost:5000';

test.describe('API Tests', () => {
  test('POST /login - valid credentials', async ({ request }) => {
    const res = await request.post(`${baseURL}/login`, {
      data: { username: 'admin', password: 'password' }
    });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  test('POST /login - invalid credentials', async ({ request }) => {
    const res = await request.post(`${baseURL}/login`, {
      data: { username: 'admin', password: 'wrong' }
    });
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.success).toBe(false);
  });

  test('GET /items', async ({ request }) => {
    const res = await request.get(`${baseURL}/items`);
    expect(res.ok()).toBeTruthy();
    const items = await res.json();
    expect(Array.isArray(items)).toBe(true);
  });

  test('POST /items', async ({ request }) => {
    const res = await request.post(`${baseURL}/items`, {
      data: { text: 'Playwright Item' }
    });
    expect(res.status()).toBe(201);
    const item = await res.json();
    expect(item.text).toBe('Playwright Item');
    expect(item).toHaveProperty('id');
  });

  test('PUT /items/:id', async ({ request }) => {
    // First, create an item
    const createRes = await request.post(`${baseURL}/items`, {
      data: { text: 'To Edit' }
    });
    const item = await createRes.json();
    // Now, update it
    const updateRes = await request.put(`${baseURL}/items/${item.id}`, {
      data: { text: 'Edited Item' }
    });
    expect(updateRes.ok()).toBeTruthy();
    const updated = await updateRes.json();
    expect(updated.text).toBe('Edited Item');
  });

  test('DELETE /items/:id', async ({ request }) => {
    // First, create an item
    const createRes = await request.post(`${baseURL}/items`, {
      data: { text: 'To Delete' }
    });
    const item = await createRes.json();
    // Now, delete it
    const deleteRes = await request.delete(`${baseURL}/items/${item.id}`);
    expect(deleteRes.status()).toBe(204);
  });

  test('PUT /items/:id - negative (not found)', async ({ request }) => {
    const res = await request.put(`${baseURL}/items/99999`, {
      data: { text: 'Should Fail' }
    });
    expect(res.status()).toBe(404);
  });
});