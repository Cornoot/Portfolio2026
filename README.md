# Portfolio 2026 — Corné van den Boogert

Statische site, gebouwd vanuit het Figma-ontwerp
(`7pVjAAYSG0ohQpe5RJ9Bal`, secties *portfolio 2026* en *Page components*).

Wat er wordt uitgeleverd is platte HTML, CSS en een klein beetje JS —
geen framework-runtime. De Node-build bestaat alleen om Markdown naar
statische HTML te compileren.

---

## Tekst en afbeeldingen aanpassen

Alle inhoud staat in `content/`. Je hoeft nooit HTML of CSS aan te raken.

- `content/home.md` — hero, sectietitel, en de projectkaarten
- `content/about.md` — intro, tekstblokken, CV, fotogrid, afsluiting

**Een project toevoegen:** plak een nieuw blok onder `projects:` in
`content/home.md`. `cardColor` accepteert `sand`, `sky` of `ice`;
`imageSide` accepteert `left` of `right`. De kaarten wisselen in het
ontwerp om en om van kant.

**Een citaat toevoegen:** plak een nieuw blok onder `voices:` in
`content/home.md`. `quote` is een lijst alinea's; een regelafbreking
binnen een alinea maak je met een `|`-blok en een nieuwe regel. `avatar`
is optioneel — laat je 'm weg, dan begint de naam gewoon bij de rand,
zoals bij Ryan Graute in het ontwerp.

**Een afbeelding vervangen:** zet het bestand in `assets/images/` en
werk `src`, `width` en `height` bij in de betreffende `.md`. Die
afmetingen zijn niet decoratief — de browser reserveert er ruimte mee,
en als ze niet kloppen springt de layout tijdens het laden.

Zie `assets/images/README.md` voor de complete exportlijst.

---

## Lokaal draaien

```bash
npm install
npm run build     # → dist/
npm run dev       # bouwt en serveert dist/ lokaal
```

---

## Deployen

Push naar `main`. De workflow in `.github/workflows/deploy.yml` bouwt en
publiceert `dist/` naar GitHub Pages.

Eenmalig instellen:

1. **GitHub** → repo Settings → Pages → Source: **GitHub Actions**
2. **GitHub** → Settings → Pages → Custom domain: `www.cornevandenboogert.nl`
3. **Versio** → DNS-beheer:
   - `CNAME` op `www` → `cornoot.github.io`
   - vier `A`-records op `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - verwijder eventuele bestaande parkeer- of doorstuur-records
4. Wacht tot GitHub het certificaat uitgeeft, vink dan **Enforce HTTPS** aan

Stel het custom domain in GitHub in *voordat* je bij Versio gaat wijzen.

---

## Toevoegingen buiten het ontwerp om

Drie dingen staan niet in Figma maar zitten wel in de code:

- **Focus-ring** (`:focus-visible`, afgeleid van Blue/900). Zonder
  zichtbare focus is de site niet met toetsenbord te bedienen.
- **Skip-link** naar de hoofdinhoud, als eerste focusbare element.
- **Meta- en OG-tags**, aan te passen via de frontmatter.

## Bekende afwijkingen in het ontwerp

Deze zijn overgenomen zoals ze zijn, niet stilletjes gladgestreken:

- **Twitter-knop** staat in de footer op tablet en mobiel, maar niet op
  desktop, en er is geen URL voor. Nu weggelaten uit de code. Terugzetten
  kan in `src/templates/base.html`.
- **`#52525c` versus Gray/600 `#52525b`** — de kaart-metatekst wijkt één
  hexstap af van de token. Bewaard als aparte `--card-meta`.
- **Marges op tablet** — de top nav houdt 72px aan, de content 32px.
- **"Over mij"** ontbreekt in de nav op tablet en mobiel. De enige route
  naar de about-pagina is daar de hero-knop "Leer mij beter kennen".
- **Panelen op tablet** — in Figma lopen de witte panelen daar van
  rand tot rand; in de code houden ze de 32px marge van `.shell` aan.
  Daardoor zijn de kaarten in “Wat mensen over mij zeggen” op tablet
  622px in plaats van 689px en lopen de citaten over meer regels dan in
  het ontwerp. Op mobiel is dit wél rechtgetrokken (zie
  `main .shell` in `src/css/base.css`); dezelfde twee regels toepassen
  op de tablet-breekpunt lost het daar ook op.
- **Ruimte onder de sectie-intro** — Figma houdt ~32px aan tussen de
  intro en de eerste kaart, de code 24px. `.work` en `.voices` delen die
  regel, dus ze wijken samen af. Wil je exact het ontwerp volgen, zet de
  `gap` in die regel in `src/css/components.css` op 32px.
- **“carriere”** — zo staat het in het ontwerp, letterlijk overgenomen.
  In het Nederlands is het “carrière”.
- **Regellengte** — de bodytekst op de about-pagina loopt op desktop tot
  1076px breed, ruim boven de 45–75 tekens die comfortabel leest. In de
  code staat een `max-width: 75ch` op `.about__section p`. Wil je exact
  het ontwerp volgen, haal die regel dan uit `src/css/pages.css`.
