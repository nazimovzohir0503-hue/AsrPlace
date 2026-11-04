(function () {
  "use strict";
  var S = window.SITE, T = window.I18N, M = window.MENU;
  var CATS = M.order;
  var lang = "uz", cat = M.order[0], query = "";
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

    // Yo'l ko'rsatish tugmalari (koordinata bo'lsa shuni, bo'lmasa manzil matnini ishlatadi)
    var g = S.geo && +S.geo.lat && +S.geo.lng ? S.geo : null;
    var gUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(g ? g.lat + "," + g.lng : S.mapQuery);
    var yUrl = g ? "https://yandex.uz/maps/?rtext=~" + g.lat + "," + g.lng + "&rtt=auto" : "https://yandex.uz/maps/?text=" + encodeURIComponent(S.mapQuery);
    var rb = $("routeBtns");
    if (!rb) { rb = document.createElement("div"); rb.id = "routeBtns"; rb.className = "route"; $("info").after(rb); }
    rb.innerHTML =
      '<a class="btn btn-gold" href="' + gUrl + '" target="_blank" rel="noopener">' + t("route_google") + "</a>" +
      '<a class="btn btn-out" href="' + yUrl + '" target="_blank" rel="noopener">' + t("route_yandex") + "</a>" +
      '<button class="btn btn-out" type="button" data-copy="1">' + t("copy_addr") + "</button>";

    $("footContact").innerHTML = '<a href="tel:' + S.phone + '">' + tel() + '</a> · <a href="' + S.instagram + '" rel="noopener">Instagram</a> · <a href="' + S.telegram + '" rel="noopener">Telegram</a>';

    var map = $("map"), mg = S.geo && +S.geo.lat && +S.geo.lng ? S.geo : null, src = "https://www.google.com/maps?q=" + encodeURIComponent(mg ? mg.lat + "," + mg.lng : S.mapQuery) + (mg ? "&z=17" : "") + "&output=embed&hl=" + lang;
    if (map.getAttribute("src") !== src) map.setAttribute("src", src);

    $("ld").textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Restaurant", name: S.name, telephone: S.phone, email: S.email || undefined,
      servesCuisine: ["Uzbek", "European", "Turkish", "Fast food"],
      address: { "@type": "PostalAddress", streetAddress: S.address.en, addressLocality: "Jizzakh", addressCountry: "UZ" },
      openingHours: "Mo-Su " + S.open + ":00-" + S.close + ":00", sameAs: [S.instagram, S.telegram],
      geo: g ? { "@type": "GeoCoordinates", latitude: +g.lat, longitude: +g.lng } : undefined
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

  /* Manzilni nusxalash */
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

  /* Bron formasi: Telegram xabarini tayyorlaydi (serversiz ishlaydi). */
  var TG_USER = "asrplaza_bron";
  var FORM_T = Date.now(); // sahifa ochilgan payt; Worker'ga o'tgan vaqt (ms) yuboriladi, telefon soati noto'g'ri bo'lsa ham xato bermaydi
  /* O'tgan sanaga bron qilishni taqiqlash */
  (function () {
    var inp = $("form").elements["date"], n = new Date();
    n.setMinutes(n.getMinutes() - n.getTimezoneOffset());
    inp.min = n.toISOString().slice(0, 16);
  })();
  $("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, note = $("formNote"), btn = f.querySelector("button[type=submit]");
    if (btn && btn.disabled) return;
    f.querySelectorAll("input, select").forEach(function (i) { i.classList.add("touched"); });
    if (!f.checkValidity()) { note.textContent = t("f_err"); return; }
    var d = new FormData(f);
    var date = (d.get("date") || "").replace("T", " ");

    function viaTelegram() {
      var msg = S.name + "\n" +
        t("f_name") + ": " + d.get("name") + "\n" +
        t("f_phone") + ": " + d.get("phone") + "\n" +
        t("f_date") + ": " + date + "\n" +
        t("f_guests") + ": " + d.get("guests") + "\n" +
        (d.get("seat") || "");
      window.open("https://t.me/" + TG_USER + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    }

    // Worker sozlanmagan bo'lsa: eski usul (Telegram ochiladi)
    if (!S.workerUrl) { viaTelegram(); note.textContent = t("f_ok"); return; }

    var label = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = t("f_sending"); }
    note.textContent = "";
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 10000);

    fetch(S.workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: d.get("name"), phone: d.get("phone"), date: date,
        guests: d.get("guests"), seat: d.get("seat") || "", lang: lang,
        company_website: d.get("company_website") || "", t: Date.now() - FORM_T
      }),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      // 400 (noto'g'ri ma'lumot) va 429 (juda ko'p urinish): foydalanuvchiga aytamiz, Telegram'ga o'tkazmaymiz
      if (r.status === 429) { note.textContent = t("f_limit"); return; }
      if (r.status === 400) { note.textContent = t("f_bad"); return; }
      if (!r.ok) throw new Error("http " + r.status);
      note.textContent = t("f_sent");
      f.reset();
      f.querySelectorAll(".touched").forEach(function (i) { i.classList.remove("touched"); });
    }).catch(function () {
      note.textContent = t("f_fail");
      viaTelegram();
    }).then(function () {
      clearTimeout(timer);
      if (btn) { btn.disabled = false; btn.textContent = label; }
    });
  });

  render();
})();
