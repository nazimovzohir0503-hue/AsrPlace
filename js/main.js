(function () {
  "use strict";
  var S = window.SITE, T = window.I18N, M = window.MENU;
  var CATS = M.order;
  var lang = "uz", cat = M.order[0], query = "";
  var $ = function (id) { return document.getElementById(id); };

  try { var saved = localStorage.getItem("lang"); if (T[saved]) lang = saved; } catch (e) {}

  var t = function (k) { return T[lang][k] || k; };
  var tel = function () { return S.phone.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5"); };

  function tashkentHour() {
    var h = parseInt(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Asia/Tashkent" }).format(new Date()), 10);
    return h % 24;
  }

  function renderStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    document.querySelector('meta[name="description"]').content = t("desc");
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lang === lang); });
    $("year").textContent = new Date().getFullYear();

    var h = tashkentHour(), isOpen = h >= S.open && h < S.close, badge = $("openBadge");
    var until = lang === "ru" ? "до " + S.close + ":00" : lang === "en" ? "until " + S.close + ":00" : S.close + ":00 gacha";
    var opens = lang === "ru" ? "открытие в " + S.open + ":00" : lang === "en" ? "opens at " + S.open + ":00" : S.open + ":00 da ochiladi";
    badge.textContent = isOpen ? t("open_now") + " · " + until : t("closed_now") + " · " + opens;
    badge.classList.toggle("off", !isOpen);

    // Yoylar: faqat 4 ta asosiy oshxona (ichimliklar menyuda tab sifatida)
    $("arches").innerHTML = window.HERO.map(function (a) {
      var bg = "linear-gradient(to top,rgba(15,26,44,.88),rgba(15,26,44,0) 55%),url(" + a.img + ") center/cover";
      return '<a class="arch" href="#menu" data-cat="' + a.cat + '" style="background:' + bg + ';color:#fff"><span>' + a.l[lang] + "</span></a>";
    }).join("");

    $("info").innerHTML =
      "<div><dt>" + t("lbl_addr") + "</dt><dd>" + S.address[lang] + "</dd></div>" +
      "<div><dt>" + t("lbl_hours") + "</dt><dd>" + t("daily") + ", " + S.open + ":00 – " + S.close + ":00</dd></div>" +
      '<div><dt>' + t("lbl_phone") + '</dt><dd><a href="tel:' + S.phone + '">' + tel() + "</a></dd></div>";

    $("footContact").innerHTML = '<a href="tel:' + S.phone + '">' + tel() + '</a> · <a href="' + S.instagram + '" rel="noopener">Instagram</a> · <a href="' + S.telegram + '" rel="noopener">Telegram</a>';

    var map = $("map"), src = "https://www.google.com/maps?q=" + encodeURIComponent(S.mapQuery) + "&output=embed&hl=" + lang;
    if (map.getAttribute("src") !== src) map.setAttribute("src", src);

    $("ld").textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Restaurant", name: S.name, telephone: S.phone, email: S.email,
      servesCuisine: ["Uzbek", "European", "Turkish", "Fast food"],
      address: { "@type": "PostalAddress", streetAddress: S.address.en, addressLocality: "Jizzakh", addressCountry: "UZ" },
      openingHours: "Mo-Su " + S.open + ":00-" + S.close + ":00", sameAs: [S.instagram, S.telegram]
    });
  }

  function pg(n) { return M.base + (n < 10 ? "0" : "") + n + M.ext; }

  function renderMenu() {
    $("tabs").innerHTML = CATS.map(function (c) {
      return '<button class="tab" role="tab" data-cat="' + c + '" aria-selected="' + (c === cat) + '">' + t("c_" + c) + "</button>";
    }).join("");
    var tb = $("tabs"), sel = tb.querySelector('[aria-selected="true"]');
    if (sel) tb.scrollLeft += sel.getBoundingClientRect().left - tb.getBoundingClientRect().left - (tb.clientWidth - sel.offsetWidth) / 2;
    var ul = $("dishes");
    ul.className = "dishes pages";
    ul.innerHTML = M.pages[cat].map(function (n, k) {
      return '<li><button class="pg" data-pg="' + k + '"><img src="' + pg(n) + '" alt="' + t("c_" + cat) + " " + (k + 1) + '" loading="lazy"></button></li>';
    }).join("") + '<li class="dl"><a class="btn btn-gold" href="' + M.pdf + '" download>' + t("dl_pdf") + "</a><small>" + t("tap_hint") + "</small></li>";
  }

  /* Sahifani kattalashtirib ko'rish (lightbox) */
  var lb = null, lbCat = "", lbIdx = 0;
  function lbShow(i) {
    var list = M.pages[lbCat]; lbIdx = (i + list.length) % list.length;
    lb.querySelector("img").src = pg(list[lbIdx]);
    lb.querySelector(".lb-n").textContent = t("c_" + lbCat) + " · " + (lbIdx + 1) + " / " + list.length;
    lb.classList.remove("zoom");
  }
  function lbOpen(i) {
    if (!lb) {
      lb = document.createElement("div"); lb.className = "lb"; lb.setAttribute("role", "dialog");
      lb.innerHTML = '<div class="lb-bar"><span class="lb-n"></span><button class="lb-x" data-lb="x" aria-label="Close">\u2715</button></div><div class="lb-stage"><img alt=""></div><button class="lb-p" data-lb="p" aria-label="Prev">\u2039</button><button class="lb-nx" data-lb="n" aria-label="Next">\u203A</button>';
      document.body.appendChild(lb);
    }
    lbCat = cat; lb.hidden = false; document.body.style.overflow = "hidden"; lbShow(i);
  }
  function lbClose() { if (lb) { lb.hidden = true; document.body.style.overflow = ""; } }

  document.addEventListener("click", function (e) {
    var p = e.target.closest("[data-pg]");
    if (p) { lbOpen(+p.dataset.pg); return; }
    var b = e.target.closest("[data-lb]");
    if (b) { if (b.dataset.lb === "x") lbClose(); else lbShow(lbIdx + (b.dataset.lb === "n" ? 1 : -1)); return; }
    if (lb && !lb.hidden && e.target.closest(".lb-stage img")) lb.classList.toggle("zoom");
  });
  document.addEventListener("keydown", function (e) {
    if (!lb || lb.hidden) return;
    if (e.key === "Escape") lbClose();
    if (e.key === "ArrowRight") lbShow(lbIdx + 1);
    if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
  });

    function render() { renderStatic(); renderMenu(); }

  document.addEventListener("click", function (e) {
    var l = e.target.closest("[data-lang]");
    if (l) { lang = l.dataset.lang; try { localStorage.setItem("lang", lang); } catch (x) {} render(); return; }
    var c = e.target.closest("[data-cat]");
    if (c) {
      cat = c.dataset.cat; query = "";
      if ($("srch")) $("srch").value = "";
      renderMenu();
    }
  });

  if ($("srch")) $("srch").addEventListener("input", function (e) { query = e.target.value; renderMenu(); });

  /* Bron formasi: WhatsApp xabarini tayyorlaydi (serversiz ishlaydi). */
  $("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, note = $("formNote");
    f.querySelectorAll("input").forEach(function (i) { i.classList.add("touched"); });
    if (!f.checkValidity()) { note.textContent = t("f_err"); return; }
    var d = new FormData(f);
    var msg = S.name + "\n" + t("f_name") + ": " + d.get("name") + "\n" + t("f_phone") + ": " + d.get("phone") +
              "\n" + t("f_date") + ": " + d.get("date").replace("T", " ") + "\n" + t("f_guests") + ": " + d.get("guests");
    window.open("https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    note.textContent = t("f_ok");
  });

  render();
})();
