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
// Mailing posílá každý segment na svou variantu, LinkedIn a selfpromo na základ.

window.SEGMENTY = {
  zaklad: {
    stitek: "Firemní předplatné",
    h1: "Důležité dění v Brně na jednom místě",
    perex: "Přehled o dění v Brně pro celý váš tým. Bez reklam, každý pod svým jménem.",
    ctaSlovo: "pro náš tým",
    vychoziPocet: 5,
    temata: ["doprava", "skolstvi", "investice", "bezpecnost", "verejne"],
    duvody: [
      { titulek: "Přehled o dění v Brně",
        text: "Město, městské části i celý kraj. Šest Deníků, jeden přístup." },
      { titulek: "Pro celý tým",
        text: "Každý pod svým jménem, ne jedno heslo pro všechny." },
      { titulek: "Bez reklam",
        text: "Předplacený Deník.cz je bez reklam." },
      { titulek: "71 Kč na člověka a měsíc",
        text: "Od šesti lidí 68 Kč. Spočítáte si to sami a rovnou objednáte." }
    ]
  },

  "verejna-sprava": {
    stitek: "Firemní předplatné",
    h1: "Informace, které pomáhají rozhodovat",
    perex: "Přehled o dění v Brně, v městských částech i v kraji. Pro tiskové oddělení, "
         + "vedení i vedoucí odborů.",
    ctaSlovo: "pro náš úřad",
    vychoziPocet: 3,
    temata: ["doprava", "skolstvi", "investice", "bezpecnost", "verejne"],
    duvody: [
      { titulek: "Město, městské části i kraj",
        text: "Brno, všech 29 městských částí a šest Deníků z Jihomoravského kraje." },
      { titulek: "Pro celý úřad",
        text: "Každý pod svým jménem, ne jedno heslo pro všechny." },
      { titulek: "Bez reklam",
        text: "Předplacený Deník.cz je bez reklam." },
      { titulek: "Kartou i na fakturu",
        text: "Objednáte online. Zaplatíte kartou, nebo převodem na fakturu. "
            + "Jedna faktura na rok." }
    ]
  },

  "vysoke-skoly": {
    stitek: "Firemní předplatné",
    h1: "Co se píše o vaší škole i o městě kolem ní",
    perex: "Přehled o dění v Brně pro tiskové oddělení, komunikaci i vedení fakult.",
    ctaSlovo: "pro naši fakultu",
    vychoziPocet: 5,
    temata: ["skolstvi", "doprava", "vystavba", "verejne", "bezpecnost"],
    duvody: [
      { titulek: "Vaše škola i celé Brno",
        text: "Co se píše o škole, o vysokém školství a o městě, kde stojí vaše budovy." },
      { titulek: "Pro celý tým komunikace",
        text: "Každý pod svým jménem, ne jedno heslo pro všechny." },
      { titulek: "Bez reklam",
        text: "Předplacený Deník.cz je bez reklam." },
      { titulek: "Kartou i na fakturu",
        text: "Objednat online může rektorát i jedna fakulta. Kartou, nebo převodem "
            + "na fakturu." }
    ],
    faqNavic: []
  },

  instituce: {
    stitek: "Firemní předplatné",
    h1: "Zpravodajství ze všech krajů na jednom místě",
    perex: "Přehled o dění ve všech krajích pro tiskového mluvčího, vnější vztahy i vedení.",
    ctaSlovo: "pro náš úřad",
    vychoziPocet: 5,
    temata: ["verejne", "bezpecnost", "doprava", "investice"],
    duvody: [
      { titulek: "Všech 72 Deníků",
        text: "Zpravodajství z každého okresu v republice, v jednom přístupu." },
      { titulek: "I Brno, kde sídlíte",
        text: "Doprava, stavby a dění ve městě, kde vaši lidé pracují." },
      { titulek: "Pro celé oddělení",
        text: "Každý pod svým jménem, ne jedno heslo pro všechny." },
      { titulek: "Kartou i na fakturu",
        text: "Objednáte online. Zaplatíte kartou, nebo převodem na fakturu. "
            + "Předplatné na rok." }
    ],
    faqNavic: []
  },

  firmy: {
    stitek: "Firemní předplatné",
    h1: "Když informace patří k práci",
    perex: "Přehled o dění v Brně pro váš tým na jednom místě.",
    ctaSlovo: "pro náš tým",
    vychoziPocet: 10,
    temata: ["investice", "vystavba", "zamestnanost", "doprava"],
    duvody: [
      { titulek: "Investice, výstavba, zaměstnanost",
        text: "Co se staví, kdo nabírá a co se chystá v okolí vašeho areálu." },
      { titulek: "Pro celý tým",
        text: "Každý pod svým jménem, ne jedno heslo pro všechny." },
      { titulek: "Dáte to do nákladů",
        text: "65 Kč na člověka a měsíc od deseti přístupů. Jedna faktura na rok." },
      { titulek: "Kartou i na fakturu",
        text: "Objednáte online. Zaplatíte kartou, nebo převodem na fakturu." }
    ]
  }
};

