(function () {
  "use strict";
  var S = window.SITE, T = window.I18N, M = window.MENU;
  var CATS = M.order;
  var lang = "uz", cat = "", query = "";
  var $ = function (id) { return document.getElementById(id); };

  try { var saved = localStorage.getItem("lang"); if (T[saved]) lang = saved; } catch (e) {}

  var t = function (k) { return T[lang][k] || k; };
  var tel = function () { return S.phone.replace(/\D/g, "").replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5"); };

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
    var until = lang === "ru" ? "\u0434\u043e " + S.close + ":00" : lang === "en" ? "until " + S.close + ":00" : S.close + ":00 gacha";
    var opens = lang === "ru" ? "\u043e\u0442\u043a\u0440\u044b\u0442\u0438\u0435 \u0432 " + S.open + ":00" : lang === "en" ? "opens at " + S.open + ":00" : S.open + ":00 da ochiladi";
    badge.textContent = isOpen ? t("open_now") + " \u00b7 " + until : t("closed_now") + " \u00b7 " + opens;
    badge.classList.toggle("off", !isOpen);

    $("arches").innerHTML = window.HERO.map(function (a) {
      var bg = "linear-gradient(to top,rgba(15,26,44,.88),rgba(15,26,44,0) 55%),url(" + a.img + ") center/cover";
      return '<a class="arch" href="#menu" data-cat="' + a.cat + '" style="background:' + bg + ';color:#fff"><span>' + a.l[lang] + "</span></a>";
    }).join("");

    $("info").innerHTML =
      "<div><dt>" + t("lbl_addr") + "</dt><dd>" + S.address[lang] + "</dd></div>" +
      "<div><dt>" + t("lbl_hours") + "</dt><dd>" + t("daily") + ", " + S.open + ":00 \u2013 " + S.close + ":00</dd></div>" +
      '<div><dt>' + t("lbl_phone") + '</dt><dd><a href="tel:' + S.phone + '">' + tel() + "</a></dd></div>";

    var g = S.geo && +S.geo.lat && +S.geo.lng ? S.geo : null;
    var gUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(g ? g.lat + "," + g.lng : S.mapQuery);
    var yUrl = g ? "https://yandex.uz/maps/?rtext=~" + g.lat + "," + g.lng + "&rtt=auto" : "https://yandex.uz/maps/?text=" + encodeURIComponent(S.mapQuery);
    var rb = $("routeBtns");
    if (!rb) { rb = document.createElement("div"); rb.id = "routeBtns"; rb.className = "route"; $("info").after(rb); }
    rb.innerHTML =
      '<a class="btn btn-gold" href="' + gUrl + '" target="_blank" rel="noopener">' + t("route_google") + "</a>" +
      '<a class="btn btn-out" href="' + yUrl + '" target="_blank" rel="noopener">' + t("route_yandex") + "</a>" +
      '<button class="btn btn-out" type="button" data-copy="1">' + t("copy_addr") + "</button>";

    $("footContact").innerHTML = '<a href="tel:' + S.phone + '">' + tel() + '</a> \u00b7 <a href="' + S.instagram + '" rel="noopener">Instagram</a> \u00b7 <a href="' + S.telegram + '" rel="noopener">Telegram</a>';

    var map = $("map"), mg = S.geo && +S.geo.lat && +S.geo.lng ? S.geo : null;
    var src = "https://www.google.com/maps?q=" + encodeURIComponent(mg ? mg.lat + "," + mg.lng : S.mapQuery) + (mg ? "&z=17" : "") + "&output=embed&hl=" + lang;
    if (map.getAttribute("src") !== src) map.setAttribute("src", src);

    $("ld").textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Restaurant", name: S.name, telephone: S.phone, email: S.email || undefined,
      servesCuisine: ["Uzbek", "European", "Turkish", "Fast food"],
      address: { "@type": "PostalAddress", streetAddress: S.address.en, addressLocality: "Jizzakh", addressCountry: "UZ" },
      openingHours: "Mo-Su " + S.open + ":00-" + S.close + ":00", sameAs: [S.instagram, S.telegram],
      geo: g ? { "@type": "GeoCoordinates", latitude: +g.lat, longitude: +g.lng } : undefined
    });
  }

  /* ===== MENYU ===== */
  function renderMenu() {
    var ul = $("dishes"), tb = $("tabs");

/* --- GRID: 14 ta kartochka (JPG va PNG ikkalasini ham qabul qiladi) --- */
if (!cat) {
  tb.innerHTML = "";
  ul.className = "dishes menu-grid";
  ul.innerHTML = CATS.map(function (c) {
    var cover = M.base + (M.pages[c] && M.pages[c][0] ? M.pages[c][0] : "");
    return '<li><button class="menu-card" data-cat="' + c + '">' +
      '<img src="' + cover + '" alt="' + t("c_" + c) + '" ' +
      'onerror="if(!this.dataset.retry){this.dataset.retry=1;this.src=this.src.endsWith(\'.jpg\')?this.src.replace(/\\.jpg$/, \'.png\'):this.src.replace(/\\.png$/, \'.jpg\');}">' +
      '<span>' + t("c_" + c) + "</span>" +
      "</button></li>";
  }).join("");
  return;
}

    /* --- SLIDER: bolim tanlangan --- */
    var pages = M.pages[cat].slice(1);
    var cur = 0;

    /* Breadcrumb: Bosh sahifa > Menyu > Bolim */
    tb.innerHTML =
      '<nav class="brd">' +
      '<a class="brd-link" href="#top">' + t("nav_home") + '</a>' +
      '<span class="brd-sep">\u203a</span>' +
      '<button class="brd-home" data-cat="">' + t("menu_t") + '</button>' +
      '<span class="brd-sep">\u203a</span>' +
      '<span class="brd-cur">' + t("c_" + cat) + '</span>' +
      '</nav>';

    /* Slider HTML */
    ul.className = "dishes menu-slider-wrap";
    ul.innerHTML =
      '<div class="ms-track-wrap">' +
        '<div class="ms-track" id="msTrack">' +
pages.map(function (n, k) {
  return '<div class="ms-slide"><img src="' + M.base + n + '" alt="' + t("c_" + cat) + ' ' + (k + 1) + '" ' +
    'onerror="if(!this.dataset.retry){this.dataset.retry=1;this.src=this.src.endsWith(\'.jpg\')?this.src.replace(/\\.jpg$/, \'.png\'):this.src.replace(/\\.png$/, \'.jpg\');}">' +
    '</div>';
}).join("") +
        '</div>' +
      '</div>' +
      '<button class="ms-btn ms-prev" id="msPrev">&#8249;</button>' +
      '<button class="ms-btn ms-next" id="msNext">&#8250;</button>' +
      '<div class="ms-dots" id="msDots">' +
        pages.map(function (_, k) {
          return '<button class="ms-dot' + (k === 0 ? ' active' : '') + '" data-slide="' + k + '"></button>';
        }).join("") +
      '</div>' +
      '<div class="ms-counter" id="msCounter">1 / ' + pages.length + '</div>' +
      '<div class="ms-dl"><a class="btn btn-gold" href="' + M.pdf + '" download>' + t("dl_pdf") + '</a><small>' + t("tap_hint") + '</small></div>';

    function goTo(n) {
      cur = (n + pages.length) % pages.length;
      $("msTrack").style.transform = "translateX(-" + (cur * 100) + "%)";
      var dots = $("msDots").querySelectorAll(".ms-dot");
      dots.forEach(function (d, i) { d.classList.toggle("active", i === cur); });
      $("msCounter").textContent = (cur + 1) + " / " + pages.length;
    }

    $("msPrev").onclick = function () { goTo(cur - 1); };
    $("msNext").onclick = function () { goTo(cur + 1); };
    $("msDots").onclick = function (e) {
      var d = e.target.closest("[data-slide]");
      if (d) goTo(+d.dataset.slide);
    };

    /* Swipe - telefon */
    var startX = 0;
    var track = $("msTrack");
    track.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? cur + 1 : cur - 1);
    });

    /* Sichqoncha bilan sudrab o'tkazish - kompyuter */
    var dragStart = null, dragged = false;
    track.addEventListener("mousedown", function (e) {
      dragStart = e.clientX; dragged = false;
    });
    track.addEventListener("mousemove", function (e) {
      if (dragStart === null) return;
      if (Math.abs(e.clientX - dragStart) > 5) dragged = true;
    });
    track.addEventListener("mouseup", function (e) {
      if (dragStart === null) return;
      var diff = dragStart - e.clientX;
      dragStart = null;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? cur + 1 : cur - 1);
    });

    /* Lightbox: rasm bosilsa kattalashtirish */
    track.onclick = function (e) {
      if (dragged) { dragged = false; return; }
      var img = e.target.closest("img");
      if (img) lbOpen(cur);
    };
  }

  /* ===== LIGHTBOX ===== */
  var lb = null, lbCat = "", lbIdx = 0;
  function lbShow(i) {
    var list = M.pages[lbCat].slice(1);
    lbIdx = (i + list.length) % list.length;
    lb.querySelector("img").src = M.base + list[lbIdx];
    lb.querySelector(".lb-n").textContent = t("c_" + lbCat) + " \u00b7 " + (lbIdx + 1) + " / " + list.length;
    lb.classList.remove("zoom");
  }
  function lbOpen(i) {
    if (!lb) {
      lb = document.createElement("div"); lb.className = "lb"; lb.setAttribute("role", "dialog");
      lb.innerHTML = '<div class="lb-bar"><span class="lb-n"></span><button class="lb-x" data-lb="x" aria-label="Close">\u2715</button></div><div class="lb-stage"><img alt=""></div><button class="lb-p" data-lb="p" aria-label="Prev">\u2039</button><button class="lb-nx" data-lb="n" aria-label="Next">\u203a</button>';
      document.body.appendChild(lb);
    }
    lbCat = cat; lb.hidden = false; document.body.style.overflow = "hidden"; lbShow(i);
  }
  function lbClose() { if (lb) { lb.hidden = true; document.body.style.overflow = ""; } }

  document.addEventListener("click", function (e) {
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

  /* ===== MANZILNI NUSXALASH ===== */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]");
    if (!b) return;
    var txt = S.address[lang], label = t("copy_addr");
    function done() { b.textContent = t("copied"); setTimeout(function () { b.textContent = label; }, 2000); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done);
    else {
      var ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (x) {} ta.remove(); done();
    }
  });

  /* ===== CLICK HANDLER ===== */
  document.addEventListener("click", function (e) {
    var l = e.target.closest("[data-lang]");
    if (l) { lang = l.dataset.lang; try { localStorage.setItem("lang", lang); } catch (x) {} render(); return; }
    var c = e.target.closest("[data-cat]");
    if (c) {
      e.preventDefault();
      cat = c.dataset.cat || "";
      query = "";
      if ($("srch")) $("srch").value = "";
      renderMenu();

      /* Bo'lim tanlanganda avtomatik menyu tepasiga olib borish */
      var menuSec = $("menu") || $("tabs");
      if (menuSec) {
        menuSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
  });

  if ($("srch")) $("srch").addEventListener("input", function (e) { query = e.target.value; renderMenu(); });

/* ===== BRON FORMASI: TELEGRAM BOT INTEGRATSIYASI ===== */
  var BOT_TOKEN = "9245650161:AAFaLSfWCzfVB4jTLlZJ8l3ST0s8Fm2pvP0"; // Masalan: "7823482394:AAFlk90X..."
  var CHAT_ID = "7444618342";

  $("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, note = $("formNote"), btn = f.querySelector("button[type=submit]");
    if (btn && btn.disabled) return;

    f.querySelectorAll("input, select, textarea").forEach(function (i) { i.classList.add("touched"); });
    if (!f.checkValidity()) {
      note.textContent = t("f_err") || "Iltimos, maydonlarni to'g'ri to'ldiring";
      note.style.color = "#f87171";
      return;
    }

    var d = new FormData(f);
    var date = (d.get("date") || "").replace("T", " ");
    var commentText = d.get("comment") ? "\n💬 Istaklar: " + d.get("comment") : "";

    var msg = "⚡️ Yangi bron qabul qilindi!\n\n" +
      "👤 Ism: " + d.get("name") + "\n" +
      "📞 Telefon: " + d.get("phone") + "\n" +
      "📅 Sana va vaqt: " + date + "\n" +
      "👥 Mehmonlar: " + d.get("guests") + " kishi\n" +
      "📍 " + (d.get("seat") || "Joy turi: ko'rsatilmagan") +
      commentText;

    var label = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = t("f_sending") || "Yuborilmoqda..."; }
    note.textContent = "";

    fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: msg
      })
    })
    .then(function (res) { return res.json(); })
    .then(function (res) {
      if (res.ok) {
        note.textContent = t("f_sent") || "Bron muvaffaqiyatli yuborildi!";
        note.style.color = "#4ade80";
        f.reset();
        f.querySelectorAll(".touched").forEach(function (i) { i.classList.remove("touched"); });
      } else {
        throw new Error("Telegram API Error");
      }
    })
.catch(function () {
      note.textContent = t("f_fail") || "Xatolik yuz berdi. Iltimos, telefon orqali bog'laning.";
      note.style.color = "#f87171";
    })
    .finally(function () {
      if (btn) { btn.disabled = false; btn.textContent = label; }
    });
  });

  render();
})();