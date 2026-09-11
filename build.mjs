/* ============================================================
   build.mjs
   Reads content/*.md, renders them into src/templates/base.html,
   writes static HTML to dist/. Runs at build time only — the
   shipped site has no runtime dependency on this script.
   ============================================================ */

import { readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
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
   line break, not a new paragraph. The quotes in "Wat mensen over
   mij zeggen" use both, and the difference is visible in Figma. */
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

/* ---------- home ---------------------------------------------- */
function renderHome(data) {
  const h = data.hero;

  const hero = `
        <div class="hero-card hero-card--home">
          <div class="prose-shell">
            <div class="hero">
              <div class="hero__text">
                <div class="hero__lines">
                  <p class="eyebrow">${inline(h.eyebrow)}</p>
                  <h1>${inline(h.heading)}</h1>
                  <p class="intro">${inline(h.intro)}</p>
                </div>
                <a class="btn btn--primary btn--icon" href="${esc(h.ctaHref)}">
                  ${inline(h.ctaLabel)}
                  ${icon("arrow-sm-right")}
                </a>
              </div>
              <div class="hero__media">
                <div class="photo-frame">${img(h.image, { lazy: false })}</div>
              </div>
            </div>
          </div>
        </div>`;

  const cards = (data.projects || []).map((p) => {
    const outcomes = (p.outcomes || [])
      .map((o) => `<li>${inline(o)}</li>`).join("\n            ");

    return `
        <article class="card card--${esc(p.cardColor)}${p.imageSide === "left" ? " card--media-first" : ""}" data-reveal>
          <div class="card__grid">
            <div class="card__body">
              <div class="card__header">
                <p class="card__meta">
                  <strong>${esc(p.company)}</strong>
                  <span class="card__dot" aria-hidden="true"></span>
                  <span>${esc(p.period)}</span>
                </p>
                <h2>${inline(p.title)}</h2>
              </div>
              <div class="card__content">
                <p>${inline(p.body)}</p>
                <div>
                  <p class="card__outcome-title">${inline(p.outcomeTitle)}</p>
                  <ul class="card__outcomes">
            ${outcomes}
                  </ul>
                </div>
              </div>
            </div>
            <div class="card__media">${img(p.image)}</div>
          </div>
        </article>`;
  }).join("\n");

  const work = `
        <div class="work">
          <div class="work__intro">
            <h3>${inline(data.sectionTitle)}</h3>
            <p class="intro">${inline(data.sectionIntro)}</p>
          </div>
${cards}
        </div>`;

  /* figure/blockquote/figcaption so each quote keeps its attribution
     attached — a screen reader announces the name with the quote
     rather than as a loose paragraph after it. The avatar is
     decorative (alt=""): the name sits right next to it. */
  const voices = (data.voices || []).map((v) => {
    const paras = (v.quote || [])
      .map((q) => `<p>${inlineLines(q)}</p>`).join("\n              ");

    const avatar = v.avatar
      ? img(v.avatar, { className: "voice__avatar" })
      : "";

    return `
          <figure class="voice" data-reveal>
            <blockquote class="voice__quote">
              ${paras}
            </blockquote>
            <figcaption class="voice__author">
              ${avatar}
              <div class="voice__who">
                <p class="voice__name">${inline(v.name)}</p>
                <p class="voice__role">${inline(v.role)}</p>
              </div>
            </figcaption>
          </figure>`;
  }).join("\n");

  const voicesSection = (data.voices || []).length ? `
        <div class="voices">
          <div class="voices__intro">
            <h3>${inline(data.voicesTitle)}</h3>
            <p class="intro">${inline(data.voicesIntro)}</p>
          </div>
          <div class="voices__list">
${voices}
          </div>
        </div>` : "";

  return `
    <div class="shell">
      <div class="page-stack">
${hero}
${work}
${voicesSection}
      </div>
    </div>`;
}

/* ---------- about ---------------------------------------------- */
function renderAbout(data, body) {
  const a = data.about;

  const intro = `
        <div class="hero-card hero-card--about">
          <div class="prose-shell">
            <div class="about__intro">
              <div class="about__intro-col">
                <a class="btn btn--tertiary btn--icon" href="index.html">
                  ${icon("arrow-sm-left")}
                  Terug naar home
                </a>
                <div class="about__intro-text">
                  <h1>${inline(a.heading)}</h1>
                  <p class="intro">${inline(a.intro)}</p>
                </div>
              </div>
              <div class="about__portrait">
                <div class="photo-frame">${img(a.portrait, { lazy: false })}</div>
              </div>
            </div>
          </div>
        </div>`;

  const sections = (data.sections || []).map((s) => `
        <div class="about__section">
          <h3>${inline(s.title)}</h3>
          <p>${inline(s.body)}</p>
        </div>`).join("\n");

  const cv = (data.cv || []).map((j) => `
          <div class="cv__item cv__item--${esc(j.rowColor || "row3")}" data-reveal>
            <div class="cv__head">
              <p class="cv__role">${inline(j.role)}${
                j.label ? `<span class="cv__label">${esc(j.label)}</span>` : ""
              }</p>
              <p class="cv__duration">
                <span>${esc(j.company)}</span>
                <span class="cv__dot" aria-hidden="true"></span>
                <span>${esc(j.period)}</span>
              </p>
            </div>
            <p class="cv__description">${inline(j.description)}</p>
          </div>`).join("\n");

  const experience = `
        <div class="about__section">
          <h3>${inline(data.experience.title)}</h3>
          <p>${inline(data.experience.body)}</p>
          <div class="cv">
${cv}
          </div>
        </div>`;

  const gallery = (data.gallery || []).map((g) => `
            <figure class="photo-grid__item photo-grid__item--${esc(g.shape)}" data-reveal>
              ${img(g)}
            </figure>`).join("\n");

  const leisure = `
        <div class="about__section">
          <h3>${inline(data.leisure.title)}</h3>
          <p>${inline(data.leisure.body)}</p>
          <div class="photo-grid">
${gallery}
          </div>
        </div>`;

  const closing = `
        <div class="closing">
          <h3>${inline(data.closing.title)}</h3>
          <p>${inline(data.closing.body)}</p>
          <a class="btn btn--secondary btn--icon" href="${esc(data.closing.ctaHref)}">
            ${inline(data.closing.ctaLabel)}
            ${icon("paper-airplane")}
          </a>
        </div>`;

  const extra = body?.trim() ? `<div class="about__section">${marked.parse(body)}</div>` : "";

  return `
    <div class="shell">
      <div class="page-stack">
${intro}
        <div class="about">
          <div class="about__panel">
${sections}
${experience}
          </div>
          <div class="about__panel">
${leisure}
${extra}
${closing}
          </div>
        </div>
      </div>
    </div>`;
}

/* ---------- render ---------------------------------------------- */
async function render(slug, outFile, renderer) {
  const raw = await readFile(`content/${slug}.md`, "utf8");
  const { data, content } = matter(raw);
  const template = await readFile("src/templates/base.html", "utf8");

  const html = template
    .replace(/{{title}}/g, esc(data.title))
    .replace(/{{description}}/g, esc(data.description))
    .replace(/{{ogImage}}/g, esc(data.ogImage || ""))
    .replace(/{{siteUrl}}/g, SITE_URL)
    .replace(/{{path}}/g, outFile === "index.html" ? "/" : `/${outFile}`)
    .replace("{{content}}", renderer(data, content));

  await writeFile(`${OUT}/${outFile}`, html);
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
  await render("home", "index.html", renderHome);
  await render("about", "about.html", renderAbout);

  await writeFile(`${OUT}/.nojekyll`, "");
  await writeFile(`${OUT}/CNAME`, "www.cornevandenboogert.nl\n");
  await writeFile(`${OUT}/robots.txt`,
    `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  await writeFile(`${OUT}/sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <url><loc>${SITE_URL}/</loc></url>\n  <url><loc>${SITE_URL}/about.html</loc></url>\n</urlset>\n`);

  console.log("Done → dist/");
}

build().catch((err) => { console.error(err); process.exit(1); });
