---
title: "Dialog Design System — Corné van den Boogert"
description: "Case study: setting up the Dialog Design System (DDS), from design tokens to components, patterns and page templates."
ogImage: "og-image.jpg"
# Engelse versie van design-system.md. Alleen bereikbaar via de
# directe link /Design_system_review: niet gelinkt vanaf de home,
# niet in de sitemap en met een noindex-tag voor Google.
url: "Design_system_review"
noindex: true
lang: "en"

company: "Dialog"
period: "Sept 2025 - Jan 2026"
heading: "One system, consistent on every screen"

# mobileHeight: vaste hoogte op mobiel (Figma snijdt daar bij).
hero:
  src: "ds-hero.png"
  alt: "A Radio-Card component with annotations: paragraph/md/semibold, --border/active and --bg/active"
  width: 1264
  height: 556
  mobileHeight: 193

tldr:
  title: "TL;DR"
  body: "Dialog builds an HR suite for performance, engagement and talent. There was no design system, so variants were scattered across separate Figma files. I took the lead in setting up the Dialog Design System (DDS): from design tokens to components, patterns and page templates. The result: developers and designers work faster, the system runs live in Storybook and, thanks to its documentation, it's also usable by AI, for designers and developers alike."

# Elke sectie is een lijst blokken: lead, text, proof, image, gallery.
# gap: tight (12px) | loose (40px) — zonder gap 24px tussen de blokken.
sections:
  - gap: loose
    blocks:
      - image:
          src: "ds-probleem.png"
          alt: "Loose components from different Figma files: forms, a card and a dropdown"
          width: 856
          height: 577
          mobileHeight: 193
      - lead:
          title: "The problem"
          body: "When I started at Dialog, there was no design system. There was an outdated front-end stack and a strong focus on shipping new features fast. Components weren't documented and variants only existed in separate Figma files, hidden between sketches and implementation screens. What was missing was a single source of truth."

  - blocks:
      - text:
          title: "Starting small"
          body: |
            As Product Designer, it was my job to set up a scalable design system. Together with two front-end developers and one back-end developer, we started with what was feasible. What do we need from a system ourselves, and how are we going to work with it? The promise was deliberately small: a Storybook environment for the first components, under the name DDS, *Dialog Design System*.

            The constraints were tight. We worked “just in time”: only components we actually needed got built. A complete rebrand of the product didn't fit the roadmap.

  - blocks:
      - text:
          title: "The rebrand as a starting point"
          body: |
            The timing turned out to be perfect, though. A rebrand was announced internally, with a new logo, new colours and a new brand experience. The ideal moment to carry it straight through into the product.

            Together with the two front-end developers, I defined the first design tokens for colour, interaction and spacing. Readability and scalability came first. For colour, I started with new primitives (first based on Bootstrap, later Tailwind) and built semantic tokens on top of them. That way, you change a brand colour in one place, and it's right everywhere.
      - image:
          src: "ds-tokens.png"
          alt: "Explanation “From Primitive to Semantic”: how a hex value becomes a semantic token through a primitive token"
          width: 856
          height: 605
          mobileHeight: 193
      - image:
          src: "ds-variabelen.png"
          alt: "The DDS colour variables in Figma, primitives and their semantic aliases"
          width: 856
          height: 605
          mobileHeight: 193

  - gap: tight
    blocks:
      - text:
          title: "Documenting for every developer"
          body: "To give the DDS real substance, I gave a presentation to the whole dev team: my vision for the system, its value for faster delivery and what they could expect from me. That went beyond tokens for colour, viewport, typography and margins. Every component got a spec sheet ([based on the work of Nathan Curtis](https://medium.com/eightshapes-llc/the-figma-component-review-f42114450b4d)) with all its behaviours, variants and states. That way, every developer has one reference instead of separate Figma files."
      - image:
          src: "ds-spec-sheet.png"
          alt: "A spec sheet with the layout and spacing of a button component"
          width: 856
          height: 424
          mobileHeight: 193

  - gap: tight
    blocks:
      - text:
          title: "Not just in Figma"
          body: "A design system reaches further than pixels in Figma. I tested the delivered components thoroughly in Storybook myself. I also asked for advice within Visma on making a design system AI-ready. Thanks to the documentation, the DDS is now “fairly AI-ready”, so much so that I push PRs myself for small changes to the system. What a world to be alive in today!"
      - gallery:
          mobileHeight: 166
          images:
            - src: "ds-storybook-1.png"
              alt: "DDS button components in Storybook"
              width: 416
              height: 294
            - src: "ds-storybook-2.png"
              alt: "The documentation page of the primary button in Storybook"
              width: 416
              height: 294

  - blocks:
      - text:
          title: "Outcome"
          body: "In five months, Dialog went from scattered Figma files to one shared system. The DDS contains tokens, components, patterns and page templates, live in Storybook and documented per component. Developers and designers build faster: features took just 2 weeks instead of around 2 months. At the internal end-of-year update, I presented the DDS to the whole company, with success!"

# facts: linkerkolom. Een href maakt de waarde een (onderstreepte) link.
behindTheScenes:
  title: "Behind the scenes"
  facts:
    - label: "Role"
      value: "Product Designer"
    - label: "Company"
      value: "Dialog"
    - label: "Expertise"
      value: "Design Systems, Design Tokens, Interaction Design, Spec sheets"
  notes:
    - title: "What I applied"
      body: "Setting up a scalable design system at a fast pace always starts with the basics: typography, margins and grids."
    - title: "Next steps"
      body: "With more time, I would have brought more patterns into the DDS, so it could deliver even more results internally"
---
