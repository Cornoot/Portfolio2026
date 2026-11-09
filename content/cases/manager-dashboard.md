---
title: "Manager dashboard — Corné van den Boogert"
description: "Case study: het manager dashboard van Dialog, een takenlijst als springplank naar het juiste onderdeel — en de basis voor het eerste design system."
ogImage: "og-image.jpg"

company: "Dialog"
period: "okt 2025 - apr 2026"
heading: "Alles wat je moet doen, op 1 plek"

# mobileHeight / tabletHeight: vaste hoogte op mobiel / tablet
# (Figma snijdt daar bij).
hero:
  src: "md-hero.png"
  alt: "Het manager dashboard van Dialog: welkomstbericht, de takenlijst en snelle acties"
  width: 1264
  height: 598
  mobileHeight: 184
  tabletHeight: 498

tldr:
  title: "TL:DR;"
  body: "De pNPS daalde en managers vonden functies in Dialog lastig te gebruiken of wisten niet dat ze bestonden. Het bedrijf wilde snel opleveren, zonder documentatie. Ik koos een andere richting: een dashboard met open taken als springplank naar het juiste onderdeel. Daarbij legde ik de basis voor het eerste design system van Dialog. In de eerste week van april 2026 klikte 72% van de managers die het dashboard opende door naar een andere feature."

# Elke sectie is een lijst blokken: lead, text, proof, image, gallery,
# teaser. gap: tight (12px) | loose (40px) — zonder gap 24px.
sections:
  - gap: loose
    blocks:
      - image:
          src: "md-probleem.png"
          alt: "Het manager dashboard in Dialog, met de navigatie links en de takenlijst in het midden"
          width: 856
          height: 605
      - lead:
          title: "Het probleem"
          body: "De pNPS daalde. In onderzoek met 7 gebruikers, samen met de head of product en de product owner en geanalyseerd met affinity mapping, zagen we dat managers geen duidelijk startpunt hadden. Taken zoals performance reviews, feedback en persoonlijke plannen zaten verspreid over de module, en sommige functies kenden managers niet of werden lastig gevonden. De bedrijfswens was om snel op te leveren, zonder documentatie. Maar wat managers nodig hadden was een springplank: een plek die zegt wat er open staat en waar ze dat afronden."

  - blocks:
      - text:
          title: "Wat we leverden"
          body: "Het manager dashboard: een lijst met open taken, gesplitst per type (persoonlijk plan, gesprekken, evaluatie en feedback). Elke taak linkt naar de pagina waar je hem afrondt. Je kunt zoeken in de lijst en ziet in een databeeld de stand van evaluaties en persoonlijke plannen over de laatste twee weken. Met snelle acties voeg je direct een gesprekknotitie toe, plan je een spontane evaluatie of geef of vraag je feedback."
      - image:
          src: "md-dashboard.png"
          alt: "De takenlijst van het dashboard, met tabbladen per type taak"
          width: 856
          height: 605
      - gallery:
          mobileStack: true
          images:
            - src: "md-galerij-1.png"
              alt: "Detail van het dashboard: open taken per medewerker"
              width: 416
              height: 294
            - src: "md-galerij-2.png"
              alt: "Detail van het dashboard: de snelle acties"
              width: 416
              height: 294

  - gap: tight
    blocks:
      - text:
          title: "Een takenlijst, geen overzicht met cijfers"
          body: "Een dashboard kan veel zijn: een overzicht met grafieken of een lijst met wat de manager nu moet doen. We kozen voor de lijst. Taken staan op volgorde van type, tonen alleen wat open staat en brengen de manager met één klik naar het onderdeel waar de taak afgerond wordt. Zo wordt het dashboard een startpunt in plaats van een extra scherm om te lezen."
      - image:
          src: "md-takenlijst.png"
          alt: "Het databeeld met de stand van evaluaties en persoonlijke plannen"
          width: 856
          height: 424

  - gap: tight
    blocks:
      - text:
          title: "Een design system als startpunt"
          body: "Dialog had nog geen design system. Voor het dashboard zette ik componenten, viewports en patronen op, zoals modals, links en acties. Dat maakte het dashboard consistent en gaf het team een basis om op verder te bouwen. Front-end developers konden daardoor nieuwe features sneller opleveren."
      - teaser:
          title: "Lees meer over het design systeem van Dialog"
          href: "design-system.html"
          ctaLabel: "Bekijk case study"
          image:
            src: "md-teaser-ds.png"
            alt: "Een Radio-Card component uit het Dialog Design System"
            width: 312
            height: 184

  - blocks:
      - text:
          title: "Gemeten: 72% klikt door"
          body: "We maten het gebruik met PostHog in de eerste week van april 2026. Van de managers die het dashboard openden, klikte 72% door naar een andere feature. Dat is precies waar het dashboard voor bedoeld is: managers vinden hun volgende stap. Ook steeg de pNPS, maar die stijging was tijdelijk."

  - blocks:
      - text:
          title: "Uitkomst"
          body: "Managers hebben nu één startpunt dat laat zien wat open staat, en Dialog heeft een eerste design system waarop developers sneller bouwen. De 72% doorklik laat zien dat managers het dashboard gebruiken als springplank. De tijdelijke pNPS-stijging nemen we mee, maar we schrijven die niet alleen aan het dashboard toe."

# facts: linkerkolom. Een href maakt de waarde een (onderstreepte) link.
behindTheScenes:
  title: "Achter de schermen"
  facts:
    - label: "Rol"
      value: "Product Designer"
    - label: "Bedrijf"
      value: "Dialog"
    - label: "Expertise"
      value: "End-to-end research, testing, delivery"
    - label: "Periode"
      value: "Okt 2025 - apr 2026"
  notes:
    - title: "Wat ik heb geleerd"
      body: "De wens vanuit business is niet altijd de juiste gebruikerswens om te vervullen. Snel opleveren zonder documentatie was het startpunt, maar onderzoek met gebruikers gaf de onderbouwing om te kiezen voor een springplank. Daarbij hielp het om direct een design system op te zetten, zodat snelheid en kwaliteit elkaar niet in de weg zaten."
    - title: "Wat ik wilde toevoegen aan dit concept"
      body: "Een volgende stap is meten of de doorklik ook leidt tot afgeronde taken, niet alleen tot een klik. Daarmee weten we of het dashboard managers echt helpt hun werk af te maken."
---
