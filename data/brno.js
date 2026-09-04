// Regionální data landing page firemního předplatného.
// Klonování na další město = kopie tohoto souboru a přepsání hodnot. Šablona se nesahá.
// ⚠ Hodnoty v ostrých závorkách <…> zatím nemáme potvrzené. Do produkce nesmí.

window.REGION = {
  mesto: "Brno",
  mestoV: "v Brně",
  mestoO: "o Brně",
  kraj: "Jihomoravský kraj",
  krajV: "v Jihomoravském kraji",
  okresuVKraji: 6,
  mestskychCasti: 29,

  // Jak se produkt jmenuje. Bannery ho podepisují dvouřádkově, stránka to musí dodržet.
  podpis: "Brněnského deníku",
  podpisCelostatni: "Deníku",      // varianta pro instituce
  denikMesta: "Brněnský deník",

  // Ověřeno proti seznamu na denik.cz/o-deniku (2. 9. 2026).
  mutace: ["Brněnský deník", "Blanenský deník", "Břeclavský deník",
           "Hodonínský deník", "Vyškovský deník", "Znojemský deník"],

  // CO PŘÍSTUP OBSAHUJE (potvrdil Petr 2. 9. 2026)
  // Předplatitel si může přečíst VŠECH 72 Deníků. Přístup je republikový, ne regionální.
  // Chování čtenářů je jiná věc: obvykle čtou celostátní zpravodajství a svůj deník,
  // někdy i svůj kraj. To je vzorec užívání, ne omezení nabídky, a text ho nesmí zaměňovat.
  pristup: { celostat: true, vsechnyDeniky: true, pocet: 72 },

  // Lokality pro variantu „firmy". Při klonování se mění s městem.
  lokality: ["Slatina", "Černovická terasa", "Modřice", "Vlněna", "Technologický park"],

  // Nadpis bloku čísel. Nejsilnější tvrzení Deníku, drženo v jeho vlastním znění
  // z denik.cz/o-deniku („jako jediný má novináře v každém okrese v zemi").
  cislaNadpis: "Redaktor v každém okrese. Jako jediný v Česku.",
  cisla: [
    // ⚠ interně: číslo je od Petra, není to měření NetMonitoru. Na stránce se uvádí
    //    jako interní data Deníku. Před ostrým spuštěním nechat potvrdit.
    { hodnota: "až 1 mil.", popis: "lidí čte Brněnský deník každý měsíc",  zdroj: "interní data Deníku" },
    { hodnota: "72",        popis: "regionálních Deníků po celé republice", zdroj: "denik.cz/o-deniku" },
    { hodnota: "6",         popis: "z nich vychází v Jihomoravském kraji",  zdroj: "denik.cz/o-deniku" },
    { hodnota: "4,4 mil.",  popis: "lidí čte Deník.cz každý měsíc",         zdroj: "NetMonitor 7/2026" }
  ],

  // Feed pro živé titulky k tématům. Ověřeno 2. 9. 2026, vrací 50 článků.
  feed: "https://brnensky.denik.cz/rss/zpravy.html",

  kontakt: {
    jmeno: "<jméno obchodníka pro Brno>",
    funkce: "<funkce>",
    telefon: "+420 272 015 015",              // zatím centrální, Brno doplníme
    email: "denik@mojepredplatne.cz",         // zatím centrální, Brno doplníme
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
// Titulky jsou skutečné, vytažené z feedu 2. 9. 2026, a v produkci se berou živě.
window.TEMATA = {
  doprava:      { nazev: "Doprava",       titulek: "Tramvajový tunel na Kamechy: 3700 kubíků betonu, na konci roku položí koleje" },
  skolstvi:     { nazev: "Školství",      titulek: "Skrytou oční vadu může pomoci odhalit školní lavice" },
  investice:    { nazev: "Investice",     titulek: "Zbrojovka nemá problém se 49 miliony za Lužánky. Koncese se možná bude rušit" },
  vystavba:     { nazev: "Výstavba",      titulek: "Nová velká výstavba na okraji Brna: Nejsme připravení, zní z městské části" },
  bezpecnost:   { nazev: "Bezpečnost",    titulek: "Nehoda na velkém městském okruhu v Brně: při havárii se zranil mladý motorkář" },
  verejne:      { nazev: "Veřejné dění",  titulek: "Obávaný brněnský park nově hlídá soukromá agentura, radnice platí desítky tisíc" },
  zamestnanost: { nazev: "Zaměstnanost",  titulek: "<vybrat titulek z feedu, ten dnešní byl celostátní>" }
};
