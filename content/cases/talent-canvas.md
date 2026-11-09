---
title: "Talent mappen met AI — Corné van den Boogert"
description: "Case study: de Talent Canvas van Dialog, waarin AI managers context en redenering geeft bij het mappen van hun team, terwijl de manager zelf beslist."
ogImage: "og-image.jpg"
# Tijdelijk onbereikbaar: niet gelinkt vanaf de home en niet in de
# sitemap. Haal deze regel weg om de case weer te tonen.
unlisted: true

company: "Dialog"
period: "mei - okt, 2026"
heading: "Talent mappen met AI als meedenker, niet als beslisser"

# mobileHeight: vaste hoogte op mobiel (Figma snijdt daar bij).
hero:
  src: "tc-hero.png"
  alt: "Het Talent-scherm van Dialog met de AI Mapping-balk en de 9-grid"
  width: 1264
  height: 556
  mobileHeight: 320

tldr:
  title: "TL:DR;"
  body: "Managers vulden de 9-grid in, waarna er niets mee gebeurde: potentie was vaag en geschiedenis ontbrak. Ik ontwierp een canvas waarop managers hun hele team in één keer plaatsen, met context en geschiedenis per medewerker. Na tests met klanten in twee landen werd AI van beslisser naar meedenker: het levert context en redenering, de manager beslist"

# Elke sectie is een lijst blokken: lead, text, proof, image, gallery.
# gap: tight (12px) | loose (40px) — zonder gap 24px tussen de blokken.
sections:
  - gap: loose
    blocks:
      - image:
          src: "tc-probleem.png"
          alt: "Het Talent-scherm in Dialog met de navigatie, de wachtkolom en een zijpaneel met redenering"
          width: 856
          height: 605
          mobileHeight: 320
      - lead:
          title: "Het probleem"
          body: "Managers plaatsen hun team op een 9-grid (performance × potentie), maar bij alle zes geïnterviewde klanten stokte het proces direct daarna: de grid verdwijnt in een la. Geschiedenis ontbreekt, “potentie” is niet gedefinieerd (vier klanten bouwden het model zelf om) en de analyse verhuist naar Excel en Power BI. Voor de manager voelt plaatsen willekeurig, voor HR betekent het handwerk aan beide kanten, en voor Dialog dat de module maar één stap van het proces bedient."

  - blocks:
      - text:
          title: "Wat we levereden"
          body: "De Talent Canvas: de 9-grid is het werkblad, niet het eindrapport. Niet-geplaatste medewerkers staan in een wachtkolom en de manager sleept ze naar een vaste cel, of verplaatst ze via een actiemenu met het toetsenbord. Een klik op een medewerker opent een zijpaneel met een tijdlijn van plaatsingen, notities en het evaluatieprofiel. Daarnaast licht een AI-paneel toe waarop de plaatsingen gebaseerd zijn."
      - image:
          src: "tc-canvas.png"
          alt: "Een medewerker wordt vanuit de wachtkolom naar een cel van de 9-grid gesleept"
          width: 856
          height: 605
          mobileHeight: 320
      - gallery:
          mobileStack: true
          mobileHeight: 180
          images:
            - src: "tc-zijpaneel.png"
              alt: "Het zijpaneel van een medewerker met een tijdlijn van plaatsingen"
              width: 416
              height: 294
            - src: "tc-ai-paneel.png"
              alt: "Het AI-paneel dat toelicht waarop de plaatsingen gebaseerd zijn"
              width: 416
              height: 294

  - gap: tight
    blocks:
      - text:
          title: "AI levert context, geen plaatsing"
          body: "AI die plaatsingen voorstelt is sneller, maar managers moeten hun oordeel kunnen verantwoorden, en klanten in twee landen wezen op regelgeving. We overwogen drie rollen voor AI: alles plaatsen met een bulkactie om in één keer te accepteren, alleen de performance-as invullen, of helemaal niet plaatsen en context en redenering leveren. We kozen het laatste. Naast de knop om te mappen opent “AI context” een zijpaneel, geen overlay. Bovenaan staat de algemene zekerheid, daaronder Context (welke bronnen de AI bekeek, met datakwaliteit) en Reasoning (één gewogen samenvatting voor het hele team, geen log per persoon)."
      - proof: "**Bewijs**: *Geen externe deelnemer begreep de bulkactie. Zichtbare bronnen bouwden juist vertrouwen op, en de eerste vraag van een manager was: kan ik dit vertrouwen?*"
      - image:
          src: "tc-ai-context.png"
          alt: "Het AI context-paneel met de bronnen Evaluations, Feedback en Talking points"
          width: 856
          height: 424
          mobileHeight: 160

  - blocks:
      - text:
          title: "Herkomst blijft zichtbaar"
          body: "Een AI-suggestie overnemen moet snel gaan, maar HR moet later kunnen zien wie een plaatsing heeft bepaald. In plaats van AI- en handmatige plaatsingen gelijk te behandelen, kozen we ervoor het verschil vast te leggen en te bewaken tot aan het versturen. Elke plaatsing onthoudt of die van AI of van de manager komt, en wie wie heeft geplaatst. Openstaande AI-suggesties mogen blijven staan bij opslaan, maar blokkeren het versturen naar HR tot de manager ze heeft beoordeeld."

  - gap: tight
    blocks:
      - text:
          title: "Een levende map, een vaste momentopname voor HR"
          body: "Managers willen hun map altijd kunnen bijwerken, maar HR heeft per ronde een versie nodig die niet meer verandert. In plaats van een grid die elke ronde opnieuw wordt ingevuld, kozen we voor een map die altijd openstaat. Die wordt automatisch opgeslagen als snapshot, en versturen naar HR is een bewuste stap. Nieuwe medewerkers verschijnen vanzelf in de wachtkolom, en eerdere rondes zijn read-only terug te zien naast “Your current map”."
      - proof: "**Bewijs:** *In 4 van de 6 discovery-interviews was de grid een statische momentopname zonder geschiedenis. Ook in de interne tests misten deelnemers een historisch overzicht, en alle vier liepen vast op het terugdraaien van een plaatsing.*"
      - gallery:
          mobileStack: true
          mobileHeight: 180
          images:
            - src: "tc-map-leeg.png"
              alt: "Een lege talent map met een uitnodiging om te beginnen"
              width: 416
              height: 294
            - src: "tc-map-historie.png"
              alt: "Een eerdere ronde, read-only terug te zien naast de huidige map"
              width: 416
              height: 293

  - blocks:
      - text:
          title: "Uitkomst"
          body: "De 9-grid is van eindrapport naar werkblad gegaan, en AI van beslisser naar meedenker. AI versnelt de manager door context en redenering klaar te zetten, terwijl het oordeel bij de manager blijft. Dat weten we vooralsnog uit acht usability tests: elke manager wilde het laatste woord en vertrouwde de AI meer zodra de bronnen zichtbaar waren."

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
      value: "Q3/Q4 2026"
  notes:
    - title: "Wat ik heb geleerd"
      body: "De wens vanuit business is niet de juiste gebruikerswens om te vervullen. Wat startte naar een “Agentic-first” idee, eindigde met een feature waarbij AI enkel de toplaag dicteert van de interactie. De manager blijft controle en uitvoering behouden."
    - title: "Wat ik wilde toevoegen aan dit concept"
      body: "Het concept ansich was redelijk af. Managers kunnen starten met het plotten van hun talent op een 9-grid. Voor een volgende stap waren “follow up actions” aan de beurt, om de manager inzichten direct om te laten zetten naar nieuwe stappen"
---
