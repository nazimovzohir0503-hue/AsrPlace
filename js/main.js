(function () {
  "use strict";
  var S = window.SITE, T = window.I18N, M = window.MENU;
  var CATS = (M && M.order) ? M.order : [];
  var lang = "uz", cat = "", query = "";
  var $ = function (id) { return document.getElementById(id); };

  try { var saved = localStorage.getItem("lang"); if (T && T[saved]) lang = saved; } catch (e) {}

  var t = function (k) { return (T && T[lang] && T[lang][k]) ? T[lang][k] : k; };
  var tel = function () { 
    return (S && S.phone) ? S.phone.replace(/\D/g, "").replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5") : ""; 
  };

  function tashkentHour() {
    var h = parseInt(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Asia/Tashkent" }).format(new Date()), 10);
    return h % 24;
  }

// Temirdek ishlaydigan mukammal formatlash funksiyasi
  function formatPriceVal(val) {
    if (val === undefined || val === null || val === "" || val === "-") return "-";
    var str = ("" + val).trim();
    if (str === "-") return "-";

    // Qavs ichidagi yozuvni saqlab qo'yamiz (masalan: "(3 kishilik)")
    var bracketMatch = str.match(/\([^)]+\)/);
    var extraText = bracketMatch ? " " + bracketMatch[0] : "";

    // Qavsdan tashqari qismdagi raqamlarni toza ajratib olamiz
    var pureNumPart = str.replace(/\([^)]+\)/g, "");
    var digits = pureNumPart.replace(/\D/g, "");
    
    if (!digits) return str;

    var formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var curr = (S && S.currency && S.currency[lang]) ? S.currency[lang] : "so'm";

    return formatted + " " + curr + extraText;
  }

  function renderStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = t("desc");

    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lang === lang); });
    if ($("year")) $("year").textContent = new Date().getFullYear();

    var badge = $("openBadge");
    if (badge && S) {
      var h = tashkentHour(), isOpen = h >= S.open && h < S.close;
      var until = lang === "ru" ? "до " + S.close + ":00" : lang === "en" ? "until " + S.close + ":00" : S.close + ":00 gacha";
      var opens = lang === "ru" ? "открытие в " + S.open + ":00" : lang === "en" ? "opens at " + S.open + ":00" : S.open + ":00 da ochiladi";
      badge.textContent = isOpen ? t("open_now") + " · " + until : t("closed_now") + " · " + opens;
      badge.classList.toggle("off", !isOpen);
    }

    if ($("arches") && window.HERO) {
      $("arches").innerHTML = window.HERO.map(function (a) {
        var bg = "linear-gradient(to top,rgba(15,26,44,.88),rgba(15,26,44,0) 55%),url(" + a.img + ") center/cover";
        return '<a class="arch" href="#menu" data-cat="' + a.cat + '" style="background:' + bg + ';color:#fff"><span>' + a.l[lang] + "</span></a>";
      }).join("");
    }

    if ($("info") && S) {
      $("info").innerHTML =
        "<div><dt>" + t("lbl_addr") + "</dt><dd>" + (S.address ? S.address[lang] : "") + "</dd></div>" +
        "<div><dt>" + t("lbl_hours") + "</dt><dd>" + t("daily") + ", " + S.open + ":00 – " + S.close + ":00</dd></div>" +
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
    }

    if ($("footContact") && S) {
      $("footContact").innerHTML = '<a href="tel:' + S.phone + '">' + tel() + '</a> · <a href="' + S.instagram + '" rel="noopener">Instagram</a> · <a href="' + S.telegram + '" rel="noopener">Telegram</a>';
    }

    var map = $("map");
    if (map && S) {
      var mg = S.geo && +S.geo.lat && +S.geo.lng ? S.geo : null;
      var src = "https://www.google.com/maps?q=" + encodeURIComponent(mg ? mg.lat + "," + mg.lng : S.mapQuery) + (mg ? "&z=17" : "") + "&output=embed&hl=" + lang;
      if (map.getAttribute("src") !== src) map.setAttribute("src", src);
    }
  }

  /* ===== MEHMONXONA VA BASSEYN RENDERI ===== */
  function renderHotelAndPool() {
    var hGrid = $("hotelGrid"), hInfo = $("hotelInfo"), pGrid = $("poolGrid");

    if (hGrid && window.HOTEL_ROOMS) {
      hGrid.innerHTML = window.HOTEL_ROOMS.map(function(r) {
        var featHtml = (r.features && r.features[lang]) ? r.features[lang].map(function(f) {
          return '<li><span>✓</span> ' + f + '</li>';
        }).join("") : "";

        var contacts = window.POOL_DATA ? window.POOL_DATA.contacts : { phone: "551527070", telegram: "https://t.me/asrplaza_hotel" };
        var priceDetail = r.dynamicPrices ? r.dynamicPrices : (r.types ? r.types[lang] : "");

        return '<div class="fac-card">' +
          '<div class="fac-img-wrap">' +
            '<img class="fac-img" src="' + r.img + '" alt="' + r.name[lang] + '" onerror="this.src=\'images/logo.png\'">' +
            '<span class="fac-badge">' + r.total[lang] + '</span>' +
          '</div>' +
          '<div class="fac-body">' +
            '<h3>' + r.name[lang] + '</h3>' +
            '<ul class="fac-features">' + featHtml + '</ul>' +
            '<div class="fac-bot">' +
              '<span class="fac-price" style="font-size: 1.05rem; line-height: 1.4; font-weight: 700; color: #b89753;">' + priceDetail + '</span>' +
              '<div class="fac-actions">' +
                '<a href="tel:' + contacts.phone + '" class="btn btn-gold">' + t("hotel_call") + '</a>' +
                '<a href="' + contacts.telegram + '" target="_blank" rel="noopener" class="btn btn-out">' + t("hotel_book_tg") + '</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join("");
    }

    if (hInfo && window.HOTEL_RULES && window.HOTEL_RULES[lang]) {
      hInfo.innerHTML = window.HOTEL_RULES[lang].map(function(rule) {
        return '<div class="rule-card">' +
          '<h4>' + rule.title + '</h4>' +
          '<p>' + rule.desc + '</p>' +
        '</div>';
      }).join("");
    }

    if (pGrid && window.POOL_DATA) {
      var curr = (S && S.currency && S.currency[lang]) ? S.currency[lang] : "so'm";
      pGrid.innerHTML =
        '<div class="pool-hero-box">' +
          '<div class="pool-details">' +
            '<div class="pool-rate-badge">' + t("pool_badge") + '</div>' +
            '<h3>' + t("pool_t") + '</h3>' +
            '<div class="pool-price-row">' +
              '<span class="big-sum">' + window.POOL_DATA.priceBase + '</span>' +
              '<span class="unit">' + curr + ' / ' + t("pool_for6") + '</span>' +
            '</div>' +
            '<p class="pool-extra-info">' + t("pool_extra_lbl") + ' <b>' + window.POOL_DATA.extraPerson + ' ' + curr + '</b></p>' +
            '<ul class="pool-perks">' +
              '<li><span>✓</span> ' + t("pool_p1") + '</li>' +
              '<li><span>✓</span> ' + t("pool_p2") + '</li>' +
              '<li><span>✓</span> ' + t("pool_p3") + '</li>' +
            '</ul>' +
            '<div class="pool-contacts">' +
              '<a href="tel:' + window.POOL_DATA.contacts.phone + '" class="btn btn-gold">' + window.POOL_DATA.contacts.phoneDisplay + '</a>' +
              '<a href="' + window.POOL_DATA.contacts.telegram + '" target="_blank" rel="noopener" class="btn btn-line">' + t("pool_tg_btn") + '</a>' +
            '</div>' +
          '</div>' +
        '</div>';
    }
  }

  /* ===== RESTORAN MENYUSI ===== */
  function renderMenu() {
    var ul = $("dishes"), tb = $("tabs");
    if (!ul || !M) return;

    if (!cat) {
      if (tb) tb.innerHTML = "";
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

    if (!M.pages[cat]) return;
    var pages = M.pages[cat].slice(1);
    var cur = 0;

    if (tb) {
      tb.innerHTML =
        '<nav class="brd">' +
        '<a class="brd-link" href="#top">' + t("nav_home") + '</a>' +
        '<span class="brd-sep">›</span>' +
        '<button class="brd-home" data-cat="">' + t("menu_t") + '</button>' +
        '<span class="brd-sep">›</span>' +
        '<span class="brd-cur">' + t("c_" + cat) + '</span>' +
        '</nav>';
    }

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
      if ($("msTrack")) $("msTrack").style.transform = "translateX(-" + (cur * 100) + "%)";
      var dots = $("msDots") ? $("msDots").querySelectorAll(".ms-dot") : [];
      dots.forEach(function (d, i) { d.classList.toggle("active", i === cur); });
      if ($("msCounter")) $("msCounter").textContent = (cur + 1) + " / " + pages.length;
    }

    if ($("msPrev")) $("msPrev").onclick = function () { goTo(cur - 1); };
    if ($("msNext")) $("msNext").onclick = function () { goTo(cur + 1); };
    if ($("msDots")) {
      $("msDots").onclick = function (e) {
        var d = e.target.closest("[data-slide]");
        if (d) goTo(+d.dataset.slide);
      };
    }
  }

  function render() {
    renderStatic();
    if ($("dishes")) renderMenu();
    renderHotelAndPool();
  }

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
      var menuSec = $("menu") || $("tabs");
      if (menuSec) menuSec.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  });

  /* ===== GOOGLE SHEETS ORQALI NARXLARNI AVTOMATIK YANGILASH ===== */
  var SHEET_ID = "1d1yYnCZjNRLu7sVHN_gjM2Kd0ra8PsBw7gafzkfvh-o";
  var SHEET_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?tqx=out:json";

  function fetchLivePrices() {
    fetch(SHEET_URL)
      .then(function (res) { return res.text(); })
      .then(function (data) {
        var json = JSON.parse(data.substring(47).slice(0, -2));
        var rows = json.table.rows;

        rows.forEach(function (row) {
          if (!row.c || !row.c[0]) return;
          var roomId = ("" + (row.c[0].f || row.c[0].v || "")).trim().toLowerCase();
          
          var cell1 = row.c[1];
          var cell2 = row.c[2];

          var rawSingle = cell1 ? (cell1.f !== undefined && cell1.f !== null && cell1.f !== "" ? cell1.f : (cell1.v !== undefined ? cell1.v : "")) : "";
          var rawDouble = cell2 ? (cell2.f !== undefined && cell2.f !== null && cell2.f !== "" ? cell2.f : (cell2.v !== undefined ? cell2.v : "")) : "";

          var singleVal = formatPriceVal(rawSingle);
          var doubleVal = formatPriceVal(rawDouble);

          if (window.HOTEL_ROOMS) {
            window.HOTEL_ROOMS.forEach(function (room) {
              if (room.id === roomId) {
                if (singleVal && singleVal !== "-" && doubleVal && doubleVal !== "-") {
                  room.dynamicPrices = "1 kishilik: " + singleVal + " | 2 kishilik: " + doubleVal;
                } else if (doubleVal && doubleVal !== "-") {
                  room.dynamicPrices = doubleVal;
                } else if (singleVal && singleVal !== "-") {
                  room.dynamicPrices = singleVal;
                }
              }
            });
          }

          if (roomId === "pool" && window.POOL_DATA && rawSingle !== "") {
            var pStr = ("" + rawSingle).replace(/\D/g, "");
            if (pStr) window.POOL_DATA.priceBase = pStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          }
          if (roomId === "pool_extra" && window.POOL_DATA && rawSingle !== "") {
            var eStr = ("" + rawSingle).replace(/\D/g, "");
            if (eStr) window.POOL_DATA.extraPerson = eStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          }
        });

        renderHotelAndPool();
      })
      .catch(function (err) {
        console.error("Narxlarni yuklashda xatolik:", err);
      });
  }
