import { test, expect } from '@playwright/test';

const apiUrl = process.env.DEMOBLAZE_API_URL ?? 'https://api.demoblaze.com';
const samsungTitle = 'Samsung galaxy s6';
const demoUser = { username: 'aaaa', password: 'YWFhYQ==' };

type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductResponse = {
  Items: Product[];
};

type CartItem = {
  cookie: string;
  id: string;
  prod_id: number;
};

type CartResponse = {
  Items: CartItem[];
};

test('C1 Add a Product and Check the Cart', async ({ request }) => {
  const cartId = globalThis.crypto.randomUUID();
  let cookie: string | undefined;
  let cartMayContainItems = false;

  try {
    const loginResponse = await request.post(`${apiUrl}/login`, { data: demoUser });
    expect(loginResponse.status()).toBe(200);

    const loginBody = (await loginResponse.json()) as string;
    expect(loginBody).toContain('Auth_token:');
    cookie = loginBody.match(/Auth_token:\s*([^"]+)/)?.[1];
    expect(cookie).toBeTruthy();
    if (!cookie) {
      throw new Error('The login response did not include an auth token');
    }

    const productsResponse = await request.get(`${apiUrl}/entries`);
    expect(productsResponse.status()).toBe(200);

    const productResponse = (await productsResponse.json()) as ProductResponse;
    const samsung = productResponse.Items.find(
      (product) => product.title.toLowerCase() === samsungTitle.toLowerCase(),
    );
    expect(samsung).toBeDefined();
    if (!samsung) {
      throw new Error(`${samsungTitle} was not found in the product catalogue`);
    }
    expect(samsung.title).toBe(samsungTitle);
    expect(samsung.price).toBeGreaterThan(0);

    cartMayContainItems = true;
    const addResponse = await request.post(`${apiUrl}/addtocart`, {
      data: {
        id: cartId,
        cookie,
        prod_id: samsung.id,
        flag: true,
      },
    });
    expect(addResponse.status()).toBe(200);

    const cartResponse = await request.post(`${apiUrl}/viewcart`, {
      data: { cookie, flag: true },
    });
    expect(cartResponse.status()).toBe(200);

    const cart = (await cartResponse.json()) as CartResponse;
    // The demo account is shared, so /viewcart can include rows left by other runs.
    // Only assert on the row created with this test's unique cart ID.
    const testCartItems = cart.Items.filter((item) => item.id === cartId);
    expect(testCartItems).toHaveLength(1);

    const [cartItem] = testCartItems;
    expect(cartItem).toMatchObject({
      cookie: demoUser.username,
      id: cartId,
      prod_id: samsung.id,
    });

  } finally {
    if (cartMayContainItems) {
      const cleanupResponse = await request.post(`${apiUrl}/deletecart`, {
        data: { cookie },
      });
      expect(cleanupResponse.status()).toBe(200);
    }
  }
});
