// Vyfotí titulní stránku denik.cz pro hero sekci landing page.
// Spouští ho .github/workflows/daily-hero-screenshot.yml jednou denně.
// Poměr stran drží stejný jako předchozí statický obrázek (1002x770 ~ 1.30:1).

const { chromium } = require("playwright");

const OUT = "assets/denik-hero.png";
const CONSENT_TEXTS = ["Souhlasím", "Přijmout", "Rozumím", "Souhlasit"];

// Deník značí reklamní pozice předvídatelnými ID (ověřeno přímo na denik.cz,
// 14. 9. 2026): leaderboard-top/bottom, skyscraper-1/2/3, wallpaper-1..4,
// commercial-article-*, square-1, poutak-logo. Radši je schováme, než abychom
// spoléhali na to, že se zrovna žádná reklama nevydraží.
const HIDE_AD_SLOTS_CSS = `
  [id^="leaderboard-"], [id^="skyscraper-"], [id^="wallpaper-"],
  [id^="commercial-article"], [id^="square-"], [id^="poutak-"] {
    display: none !important;
  }
`;

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

  await page.addStyleTag({ content: HIDE_AD_SLOTS_CSS });
  await page.waitForTimeout(500);

  await page.screenshot({ path: OUT });
  await browser.close();
  console.log("Screenshot uložen do " + OUT);
})();