/* ===== SCROLL ANIMATSIYASI (QALQIB CHIQISH) ===== */
  var bentoItems = document.querySelectorAll(".bento-item");
  if (bentoItems.length > 0 && "IntersectionObserver" in window) {
    
    // Boshlang'ich holatda rasmlarga yashirinish klasini qo'shish
    bentoItems.forEach(function(item) { 
      item.classList.add("reveal-item"); 
    });

    // Ekranga kirganini kuzatuvchi "Ko'z" (Observer)
    var scrollObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Rasm ekranda ko'ringanda uni jonlantirish
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // Bir marta ishlasin, qayta-qayta emas
        }
      });
    }, { 
      rootMargin: "0px 0px -50px 0px", // Mijoz rasmga 50px yaqinlashganda ishga tushadi
      threshold: 0.1 
    });

    // Barcha rasmlarni kuzatishga topshirish
    bentoItems.forEach(function(item) { 
      scrollObserver.observe(item); 
    });
  }
  /* ===== LIGHTBOX (Rasmlarni to'liq ekranda ochish mantig'i) ===== */
  var lb = $("lightbox"), lbImg = $("lightbox-img");
  if (lb && lbImg) {
    // Rasmlarni bosganda ochish
    document.querySelectorAll(".bento-item").forEach(function(item) {
      item.addEventListener("click", function() {
        var img = this.querySelector("img");
        if (img) {
          lb.style.display = "block";
          lbImg.src = img.src;
        }
      });
    });
    // X tugmasi bosilganda yopish
    document.querySelector(".lightbox-close").addEventListener("click", function() {
      lb.style.display = "none";
    });
    // Qora fon bosilganda ham yopish
    lb.addEventListener("click", function(e) {
      if (e.target !== lbImg) lb.style.display = "none";
    });
  }
  render();
  fetchLivePrices();

  /* ===== TEPAGA QAYTISH MANTIG'I ===== */
  var topBtn = $("scrollTopBtn");
  if (topBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    });

    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();