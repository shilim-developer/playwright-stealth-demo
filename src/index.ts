import app from './app';
import playwright from 'playwright';
import { chromium } from 'playwright-extra';
import Stealth from 'puppeteer-extra-plugin-stealth';

const port = process.env.PORT || 5001;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

// 启动playwright
async function initPlaywright() {
  const browser = await playwright.chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:5001');
  await page.screenshot({ path: 'playwright.png' });
  await page.screenshot({ path: 'playwright-full.png', fullPage: true });
  browser.close();
}

// 启动无头playwright
async function initPlaywrightHeadless() {
  const browser = await playwright.chromium.launch({
    args: ['--headless=new', '--lang=zh-CN,zh'],
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:5001');
  await page.screenshot({ path: 'playwright-headless.png' });
  await page.screenshot({ path: 'playwright-headless-full.png', fullPage: true });
  browser.close();
}

initPlaywright();
initPlaywrightHeadless();

// 使用stealth
const stealthPlugin = Stealth();
stealthPlugin.enabledEvasions.delete('navigator.languages');
console.log(stealthPlugin.enabledEvasions);

chromium.use(stealthPlugin);

// 启动playwright
async function initPlaywrightStealth() {
  const browser = await chromium.launch({
    headless: false,
    // args: ['--headless=new','--lang=zh-CN,zh'],
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:5001');
  await page.screenshot({ path: 'playwright-stealth.png' });
  await page.screenshot({ path: 'playwright-stealth-full.png', fullPage: true });
  browser.close();
}

// 启动无头playwright
async function initPlaywrightHeadlessStealth() {
  const browser = await chromium.launch({
    // headless: true,
    args: ['--headless=new'],
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:5001');
  await page.screenshot({ path: 'playwright-headless-stealth.png' });
  await page.screenshot({ path: 'playwright-headless-stealth-full.png', fullPage: true });
  browser.close();
}

initPlaywrightStealth();
initPlaywrightHeadlessStealth();
