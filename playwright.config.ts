import { defineConfig } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: process.env.BASE_URL ?? 'https://practicesoftwaretesting.com',
    browserName: 'chromium',
    trace: 'retain-on-failure',
  },
});
