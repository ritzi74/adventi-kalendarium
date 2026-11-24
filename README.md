# Adventi kalendárium (Vue 3 + Vite)

24 kinyitható ablakos adventi naptár. Minden ablak csak a saját decemberi napján nyitható,
mögötte egy kép és egy rövid gondolat található. A kinyitott ablakokat a böngésző megjegyzi.

## Futtatás a saját gépen

```bash
npm install
npm run dev
```

Utána nyisd meg a kiírt címet (általában http://localhost:5173).
Ha minden ablakot ki akarsz próbálni, írd az URL végére: `?teszt`

## Feltöltés GitHubra és telepítés GitHub Pages-re

1. Hozz létre egy új repót GitHubon (pl. `adventi-kalendarium`).
2. A projekt mappájában:
   ```bash
   git init
   git add .
   git commit -m "Adventi kalendárium"
   git branch -M main
   git remote add origin https://github.com/FELHASZNALONEV/adventi-kalendarium.git
   git push -u origin main
   ```
3. GitHubon: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. A push után az **Actions** fülön lefut a `Deploy GitHub Pages` workflow (kb. 1 perc).
   Az oldal ezen a címen lesz elérhető:
   `https://FELHASZNALONEV.github.io/adventi-kalendarium/`

Minden további `git push` után az oldal automatikusan frissül.

> Fontos: a `package-lock.json` fájlt is töltsd fel, mert a workflow `npm ci`-t használ.

## Testreszabás

Minden tartalom egy helyen van: **`src/data/days.js`**

- `EV` – melyik év decemberéhez igazodjon a nyitás
- `FEJLEC` – cím, bevezető szöveg, készítők
- `SORREND` – az ablakok elhelyezése a rácson
- `NAPOK` – a 24 nap címe és szövege

### Saját képek

A képek a `public/kepek/` mappában vannak (`nap-01.svg` … `nap-24.svg`).
Cseréld le őket saját fotókra (pl. `nap-01.jpg`), és a `days.js` fájlban a `kep` függvényben
írd át a kiterjesztést `.svg`-ről `.jpg`-re. Ajánlott méret: 800×600 px (4:3), max. ~300 KB/kép.

Csak olyan képet használj, amelyhez jogod van (saját fotó, diákok rajzai, vagy szabad licencű kép,
pl. Unsplash, Pexels, Pixabay).
