import { test, expect } from '@playwright/test';
import { Login } from './pageObjects/login';
import { Home } from './pageObjects/Home';
import { timeStamp } from 'console';


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
})

test('get started link', async ({ page, request }) => {


  const response = await request.get("https://api.open-meteo.com/v1/forecast?latitude=-32.9468&longitude=-60.6393&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=1")

  expect(response.status()).toBe(200);
  
  let responseBody = await response.json();

  let maxTemperature = `${responseBody.daily.temperature_2m_max[0]} ${responseBody.daily_units.temperature_2m_max}`;
  let minTemperature = `${responseBody.daily.temperature_2m_min[0]} ${responseBody.daily_units.temperature_2m_min}`;
  let sunrise = responseBody.daily.sunrise[0].split("T")[1];
  let sunset = responseBody.daily.sunset[0].split("T")[1];
 
  const message = `Good morning!\nIn Rosario city, today's forecast predicts a maximum temperature of ${maxTemperature} and a minimum of ${minTemperature}.\nSunrise is at ${sunrise}hs, and sunset will be at ${sunset}hs.\nEnjoy the day!`;

  const login = new Login(page);
  const home = new Home(page);

  await page.goto('https://twitter.com/i/flow/login');
  //await page.waitForNavigation();
  
  await login.loginIntoAccount();
  await home.createPost(message);
  


  //const pageText = await page.textContent('body');

  //expect(pageText).toContain(message);
  
 await page.pause();
  
  

  


  //TODO: add wheater code to parameter and add that info weather_code, add assertions, add delete post functionality
  /*

WMO Weather interpretation codes (WW)
Code	Description
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
(*) Thunderstorm forecast with hail is only available in Central Europe
  */
  
  // Click the get started link.
 // await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
 // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
