---
title: "Dialog Design System — Corné van den Boogert"
description: "Case study: het opzetten van het Dialog Design System (DDS), van design tokens tot componenten, patronen en paginatemplates."
ogImage: "og-image.jpg"

company: "Dialog"
period: "Sept 2025 - Jan 2026"
heading: "Eén systeem, consistent in elk scherm"

# mobileHeight: vaste hoogte op mobiel (Figma snijdt daar bij).
hero:
  src: "ds-hero.png"
  alt: "Een Radio-Card component met annotaties: paragraph/md/semibold, --border/active en --bg/active"
  width: 1264
  height: 556
  mobileHeight: 193

tldr:
  title: "TL;DR"
  body: "Dialog bouwt een HR-suite voor performance, engagement en talent. Een design systeem was er niet, waardoor varianten verspreid lagen over losse Figma-bestanden. Ik nam de lead in het opzetten van het Dialog Design System (DDS): van design tokens tot componenten, patronen en paginatemplates. Het resultaat: developers én designers werken sneller, het systeem draait live in Storybook en is dankzij de documentatie ook bruikbaar voor AI, voor designer en developer."

# Elke sectie is een lijst blokken: lead, text, proof, image, gallery.
# gap: tight (12px) | loose (40px) — zonder gap 24px tussen de blokken.
sections:
  - gap: loose
    blocks:
      - image:
          src: "ds-probleem.png"
          alt: "Losse componenten uit verschillende Figma-bestanden: formulieren, een kaart en een dropdown"
          width: 856
          height: 577
          mobileHeight: 193
      - lead:
          title: "Het probleem"
          body: "Toen ik bij Dialog begon, was er geen design systeem. Wel een verouderde front-end stack en veel nadruk op het snel leveren van nieuwe features. Componenten waren niet gedocumenteerd en varianten bestonden alleen in losse Figma-bestanden, verstopt tussen schetsen en implementatieschermen. Wat ontbrak was één bron van waarheid."

  - blocks:
      - text:
          title: "Klein beginnen"
          body: |
            Als Product Designer was het mijn taak om een schaalbaar design systeem op te zetten. Samen met twee front-end developers en één back-end developer begonnen we bij wat haalbaar was. Wat hebben we zelf nodig van een systeem, en hoe gaan we ermee werken? De belofte was bewust klein: een Storybook-omgeving voor de eerste componenten, onder de naam DDS, *Dialog Design System*.

            De kaders waren strak. We werkten “just in time”: alleen componenten die we echt nodig hadden, werden gebouwd. Een complete rebrand van het product paste niet in de planning.

  - blocks:
      - text:
          title: "De rebrand als startpunt"
          body: |
            De timing bleek wel perfect. Intern werd een rebrand aangekondigd, met een nieuw logo, nieuwe kleuren en een nieuwe merkbeleving. Het ideale moment om dat direct door te trekken in het product.

            Samen met de twee front-enders legde ik de eerste design tokens vast voor kleur, interactie en spatiëring. Leesbaarheid en schaalbaarheid stonden voorop. Voor kleur begon ik bij nieuwe primitives (eerst vanuit Bootstrap, later Tailwind) en bouwde daar semantische tokens op. Zo pas je een merkkleur op één plek aan, en klopt hij overal.
      - image:
          src: "ds-tokens.png"
          alt: "Uitleg “From Primitive to Semantic”: hoe een hexwaarde via een primitive token een semantisch token wordt"
          width: 856
          height: 605
          mobileHeight: 193
      - image:
          src: "ds-variabelen.png"
          alt: "De kleurvariabelen van het DDS in Figma, primitives en hun semantische aliassen"
          width: 856
          height: 605
          mobileHeight: 193

  - gap: tight
    blocks:
      - text:
          title: "Documenteren voor elke developer"
          body: "Om het DDS handen en voeten te geven, gaf ik een presentatie aan het hele dev team: mijn visie op het systeem, de waarde voor snellere oplevering en wat ze van mij konden verwachten. Dat ging verder dan tokens voor kleur, viewport, typografie en margins. Elk component kreeg een spec-sheet ([gebaseerd op het werk van Nathan Curtis](https://medium.com/eightshapes-llc/the-figma-component-review-f42114450b4d)) met alle gedragingen, varianten en staten. Zo heeft elke developer één referentie in plaats van losse Figma-bestanden."
      - image:
          src: "ds-spec-sheet.png"
          alt: "Een spec-sheet met layout en spacing van een knop-component"
          width: 856
          height: 424
          mobileHeight: 193

  - gap: tight
    blocks:
      - text:
          title: "Niet alleen in Figma"
          body: "Een design systeem reikt verder dan pixels in Figma. Ik testte de opgeleverde componenten zelf intensief in Storybook. Daarnaast vroeg ik intern bij Visma advies over het AI-ready maken van een design systeem. Dankzij de documentatie is het DDS nu “redelijk AI-ready”, zelfs zo dat ik zelf PR’s push voor kleine aanpassingen aan het systeem. What a world to be alive in today!"
      - gallery:
          mobileHeight: 166
          images:
            - src: "ds-storybook-1.png"
              alt: "Knop-componenten van het DDS in Storybook"
              width: 416
              height: 294
            - src: "ds-storybook-2.png"
              alt: "De documentatiepagina van de primaire knop in Storybook"
              width: 416
              height: 294

  - blocks:
      - text:
          title: "Uitkomst"
          body: "In vijf maanden ging Dialog van verspreide Figma-bestanden naar één gedeeld systeem. Het DDS bevat tokens, componenten, patronen en paginatemplates, live in Storybook en per component gedocumenteerd. Developers en designers bouwen sneller: features duurde maar 2 weken in plaats van een maand of 2. Op de interne eindejaarsupdate presenteerde ik het DDS aan het hele bedrijf, met succes!"

# facts: linkerkolom. Een href maakt de waarde een (onderstreepte) link.
behindTheScenes:
  title: "Achter de schermen"
  facts:
    - label: "Rol"
      value: "Product Designer"
    - label: "Bedrijf"
      value: "Dialog"
    - label: "Expertise"
      value: "Design Systems, Design Tokens, Interaction Design, Spec-sheets"
  notes:
    - title: "Wat ik heb toegepast"
      body: "Een schaalbaar design systeem in een rap tempo opzetten begint altijd bij de basics: typografie, margins en grids."
    - title: "Vervolg"
      body: "Als er meer tijd was had ik meer patronen ondergebracht in het DDS, waardoor het nog resultaat intern kon boeken"
---
