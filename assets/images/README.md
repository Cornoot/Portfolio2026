# Afbeeldingen

Exporteer deze uit Figma en plaats ze hier met exact deze bestandsnamen.
De afmetingen staan in `content/*.md` en moeten kloppen met het bestand,
anders klopt de gereserveerde ruimte niet en krijg je layout shift.

## Homepage
| Bestand | Verhouding | Node in Figma |
| --- | --- | --- |
| `portret-hero.jpg` | 502 x 521 | 3218:9984 |
| `dialog-dashboard.png` | 516 x 503 | 3218:10002 |
| `design-system.png` | 516 x 523 | 3218:10005 |
| `moreapp.png` | 516 x 551 | 3218:10034 |
| `avatar-anke-smilde.png` | 48 x 48 | -- |
| `avatar-mary-wolf.png` | 48 x 48 | -- |
| `avatar-simon-van-acht.png` | 48 x 48 | -- |

De drie avatars bij "Wat mensen over mij zeggen" staan er nu op 48 x 48,
uitgesneden uit een export van het ontwerp. Dat is precies de weergave-
grootte, dus op een retina-scherm ogen ze zacht. Exporteer ze op 2x
(96 x 96) uit Figma en overschrijf de bestanden -- `width` en `height`
in `content/home.md` blijven 48. Het derde citaat (Ryan Graute) heeft in
het ontwerp geen portret; laat `avatar` daar gewoon weg.

## About
| Bestand | Verhouding | Node in Figma |
| --- | --- | --- |
| `portret-about.jpg` | 502 x 521 | 3218:9725 |
| `miauwmiauws.jpg` | 348 x 312 | 3218:9790 |
| `trouwfoto.jpg` | 348 x 653 | 3218:9791 |
| `moose.jpg` | 348 x 312 | 3218:9792 |
| `meme.jpg` | 348 x 312 | 3218:9793 |
| `bass.jpg` | 348 x 348 | 3218:9794 |

## Social sharing
`og-image.jpg`, 1200 x 630. Wordt door beide pagina's gedeeld.

Exporteer op 2x voor scherpe weergave op retina-schermen.
De favicon `favicon.svg` is een tijdelijke reconstructie -- exporteer
het echte Favicon-frame (3218:9971) uit Figma en vervang hem.
