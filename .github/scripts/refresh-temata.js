// Aktualizuje denní titulky v sekci "Co si přečtete".
// Spouští .github/workflows/daily-temata-refresh.yml jednou denně.
//
// 6 témat, každý den 2 dostanou titulek z celostátního feedu Deník.cz
// a 4 z náhodně vybraných (různých) krajských mutací -- kterých přesně
// 2 jsou celostátní a ze kterých regionů se čte, se každý den mění náhodně.
// Výsledek jde do data/temata-live.js, který index.html načte a jeho
// hodnoty přebijí statický fallback v data/region.js (window.TEMATA).
// Tenhle soubor (na rozdíl od region.js) nemá žádné ruční komentáře
// k zachování -- robot ho každý den celý přepíše, klidně do něj nic
// ručně nepiš.

const fs = require("fs");

// Klíčová slova pro dohledání titulku, který k tématu skutečně sedí.
// Když se nic nenajde, vezme se první nepoužitý titulek z feedu -- robot
// nikdy neselže, jen ten den nemusí být shoda dokonalá.
const TOPICS = {
  doprava: /doprav|tramvaj|vlak|nádraží|silnic|dálnic|autobus|řidič|\bMHD\b|parkov|obchvat|tunel/i,
  skolstvi: /škol|student|učitel|univerzit|fakult|žáci|žák|vzdělá/i,
  investice: /invest|miliony|miliard|\bfirm|podnik|koncese|akcie|byznys/i,
  vystavba: /výstavb|stavb|byt(y|ů)?\b|developer|demolic|rekonstruk|podchod|uzavírk/i,
  bezpecnost: /polici|zločin|vražd|útok|soud|trest|nehod|havar|zranění|zemřel/i,
  verejne: /radnice|město|obec|úřad|starost|\bkraj\b|zákaz|pravidl|provoz|odstávk/i,
};

// Ověřeno ručně 14. 9. 2026 (curl na <slug>.denik.cz/rss/vse.xml) -- funkční
// krajské mutace, jejichž subdoména odpovídá počeštěnému přídavnému jménu
// bez diakritiky. Deník jich má 72, tohle je jen bezpečný ověřený výběr.
const REGIONS = {
  brnensky: "Brněnský deník",
  zlinsky: "Zlínský deník",
  olomoucky: "Olomoucký deník",
  plzensky: "Plzeňský deník",
  liberecky: "Liberecký deník",
  hradecky: "Hradecký deník",
  pardubicky: "Pardubický deník",
  ceskobudejovicky: "Českobudějovický deník",
  jihlavsky: "Jihlavský deník",
  karlovarsky: "Karlovarský deník",
  vyskovsky: "Vyškovský deník",
  znojemsky: "Znojemský deník",
  trebicsky: "Třebíčský deník",
  prostejovsky: "Prostějovský deník",
  opavsky: "Opavský deník",
  kladensky: "Kladenský deník",
  melnicky: "Mělnický deník",
};

const OUT = "data/temata-live.js";
const POCET_CELOSTATNICH = 2;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function decodeEntity(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

// Vrací pole { titulek, odkaz, obrazek } -- jeden záznam na článek z feedu.
async function fetchItems(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(url + " -> HTTP " + res.status);
  const xml = await res.text();
  const bloky = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  return bloky
    .map((blok) => {
      const titleM = blok.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
      const linkM = blok.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/);
      const imgM = blok.match(/<enclosure[^>]*url="([^"]+)"/) || blok.match(/<media:content[^>]*url="([^"]+)"/);
      return {
        titulek: titleM ? decodeEntity(titleM[1]) : "",
        odkaz: linkM ? decodeEntity(linkM[1]) : "",
        obrazek: imgM ? decodeEntity(imgM[1]) : "",
      };
    })
    .filter((it) => it.titulek && it.odkaz);
}

function pickForTopic(items, regex, used) {
  const shodny = items.find((it) => regex.test(it.titulek) && !used.has(it.titulek));
  const zvoleny = shodny || items.find((it) => !used.has(it.titulek)) || items[0];
  if (zvoleny) used.add(zvoleny.titulek);
  return zvoleny || { titulek: "<dnešní feed nevrátil žádný titulek>", odkaz: "", obrazek: "" };
}

(async () => {
  const topicKeys = Object.keys(TOPICS);
  const zamichane = shuffle(topicKeys);
  const celostatniTemata = zamichane.slice(0, POCET_CELOSTATNICH);
  const regionalniTemata = zamichane.slice(POCET_CELOSTATNICH);

  const vybraneRegiony = shuffle(Object.keys(REGIONS)).slice(0, regionalniTemata.length);

  const result = {};

  const nationalItems = await fetchItems("https://www.denik.cz/rss/vse.xml");
  const usedNational = new Set();
  for (const tema of celostatniTemata) {
    const it = pickForTopic(nationalItems, TOPICS[tema], usedNational);
    result[tema] = { titulek: it.titulek, odkaz: it.odkaz, obrazek: it.obrazek, region: "celostátní" };
  }

  for (let i = 0; i < regionalniTemata.length; i++) {
    const tema = regionalniTemata[i];
    const slug = vybraneRegiony[i];
    try {
      const items = await fetchItems("https://" + slug + ".denik.cz/rss/vse.xml");
      const used = new Set();
      const it = pickForTopic(items, TOPICS[tema], used);
      result[tema] = { titulek: it.titulek, odkaz: it.odkaz, obrazek: it.obrazek, region: REGIONS[slug] };
    } catch (e) {
      console.log("Feed pro " + slug + " selhal (" + e.message + "), beru celostátní náhradou.");
      const it = pickForTopic(nationalItems, TOPICS[tema], usedNational);
      result[tema] = { titulek: it.titulek, odkaz: it.odkaz, obrazek: it.obrazek, region: "celostátní" };
    }
  }

  const hlavicka =
    "// Denní titulky k tématům -- generuje .github/scripts/refresh-temata.js.\n" +
    "// Přepisuje se každý den celý, neupravovat ručně (změny by se ztratily).\n" +
    "// Vygenerováno: " + new Date().toISOString() + "\n";
  const obsah = hlavicka + "window.TEMATA_LIVE = " + JSON.stringify(result, null, 2) + ";\n";

  fs.writeFileSync(OUT, obsah);
  console.log("Uloženo do " + OUT + ":");
  console.log(JSON.stringify(result, null, 2));
})();
