/* STOL BAND QILISH: Sana, Vaqt, +/- Mehmonlar soni, Joy turi va Izoh */
(function () {
  "use strict";
  var S = window.SITE || {}, f = document.getElementById("form");
  var old = f && f.querySelector('input[name="date"]');
  if (!old) return;

  var L = {
    uz: {
      date: "Sana", time: "Vaqt", pick: "Tanlang",
      guests: "Mehmonlar soni",
      comment: "Istaklar / Izoh", comment_ph: "Qo'shimcha istaklaringiz bo'lsa yozing...",
      phone_ph: "+998 90 123 45 67"
    },
    ru: {
      date: "Дата", time: "Время", pick: "Выберите",
      guests: "Количество персон",
      comment: "Комментарий", comment_ph: "Сообщите нам о ваших пожеланиях...",
      phone_ph: "+998 90 123 45 67"
    },
    en: {
      date: "Date", time: "Time", pick: "Select",
      guests: "Number of guests",
      comment: "Special requests", comment_ph: "Let us know your preferences...",
      phone_ph: "+998 90 123 45 67"
    }
  };

  /* עיצוב המבנה המקורי ללא הקידומת המפוצלת */
  var CSS =
    "#form{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem}" +
    "#form>label,#form>.bk-field{grid-column:span 1;display:flex;flex-direction:column;gap:.4rem}" +
    "#form>.bk-w,#form>.bk-full{grid-column:span 2}" +
    "#form select,#form textarea,#form input{padding:.75rem .9rem;border-radius:10px;border:2px solid transparent;font:inherit;background:#fff;color:var(--ink,#1b2433);width:100%;box-sizing:border-box}" +
    "#form select{height:3.3rem;cursor:pointer}" +
    "#form select:invalid.touched,#form input:invalid.touched{border-color:var(--red,#e53e3e)}" +
    "#form option:disabled{color:#9aa3b2}" +
    /* כפתורי ספירת אורחים (+ ו- -) */
    ".bk-qty-wrap{display:flex;align-items:center;gap:.75rem;height:3.3rem}" +
    ".bk-qty-btn{width:2.8rem;height:2.8rem;border-radius:50%;border:2px solid rgba(255,255,255,.35);background:transparent;color:#fff;font-size:1.4rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;line-height:1;user-select:none}" +
    ".bk-qty-btn:hover{background:var(--gold,#c9a268);border-color:var(--gold,#c9a268);color:var(--teal,#0f1a2c)}" +
    ".bk-qty-btn:active{transform:scale(.92)}" +
    ".bk-qty-wrap input{width:4.2rem !important;height:3.3rem !important;text-align:center;font-size:1.2rem;font-weight:700;border-radius:10px !important;padding:0 !important;-moz-appearance:textfield}" +
    ".bk-qty-wrap input::-webkit-outer-spin-button,.bk-qty-wrap input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}" +
    /* שדה הערות */
    "#form textarea{resize:vertical;min-height:5.2rem;line-height:1.4}" +
    "@media (min-width:821px){#form{grid-template-columns:repeat(6,1fr)}#form>label,#form>.bk-field{grid-column:span 2}#form>.bk-w{grid-column:span 3}#form>.bk-full{grid-column:1/-1}}";

  var st = document.createElement("style");
  st.textContent = CSS;
  document.head.appendChild(st);

  /* 1. תאריך ושעה */
  old.type = "hidden";
  old.removeAttribute("required");
  var oldLabel = old.closest("label");
  oldLabel.style.display = "none";

  var dl = document.createElement("label"), tl = document.createElement("label");
  dl.innerHTML = '<span></span><input type="date" id="bkDate" required>';
  tl.innerHTML = '<span></span><select id="bkTime" required></select>';
  oldLabel.after(dl, tl);
  var date = dl.querySelector("input"), time = tl.querySelector("select");

  /* 2. שדה שם מלא */
  var nameInp = f.querySelector('input[name="name"]');
  if (nameInp) nameInp.closest("label").classList.add("bk-w");

  /* 3. שדה טלפון במבנה המקורי (שדה יחיד רגיל) */
  var phoneInp = f.querySelector('input[name="phone"]');
  if (phoneInp) {
    phoneInp.closest("label").classList.add("bk-w");
    phoneInp.placeholder = "+998";
  }

  /* 4. כמות אורחים עם כפתורי + ו- - */
  var guestsInp = f.querySelector('input[name="guests"]');
  var gLabel = guestsInp ? guestsInp.closest("label") : null;
  if (guestsInp && gLabel) {
    gLabel.classList.add("bk-w");
    var qWrap = document.createElement("div");
    qWrap.className = "bk-qty-wrap";
    var minusBtn = document.createElement("button");
    minusBtn.type = "button";
    minusBtn.className = "bk-qty-btn";
    minusBtn.textContent = "−";

    var plusBtn = document.createElement("button");
    plusBtn.type = "button";
    plusBtn.className = "bk-qty-btn";
    plusBtn.textContent = "+";

    guestsInp.before(qWrap);
    qWrap.appendChild(minusBtn);
    qWrap.appendChild(guestsInp);
    qWrap.appendChild(plusBtn);

    minusBtn.onclick = function () {
      var val = parseInt(guestsInp.value, 10) || 1;
      if (val > 1) guestsInp.value = val - 1;
    };
    plusBtn.onclick = function () {
      var val = parseInt(guestsInp.value, 10) || 1;
      if (val < 100) guestsInp.value = val + 1;
    };
  }

  /* 5. סוג מקום ישיבה */
  var SEAT = {
    uz: { t: "Joy turi", k: "Joy turi", o: ["Umumiy zal", "Xona", "Terrasa"] },
    ru: { t: "Тип места", k: "Место", o: ["Общий зал", "Комната", "Терраса"] },
    en: { t: "Seating area", k: "Seating", o: ["Main hall", "Private room", "Terrace"] }
  };

  var seatWrap = document.createElement("div");
  seatWrap.className = "bk-full";
  seatWrap.innerHTML = '<span style="font-weight:700;font-size:.9rem;color:#fff" class="bk-st"></span>' +
    '<select name="seat_choice" id="bkSeat">' +
    [0, 1, 2].map(function (i) { return '<option value="' + i + '"' + (i === 0 ? ' selected' : '') + '> </option>'; }).join('') +
    '</select>' +
    '<input type="hidden" name="seat">';
  f.querySelector("button[type=submit]").before(seatWrap);
  var seatOut = seatWrap.querySelector('input[name="seat"]');

  function seatTexts() {
    var x = SEAT[document.documentElement.lang] || SEAT.uz;
    seatWrap.querySelector(".bk-st").textContent = x.t;
    var sel = seatWrap.querySelector("select#bkSeat");
    [].forEach.call(sel.options, function (op, i) { op.textContent = x.o[i]; });
    seatOut.value = x.k + ": " + x.o[sel.selectedIndex];
  }

  seatWrap.querySelector("select#bkSeat").addEventListener("change", function () {
    var x = SEAT[document.documentElement.lang] || SEAT.uz;
    seatOut.value = x.k + ": " + x.o[this.selectedIndex];
  });

  /* 6. שדה הערות נוספות */
  var commentLabel = document.createElement("label");
  commentLabel.className = "bk-full";
  commentLabel.innerHTML = '<span style="font-weight:700;font-size:.9rem;color:#fff" class="bk-cm-t"></span>' +
    '<textarea name="comment" rows="2"></textarea>';
  f.querySelector("button[type=submit]").before(commentLabel);

  /* חישובי זמנים */
  function tk() {
    var o = {};
    new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tashkent", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false })
      .formatToParts(new Date()).forEach(function (x) { o[x.type] = x.value; });
    return { date: o.year + "-" + o.month + "-" + o.day, min: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

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
    var curLang = document.documentElement.lang || "uz";
    var x = L[curLang] || L.uz;
    dl.firstChild.textContent = x.date;
    tl.firstChild.textContent = x.time;
    time.options[0].textContent = x.pick;
    if (phoneInp) phoneInp.placeholder = x.phone_ph;
    if (gLabel && gLabel.querySelector("span")) gLabel.querySelector("span").textContent = x.guests;
    commentLabel.querySelector(".bk-cm-t").textContent = x.comment;
    commentLabel.querySelector("textarea").placeholder = x.comment_ph;
    seatTexts();
  }

  date.addEventListener("change", refresh);
  time.addEventListener("change", sync);
  f.addEventListener("reset", function () { setTimeout(function () { refresh(); seatTexts(); }, 0); });
  f.addEventListener("invalid", function (e) { e.target.classList.add("touched"); }, true);
  document.addEventListener("click", function (e) { if (e.target.closest("[data-lang]")) texts(); });

  texts(); refresh();
})();