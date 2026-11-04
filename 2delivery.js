/* YETKAZIB BERISH: hero'da tugma, menyudan keyin alohida bo'lim, yuqori panelda havola.
   Hamma narsa shu fayldan sozlanadi. Bo'sh qoldirilgan ixtiyoriy maydonlar ko'rsatilmaydi. */
(function () {
  "use strict";
var DELIVERY = {
    phone: "+998950596468",
    telegram: "https://t.me/asrplaza_bron",
    hours: "11:00 – 22:00",
    area: { uz: "Jizzax shahri", ru: "г. Джизак", en: "Jizzakh city" },
    time: { 
      uz: "Joylashuvga qarab farqlanadi", 
      ru: "Зависит от местоположения", 
      en: "Depends on location" 
    },
    fee: { 
      uz: "Shahar bo'ylab bepul. Chekka hududlar uchun qo'shimcha to'lov.", 
      ru: "По городу бесплатно. За отдалённые районы доплата.", 
      en: "Free within city. Extra charge for distant areas." 
    },
    min: { uz: "50 000 so'm", ru: "50 000 сум", en: "50,000 UZS" },
    payment: { uz: "Naqd · Click · Payme", ru: "Наличные · Click · Payme", en: "Cash · Click · Payme" }
  };

var T = {
    uz: { nav: "Yetkazib berish", eye: "Yetkazib berish xizmati", h: "Taomlarimiz endi uyingizda",
          lead: "Asr Plaza menyusidagi sevimli taomlaringizni uyingizga yoki ofisingizga yetkazib beramiz. Buyurtma uchun qo'ng'iroq qiling, qolganini o'zimiz hal qilamiz.",
          label: "Buyurtma uchun qo'ng'iroq qiling", call: "Qo'ng'iroq qilish", tg: "Telegramda buyurtma",
          hours: "Ish vaqti", area: "Hudud", time: "Yetkazish vaqti", fee: "Narxi",
          min: "Minimal summa", payment: "To'lov usullari" },
    ru: { nav: "Доставка", eye: "Служба доставки", h: "Наши блюда теперь у вас дома",
          lead: "Привезём любимые блюда из меню Asr Plaza к вам домой или в офис. Позвоните и оформите заказ, остальное мы берём на себя.",
          label: "Позвоните, чтобы сделать заказ", call: "Позвонить", tg: "Заказать в Telegram",
          hours: "Часы работы", area: "Зона доставки", time: "Время доставки", fee: "Стоимость",
          min: "Мин. сумма заказа", payment: "Способы оплаты" },
    en: { nav: "Delivery", eye: "Delivery service", h: "Our dishes, now at your door",
          lead: "We bring your favourite dishes from the Asr Plaza menu to your home or office. Call to place an order and we will take care of the rest.",
          label: "Call to place an order", call: "Call now", tg: "Order via Telegram",
          hours: "Hours", area: "Area", time: "Delivery time", fee: "Fee",
          min: "Min. order", payment: "Payment" }
  };

  var S = window.SITE || {};
  var sec, heroBtn, navLink;
  var ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>';

  var CSS =
    ".dv{background:var(--teal);color:#fff;max-width:none}" +
    ".dv-in{max-width:var(--w);margin:0 auto;display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(1.5rem,4vw,3.5rem);align-items:center}" +
    ".dv h2{margin-bottom:.8rem}" +
    ".dv-eye{display:inline-block;color:var(--gold);font-weight:800;letter-spacing:.14em;text-transform:uppercase;font-size:.8rem;margin-bottom:.8rem}" +
    ".dv-lead{font-size:1.15rem;color:#fff;max-width:52ch}" +
    ".dv-card{border:1px solid rgba(201,162,104,.6);border-radius:22px;padding:clamp(1.4rem,3vw,2.2rem);background:linear-gradient(160deg,rgba(255,255,255,.09),rgba(255,255,255,.02));box-shadow:0 18px 40px rgba(0,0,0,.25)}" +
    ".dv-label{font-weight:700;color:#fff;font-size:.95rem}" +
    ".dv-phone{display:block;font:700 clamp(1.6rem,4vw,2.5rem)/1.15 var(--head);color:var(--gold);text-decoration:none;margin:.3rem 0 1.2rem;white-space:nowrap}" +
    ".dv-btns{display:flex;flex-wrap:wrap;gap:.7rem}.dv-btns .btn svg{width:1.05em;height:1.05em;vertical-align:-.15em;margin-right:.45rem}" +
    ".dv-facts{list-style:none;padding:1.1rem 0 0;margin:1.4rem 0 0;display:grid;gap:.7rem;border-top:1px solid rgba(255,255,255,.18)}" +
    ".dv-facts li{display:grid;grid-template-columns:9.5rem 1fr;gap:.4rem 1rem;align-items:baseline}.dv-facts b{font-weight:800;color:var(--gold);letter-spacing:.01em}.dv-facts span{color:#fff;font-weight:600}" +
    "@media (max-width:820px){.dv-in{grid-template-columns:1fr}.dv-facts li{grid-template-columns:1fr}.dv-facts b{margin-bottom:.1rem}}";

  function lang() { return T[document.documentElement.lang] ? document.documentElement.lang : "uz"; }
  function pick(v, l) { return v && typeof v === "object" ? (v[l] || v.uz || "") : (v || ""); }
  function digits(s) { return String(s || "").replace(/\D/g, ""); }
  function pretty(s) { var d = digits(s); return d.length === 12 ? "+" + d.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5") : "+" + d; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function render() {
    var l = lang(), t = T[l], ph = DELIVERY.phone || S.phone || "";
    var facts = ["hours", "area", "time", "fee", "min", "payment"].map(function (k) {
      var v = pick(DELIVERY[k], l);
      return v ? "<li><b>" + t[k] + "</b><span>" + esc(v) + "</span></li>" : "";
    }).join("");
    sec.innerHTML =
      '<div class="dv-in"><div><span class="dv-eye">' + t.eye + "</span><h2 id=\"dvT\">" + t.h + '</h2><p class="dv-lead">' + t.lead + "</p></div>" +
      '<div class="dv-card"><div class="dv-label">' + t.label + '</div>' +
      '<a class="dv-phone" href="tel:+' + digits(ph) + '">' + pretty(ph) + "</a>" +
      '<div class="dv-btns"><a class="btn btn-gold" href="tel:+' + digits(ph) + '">' + ICON + t.call + "</a>" +
      (DELIVERY.telegram ? '<a class="btn btn-line" href="' + esc(DELIVERY.telegram) + '?text=' + encodeURIComponent(
  "🛵 Yetkazib berish buyurtmasi — Asr Plaza\n\n" +
  "📍 Manzil: \n" +
  "📞 Telefon: \n" +
  "🍽 Buyurtma:\n   1. \n   2. \n   3. \n\n" +
  "💳 To'lov: \n" +
  "🕐 Qulay vaqt: \n\n" +
  "Operator siz bilan tez orada bog'lanadi ✅"
) + '" rel="noopener">' + t.tg + "</a>" : "") +
      (facts ? '<ul class="dv-facts">' + facts + "</ul>" : "") + "</div></div>";
    if (heroBtn) heroBtn.textContent = t.nav;
    if (navLink) navLink.textContent = t.nav;
  }

  var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
  sec = document.createElement("section"); sec.className = "sec dv"; sec.id = "delivery"; sec.setAttribute("aria-labelledby", "dvT");
  var menu = document.getElementById("menu");
  if (menu) menu.after(sec); else (document.querySelector("main") || document.body).appendChild(sec);

  var cta = document.querySelector(".hero .cta");
  if (cta) { heroBtn = document.createElement("a"); heroBtn.className = "btn btn-line"; heroBtn.href = "#delivery"; cta.appendChild(heroBtn); }
  var links = document.querySelector(".links");
  if (links) { navLink = document.createElement("a"); navLink.href = "#delivery"; var nb = links.querySelector(".nav-book"); if (nb) links.insertBefore(navLink, nb); else links.appendChild(navLink); }

  render();
  document.addEventListener("click", function (e) { if (e.target.closest("[data-lang]")) render(); });
})();
