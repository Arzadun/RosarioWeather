import { test, expect } from '@playwright/test';
import { HomeAccuweather } from './pageObjects/HomeAccuweather';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
// wheaterRosario 123five6
test('get started link', async ({ page, request }) => {

  const homeAccuweather = new HomeAccuweather(page);

  //await page.goto('https://www.timeanddate.com/weather/?query=');
  //await page.waitForNavigation();
  //await homeAccuweather.searchLocation("rosario")
  const response = await request.get("https://api.open-meteo.com/v1/forecast?latitude=-32.9468&longitude=-60.6393&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=auto&forecast_days=1")

  expect(response.status()).toBe(200);
  
  console.log(await response.json());

  // Click the get started link.
 // await page.getByRole('link', { name: 'Get started' }).click();
 await page.pause();
  // Expects page to have a heading with the name of Installation.
 // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
