// ===== BEÁLLÍTÁSOK =====
// Melyik év decemberéhez igazodjon a naptár (ettől függ, melyik ablak nyitható).
export const EV = 2026

// Fejléc szövegei – nyugodtan írd át.
export const FEJLEC = {
  cim: 'Adventi kalendárium',
  bevezeto:
    'Kedves Diákok! Az advent a várakozás és a készülődés ideje. Minden nap kinyithatsz egy ablakot: ' +
    'mögötte egy kép és egy rövid gondolat vár, ami segít egy kicsit lelassítani a decemberi rohanásban. ' +
    'Az ablakok csak a saját napjukon nyílnak ki – türelem, ez is az advent része!',
  keszitok: ['A naptárt készítette: Ritzinger Zoltán tanár úr és Szűcs Sebestyén tanár úr'],
}

// Az ablakok sorrendje a rácson (összekeverve, mint egy igazi naptáron).
export const SORREND = [6, 10, 19, 4, 16, 22, 2, 7, 18, 17, 11, 14, 8, 24, 20, 3, 21, 12, 15, 5, 13, 9, 1, 23]

// ===== NAPOK TARTALMA =====
// kep: a public/kepek mappában lévő fájl neve. Saját fotóra cserélheted (jpg/png/webp is jó).
const kep = (n) => `kepek/nap-${String(n).padStart(2, '0')}.svg`

export const NAPOK = [
  { nap: 1, cim: 'Elindulunk', szoveg: 'Az első ablak a kezdet. Gondold végig: mire szeretnél jobban figyelni ebben a hónapban?' },
  { nap: 2, cim: 'Egy fényes pont', szoveg: 'A csillag a pásztoroknak és a bölcseknek is utat mutatott. Ki vagy mi mutat ma utat neked?' },
  { nap: 3, cim: 'Mind különbözünk', szoveg: 'Nincs két egyforma hópehely – és két egyforma ember sem. Mondj ma valami kedveset valakinek, aki egészen más, mint te.' },
  { nap: 4, cim: 'Nem csak dobozban', szoveg: 'A legjobb ajándék gyakran nem tárgy: idő, figyelem, egy segítő kéz. Kinek tudnál ma ilyet adni?' },
  { nap: 5, cim: 'Díszítsünk!', szoveg: 'Holnap Mikulás. Ma este tedd ki a kitisztított cipődet – és gondolj azokra, akiknek nem jut ajándék.' },
  { nap: 6, cim: 'Advent 2. vasárnapja', szoveg: 'Már két gyertya ég a koszorún. A fény lassan, de biztosan gyarapszik – így van ez a jó szokásokkal is.' },
  { nap: 7, cim: 'Hazatalálni', szoveg: 'Az otthon nem a falaktól otthon, hanem az emberektől. Segíts ma otthon valamiben, kérés nélkül.' },
  { nap: 8, cim: 'Meglepetés', szoveg: 'Írj egy rövid üzenetet valakinek, akivel régen beszéltél. Lehet, hogy pont ma esik neki jól.' },
  { nap: 9, cim: 'Csengőszó', szoveg: 'A harang hív és összegyűjt. Ma kapcsold ki a telefont egy órára, és figyelj azokra, akik melletted vannak.' },
  { nap: 10, cim: 'Mézeskalács', szoveg: 'Az igazi mézeskalácshoz türelem kell: a tészta pihen, ízesedik. A jó dolgok is időt kérnek.' },
  { nap: 11, cim: 'Csendes éj', szoveg: 'Este nézz fel az égre néhány percre. A csend nem üresség, hanem lehetőség arra, hogy meghalld magad.' },
  { nap: 12, cim: 'Melegség', szoveg: 'Egy bögre tea, egy jó beszélgetés – a melegség megosztható. Hívj meg valakit egy közös szünetre.' },
  { nap: 13, cim: 'Advent 3. vasárnapja', szoveg: 'Ez az öröm vasárnapja (Gaudete). Írj le három dolgot, aminek ezen a héten örültél.' },
  { nap: 14, cim: 'A fa alatt', szoveg: 'A fenyő télen is zöld marad. Mi az, ami nehéz időkben is erőt ad neked?' },
  { nap: 15, cim: 'Lámpás', szoveg: 'Egy kis lámpás is elég ahhoz, hogy a következő lépést lásd. Nem kell az egész utat látnod, csak a következő lépést.' },
  { nap: 16, cim: 'Kék gömb', szoveg: 'Hajrá, közeleg a szünet! Ha van még elmaradt feladatod, ma tegyél meg egy lépést felé.' },
  { nap: 17, cim: 'Hóesés', szoveg: 'A hó mindent betakar és elcsendesít. Engedj el ma egy sérelmet – nem kell mindent magaddal cipelni.' },
  { nap: 18, cim: 'Csomagolás', szoveg: 'Ha ajándékot csomagolsz, gondolj arra, akinek szánod: mit szeretnél, hogy érezzen, amikor kibontja?' },
  { nap: 19, cim: 'Hívogató szó', szoveg: 'Köszönd meg ma valakinek, aki az év során segített neked – egy tanárnak, osztálytársnak, családtagnak.' },
  { nap: 20, cim: 'Advent 4. vasárnapja', szoveg: 'Mind a négy gyertya ég. A várakozás a végéhez közeledik – mire készült fel a szíved?' },
  { nap: 21, cim: 'Fényben', szoveg: 'Ma van az év legrövidebb napja. Innentől minden nap egy kicsit világosabb lesz.' },
  { nap: 22, cim: 'Vezérfény', szoveg: 'A bölcsek nem tudták pontosan, hová tartanak, mégis elindultak. A bizalom is egyfajta bátorság.' },
  { nap: 23, cim: 'Utolsó készülődés', szoveg: 'Holnap Szenteste. Ne a tökéletes ünnep legyen a cél, hanem a közös. Ami elmarad, az is rendben van.' },
  { nap: 24, cim: 'Szenteste', szoveg: 'Megszületett a Kisded – a csendben, egyszerűségben. Áldott, békés karácsonyt kívánunk mindenkinek!' },
].map((n) => ({ ...n, kep: kep(n.nap) }))
