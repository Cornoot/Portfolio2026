---
title: "Talent mapping with AI — Corné van den Boogert"
description: "Case study: Dialog's Talent Canvas, where AI gives managers context and reasoning while mapping their team, and the manager makes the call."
ogImage: "og-image.jpg"
# Alleen bereikbaar via de directe link /Talent_review: niet gelinkt
# vanaf de home, niet in de sitemap en met een noindex-tag, zodat
# Google 'm niet in de zoekresultaten toont.
url: "Talent_review"
noindex: true
lang: "en"

company: "Dialog"
period: "May - Oct, 2026"
heading: "Mapping talent with AI as a thinking partner, not a decision maker"

# mobileHeight: vaste hoogte op mobiel (Figma snijdt daar bij).
hero:
  src: "tc-hero.png"
  alt: "Dialog's Talent screen with the AI Mapping bar and the 9-grid"
  width: 1264
  height: 556
  mobileHeight: 320

tldr:
  title: "TL:DR;"
  body: "Managers filled in the 9-grid, and then nothing happened with it: potential was vague and history was missing. I designed a canvas where managers place their whole team in one go, with context and history for every employee. After testing with customers in two countries, AI went from decision maker to thinking partner: it provides context and reasoning, the manager decides"

# Elke sectie is een lijst blokken: lead, text, proof, image, gallery.
# gap: tight (12px) | loose (40px) — zonder gap 24px tussen de blokken.
sections:
  - gap: loose
    blocks:
      - image:
          src: "tc-probleem.png"
          alt: "The Talent screen in Dialog with the navigation, the waiting column and a side panel with reasoning"
          width: 856
          height: 605
          mobileHeight: 320
      - lead:
          title: "The problem"
          body: "Managers place their team on a 9-grid (performance × potential), but at all six customers we interviewed, the process stalled right after: the grid ends up in a drawer. History is missing, “potential” isn't defined (four customers rebuilt the model themselves) and the analysis moves to Excel and Power BI. For managers, placing feels arbitrary; for HR, it means manual work on both ends; and for Dialog, it means the module only serves one step of the process."

  - blocks:
      - text:
          title: "What we delivered"
          body: "The Talent Canvas: the 9-grid is the worksheet, not the final report. Unplaced employees wait in a column, and the manager drags them into a fixed cell, or moves them with the keyboard through an action menu. Clicking an employee opens a side panel with a timeline of placements, notes and their review profile. On top of that, an AI panel explains what the placements are based on."
      - image:
          src: "tc-canvas.png"
          alt: "An employee being dragged from the waiting column into a cell of the 9-grid"
          width: 856
          height: 605
          mobileHeight: 320
      - gallery:
          mobileStack: true
          mobileHeight: 180
          images:
            - src: "tc-zijpaneel.png"
              alt: "An employee's side panel with a timeline of placements"
              width: 416
              height: 294
            - src: "tc-ai-paneel.png"
              alt: "The AI panel explaining what the placements are based on"
              width: 416
              height: 294

  - gap: tight
    blocks:
      - text:
          title: "AI provides context, not placements"
          body: "AI that suggests placements is faster, but managers need to be able to justify their judgement, and customers in two countries pointed to regulation. We considered three roles for AI: place everyone, with a bulk action to accept it all at once; fill in only the performance axis; or place no one and provide context and reasoning instead. We chose the last one. Next to the button to start mapping, “AI context” opens a side panel, not an overlay. At the top is the overall confidence, below it Context (which sources the AI looked at, with their data quality) and Reasoning (one weighted summary for the whole team, not a log per person)."
      - proof: "**Evidence**: *Not a single external participant understood the bulk action. Visible sources, on the other hand, built trust, and a manager's first question was: can I trust this?*"
      - image:
          src: "tc-ai-context.png"
          alt: "The AI context panel with the sources Evaluations, Feedback and Talking points"
          width: 856
          height: 424
          mobileHeight: 160

  - blocks:
      - text:
          title: "Where a placement came from stays visible"
          body: "Accepting an AI suggestion should be quick, but HR needs to be able to see later who decided on a placement. Instead of treating AI and manual placements the same, we chose to record the difference and guard it all the way to submission. Every placement remembers whether it came from AI or from the manager, and who placed whom. Open AI suggestions can stay in place when saving, but they block submitting to HR until the manager has reviewed them."

  - gap: tight
    blocks:
      - text:
          title: "A living map, a fixed snapshot for HR"
          body: "Managers want to be able to update their map at any time, but HR needs a version per round that no longer changes. Instead of a grid that's filled in from scratch every round, we chose a map that's always open. It's saved automatically as a snapshot, and submitting to HR is a deliberate step. New employees show up in the waiting column on their own, and previous rounds can be viewed read-only next to “Your current map”."
      - proof: "**Evidence:** *In 4 of the 6 discovery interviews, the grid was a static snapshot without history. In the internal tests, participants also missed a historical overview, and all four got stuck undoing a placement.*"
      - gallery:
          mobileStack: true
          mobileHeight: 180
          images:
            - src: "tc-map-leeg.png"
              alt: "An empty talent map with an invitation to get started"
              width: 416
              height: 294
            - src: "tc-map-historie.png"
              alt: "A previous round, viewable read-only next to the current map"
              width: 416
              height: 293

  - blocks:
      - text:
          title: "Outcome"
          body: "The 9-grid went from final report to worksheet, and AI from decision maker to thinking partner. AI speeds up managers by preparing context and reasoning, while the judgement stays with the manager. So far we know this from eight usability tests: every manager wanted the final say, and trusted the AI more as soon as the sources were visible."

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
      value: "Q3/Q4 2026"
  notes:
    - title: "What I learned"
      body: "What the business wants isn't necessarily the right user need to fulfil. What started as an “agentic-first” idea ended as a feature where AI only shapes the top layer of the interaction. The manager stays in control and does the work."
    - title: "What I wanted to add to this concept"
      body: "The concept itself was fairly complete. Managers can start plotting their talent on a 9-grid. The next step would have been “follow-up actions”, so managers can turn insights straight into next steps"
---
