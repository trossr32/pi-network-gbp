const { chromium } = require('playwright');
const fs = require('fs');

function parseMeta(metaString) {
  const exchangeRateMatch = metaString.match(/live price of Pi Network is £([\d.]+)/i);
  const percentageMatch = metaString.match(/PI price has (increased|decreased) by ([\d.]+)%/i);
  const marketCapMatch = metaString.match(/market cap of £([\d.]+)([MB])/i);

  if (!exchangeRateMatch || !percentageMatch || !marketCapMatch) {
    throw new Error("Failed to parse one or more required values from meta string.");
  }

  const exchangeRateGBP = parseFloat(exchangeRateMatch[1]);
  const percentageChange = parseFloat(percentageMatch[2]) * (percentageMatch[1] === 'decreased' ? -1 : 1);

  const capValue = parseFloat(marketCapMatch[1]);
  const capUnit = marketCapMatch[2];
  const marketCapGBP = capUnit === 'B' ? capValue * 1_000_000_000 : capValue * 1_000_000;

  return {
    exchangeRateGBP,
    marketCapGBP: Math.round(marketCapGBP),
    percentageChange,
    lastUpdated: new Date().toISOString()
  };
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://www.okx.com/en-us/price/pi-network-pi', { waitUntil: 'domcontentloaded' });

    const gbpButton = page.locator('button:has(span:text("GBP"))');
    if (await gbpButton.count() === 0) throw new Error("GBP button not found");
    await gbpButton.first().click();
    await page.waitForTimeout(3000);

    const metaTag = await page.locator('meta[name="description"]');
    const metaString = await metaTag.getAttribute('content');

    if (!metaString) throw new Error("Meta description tag missing or empty");

    const parsedData = parseMeta(metaString);
    fs.writeFileSync('parsed-data.json', JSON.stringify(parsedData, null, 2));
    console.log('✅ Successfully scraped and parsed:', parsedData);
  } catch (error) {
    console.error('❌ Error during scraping/parsing:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
