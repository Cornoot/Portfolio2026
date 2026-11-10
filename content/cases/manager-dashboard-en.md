---
title: "Manager dashboard — Corné van den Boogert"
description: "Case study: Dialog's manager dashboard, a task list as a springboard to the right part of the product — and the foundation for the first design system."
ogImage: "og-image.jpg"
# Engelse versie van manager-dashboard.md, zonder de teaser naar de
# design system case. Alleen bereikbaar via de directe link
# /Dashboard_review: niet gelinkt vanaf de home, niet in de sitemap
# en met een noindex-tag voor Google.
url: "Dashboard_review"
noindex: true
lang: "en"

company: "Dialog"
period: "Oct 2025 - Apr 2026"
heading: "Everything you need to do, in one place"

# mobileHeight / tabletHeight: vaste hoogte op mobiel / tablet
# (Figma snijdt daar bij).
hero:
  src: "md-hero.png"
  alt: "Dialog's manager dashboard: welcome message, the task list and quick actions"
  width: 1264
  height: 598
  mobileHeight: 184
  tabletHeight: 498

tldr:
  title: "TL:DR;"
  body: "The pNPS was dropping, and managers found features in Dialog hard to use or didn't know they existed. The company wanted to ship fast, without documentation. I chose a different direction: a dashboard with open tasks as a springboard to the right part of the product. Along the way, I laid the foundation for Dialog's first design system. In the first week of April 2026, 72% of managers who opened the dashboard clicked through to another feature."

# Elke sectie is een lijst blokken: lead, text, proof, image, gallery,
# teaser. gap: tight (12px) | loose (40px) — zonder gap 24px.
sections:
  - gap: loose
    blocks:
      - image:
          src: "md-probleem.png"
          alt: "The manager dashboard in Dialog, with the navigation on the left and the task list in the middle"
          width: 856
          height: 605
      - lead:
          title: "The problem"
          body: "The pNPS was dropping. In research with 7 users, together with the head of product and the product owner and analysed with affinity mapping, we saw that managers had no clear starting point. Tasks like performance reviews, feedback and personal plans were spread across the module, and managers either didn't know some features or found them hard to use. The business wanted to ship fast, without documentation. But what managers needed was a springboard: one place that tells them what's open and where to finish it."

  - blocks:
      - text:
          title: "What we delivered"
          body: "The manager dashboard: a list of open tasks, split by type (personal plan, conversations, review and feedback). Every task links to the page where you complete it. You can search the list, and a chart shows the status of reviews and personal plans over the last two weeks. With quick actions, you can add a conversation note right away, schedule an ad-hoc review, or give or request feedback."
      - image:
          src: "md-dashboard.png"
          alt: "The dashboard's task list, with tabs per task type"
          width: 856
          height: 605
      - gallery:
          mobileStack: true
          images:
            - src: "md-galerij-1.png"
              alt: "Dashboard detail: open tasks per employee"
              width: 416
              height: 294
            - src: "md-galerij-2.png"
              alt: "Dashboard detail: the quick actions"
              width: 416
              height: 294

  - gap: tight
    blocks:
      - text:
          title: "A task list, not an overview of numbers"
          body: "A dashboard can be many things: an overview with charts, or a list of what the manager needs to do now. We chose the list. Tasks are ordered by type, show only what's open and take the manager to the place where the task gets done in one click. That makes the dashboard a starting point instead of yet another screen to read."
      - image:
          src: "md-takenlijst.png"
          alt: "The chart with the status of reviews and personal plans"
          width: 856
          height: 424

  - gap: tight
    blocks:
      - text:
          title: "A design system as a starting point"
          body: "Dialog didn't have a design system yet. For the dashboard, I set up components, viewports and patterns, such as modals, links and actions. That made the dashboard consistent and gave the team a foundation to build on. As a result, front-end developers could ship new features faster."

  - blocks:
      - text:
          title: "Measured: 72% click through"
          body: "We measured usage with PostHog in the first week of April 2026. Of the managers who opened the dashboard, 72% clicked through to another feature. That's exactly what the dashboard is meant for: managers find their next step. The pNPS went up as well, but that increase was temporary."

  - blocks:
      - text:
          title: "Outcome"
          body: "Managers now have one starting point that shows what's open, and Dialog has a first design system that helps developers build faster. The 72% click-through shows that managers use the dashboard as a springboard. We take the temporary pNPS increase into account, but we don't attribute it to the dashboard alone."

# facts: linkerkolom. Een href maakt de waarde een (onderstreepte) link.
behindTheScenes:
  title: "Behind the scenes"
  facts:
    - label: "Role"
      value: "Product Designer"
    - label: "Company"
      value: "Dialog"
    - label: "Expertise"
      value: "End-to-end research, testing, delivery"
    - label: "Period"
      value: "Oct 2025 - Apr 2026"
  notes:
    - title: "What I learned"
      body: "What the business wants isn't always the right user need to fulfil. Shipping fast without documentation was the starting point, but research with users gave us the grounds to choose a springboard. Setting up a design system right away helped, so speed and quality didn't get in each other's way."
    - title: "What I wanted to add to this concept"
      body: "A next step is measuring whether the click-through also leads to completed tasks, not just a click. That tells us whether the dashboard really helps managers get their work done."
---
