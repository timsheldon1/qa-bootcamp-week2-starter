
import { test, expect } from '@playwright/test';

const apiUrl = 'https://api.practicesoftwaretesting.com';

test('products API returns a list of products', async ({ request }) => {
  const response = await request.get(`${apiUrl}/products`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data[0]).toHaveProperty('name');
});

test('creates a cart and adds a product', async ({ request }) => {
  let cartId: string | undefined;

  try {
    const createCartResponse = await request.post(`${apiUrl}/carts`);
    const cart = await createCartResponse.json();
    cartId = typeof cart.id === 'string' ? cart.id : undefined;

    expect(createCartResponse.status()).toBe(201);
    expect(cart).toEqual({ id: expect.any(String) });

    const productsResponse = await request.get(`${apiUrl}/products`);
    expect(productsResponse.status()).toBe(200);
    const products = await productsResponse.json();
    const productId = products.data[0].id;
    expect(productId).toEqual(expect.any(String));

    const addProductResponse = await request.post(`${apiUrl}/carts/${cartId}`, {
      data: { product_id: productId, quantity: 1 },
    });
    expect(addProductResponse.status()).toBe(200);

    const addProductResult = await addProductResponse.json();
    expect(addProductResult).toEqual({ result: 'item added or updated' });
  } finally {
    if (cartId) {
      const deleteCartResponse = await request.delete(`${apiUrl}/carts/${cartId}`);
      expect(deleteCartResponse.status()).toBe(204);
    }
  }
});

test('returns 404 for a cart id that does not exist', async ({ request }) => {
  const missingCartId = `missing-cart-${Date.now()}-${Math.random()}`;
  const response = await request.get(`${apiUrl}/carts/${missingCartId}`);

  expect(response.status()).toBe(404);
});
