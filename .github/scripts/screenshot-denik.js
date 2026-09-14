// Vyfotí titulní stránku denik.cz pro hero sekci landing page.
// Spouští ho .github/workflows/daily-hero-screenshot.yml jednou denně.
// Poměr stran drží stejný jako předchozí statický obrázek (1002x770 ~ 1.30:1).

const { chromium } = require("playwright");

const OUT = "assets/denik-hero.png";
const CONSENT_TEXTS = ["Souhlasím", "Přijmout", "Rozumím", "Souhlasit"];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1240, height: 953 } });

  await page.goto("https://www.denik.cz/", { waitUntil: "networkidle", timeout: 60000 });

  for (const text of CONSENT_TEXTS) {
    try {
      const btn = page.getByRole("button", { name: text, exact: false }).first();
      await btn.click({ timeout: 5000 });
      await page.waitForTimeout(1500);
      break;
    } catch (e) {
      // zkusí další variantu textu tlačítka
    }
  }

  await page.screenshot({ path: OUT });
  await browser.close();
  console.log("Screenshot uložen do " + OUT);
})();
