// Obsahové varianty podle segmentu.
//
// PRAVIDLO PRO TEXTY: mluv k zákazníkovi o tom, co dostane. Nepopisuj, kdo je.
// ⛔ ŽÁDNÉ VYMYŠLENÉ SCÉNKY. Když si vymyslím situaci („redaktor volá kvůli článku, který
//    ráno vyšel", „děkan vám přepošle článek"), neobstojí: redaktor volá před vydáním
//    a o předplatném rozhoduje děkanát, ne ten, komu přijde odkaz. Piš prostě, co za to
//    zákazník dostane a kolik to stojí.
// ⛔ ŽÁDNÝ VYMYŠLENÝ DŮVOD. Vysoká škola nehlídá dění v okresech, odkud se hlásí uchazeči.
//    Když pro nějaký argument neexistuje reálná potřeba, argument se vyhodí.
// „Rektorát, děkanáty, tiskové oddělení" je jazyk briefu, ne stránky.
// Každý perex má mít konkrétní pracovní situaci a druhou osobu.
//
// ⛔ ZAKÁZANÉ ARGUMENTOVÁNÍ PAYWALLEM. Nepsat, že se Deník nedá dočíst, ani že zamčené
//    jsou „ty nejlepší" texty. První je nepravda (zamčená je menšina), druhé shazuje
//    zbytek obsahu. Podíl zamčených článků je interní údaj a nezveřejňuje se.
// Píše se, PROČ SE PŘEDPLATNÉ VYPLATÍ: co za ty peníze tým dostane a co s tím udělá.
// Mailing posílá každý segment na svou variantu, LinkedIn a selfpromo na "firmy"
// (bez URL parametru ?segment= se vykreslí první klíč objektu, tedy "firmy").

window.SEGMENTY = {
  firmy: {
    stitek: "Firemní předplatné",
    h1: "Když informace patří k práci",
    perex: "Firemní předplatné Deník.cz je hromadný přístup ke všem 72 regionálním Deníkům "
         + "i celostátnímu zpravodajství, včetně placeného obsahu, pro víc lidí z jedné firmy "
         + "(vedení, obchodní tým a další kolegy). Každý se přihlašuje pod svým jménem, bez "
         + "reklam. Cena se odvíjí od počtu přístupů "
         + "a platí se ročně předem, kartou nebo na fakturu.",
    ctaSlovo: "pro náš tým",
    vychoziPocet: 10,
    temata: ["investice", "vystavba", "bezpecnost", "doprava"],
    duvody: [
      { titulek: "Informace, které pomáhají rozhodovat",
        text: "Co se staví, kdo nabírá a co se chystá kolem vašich provozů – dřív, "
            + "než to zjistíte od někoho jiného." },
      { titulek: "Víte první o dění v regionu",
        text: "Zjistěte, jaké jsou plány radnic, dopravní novinky a další." },
      { titulek: "Dáte to do nákladů",
        text: "65 Kč na člověka a měsíc od deseti přístupů. Jedna faktura na rok." },
      { titulek: "Kartou i na fakturu",
        text: "Objednáte online. Zaplatíte kartou, nebo převodem na fakturu." }
    ]
  },

  "verejna-sprava": {
    stitek: "Firemní předplatné",
    h1: "Informace, které pomáhají rozhodovat",
    perex: "Firemní předplatné Deník.cz je hromadný přístup ke všem 72 regionálním Deníkům "
         + "i celostátnímu zpravodajství, včetně placeného obsahu, pro víc lidí z jednoho "
         + "úřadu (tiskové oddělení, vedení, vedoucí odborů a další kolegy). Každý se "
         + "přihlašuje pod svým jménem, bez reklam. Cena se odvíjí od počtu přístupů a platí "
         + "se ročně předem, kartou nebo na fakturu.",
    ctaSlovo: "pro náš úřad",
    vychoziPocet: 3,
    temata: ["doprava", "skolstvi", "investice", "bezpecnost"],
    duvody: [
      { titulek: "Přehled o regionu, kde žijete",
        text: "Co se děje ve vašem okolí i ve zbytku republiky: doprava, stavby, sport a další." },
      { titulek: "Pro celý úřad",
        text: "Každý pod svým jménem, ne jedno heslo pro všechny." },
      { titulek: "Bez reklam",
        text: "Předplacený Deník.cz je bez reklam." },
      { titulek: "Fakta a souvislosti",
        text: "Zjistíte, co se skutečně děje a jak spolu události souvisejí." }
    ]
  },

  "vysoke-skoly": {
    stitek: "Firemní předplatné",
    h1: "Co se píše o vaší škole i o městech, kde působíte",
    perex: "Firemní předplatné Deník.cz je hromadný přístup ke všem 72 regionálním Deníkům "
         + "i celostátnímu zpravodajství, včetně placeného obsahu, pro víc lidí z jedné "
         + "školy (tiskové oddělení, vedení fakult a další kolegy). Každý se přihlašuje pod "
         + "svým jménem, bez reklam. Cena se odvíjí od počtu přístupů a platí se ročně "
         + "předem, kartou nebo na fakturu.",
    ctaSlovo: "pro naši fakultu",
    vychoziPocet: 5,
    temata: ["skolstvi", "doprava", "vystavba", "verejne"],
    duvody: [
      { titulek: "Vaše škola i celá republika",
        text: "Co se píše o škole, o vysokém školství i o městech, kde působíte." },
      { titulek: "Pro celý tým",
        text: "Každý pod svým jménem, ne jedno heslo pro všechny." },
      { titulek: "Bez reklam",
        text: "Předplacený Deník.cz je bez reklam." },
      { titulek: "Přehled o regionu, kde žijete",
        text: "Co se děje ve vašem okolí i ve zbytku republiky: doprava, stavby, sport a další." }
    ],
    faqNavic: []
  },

  instituce: {
    stitek: "Firemní předplatné",
    h1: "Zpravodajství ze všech krajů na jednom místě",
    perex: "Firemní předplatné Deník.cz je hromadný přístup ke všem 72 regionálním Deníkům "
         + "i celostátnímu zpravodajství, včetně placeného obsahu, pro víc lidí z jedné "
         + "instituce (tiskové oddělení, vedení a další kolegy). Každý se přihlašuje pod "
         + "svým jménem, bez reklam. Cena se odvíjí od počtu přístupů a platí se ročně "
         + "předem, kartou nebo na fakturu.",
    ctaSlovo: "pro naši instituci",
    vychoziPocet: 5,
    temata: ["verejne", "bezpecnost", "doprava", "investice"],
    duvody: [
      { titulek: "Přehled o regionu, kde žijete",
        text: "Co se děje ve vašem okolí i ve zbytku republiky: doprava, stavby, sport a další." },
      { titulek: "Pro celé oddělení",
        text: "Každý pod svým jménem, ne jedno heslo pro všechny." },
      { titulek: "Bez reklam",
        text: "Předplacený Deník.cz je bez reklam." },
      { titulek: "Fakta a souvislosti",
        text: "Zjistíte, co se skutečně děje a jak spolu události souvisejí." }
    ],
    faqNavic: []
  }
};