// Řádek do panelu kalkulačky. Nahrazuje bývalý blok „Co je v předplatném".
window.VCENE = "V ceně: celý Brněnský deník a dalších 71 Deníků, bez reklam, "
             + "každý přístup na jméno.";

// FAQ přebrané z predplatne.denik.cz (28 otázek, stav 2. 9. 2026). Pro firemního zákazníka
// je relevantní jen část, ostatní řeší doručování tištěných novin a věrnostní body.
// zdroj:"web" = odpověď je dnes na webu · "kod" = z objednávkového formuláře
// "petr" = potvrdil Petr · "doplnit" = odpověď nemáme
window.FAQ = [
  { q: "Jsme organizace a chceme předplatné pro víc lidí. Jak postupovat?",
    a: "Objednáte firemní předplatné. Vyberete počet přístupů, zaplatíte a správce je rozdělí "
     + "kolegům. Každý se pak přihlašuje pod svým jménem, ne přes jeden společný účet.",
    zdroj: "petr" },

  { q: "Můžeme číst i Deníky z jiných krajů?",
    a: "Ano. Firemní přístup otevírá všech 72 regionálních Deníků i celostátní zpravodajství "
     + "Deník.cz. Nezáleží na tom, kde sídlíte.",
    zdroj: "petr" },

  { q: "Jak se platí?",
    a: "Kartou, nebo bankovním převodem na fakturu. Předplatné se hradí na rok dopředu.",
    zdroj: "kod" },

  { q: "Máme tištěný Deník. Platíme digitální verzi znovu?",
    a: "Ne. Kdo má zaplacené předplatné tištěného Deníku, čte Deník.cz bez omezení. Stačí se "
     + "přihlásit stejným e-mailem, na který je předplatné vedené.",
    zdroj: "web" },

  { q: "Máme na Deník.cz účty. Musíme se registrovat znovu?",
    a: "Ne. Přihlásíte se stávajícím e-mailem a předplatné si k němu objednáte.",
    zdroj: "web" },

  { q: "Kolik zařízení může jeden přístup používat?",
    a: "<doplnit z obchodních podmínek>", zdroj: "doplnit" },

  { q: "Můžeme přidat další lidi během roku?",
    a: "<ověřit ve správě firemního předplatného>", zdroj: "doplnit" },

  { q: "Obnovuje se předplatné po roce samo?",
    a: "<doplnit, pro úřad je automatická obnova bez objednávky problém>", zdroj: "doplnit" },

  { q: "Můžeme přístup předat jinému kolegovi, když někdo odejde?",
    a: "<ověřit ve správě firemního předplatného>", zdroj: "doplnit" },

  { q: "Kdy začnou přístupy platit?",
    a: "<doplnit: po objednávce, nebo po připsání platby?>", zdroj: "doplnit" },

  { q: "Dostaneme fakturu s číslem naší objednávky?",
    a: "<doplnit>", zdroj: "doplnit" },

  { q: "Zaplatili jsme a obsah je pořád zamčený. Co teď?",
    a: "Dokončete registraci podle e-mailu, který přišel po zaplacení, a přihlaste se. "
     + "Když zůstane zamčeno, napište na klub@denik.cz.",
    zdroj: "web" }
];
