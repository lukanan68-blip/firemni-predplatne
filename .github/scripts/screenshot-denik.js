// Vyfotí titulní stránku denik.cz pro hero sekci landing page.
// Spouští ho .github/workflows/daily-hero-screenshot.yml jednou denně.
//
// Bere jen sloupec obsahu (1000px na středu) od horní hrany hlavičky po spodek
// úvodního hlavního článku -- bez reklam, bez žlutého zavíratelného pruhu
// a bez plovoucího tlačítka nahoru. Hlavní článek je na denik.cz vždy první
// <article> element (ověřeno 14. 9. 2026).
//
// 1. 10. 2026: objevila se ukotvená (position:fixed) reklama u spodního
// okraje obrazovky. Ve spojení s "fullPage" snímkem a clipem ji Playwright
// vykreslil "přimrazenou" doprostřed stránky, i když na živé stránce je
// dole mimo vše podstatné. Zkoušelo se i schovat celý pravý postranní
// sloupec (počasí, čtenářské články) najednou, aby reklama neměla kam se
// dosadit, ale to se nelíbilo -- sloupec má zůstat vidět, i za cenu rizika,
// že se tam reklama občas znovu objeví.
//
// První oprava (zvětšit okno těsně před snímkem) nestačila -- tahle reklama
// si svou pozici dopočítává přes JavaScript podle výšky okna v okamžiku
// načtení stránky, takže pozdější zvětšení okna už nezachytila. Řešení:
// okno je od začátku (ještě před načtením stránky) vysoké s rezervou --
// reklama se pak sama umístí daleko pod oříznutou oblastí.

const { chromium } = require("playwright");

const OUT = "assets/denik-hero.png";
const CONSENT_TEXTS = ["Souhlasím", "Přijmout", "Rozumím", "Souhlasit"];
const PAGE_HEIGHT = 2200; // dost na hlavičku i nejdelší běžný úvodní článek + rezerva
const VIEWPORT = { width: 1240, height: PAGE_HEIGHT };
const CONTENT_WIDTH = 1000; // šířka sloupce obsahu na denik.cz při viewportu 1240
const FALLBACK_HEIGHT = 900; // pro případ, že se hlavní článek nenajde

// Deník značí reklamní pozice předvídatelnými ID (ověřeno přímo na denik.cz,
// 14. 9. 2026): leaderboard-top/bottom, skyscraper-1/2/3, wallpaper-1..4,
// commercial-article-*, square-1, poutak-logo.
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

  await page.evaluate(() => {
    const hide = (e) => e && e.style.setProperty("display", "none", "important");
    document.querySelectorAll("body *").forEach((e) => {
      if (e.children.length === 0 && /^\s*reklama\s*$/i.test(e.textContent)) hide(e);
    });
    // Žlutý zavíratelný pruh pod hlavičkou (text se mění -- "NEPŘEHLÉDNĚTE",
    // "EXKLUZIVNĚ", "Prezident na Deník.cz" atd.), ale má stálou třídu.
    document.querySelectorAll(".js-breaking-news").forEach(hide);
    document.querySelectorAll(".js-button-up").forEach(hide);
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);

  // Horní hrana hlavičky: zlaté tlačítko Předplatit Deník je 28px pod ní.
  let top = 200;
  try {
    const b = await page.getByText("Předplatit Deník", { exact: false }).first().boundingBox({ timeout: 5000 });
    if (b) top = Math.max(0, Math.floor(b.y - 28));
  } catch (e) {
    console.log("Tlačítko Předplatit Deník nenalezeno, používám výchozí začátek:", e.message);
  }

  let bottom = top + FALLBACK_HEIGHT;
  try {
    const box = await page.locator("article").first().boundingBox({ timeout: 5000 });
    if (box) bottom = Math.ceil(box.y + box.height + 20);
  } catch (e) {
    console.log("Hlavní článek nenalezen, používám výchozí výšku:", e.message);
  }

  const clip = { x: (VIEWPORT.width - CONTENT_WIDTH) / 2, y: top, width: CONTENT_WIDTH, height: bottom - top };

  // Okno je vysoké už od začátku (viz PAGE_HEIGHT nahoře), takže tu není
  // potřeba nic měnit ani brát "fullPage" snímek -- obyčejný snímek
  // s oříznutím stačí.
  await page.screenshot({ path: OUT, clip });
  await browser.close();
  console.log("Screenshot uložen do " + OUT + " (" + clip.width + "x" + clip.height + "px)");
})();