// Řádek do panelu kalkulačky. Nahrazuje bývalý blok „Co je v předplatném".
window.VCENE = "V ceně: všech 72 Deníků, bez reklam, každý přístup na jméno.";

// FAQ přebrané z predplatne.denik.cz (28 otázek, stav 2. 9. 2026). Pro firemního zákazníka
// je relevantní jen část, ostatní řeší doručování tištěných novin a věrnostní body.
// zdroj:"web" = odpověď je dnes na webu · "kod" = z objednávkového formuláře
// "petr" = potvrdil Petr · "doplnit" = odpověď nemáme
window.FAQ = [
  { q: "Co mi přinese firemní předplatné?",
    a: "Možnost číst bez omezení články a rubriky, které nejsou pro běžného čtenáře plně "
     + "dostupné. K ranní kávě vám připravíme a zašleme do e-mailu Newsletter Deníku – "
     + "shrnutí nejdůležitějších událostí z vašeho okolí i celé republiky. Pro pohodlnější "
     + "čtení uvidíte méně reklam a získáte možnost podílet se na našem obsahu." },

  { q: "Jsme organizace a chceme předplatné pro víc lidí. Jak postupovat?",
    a: "Objednáte firemní předplatné. Vyberete počet přístupů, zaplatíte a správce je rozdělí "
     + "kolegům. Každý se pak přihlašuje pod svým jménem, ne přes jeden společný účet.",
    zdroj: "petr" },

  { q: "Jak se platí?",
    a: "Kartou, nebo bankovním převodem na fakturu. Předplatné se hradí na rok dopředu.",
    zdroj: "kod" },

  { q: "Můžeme přidat další lidi během roku?",
    a: "Ano, stačí přikoupit další přístupy, zaplatit a rozdělit je mezi nové kolegy." },

  { q: "Obnovuje se předplatné po roce samo?",
    a: "Automaticky ne. Pokud máte o obnovu předplatného po roce zájem, "
     + "<a href=\"mailto:denik@mojepredplatne.cz\">napište nám</a> nebo zavolejte na "
     + "<a href=\"tel:+420272015015\">+420 272 015 015</a>.",
    raw: true },

  { q: "Zaplatili jsme a obsah je pořád zamčený. Co teď?",
    a: "Dokončete registraci podle e-mailu, který přišel po zaplacení, a přihlaste se. "
     + "Když zůstane zamčeno, napište na klub@denik.cz.",
    zdroj: "web" }
];
