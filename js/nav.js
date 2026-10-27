/* Burger-menyu: ochish, yopish */
(function () {
  "use strict";
  var b = document.querySelector(".burger"), body = document.body;
  if (!b) return;
  function set(open) { body.classList.toggle("nav-open", open); b.setAttribute("aria-expanded", String(open)); }
  b.addEventListener("click", function () { set(!body.classList.contains("nav-open")); });
  document.querySelectorAll(".links a").forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
  document.addEventListener("click", function (e) { if (!e.target.closest(".top")) set(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 820) set(false); });
})();
