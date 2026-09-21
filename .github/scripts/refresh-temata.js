// Aktualizuje denní titulky v sekci "Co si přečtete".
// Spouští .github/workflows/daily-temata-refresh.yml jednou denně.
//
// 6 témat: 2 z celostátního feedu Deník.cz, 4 z krajských mutací. Pravidla:
//  - aspoň 2 články z Brněnského deníku (doprava + jedno další téma),
//  - aspoň 2 články zamčené (jen pro předplatitele), pokud sedí k tématu,
//  - článek musí sedět k tématu (klíčová slova) -- když se nenajde, hledá se
//    v ostatních feedech, nikdy se nebere "první co je",
//  - žádný sport, kultura ani volný čas, žádný článek dvakrát.
// Výsledek jde do data/temata-live.js, který index.html načte a jeho
// hodnoty přebijí statický fallback v data/region.js (window.TEMATA).
// Tenhle soubor se každý den celý přepisuje, ručně do něj nic nepsat.

const fs = require("fs");

// Klíčová slova pro dohledání titulku, který k tématu skutečně sedí.
// Historie: 15. 9. doplněna slova pro MHD/hasiče/retail; 18. 9. odstraněno
// "podnik" (chytal "dopravní podnik") a "řidič" (chytal přepadení);
// 21. 9. odstraněno "miliony|miliard" a "provoz|pravidl|město|obec" (chytaly
// sport, O2 výpadek a všechno možné), přidána slova pro bourání, logistiku,
// územní plány a volby.
const TOPICS = {
  doprava: /doprav|tramvaj|trolejbus|autobus|\bMHD\b|linka|jízdní řád|jízdní pruh|vlak|nádraží|silnic|dálnic|\bD\d{1,2}\b|\bI\/\d+|parkov|obchvat|tunel|uzavírk|výluk|objížďk|kruhový objezd|průtah/i,
  skolstvi: /škol|student|učitel|univerzit|fakult|rektor|žáci|žák|vzdělá/i,
  investice: /invest|\bfirm|koncese|akcie|byznys|podnikatel|podnikání|obchodní řetězec|retail|prodejn|pobočk|expand|výrobní hal|logistick|průmyslov|nájemc|\bsklady?\b|tržb|zaměstnavat|\bhotel/i,
  vystavba: /výstavb|\bstavb|byt(y|ů)?\b|developer|demolic|bourá|bourán|přestavb|rekonstruk|podchod|lávk|kasárn|územní plán|stavbou roku/i,
  bezpecnost: /polici|hasič|záchran|požár|zločin|vražd|útok|soud|trest|nehod|havar|zranění|krádež|krádeží|přepad/i,
  verejne: /radnice|radnic|úřad|starost|zastupitel|magistrát|městsk|rozpočet|\bkraj\b|volb|kandiduj|kandidát|odstávk|územní plán/i,
};

// Nechtěné rubriky podle části adresy článku (sport, kultura, volný čas...).
const NECHTENE = /denik\.cz\/(fotbal|hokej|basket|volejbal|florbal|ostatni-sporty|sport|volny-cas|kultura|zabava|magazin|lifestyle|horoskopy|cestovani|auto|tv|kam-o-vikendu)/i;
const NECHTENE_TITULEK = /kdo vládne fotbalu|vládci fotbalu|smluvní oznámení|přehled zesnulých|rozloučili jsme se/i;

// Ověřeno ručně 14. 9. 2026 (curl na <slug>.denik.cz/rss/vse.xml).
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
const MIN_BRNO = 2;
const MIN_ZAMCENYCH = 2;
const BRNO_TEMA = "doprava";

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
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(20000) });
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
    .filter((it) => it.titulek && it.odkaz && !NECHTENE.test(it.odkaz) && !NECHTENE_TITULEK.test(it.titulek));
}

// Zamčený článek (jen pro předplatitele) se pozná podle isAccessibleForFree:false
// v kódu stránky.
const lockCache = new Map();
async function isLocked(url) {
  if (lockCache.has(url)) return lockCache.get(url);
  let v = false;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(15000) });
    v = /"isAccessibleForFree":\s*false/.test(await res.text());
  } catch (e) {}
  lockCache.set(url, v);
  return v;
}

// Z kandidátů (už seřazených podle preference) vrátí první zamčený mezi
// prvními 8, jinak první.
async function nejlepsiZ(kandidati, zamcenyPreferuj) {
  if (!kandidati.length) return null;
  if (zamcenyPreferuj) {
    for (const it of kandidati.slice(0, 8)) if (await isLocked(it.odkaz)) return it;
  }
  return kandidati[0];
}

