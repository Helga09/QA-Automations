const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

let driver;

Given('I open the login page', async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('http://localhost/QA-Automations/QA-Automations/public/login.html');
});

When('I enter valid credentials', async () => {
  await driver.findElement(By.id('email')).sendKeys('admin@gmail.com');
  await driver.findElement(By.id('password')).sendKeys('password');
});

When('I enter invalid credentials', async () => {
  await driver.findElement(By.id('email')).sendKeys('user@example.com');
  await driver.findElement(By.id('password')).sendKeys('wrongpassword');
});

When('I submit the form', async () => {
  await driver.findElement(By.css('button[type="submit"]')).click();
});

Then('I should be redirected to the profile page', async () => {
  await driver.wait(until.urlContains('profile.html'), 5000);
  const currentUrl = await driver.getCurrentUrl();
  assert(currentUrl.includes('profile.html'));
  await driver.quit();
});

Then('I should see an error message', async () => {
  await driver.wait(until.elementLocated(By.id('error')), 3000);
  const errorText = await driver.findElement(By.id('error')).getText();
  assert(errorText.length > 0);
  await driver.quit();
});
