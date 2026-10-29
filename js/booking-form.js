/* STOL BAND QILISH: sana va vaqt alohida maydonlar.
   Sana: taqvimdan. Vaqt: ochiladigan ro'yxat (ish vaqti ichida, har yarim soatda).
   Bugungi kunda o'tib ketgan vaqtlar o'chirib qo'yiladi (Toshkent vaqti bilan).
   booking.js bilan birga ishlaydi: yashirin "date" maydoniga ikkalasini birlashtirib yozadi. */
(function () {
  "use strict";
  var S = window.SITE || {}, f = document.getElementById("form");
  var old = f && f.querySelector('input[name="date"]');
  if (!old) return;

  var L = {
    uz: { date: "Sana", time: "Vaqt", pick: "Tanlang" },
    ru: { date: "Дата", time: "Время", pick: "Выберите" },
    en: { date: "Date", time: "Time", pick: "Select" }
  };
  var CSS =
    "#form{grid-template-columns:1fr 1fr}" +
    "#form>label{grid-column:span 1}#form>.bk-w,#form>.bk-g{grid-column:span 2}" +
    "#form select{padding:.75rem .9rem;border-radius:10px;border:2px solid transparent;font:inherit;background:#fff;color:var(--ink);width:100%;height:3.3rem;box-sizing:border-box;cursor:pointer}" +
    "#form select:invalid.touched,#form input[type=date]:invalid.touched{border-color:var(--red)}" +
    "#form option:disabled{color:#9aa3b2}" +
    "@media (min-width:821px){#form{grid-template-columns:repeat(6,1fr)}#form>label{grid-column:span 2}#form>.bk-w{grid-column:span 3}}";
  var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);

  // Eski "sana va vaqt" maydoni yashirin bo'ladi va birlashgan qiymatni saqlaydi
  old.type = "hidden"; old.removeAttribute("required");
  var oldLabel = old.closest("label"); oldLabel.style.display = "none";
  var g = f.querySelector('input[name="guests"]'); if (g) g.closest("label").classList.add("bk-g");
  ["name", "phone"].forEach(function (n) {
    var i = f.querySelector('input[name="' + n + '"]'); if (i) i.closest("label").classList.add("bk-w");
  });

  var dl = document.createElement("label"), tl = document.createElement("label");
  dl.innerHTML = '<span></span><input type="date" id="bkDate" required>';
  tl.innerHTML = '<span></span><select id="bkTime" required></select>';
  oldLabel.after(dl, tl);
  var date = dl.querySelector("input"), time = tl.querySelector("select");

  function tk() {
    var o = {};
    new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tashkent", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false })
      .formatToParts(new Date()).forEach(function (x) { o[x.type] = x.value; });
    return { date: o.year + "-" + o.month + "-" + o.day, min: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  // Vaqt ro'yxati: ochilish soatidan yopilishdan 1 soat oldingacha, har 30 daqiqada
  var first = (S.open != null ? S.open : 11) * 60, last = ((S.close != null ? S.close : 22) - 1) * 60;
  time.innerHTML = '<option value=""></option>';
  for (var m = first; m <= last; m += 30) {
    var v = pad(Math.floor(m / 60)) + ":" + pad(m % 60), o = document.createElement("option");
    o.value = v; o.textContent = v; o.setAttribute("data-m", m); time.appendChild(o);
  }

  function sync() { old.value = date.value && time.value ? date.value + "T" + time.value : ""; }
  function refresh() {
    var now = tk(); date.min = now.date;
    [].forEach.call(time.options, function (op) {
      if (op.value) op.disabled = date.value === now.date && +op.getAttribute("data-m") < now.min + 30;
    });
    if (time.selectedOptions[0] && time.selectedOptions[0].disabled) time.value = "";
    sync();
  }
  function texts() {
    var x = L[document.documentElement.lang] || L.uz;
    dl.firstChild.textContent = x.date; tl.firstChild.textContent = x.time; time.options[0].textContent = x.pick;
  }

  date.addEventListener("change", refresh);
  time.addEventListener("change", sync);
  f.addEventListener("reset", function () { setTimeout(refresh, 0); });
  f.addEventListener("invalid", function (e) { e.target.classList.add("touched"); }, true);
  document.addEventListener("click", function (e) { if (e.target.closest("[data-lang]")) texts(); });
  texts(); refresh();
})();