(async () => {
  const feeds = {};
  const nacti = async (klic, url) => {
    try { feeds[klic] = await fetchItems(url); } catch (e) { console.log("Feed " + klic + " selhal: " + e.message); feeds[klic] = []; }
  };
  await Promise.all([
    nacti("celostatni", "https://www.denik.cz/rss/vse.xml"),
    ...Object.keys(REGIONS).map((s) => nacti(s, "https://" + s + ".denik.cz/rss/vse.xml")),
  ]);

  const temata = Object.keys(TOPICS);
  const brnoTemata = [BRNO_TEMA, ...shuffle(temata.filter((t) => t !== BRNO_TEMA)).slice(0, MIN_BRNO - 1)];
  const ostatni = shuffle(temata.filter((t) => !brnoTemata.includes(t)));
  const celostatniTemata = ostatni.slice(0, POCET_CELOSTATNICH);
  const regionalniTemata = ostatni.slice(POCET_CELOSTATNICH);
  const nahodneRegiony = shuffle(Object.keys(REGIONS).filter((r) => r !== "brnensky"));

  // Preferovaný zdroj pro každé téma.
  const zdroj = {};
  brnoTemata.forEach((t) => (zdroj[t] = "brnensky"));
  celostatniTemata.forEach((t) => (zdroj[t] = "celostatni"));
  regionalniTemata.forEach((t, i) => (zdroj[t] = nahodneRegiony[i]));

  const pouzite = new Set();
  const vysledek = {};
  const pojmenuj = (slug) => (slug === "celostatni" ? "celostátní" : REGIONS[slug]);

  // Všechny shodné, dosud nepoužité články z daného feedu.
  const shodne = (slug, tema) =>
    (feeds[slug] || []).filter((it) => TOPICS[tema].test(it.titulek) && !pouzite.has(it.odkaz.split("?")[0]));
  const klic = (it) => it.odkaz.split("?")[0];

  for (const tema of [...brnoTemata, ...celostatniTemata, ...regionalniTemata]) {
    const slug = zdroj[tema];
    let it = await nejlepsiZ(shodne(slug, tema), true);
    let odkud = slug;
    if (!it) {
      // V preferovaném feedu nic nesedí -- hledá se ve všech ostatních.
      for (const jiny of shuffle(Object.keys(feeds))) {
        it = await nejlepsiZ(shodne(jiny, tema), true);
        if (it) { odkud = jiny; break; }
      }
    }
    if (!it) { console.log("Pro téma " + tema + " dnes nic nesedí, ponechávám prázdné."); continue; }
    pouzite.add(klic(it));
    vysledek[tema] = { titulek: it.titulek, odkaz: it.odkaz, obrazek: it.obrazek, region: pojmenuj(odkud), _zdroj: odkud };
  }

  // Doladění: aspoň MIN_ZAMCENYCH zamčených -- nezamčené se zkusí vyměnit
  // za zamčený článek stejného tématu (stále musí sedět k tématu).
  const pocetZamcenych = async () => {
    let n = 0;
    for (const t of Object.keys(vysledek)) if (await isLocked(vysledek[t].odkaz)) n++;
    return n;
  };
  let zamcenych = await pocetZamcenych();
  for (const tema of Object.keys(vysledek)) {
    if (zamcenych >= MIN_ZAMCENYCH) break;
    if (await isLocked(vysledek[tema].odkaz)) continue;
    // Brněnská témata zůstávají v Brně, pokud by to porušilo minimum.
    for (const jiny of shuffle(Object.keys(feeds))) {
      const kandidati = shodne(jiny, tema);
      let zamcen = null;
      for (const it of kandidati.slice(0, 8)) if (await isLocked(it.odkaz)) { zamcen = it; break; }
      if (!zamcen) continue;
      const bylBrno = vysledek[tema]._zdroj === "brnensky";
      const brnoPoVymene = Object.values(vysledek).filter((v) => v._zdroj === "brnensky").length - (bylBrno ? 1 : 0) + (jiny === "brnensky" ? 1 : 0);
      if (brnoPoVymene < MIN_BRNO) continue;
      pouzite.delete(klic({ odkaz: vysledek[tema].odkaz }));
      pouzite.add(klic(zamcen));
      vysledek[tema] = { titulek: zamcen.titulek, odkaz: zamcen.odkaz, obrazek: zamcen.obrazek, region: pojmenuj(jiny), _zdroj: jiny };
      zamcenych++;
      break;
    }
  }

  for (const t of Object.keys(vysledek)) delete vysledek[t]._zdroj;

  const hlavicka =
    "// Denní titulky k tématům -- generuje .github/scripts/refresh-temata.js.\n" +
    "// Přepisuje se každý den celý, neupravovat ručně (změny by se ztratily).\n" +
    "// Vygenerováno: " + new Date().toISOString() + "\n";
  const obsah = hlavicka + "window.TEMATA_LIVE = " + JSON.stringify(vysledek, null, 2) + ";\n";

  fs.writeFileSync(OUT, obsah);
  console.log("Uloženo do " + OUT + " (zamčených: " + zamcenych + "):");
  console.log(JSON.stringify(vysledek, null, 2));
})();
