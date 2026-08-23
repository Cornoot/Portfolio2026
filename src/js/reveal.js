/* ============================================================
   reveal.js
   Fades [data-reveal] elements up into place as they scroll into
   view. Adding `has-reveal` to <html> is what actually turns the
   effect on (see base.css) — if this script never runs, or
   IntersectionObserver isn't supported, elements stay visible.
   ============================================================ */

(function () {
  if (!("IntersectionObserver" in window)) return;

  var els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;

  document.documentElement.classList.add("has-reveal");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  els.forEach(function (el) { observer.observe(el); });
})();
