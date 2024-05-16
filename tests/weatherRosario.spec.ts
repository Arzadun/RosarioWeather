import { test, expect, Page } from '@playwright/test';
import { Login } from './pageObjects/Login';
import { Home } from './pageObjects/Home';
import { timeStamp } from 'console';

let message: string;

test.beforeAll(async ({request, browser }) => {
  const response = await request.get("https://api.open-meteo.com/v1/forecast?latitude=-32.9468&longitude=-60.6393&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=1")

  expect(response.status()).toBe(200);
  
  let responseBody = await response.json();

  let maxTemperature = `${responseBody.daily.temperature_2m_max[0]} ${responseBody.daily_units.temperature_2m_max}`;
  let minTemperature = `${responseBody.daily.temperature_2m_min[0]} ${responseBody.daily_units.temperature_2m_min}`;
  let sunrise = responseBody.daily.sunrise[0].split("T")[1];
  let sunset = responseBody.daily.sunset[0].split("T")[1];
 
  
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
  
  message = `Good morning!\nIn Rosario city, today's forecast predicts a maximum temperature of ${maxTemperature} and a minimum of ${minTemperature}.\nSunrise is at ${sunrise}hs, and sunset will be at ${sunset}hs.\nEnjoy the day!`;

});


test.beforeEach(async ({ page}) => {

  const login = new Login(page);

  await page.goto('https://twitter.com/i/flow/login');
  await login.loginIntoAccount();
  if (!(await login.securityCheckIsDisplayed())) {
    await login.validateUserIsLoggedIn();
 } else {
   await login.bypassCheck();
 }
});

test('Create and delete post', async ({ page }) => {

  const home = new Home(page);
  await home.createPost(message);
  await home.validatePostIsCreated();
  await home.deletePost();
  await home.validatePostIsDeleted();
  
});

test('Create post', async ({ page }) => {

  const home = new Home(page);
  await home.createPost(message);
  await home.validatePostIsCreated();

});

test('Logout', async ({ page }) => {

  const home = new Home(page);
  await home.logout();
  await home.validateUserisLoggedOut();
});
