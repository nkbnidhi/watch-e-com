const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testLoginRegister() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    const baseUrl = 'http://localhost:3000';
    const username = 'testuser' + Date.now();
    const password = 'password123';

    // Register
    await driver.get(baseUrl + '/register.html');
    await driver.findElement(By.name('username')).sendKeys(username);
    await driver.findElement(By.name('password')).sendKeys(password);
    await driver.findElement(By.css('button')).click();

    // Wait and login
    await driver.wait(until.urlContains('login.html'), 2000);
    await driver.findElement(By.name('username')).sendKeys(username);
    await driver.findElement(By.name('password')).sendKeys(password);
    await driver.findElement(By.css('button')).click();

    // Check if redirected to index
    await driver.wait(until.urlContains('index.html'), 3000);
    const url = await driver.getCurrentUrl();
    assert(url.includes('index.html'));

    console.log('✅ Test passed!');
  } catch (err) {
    console.error('❌ Test failed:', err);
  } finally {
    await driver.quit();
  }
})();
