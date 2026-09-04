// Celostátní data landing page firemního předplatného.
// Dřív šablona pro jedno město (brno.js), teď jediná celostátní varianta —
// žádné klonování po městech, obsah mluví o celé republice.
// ⚠ Hodnoty v ostrých závorkách <…> zatím nemáme potvrzené. Do produkce nesmí.

window.REGION = {
  // Jak se produkt jmenuje. Bannery ho podepisují dvouřádkově, stránka to musí dodržet.
  podpis: "Deníku",

  // Ověřeno proti seznamu na denik.cz/o-deniku (2. 9. 2026).
  pocetMutaci: 72,

  // CO PŘÍSTUP OBSAHUJE (potvrdil Petr 2. 9. 2026)
  // Předplatitel si může přečíst VŠECH 72 Deníků. Přístup je republikový, ne regionální.
  pristup: { celostat: true, vsechnyDeniky: true, pocet: 72 },

  // Nadpis bloku čísel. Nejsilnější tvrzení Deníku, drženo v jeho vlastním znění
  // z denik.cz/o-deniku („jako jediný má novináře v každém okrese v zemi").
  cislaNadpis: "Redaktor v každém okrese. Jako jediný v Česku.",
  cisla: [
    // ČR má 76 okresů, Praha mezi ně formálně nepatří a dělí se na 10 obvodů —
    // proto "76 okresů a Praha". Ověřeno: ČSÚ / cs.wikipedia.org/wiki/Okresy_v_Česku.
    { hodnota: "76",       popis: "okresů a Praha navrch – celostátní i regionální dění pod jednou střechou", zdroj: "ČSÚ" },
    { hodnota: "72",       popis: "regionálních Deníků po celé republice", zdroj: "denik.cz/o-deniku" },
    // ⚠ interně: číslo je od Petra, není to měření NetMonitoru. Na stránce se uvádí
    //    jako interní data Deníku. Před ostrým spuštěním nechat potvrdit.
    { hodnota: "4,4 mil.", popis: "lidí čte Deník.cz každý měsíc", zdroj: "NetMonitor 7/2026" }
  ],

  // Feed pro živé titulky k tématům.
  // ⚠ Ověřen jen obecný celostátní feed (denik.cz/rss/zpravy.html, 4. 9. 2026).
  //    Feedy jednotlivých krajských mutací je potřeba dohledat zvlášť podle potřeby.
  feed: "https://www.denik.cz/rss/zpravy.html",

  kontakt: {
    jmeno: "<jméno obchodníka>",
    funkce: "<funkce>",
    telefon: "+420 272 015 015",              // zatím centrální
    email: "denik@mojepredplatne.cz",         // zatím centrální
    doplnit: true
  },

  // Zapne se, až budou první zákazníci z kampaně. Do té doby se blok nevykresluje.
  reference: []
};

// Ceník z API /company-subscription/calculate-license-cost, stav 2. 9. 2026.
// DPH 12 %, ceny s DPH z kalkulačky na predplatne.denik.cz.
window.CENIK = [
  { od: 1,  do: 1,   rok: 892, rokDph: 999,  mesic: 74, sleva: null },
  { od: 2,  do: 5,   rok: 846, rokDph: 947,  mesic: 71, sleva: "5 %"  },
  { od: 6,  do: 9,   rok: 814, rokDph: 912,  mesic: 68, sleva: "9 %"  },
  { od: 10, do: 19,  rok: 782, rokDph: 876,  mesic: 65, sleva: "12 %" },
  { od: 20, do: 49,  rok: 750, rokDph: 840,  mesic: 62, sleva: "16 %" },
  { od: 50, do: 69,  rok: 718, rokDph: 804,  mesic: 60, sleva: "20 %" },
  { od: 70, do: 999, rok: 686, rokDph: 768,  mesic: 57, sleva: "23 %" }
];

// Témata z kampaňových bannerů. Ikony a názvy se neklonují, jsou společné.
// Titulky jsou skutečné, ne vymyšlené. Značka "region" u regionálních titulků
// (z Brněnského/Zlínského deníku, vytaženo 2.–4. 9. 2026) a "celostátní" u titulků
// z celostátního feedu Deník.cz (vytaženo 4. 9. 2026) ukazuje, že přístup dává obojí najednou.
// ⚠ Jde o ukázku z jednoho dne, do produkce vybírat titulky živě z feedu.
window.TEMATA = {
  doprava:      { nazev: "Doprava",       titulek: "Tramvajový tunel na Kamechy: 3700 kubíků betonu, na konci roku položí koleje", region: "Brněnský deník" },
  skolstvi:     { nazev: "Školství",      titulek: "Skrytou oční vadu může pomoci odhalit školní lavice", region: "Brněnský deník" },
  investice:    { nazev: "Investice",     titulek: "Zbrojovka nemá problém se 49 miliony za Lužánky. Koncese se možná bude rušit", region: "Brněnský deník" },
  vystavba:     { nazev: "Výstavba",      titulek: "Demolice vyhořelé budovy ve Zlíně bude pokračovat. Zachránit nelze ani její část", region: "Zlínský deník" },
  bezpecnost:   { nazev: "Bezpečnost",    titulek: "S autem plným dětí havaroval, jedno zemřelo. Opilému řidiči hrozí vyšší trest", region: "celostátní" },
  verejne:      { nazev: "Veřejné dění",  titulek: "Dítě v nákupním vozíku? Lidé se přou, obchody upozorňují na pravidla", region: "celostátní" },
  zamestnanost: { nazev: "Zaměstnanost",  titulek: "<vybrat titulek z feedu, dnešní nebyl k tématu>" }
};
