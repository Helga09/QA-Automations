const { Given, When, Then, After } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

let driver;
let userDataDir;

async function createDriver() {
  userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-user-data-'));
  const options = new chrome.Options();
  options.addArguments(
    `--user-data-dir=${userDataDir}`,
    '--headless',
    '--no-sandbox',
    '--disable-dev-shm-usage'
  );
  return await new Builder().forBrowser('chrome').setChromeOptions(options).build();
}

Given('I open the login page', async () => {
  driver = await createDriver();
  await driver.get('http://localhost:3000/login.html');
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
});

Then('I should see an error message', async () => {
  const errorElement = await driver.findElement(By.css('.error-message'));
  const errorText = await errorElement.getText();
  assert(errorText.length > 0);
});

After(async () => {
  if (driver) {
    await driver.quit();
    driver = null;
  }
  if (userDataDir) {
    fs.rmSync(userDataDir, { recursive: true, force: true });
    userDataDir = null;
  }
});
