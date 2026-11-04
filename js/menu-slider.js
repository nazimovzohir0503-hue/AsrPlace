/* MENYU: bo'limdagi sahifalar bitta-bitta ko'rinadi, strelka/nuqta/surish bilan almashtiriladi.
   main.js ga tegmaydi: u sahifalarni chizgach, bu fayl ularni slayderga aylantiradi. */
(function () {
  "use strict";
  var ul = document.getElementById("dishes");
  if (!ul) return;

  var CSS =
    ".mslider{max-width:900px!important;margin-inline:auto}" +
    ".ms-view{position:relative}" +
    ".mslider>.ms-view>ul{display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:0;margin:0;list-style:none}" +
    ".mslider>.ms-view>ul::-webkit-scrollbar{display:none}" +
    ".mslider>.ms-view>ul>li{flex:0 0 100%;scroll-snap-align:center;scroll-snap-stop:always}" +
    ".ms-prev,.ms-next{position:absolute;top:50%;transform:translateY(-50%);z-index:2;width:48px;height:48px;border-radius:50%;border:0;background:var(--gold);color:var(--teal);font:700 1.9rem/1 var(--body);cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.35);display:grid;place-items:center;padding:0 0 .2rem;transition:opacity .2s,transform .15s}" +
    ".ms-prev{left:.7rem}.ms-next{right:.7rem}" +
    ".ms-prev:hover,.ms-next:hover{transform:translateY(-50%) scale(1.08)}" +
    ".ms-prev[disabled],.ms-next[disabled]{opacity:.3;cursor:default;transform:translateY(-50%)}" +
    ".ms-bar{display:flex;align-items:center;justify-content:center;gap:.6rem;margin-top:1rem}" +
    ".ms-dot{width:11px;height:11px;border-radius:999px;border:0;padding:0;background:rgba(31,51,80,.28);cursor:pointer;transition:width .2s,background .2s}" +
    ".ms-dot.on{width:30px;background:var(--teal)}" +
    ".ms-count{margin-left:.6rem;font-weight:800;color:var(--teal);font-size:.95rem}" +
    ".ms-dl{display:flex;flex-wrap:wrap;align-items:center;gap:1rem;margin-top:1.2rem}.ms-dl small{color:var(--muted)}" +
    ".mslider.ms-single .ms-prev,.mslider.ms-single .ms-next,.mslider.ms-single .ms-bar{display:none}" +
    "@media (max-width:820px){.ms-prev,.ms-next{width:42px;height:42px;font-size:1.6rem}.ms-prev{left:.4rem}.ms-next{right:.4rem}}";
  var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }
  var wrap = el("div", "mslider"), view = el("div", "ms-view"), bar = el("div", "ms-bar"), dl = el("div", "ms-dl");
  var prev = el("button", "ms-prev", "&#8249;"), next = el("button", "ms-next", "&#8250;");
  prev.type = next.type = "button"; prev.setAttribute("aria-label", "Previous"); next.setAttribute("aria-label", "Next");
  wrap.setAttribute("role", "group"); wrap.setAttribute("aria-roledescription", "carousel");
  ul.parentNode.insertBefore(wrap, ul);
  view.appendChild(ul); view.appendChild(prev); view.appendChild(next);
  wrap.appendChild(view); wrap.appendChild(bar); wrap.appendChild(dl);

  var slides = [], idx = 0, ticking = false;
  function step() { return slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : ul.clientWidth; }
  function go(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    var smooth = !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
    ul.scrollTo({ left: step() * i, behavior: smooth ? "smooth" : "auto" });
  }
  function update() {
    var n = slides.length;
    wrap.classList.toggle("ms-single", n <= 1);
    prev.disabled = idx <= 0; next.disabled = idx >= n - 1;
    [].forEach.call(bar.querySelectorAll(".ms-dot"), function (d, i) { d.classList.toggle("on", i === idx); d.setAttribute("aria-current", i === idx ? "true" : "false"); });
    var c = bar.querySelector(".ms-count"); if (c) c.textContent = (idx + 1) + " / " + n;
  }

  var obs = new MutationObserver(function () { enhance(); });
  function enhance() {
    obs.disconnect();
    var li = ul.querySelector("li.dl");                    // "PDF yuklab olish" qatori slayderdan tashqariga chiqariladi
    dl.innerHTML = "";
    if (li) { while (li.firstChild) dl.appendChild(li.firstChild); li.remove(); }
    slides = [].slice.call(ul.children); idx = 0; ul.scrollLeft = 0;
    bar.innerHTML = "";
    slides.forEach(function (_, i) {
      var d = el("button", "ms-dot"); d.type = "button"; d.setAttribute("aria-label", String(i + 1));
      d.addEventListener("click", function () { go(i); }); bar.appendChild(d);
    });
    bar.appendChild(el("span", "ms-count"));
    update();
    obs.observe(ul, { childList: true });
  }

  prev.addEventListener("click", function () { go(idx - 1); });
  next.addEventListener("click", function () { go(idx + 1); });
  ul.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; var s = step() || 1, i = Math.round(ul.scrollLeft / s); if (i !== idx) { idx = Math.max(0, Math.min(slides.length - 1, i)); update(); } });
  }, { passive: true });
  wrap.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") go(idx + 1); else if (e.key === "ArrowLeft") go(idx - 1);
  });
  enhance();
})();
