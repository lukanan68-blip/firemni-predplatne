// Vyfotí titulní stránku denik.cz pro hero sekci landing page.
// Spouští ho .github/workflows/daily-hero-screenshot.yml jednou denně.
//
// Chceme jen ten úvodní hlavní článek (nadpis + perex), ne celou nekonečně
// dlouhou stránku a ne ani blok "Nejnovější články od čtenářů" pod ním --
// to bylo moc velké. Hlavní článek je na denik.cz vždy první <article>
// element na stránce (ověřeno 14. 9. 2026), takže hledáme jeho spodní hranu
// a tam řízneme -- funguje to i beze změny den ode dne.

const { chromium } = require("playwright");

const OUT = "assets/denik-hero.png";
const CONSENT_TEXTS = ["Souhlasím", "Přijmout", "Rozumím", "Souhlasit"];
const VIEWPORT = { width: 1240, height: 953 };
const FALLBACK_HEIGHT = 1000; // pro případ, že se hlavní článek nenajde

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
  const page = await browser.newPage({ viewport: VIEWPORT });

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

  let clipHeight = FALLBACK_HEIGHT;
  try {
    const mainArticle = page.locator("article").first();
    const box = await mainArticle.boundingBox({ timeout: 5000 });
    if (box) clipHeight = Math.ceil(box.y + box.height + 20);
  } catch (e) {
    console.log("Hlavní článek nenalezen, používám výchozí výšku:", e.message);
  }

  // fullPage: true je tu nutné i s clipem -- bez něj Playwright neumí
  // zachytit nic za hranicí aktuálního viewportu (953px) a clip se potichu
  // ořízne zpátky na tuhle výšku.
  await page.screenshot({
    path: OUT,
    fullPage: true,
    clip: { x: 0, y: 0, width: VIEWPORT.width, height: clipHeight },
  });
  await browser.close();
  console.log("Screenshot uložen do " + OUT + " (výška " + clipHeight + "px)");
})();
