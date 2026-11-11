/* ============================================================
   build.mjs
   Reads content/*.md (and content/cases/*.md), renders them into
   src/templates/base.html, writes static HTML to dist/. Runs at
   build time only — the shipped site has no runtime dependency
   on this script.
   ============================================================ */

import { readFile, writeFile, mkdir, cp, rm, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import matter from "gray-matter";
import { marked } from "marked";

const SITE_URL = "https://www.cornevandenboogert.nl";
const OUT = "dist";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
           .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* Inline markdown (bold/italic/links) without wrapping <p>. */
const inline = (s = "") => marked.parseInline(String(s));

/* Same, but a newline inside the string becomes a <br> — a soft
   line break, not a new paragraph. Some referrals use both, and
   the difference is visible in Figma. */
const inlineLines = (s = "") =>
  String(s).trim().split("\n").map((l) => inline(l.trim())).join("<br>");

/* ---------- image helper --------------------------------------
   Every image carries intrinsic width/height so the browser
   reserves space and layout shift stays at zero.               */
function img(image, { className = "", lazy = true } = {}) {
  if (!image?.src) return "";
  const loading = lazy ? ' loading="lazy" decoding="async"' : ' decoding="async"';
  return `<img src="assets/images/${esc(image.src)}" alt="${esc(image.alt)}"`
       + ` width="${esc(image.width)}" height="${esc(image.height)}"`
       + (className ? ` class="${className}"` : "")
       + `${loading}>`;
}

/* ---------- icon helper -----------------------------------------
   Path data exported from Figma (assets/icons/*.svg) — reproduced
   here rather than re-fetched, with fill/stroke swapped to
   currentColor so each icon follows its button's text colour.   */
const ICONS = {
  "arrow-sm-right": {
    viewBox: "0 0 12 10", width: 12, height: 10,
    body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M6.29289 0.292893C6.68342 -0.097631 7.31658 -0.0976311 7.70711 0.292893L11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L7.70711 9.70711C7.31658 10.0976 6.68342 10.0976 6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289L8.58579 6L1 6C0.447716 6 -2.41411e-08 5.55228 0 5C2.41411e-08 4.44772 0.447716 4 1 4H8.58579L6.29289 1.70711C5.90237 1.31658 5.90237 0.683418 6.29289 0.292893Z" fill="currentColor"/>`,
  },
  "arrow-sm-left": {
    viewBox: "0 0 12 10", width: 12, height: 10,
    body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.29289 9.70711L0.292894 5.70711C-0.0976312 5.31658 -0.0976312 4.68342 0.292894 4.29289L4.29289 0.292894C4.68342 -0.0976312 5.31658 -0.0976312 5.70711 0.292894C6.09763 0.683418 6.09763 1.31658 5.70711 1.70711L3.41421 4L11 4C11.5523 4 12 4.44772 12 5C12 5.55228 11.5523 6 11 6H3.41421L5.70711 8.29289C6.09763 8.68342 6.09763 9.31658 5.70711 9.70711Z" fill="currentColor"/>`,
  },
  "paper-airplane": {
    viewBox: "0 0 17 17", width: 15, height: 15,
    body: `<path d="M8.50001 14.3333L16 16L8.50001 1L1.00001 16L8.50001 14.3333ZM8.50001 14.3333V7.66667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
};

function icon(name) {
  const i = ICONS[name];
  return `<svg class="btn__icon" width="${i.width}" height="${i.height}" viewBox="${i.viewBox}" fill="none" aria-hidden="true">${i.body}</svg>`;
}

/* ---------- author helper ---------------------------------------
   Avatar + name + role, shared by the home testimonials and the
   referrals page. The avatar is decorative (alt=""); some authors
   have none.                                                     */
function author(r) {
  const avatar = r.avatar ? img(r.avatar, { className: "author__avatar" }) : "";
  return `<figcaption class="author">
              ${avatar}
              <div class="author__who">
                <p class="author__name">${inline(r.name)}</p>
                <p class="author__role">${inline(r.role)}</p>
              </div>
            </figcaption>`;
}

/* ---------- home ---------------------------------------------- */
function renderHome(data, referrals) {
  const h = data.hero;

  /* Centred column: tilted photo on top, then heading, intro and
     CTA. (The "Daar heb je 'm!" speech bubble moved to the about
     page in Nov 2026.) */
  const hero = `
    <div class="hero-wrap">
      <div class="hero-card hero-card--home">
        <div class="prose-shell">
          <div class="hero">
            <div class="hero__media">
              <div class="hero__photo">${img(h.image, { lazy: false })}</div>
            </div>
            <div class="hero__text">
              <div class="hero__lines">
                <h1>${inline(h.heading)}</h1>
                <p class="intro">${inline(h.intro)}</p>
              </div>
              <a class="btn btn--primary btn--icon" href="${esc(h.ctaHref)}">
                ${inline(h.ctaLabel)}
                ${icon("arrow-sm-right")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  /* A project without href (no case study yet) simply has no
     button — the card itself stays the same. */
  const cards = (data.projects || []).map((p) => {
    const cta = p.href ? `
              <a class="btn btn--tertiary btn--icon" href="${esc(p.href)}">
                ${inline(p.ctaLabel || "Bekijk case study")}
                ${icon("arrow-sm-right")}
              </a>` : "";

    return `
          <article class="project-card project-card--${esc(p.cardColor)}${p.imageSide === "right" ? " project-card--media-right" : ""}" data-reveal>
            <div class="project-card__media${p.imageFocus === "left" ? " project-card__media--left" : ""}">${img(p.image)}</div>
            <div class="project-card__body">
              <h3 class="project-card__title">${inline(p.title)}</h3>
              <p class="project-card__text">${inline(p.body)}</p>${cta}
            </div>
          </article>`;
  }).join("\n");

  /* Testimonials hold only a name and a short excerpt here; role
     and avatar come from content/referrals.md, so they live in
     one place. */
  const people = Object.fromEntries((referrals.referrals || []).map((r) => [r.name, r]));
  const voices = (data.voices || []).map((v) => {
    const person = people[v.name];
    if (!person) throw new Error(`home.md: "${v.name}" staat niet in referrals.md`);
    return `
          <figure class="voice-card" data-reveal>
            <blockquote class="voice-card__quote"><p>${inline(v.quote)}</p></blockquote>
            ${author(person)}
          </figure>`;
  }).join("\n");

  const voicesCta = String(data.voicesCtaLabel || "")
    .replace("{count}", (referrals.referrals || []).length);

  return `
${hero}
    <div class="shell">
      <section class="home-work">
        <div class="section-intro">
          <h2 class="section-intro__title">${inline(data.sectionTitle)}</h2>
          <p class="intro intro--medium">${inline(data.sectionIntro)}</p>
        </div>
        <div class="projects">
${cards}
        </div>
      </section>
      <section class="home-voices">
        <div class="home-voices__head">
          <div class="section-intro">
            <h2 class="section-intro__title">${inline(data.voicesTitle)}</h2>
            <p class="intro intro--medium">${inline(data.voicesIntro)}</p>
          </div>
          <a class="btn btn--secondary btn--icon" href="${esc(data.voicesCtaHref)}">
            ${inline(voicesCta)}
            ${icon("arrow-sm-right")}
          </a>
        </div>
        <div class="voice-grid">
${voices}
        </div>
      </section>
    </div>`;
}

/* ---------- case study ------------------------------------------
   One template for every file in content/cases/. The body is a
   list of sections; each section is a list of blocks, and each
   block is a one-key object naming its type (lead, text, proof,
   image, gallery, teaser).                                       */

/* mobileHeight / tabletHeight: Figma sometimes crops a case image
   to a fixed height on mobile or tablet. Passed to CSS as --mh and
   --th; every other breakpoint ignores them. */
function media(image, { lazy = true, mobileHeight } = {}) {
  const mh = mobileHeight ?? image.mobileHeight;
  const th = image.tabletHeight;
  const vars = [mh && `--mh: ${Number(mh)}px`, th && `--th: ${Number(th)}px`].filter(Boolean);
  const style = vars.length ? ` style="${vars.join("; ")}"` : "";
  return `<figure class="case-media"${style}>${img(image, { lazy })}</figure>`;
}

const BLOCKS = {
  lead: (b) => `
            <div class="case-lead">
              <h2 class="h4">${inline(b.title)}</h2>
              <p class="intro intro--medium">${inline(b.body)}</p>
            </div>`,
  text: (b) => `
            <div class="case-text">
              ${b.title ? `<h3 class="case-text__title">${inline(b.title)}</h3>` : ""}
              <div class="case-text__body">${marked.parse(String(b.body))}</div>
            </div>`,
  proof: (b) => `
            <p class="case-proof">${inline(b)}</p>`,
  image: (b) => `
            ${media(b)}`,
  gallery: (b) => `
            <div class="case-gallery${b.mobileStack ? " case-gallery--stack" : ""}">
              ${(b.images || []).map((i) => media(i, { mobileHeight: b.mobileHeight })).join("\n              ")}
            </div>`,
  /* A card linking to another case study, e.g. "Lees meer over…". */
  teaser: (b) => `
            <div class="case-teaser">
              <div class="case-teaser__text">
                <p class="case-teaser__title">${inline(b.title)}</p>
                <a class="btn btn--tertiary btn--icon" href="${esc(b.href)}">
                  ${inline(b.ctaLabel || "Bekijk case study")}
                  ${icon("arrow-sm-right")}
                </a>
              </div>
              <div class="case-teaser__media">${img(b.image)}</div>
            </div>`,
};

function block(b) {
  const [type, value] = Object.entries(b)[0];
  if (!BLOCKS[type]) throw new Error(`Onbekend bloktype in case study: "${type}"`);
  return BLOCKS[type](value);
}

function renderCase(data) {
  const sections = (data.sections || []).map((s) => `
          <section class="case-section${s.gap ? ` case-section--${esc(s.gap)}` : ""}">${
            (s.blocks || []).map(block).join("")}
          </section>`).join("\n");

  const bts = data.behindTheScenes;
  const facts = (bts?.facts || []).map((f) => `
                <div class="case-bts__item">
                  <dt class="case-bts__label">${inline(f.label)}</dt>
                  <dd class="case-bts__value">${f.href ? `<a href="${esc(f.href)}">${inline(f.value)}</a>` : inline(f.value)}</dd>
                </div>`).join("");
  const notes = (bts?.notes || []).map((n) => `
                <div class="case-bts__item">
                  <h3 class="case-bts__label">${inline(n.title)}</h3>
                  <p class="case-bts__value">${inline(n.body)}</p>
                </div>`).join("");

  const behind = bts ? `
          <aside class="case-bts">
            <h2 class="case-bts__title">${inline(bts.title)}</h2>
            <div class="case-bts__grid">
              <dl class="case-bts__col">${facts}
              </dl>
              <div class="case-bts__col">${notes}
              </div>
            </div>
          </aside>` : "";

  return `
    <article class="case">
      <header class="case-hero">
        <div class="case-hero__text">
          <p class="case-hero__meta">
            <span class="case-hero__company">${esc(data.company)}</span>
            <span>${esc(data.period)}</span>
          </p>
          <h1 class="case-hero__title">${inline(data.heading)}</h1>
        </div>
        <div class="case-hero__media">${media(data.hero, { lazy: false })}</div>
      </header>
      <section class="case-tldr">
        <h2 class="h4">${inline(data.tldr.title)}</h2>
        <p class="intro intro--medium">${inline(data.tldr.body)}</p>
      </section>
      <div class="case-body">
${sections}
${behind}
      </div>
    </article>`;
}

/* ---------- referrals ------------------------------------------- */
function renderReferrals(data) {
  const rows = (data.referrals || []).map((r) => {
    const paras = (r.quote || [])
      .map((q) => `<p>${inlineLines(q)}</p>`).join("\n              ");

    return `
        <article class="referral" data-reveal>
          <p class="referral__pull">“${inline(r.pullquote)}”</p>
          <figure class="referral__card">
            <blockquote class="referral__quote">
              ${paras}
            </blockquote>
            ${author(r)}
          </figure>
        </article>`;
  }).join("\n");

  return `
    <div class="shell">
      <section class="referrals">
        <div class="section-intro referrals__head">
          <h1 class="section-intro__title">${inline(data.heading)}</h1>
          <p class="intro intro--medium">${inline(data.intro)}</p>
        </div>
${rows}
      </section>
    </div>`;
}

/* ---------- 404 ------------------------------------------------ */
function renderNotFound(data) {
  const links = (data.links || []).map((l) => `
            <li class="notfound__link">
              <a class="link" href="${esc(l.href)}">${inline(l.label)}</a>
              <span class="notfound__dash" aria-hidden="true">-</span>
              <span class="notfound__text">${inline(l.text)}</span>
            </li>`).join("");

  return `
    <div class="shell">
      <section class="notfound">
        <div class="notfound__head">
          <p class="notfound__eyebrow">
            <span class="notfound__code">${inline(data.eyebrow)}</span>${data.eyebrowLabel ? `
            <span class="notfound__dash" aria-hidden="true">-</span>
            <span class="notfound__label">${inline(data.eyebrowLabel)}</span>` : ""}
          </p>
          <h1 class="notfound__title">${inline(data.heading)}</h1>
          <p class="notfound__intro">${inline(data.intro)}</p>
        </div>
        <nav class="notfound__nav" aria-labelledby="notfound-links">
          <h2 class="notfound__links-title" id="notfound-links">${inline(data.linksTitle)}</h2>
          <ul class="notfound__links">${links}
          </ul>
        </nav>
      </section>
    </div>`;
}

/* ---------- about ----------------------------------------------
   File B3RobX7ftpScUngBjXJyIX, frame 158:21957 (desktop only — the
   tablet and mobile layouts are derived). A lavender hero, then a
   column of blocks, like the case studies: each block is a one-key
   object naming its type (quote, text, cv, photos, closing).     */

/* "By day:" / "By night:" — a grey lead-in before the title. */
const lead = (s) => (s ? `<span class="about-lead">${inline(s)}</span> ` : "");

/* The scattered photo group. Each photo's x/y/width/height come
   straight from Figma's 1296 x 686 frame and are handed to CSS as
   percentages, so the arrangement scales with the column. Below
   desktop the same figures fall into a plain grid (pages.css).   */
const STAGE = { w: 1296, h: 686 };
const pct = (v, of) => `${+(v / of * 100).toFixed(3)}%`;

const ABOUT_BLOCKS = {
  quote: (b) => `
        <figure class="about-quote" data-reveal>
          <blockquote class="about-quote__text">
            <p>${inline(b.text)}<span class="about-quote__mark about-quote__mark--close" aria-hidden="true">”</span></p>
          </blockquote>
          <figcaption class="about-quote__source">${inline(b.source)}</figcaption>
        </figure>`,
  text: (b) => `
        <section class="about-text${b.size === "small" ? " about-text--small" : ""}" data-reveal>
          <h2 class="about-text__title">${lead(b.lead)}${inline(b.title)}</h2>
          <div class="about-text__body">${marked.parse(String(b.body))}</div>
        </section>`,
  cv: (b) => `
        <section class="about-cv">
          <div class="about-cv__head" data-reveal>
            <h2 class="h4">${inline(b.title)}</h2>
            <p class="about-cv__intro">${inline(b.intro)}</p>
          </div>
          <ol class="about-cv__list">${(b.jobs || []).map((j) => `
            <li class="job" data-reveal>
              <div class="job__head">
                <h3 class="job__role">${inline(j.role)}</h3>
                <p class="job__meta">
                  <span class="job__company">${esc(j.company)}</span>
                  <span class="job__dot" aria-hidden="true"></span>
                  <span>${esc(j.period)}</span>
                </p>
              </div>
              <p class="job__description">${inline(j.description)}</p>
            </li>`).join("")}
          </ol>
        </section>`,
  photos: (list) => `
        <div class="photo-pile" data-reveal>${list.map((p, i) => {
          /* --ox/--oy: the photo grows from the point that matches
             its place in the frame — one on the right edge grows
             leftwards, one at the bottom grows upwards — so a lifted
             photo stays inside the frame. --i staggers the entrance. */
          const cx = p.x + p.width / 2, cy = p.y + p.height / 2;
          const style = [
            `--x: ${pct(p.x, STAGE.w)}`, `--y: ${pct(p.y, STAGE.h)}`,
            `--w: ${pct(p.width, STAGE.w)}`, `--h: ${pct(p.height, STAGE.h)}`,
            `--r: ${Number(p.rotate) || 0}deg`, `--radius: ${Number(p.radius) || 12}px`,
            `--ox: ${pct(cx, STAGE.w)}`, `--oy: ${pct(cy, STAGE.h)}`, `--i: ${i}`,
          ].join("; ");
          return `
          <figure class="photo-pile__item" style="${style}">${img(p)}</figure>`;
        }).join("")}
        </div>`,
  closing: (b) => `
        <section class="about-closing" data-reveal>
          <h2 class="h4">${inline(b.title)}</h2>
          <p class="about-closing__body">${inline(b.body)}</p>
          <a class="btn btn--secondary btn--icon" href="${esc(b.ctaHref)}">
            ${inline(b.ctaLabel)}
            ${icon("paper-airplane")}
          </a>
        </section>`,
};

function aboutBlock(b) {
  const [type, value] = Object.entries(b)[0];
  if (!ABOUT_BLOCKS[type]) throw new Error(`Onbekend bloktype in about.md: "${type}"`);
  return ABOUT_BLOCKS[type](value);
}

function renderAbout(data) {
  const h = data.hero;

  /* Text left, tilted portrait right; the speech bubble hangs off
     the portrait's top-left corner. Its tail is the Figma export
     assets/icons/bubble-tail.svg at its intrinsic 21.7041 x 27.3206. */
  const hero = `
    <div class="hero-wrap">
      <div class="about-hero">
        <div class="about-hero__inner">
          <div class="about-hero__text">
            <h1 class="about-hero__title">${lead(h.lead)}${inline(h.heading)}</h1>
            <p class="about-hero__intro">${inline(h.intro)}</p>
          </div>
          <div class="about-hero__media">
            <div class="about-hero__photo">${img(h.portrait, { lazy: false })}</div>
            <p class="about-bubble">
              <img class="about-bubble__tail" src="assets/icons/bubble-tail.svg" alt="" width="21.7041" height="27.3206">
              <span>${inline(h.bubble)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>`;

  return `
${hero}
    <div class="shell">
      <div class="about">
${(data.blocks || []).map(aboutBlock).join("\n")}
      </div>
    </div>`;
}

/* ---------- render ---------------------------------------------- */
async function load(slug) {
  return matter(await readFile(`content/${slug}.md`, "utf8"));
}

async function writePage(outFile, data, content, bodyClass) {
  const template = await readFile("src/templates/base.html", "utf8");

  /* Function replacements, so a "$" in the content is never read
     as a replacement pattern. */
  const html = template
    .replace(/{{title}}/g, () => esc(data.title))
    .replace(/{{description}}/g, () => esc(data.description))
    .replace(/{{ogImage}}/g, () => esc(data.ogImage || ""))
    .replace(/{{siteUrl}}/g, SITE_URL)
    .replace(/{{path}}/g, outFile === "index.html" ? "/" : `/${outFile}`)
    .replace(/{{bodyClass}}/g, bodyClass)
    /* lang: en in the front-matter for an English page (default nl).
       noindex: true asks search engines to leave the page out of
       their results; the link itself keeps working. */
    .replace(/{{lang}}/g, data.lang === "en" ? "en" : "nl")
    .replace(/{{locale}}/g, data.lang === "en" ? "en_GB" : "nl_NL")
    .replace("{{robots}}", data.noindex ? '\n  <meta name="robots" content="noindex, nofollow">' : "")
    .replace("{{content}}", () => content);

  /* GitHub Pages serves 404.html at whatever URL was missing, also
     a nested one like /werk/oud/. A <base> keeps the relative
     asset and nav links pointing at the site root there. */
  const out = outFile === "404.html"
    ? html.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n  <base href="/">')
    : html;

  await writeFile(`${OUT}/${outFile}`, out);
  console.log(`  ✓ ${outFile}`);
}

/* ---------- run --------------------------------------------------- */
async function build() {
  if (existsSync(OUT)) await rm(OUT, { recursive: true });
  await mkdir(`${OUT}/assets`, { recursive: true });

  await cp("src/css", `${OUT}/assets/css`, { recursive: true });
  await cp("src/js", `${OUT}/assets/js`, { recursive: true });
  if (existsSync("assets")) await cp("assets", `${OUT}/assets`, { recursive: true });

  console.log("Building…");
  const pages = [];
  /* unlisted: true in the front-matter still builds the page (a
     direct link keeps working) but leaves it out of the sitemap.
     noindex implies unlisted. */
  const page = async (outFile, data, content, bodyClass) => {
    await writePage(outFile, data, content, bodyClass);
    if (!data.unlisted && !data.noindex) pages.push(outFile);
  };

  const referrals = await load("referrals");
  const home = await load("home");
  const about = await load("about");

  await page("index.html", home.data, renderHome(home.data, referrals.data), "page-home");
  await page("about.html", about.data, renderAbout(about.data), "page-about");

  /* content/cases/talent-canvas.md → talent-canvas.html
     offline: true in the front-matter skips the case entirely: no
     page (the URL gives a 404, so Google drops it) and its images
     are left out of dist/ unless another page still uses them. */
  const srcs = (data) => [...JSON.stringify(data).matchAll(/"src":"([^"]+)"/g)].map((m) => m[1]);
  const usedImages = new Set([home, about, referrals].flatMap((p) => srcs(p.data)));
  const offlineImages = new Set();
  const cases = (await readdir("content/cases")).filter((f) => f.endsWith(".md")).sort();
  for (const file of cases) {
    const slug = file.slice(0, -3);
    const { data } = await load(`cases/${slug}`);
    if (data.offline) {
      srcs(data).forEach((s) => offlineImages.add(s));
      console.log(`  skipped ${slug} (offline)`);
      continue;
    }
    srcs(data).forEach((s) => usedImages.add(s));
    /* url: in the front-matter overrides the file name, e.g.
       url: "Talent_review" → Talent_review.html, served by GitHub
       Pages at /Talent_review as well. */
    await page(`${data.url || slug}.html`, data, renderCase(data), "page-case");
  }
  for (const s of offlineImages) {
    if (!usedImages.has(s)) await rm(`${OUT}/assets/images/${s}`, { force: true });
  }

  await page("referenties.html", referrals.data, renderReferrals(referrals.data), "page-referrals");

  const notFound = await load("404");
  await page("404.html", notFound.data, renderNotFound(notFound.data), "page-404");

  await writeFile(`${OUT}/.nojekyll`, "");
  await writeFile(`${OUT}/CNAME`, "www.cornevandenboogert.nl\n");
  await writeFile(`${OUT}/robots.txt`,
    `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  await writeFile(`${OUT}/sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map((p) => `  <url><loc>${SITE_URL}/${p === "index.html" ? "" : p}</loc></url>\n`).join("") +
    `</urlset>\n`);

  console.log("Done → dist/");
}

build().catch((err) => { console.error(err); process.exit(1); });
