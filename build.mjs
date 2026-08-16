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

/* ---------- home ---------------------------------------------- */
function renderHome(data) {
  const h = data.hero;

  const hero = `
    <section class="surface--hero">
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
              <svg class="btn__icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M4 10a1 1 0 011-1h8.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 11H5a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
            </a>
          </div>
          <div class="hero__media">
            <div class="photo-frame">${img(h.image, { lazy: false })}</div>
          </div>
        </div>
      </div>
    </section>`;

  const cards = (data.projects || []).map((p) => {
    const outcomes = (p.outcomes || [])
      .map((o) => `<li>${inline(o)}</li>`).join("\n            ");

    return `
        <article class="card card--${esc(p.cardColor)}${p.imageSide === "left" ? " card--media-first" : ""}">
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
    <section class="surface--work">
      <div class="shell">
        <div class="work">
          <h3>${inline(data.sectionTitle)}</h3>
${cards}
        </div>
      </div>
    </section>`;

  return hero + work;
}

/* ---------- about ---------------------------------------------- */
function renderAbout(data, body) {
  const a = data.about;

  const intro = `
        <div class="about__intro">
          <div class="about__intro-text">
            <h1>${inline(a.heading)}</h1>
            <p class="intro">${inline(a.intro)}</p>
          </div>
          <div class="about__portrait">
            <div class="photo-frame">${img(a.portrait, { lazy: false })}</div>
          </div>
        </div>`;

  const sections = (data.sections || []).map((s) => `
        <div class="about__section">
          <h3>${inline(s.title)}</h3>
          <p>${inline(s.body)}</p>
        </div>`).join("\n");

  const cv = (data.cv || []).map((j) => `
          <div class="cv__item">
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
            <figure class="photo-grid__item photo-grid__item--${esc(g.shape)}">
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
          <a class="btn btn--secondary" href="${esc(data.closing.ctaHref)}">${inline(data.closing.ctaLabel)}</a>
        </div>`;

  const extra = body?.trim() ? `<div class="about__section">${marked.parse(body)}</div>` : "";

  return `
    <section class="surface--hero">
      <div class="prose-shell">
        <div class="about">
${intro}
${sections}
${experience}
${leisure}
${extra}
${closing}
        </div>
      </div>
    </section>`;
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
