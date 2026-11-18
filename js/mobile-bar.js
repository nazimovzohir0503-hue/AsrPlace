/* PASTKI TUGMALAR PANELI: Qo'ng'iroq, Bron, Yetkazib berish.
   Telefonda (<=820px): ekran pastida to'liq kenglikda doim turadi.
   Kompyuterda: pastki o'ng burchakda suzuvchi panel, sahifa biroz pastga aylantirilgach paydo bo'ladi. Matnlar data.js dagi I18N (bar_call, bar_book, bar_delivery). */
(function () {
  "use strict";
  var S = window.SITE || {}, I = window.I18N || {};

  var ICON = {
    call: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
    delivery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>'
  };

  var CSS =
    ".mbar{display:none}" +
    "@media (max-width:820px){" +
    ".mbar{position:fixed;left:0;right:0;bottom:0;z-index:20;display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:.4rem;padding:.5rem .6rem calc(.5rem + env(safe-area-inset-bottom,0px));background:var(--teal);border-top:2px solid var(--gold);box-shadow:0 -8px 24px rgba(10,18,32,.35)}" +
    ".mbar a{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.2rem;min-height:48px;padding:.35rem .2rem;border-radius:12px;color:#fff;text-decoration:none;font:700 .72rem/1.1 var(--body);text-align:center}" +
    ".mbar a svg{width:22px;height:22px;flex:none}" +
    ".mbar a.mb-main{background:var(--gold);color:var(--teal)}" +
    ".foot{padding-bottom:calc(1.4rem + 72px + env(safe-area-inset-bottom,0px))}" +
    "body.nav-open .mbar,body.mb-kb .mbar{display:none}" +
    "}" +
    "@media (min-width:821px){" +
    ".mbar{position:fixed;right:1.4rem;bottom:1.4rem;z-index:20;display:flex;gap:.4rem;padding:.4rem;background:var(--teal);border:1px solid var(--gold);border-radius:999px;box-shadow:0 10px 30px rgba(10,18,32,.35);opacity:0;transform:translateY(12px);pointer-events:none;transition:opacity .25s,transform .25s}" +
    ".mbar.show{opacity:1;transform:none;pointer-events:auto}" +
    ".mbar a{display:flex;align-items:center;gap:.5rem;padding:.6rem 1.05rem;border-radius:999px;color:#fff;text-decoration:none;font:700 .9rem var(--body);white-space:nowrap;transition:background .15s}" +
    ".mbar a:hover{background:rgba(255,255,255,.14)}" +
    ".mbar a.mb-main{background:var(--gold);color:var(--teal)}" +
    ".mbar a.mb-main:hover{background:#d8b57e}" +
    ".mbar a svg{width:18px;height:18px;flex:none}" +
    "}";
  var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);

  var bar = document.createElement("nav");
  bar.className = "mbar"; bar.setAttribute("aria-label", "Quick actions");
  var tel = String(S.phone || "").replace(/\D/g, "");
  bar.innerHTML =
    '<a href="tel:+' + tel + '" data-track="bar_call">' + ICON.call + '<span data-k="bar_call"></span></a>' +
    '<a class="mb-main" href="#book" data-track="bar_book">' + ICON.book + '<span data-k="bar_book"></span></a>' +
    '<a href="#delivery" data-track="bar_delivery">' + ICON.delivery + '<span data-k="bar_delivery"></span></a>';
  document.body.appendChild(bar);

  function render() {
    var l = I[document.documentElement.lang] ? document.documentElement.lang : "uz";
    [].forEach.call(bar.querySelectorAll("[data-k]"), function (s) {
      s.textContent = (I[l] && I[l][s.dataset.k]) || s.dataset.k;
    });
  }
  // Kompyuterda: sahifa pastga aylantirilgach panel paydo bo'ladi (bosh sahifadagi tugmalar bilan takrorlanmasligi uchun)
  function onScroll() { bar.classList.toggle("show", (window.pageYOffset || document.documentElement.scrollTop) > 500); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  render();
  document.addEventListener("click", function (e) { if (e.target.closest("[data-lang]")) render(); });

  // Klaviatura ochilganda (forma maydoniga bosilganda) panel yashiriladi
  function isField(el) { return el && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName); }
  document.addEventListener("focusin", function (e) { if (isField(e.target)) document.body.classList.add("mb-kb"); });
  document.addEventListener("focusout", function () {
    setTimeout(function () { if (!isField(document.activeElement)) document.body.classList.remove("mb-kb"); }, 100);
  });
})();
