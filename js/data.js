/* ===================================================================
   ASR PLAZA — BARCHA MA'LUMOTLAR SHU YERDA.
   Telefon, manzil, ish vaqti, menyu va matnlarni faqat shu faylda
   o'zgartiring: sayt hamma joyda avtomatik yangilanadi.
   =================================================================== */

window.SITE = {
  name: "ASR Plaza",
  phone: "+998990257071",            // TODO: haqiqiy raqam (yagona manba)
  whatsapp: "998990257071",          // bron so'rovlari shu raqamga boradi (+ belgisiz)
  email: "@asrplaza.uz",             // TODO
  instagram: "https://www.instagram.com/asrplaza?psln=MXFoaXphcmJ0bGZxcQ==",   // TODO
  telegram: "https://t.me/asrplaza",             // TODO
  open: 11, close: 22,               // ish vaqti (soat), har kuni
  mapQuery: "ASR Plaza, Jizzax shahri, Uzbekistan",  // TODO: aniq manzil yoki koordinata
  address: {
    uz: "Jizzax shahri, Obod mahallasi, Ko'tarma ko'chasi",
    ru: "Город Джизак, махалля Обод, улица Кутарма",
    en: "Jizzakh City, Obod Mahalla, Ko'tarma Street"
  },
  currency: { uz: "so'm", ru: "сум", en: "UZS" }
};

window.I18N = {
  uz: {
    nav_about: "Biz haqimizda", nav_menu: "Menyu", nav_visit: "Manzil", book: "Stol band qilish",
    hero_t: "Jizzaxdagi premium restoran. Steyk, shashlik, assorti.",
    hero_p: "Steyk va shashlik, katta assortilar, turk taomlari, pitsa va milliy taomlar. Oila, do'stlar va ish uchrashuvlari uchun nafis muhit.",
    see_menu: "Menyuni ko'rish",
    open_now: "Hozir ochiq", closed_now: "Hozir yopiq", until: "gacha", opens: "ochilish",
    c_nat: "Milliy", c_eur: "Yevropa", c_tr: "Turk", c_ff: "Fast food",
    c_dr: "Ichimliklar", c_sal: "Salatlar", c_app: "Gazaklar", c_soup: "Sho'rvalar", c_grill: "Shashlik", c_steak: "Steyklar", c_set: "Assortilar", c_hot: "Yevropa taomlari", c_pz: "Pitsa va burger", c_side: "Garnir va snek", c_bread: "Non", c_dess: "Desert", dl_pdf: "Menyuni PDF yuklab olish", tap_hint: "Kattalashtirish uchun sahifani bosing.", s_ph: "Taom qidirish...", pop: "Mashhur", no_res: "Hech narsa topilmadi.",
    about_t: "ASR Plaza haqida",
    about_p: "Asr Plaza 2025-yildan beri mehmonlarni qabul qiladi. Bizda har kim o'ziga yoqqanini topadi: kimdir steyk va shashlik, kimdir turk taomlari yoki pitsa tanlaydi. Hammasi bitta stolda, premium xizmat bilan.",
    fa1_t: "Katta menyu", fa1_p: "Salat va sho'rvadan steyk, shashlik va desertgacha bitta menyuda.",
    fa2_t: "Oila va davralar uchun", fa2_p: "Family Set va Royal assorti kabi katta to'plamlar butun stolga yetadi.",
    fa3_t: "Bar va desertlar", fa3_p: "Mojito, smuzi, yangi sharbatlar va cheesecake'lar.",
    menu_t: "Menyu",
    visit_t: "Bizga keling", lbl_addr: "Manzil", lbl_hours: "Ish vaqti", lbl_phone: "Telefon", daily: "Har kuni",
    book_t: "Stol band qilish",
    f_name: "Ismingiz", f_phone: "Telefon raqamingiz", f_date: "Sana va vaqt", f_guests: "Mehmonlar soni",
    f_send: "WhatsApp orqali yuborish",
    f_err: "Iltimos, barcha maydonlarni to'ldiring.", f_ok: "WhatsApp ochildi. Xabarni yuboring, biz tasdiqlaymiz.",
    desc: "Asr Plaza: Jizzaxdagi premium restoran. Steyk, shashlik, assorti, turk va milliy taomlar."
  },
  ru: {
    nav_about: "О нас", nav_menu: "Меню", nav_visit: "Адрес", book: "Забронировать стол",
    hero_t: "Премиум-ресторан в Джизаке. Стейк, шашлык, ассорти.",
    hero_p: "Стейки и шашлык, большие ассорти, турецкие блюда, пицца и национальная кухня. Изысканная атмосфера для семьи, друзей и деловых встреч.",
    see_menu: "Смотреть меню",
    open_now: "Сейчас открыто", closed_now: "Сейчас закрыто", until: "до", opens: "открытие в",
    c_nat: "Национальная", c_eur: "Европейская", c_tr: "Турецкая", c_ff: "Фастфуд",
    c_dr: "Напитки", c_sal: "Салаты", c_app: "Закуски", c_soup: "Супы", c_grill: "Шашлык", c_steak: "Стейки", c_set: "Ассорти", c_hot: "Европейская кухня", c_pz: "Пицца и бургеры", c_side: "Гарниры и снеки", c_bread: "Хлеб", c_dess: "Десерты", dl_pdf: "Скачать меню в PDF", tap_hint: "Нажмите на страницу, чтобы увеличить.", s_ph: "Поиск блюда...", pop: "Хит", no_res: "Ничего не найдено.",
    about_t: "Об ASR Plaza",
    about_p: "Asr Plaza принимает гостей в Джизаке с 2025 года. У нас каждый найдёт своё: кто-то выберет стейк и шашлык, кто-то турецкие блюда или пиццу. Всё за одним столом, с сервисом премиум-класса.",
    fa1_t: "Большое меню", fa1_p: "От салатов и супов до стейков, шашлыка и десертов в одном меню.",
    fa2_t: "Для семей и компаний", fa2_p: "Большие сеты, как Family Set и Royal ассорти, рассчитаны на весь стол.",
    fa3_t: "Бар и десерты", fa3_p: "Мохито, смузи, свежевыжатые соки и чизкейки.",
    menu_t: "Меню",
    visit_t: "Как нас найти", lbl_addr: "Адрес", lbl_hours: "Время работы", lbl_phone: "Телефон", daily: "Ежедневно",
    book_t: "Бронирование стола",
    f_name: "Ваше имя", f_phone: "Номер телефона", f_date: "Дата и время", f_guests: "Количество гостей",
    f_send: "Отправить в WhatsApp",
    f_err: "Пожалуйста, заполните все поля.", f_ok: "WhatsApp открыт. Отправьте сообщение, мы подтвердим бронь.",
    desc: "Asr Plaza: премиум-ресторан в Джизаке. Стейки, шашлык, ассорти, турецкая и национальная кухня."
  },
  en: {
    nav_about: "About", nav_menu: "Menu", nav_visit: "Visit", book: "Book a table",
    hero_t: "Premium restaurant in Jizzakh. Steak, shashlik, platters.",
    hero_p: "Steaks and shashlik, grand platters, Turkish dishes, pizza and Uzbek cuisine. A refined setting for family, friends and business meetings.",
    see_menu: "See the menu",
    open_now: "Open now", closed_now: "Closed now", until: "until", opens: "opens at",
    c_nat: "Uzbek", c_eur: "European", c_tr: "Turkish", c_ff: "Fast food",
    c_dr: "Drinks", c_sal: "Salads", c_app: "Starters", c_soup: "Soups", c_grill: "Shashlik", c_steak: "Steaks", c_set: "Platters", c_hot: "European dishes", c_pz: "Pizza & burgers", c_side: "Sides & snacks", c_bread: "Bread", c_dess: "Desserts", dl_pdf: "Download menu (PDF)", tap_hint: "Tap a page to zoom in.", s_ph: "Search dishes...", pop: "Popular", no_res: "Nothing found.",
    about_t: "About ASR Plaza",
    about_p: "Asr Plaza has been welcoming guests in Jizzakh since 2025. Everyone finds something they love here: steak and shashlik for one, Turkish dishes or pizza for another. All at one table, with premium service.",
    fa1_t: "A big menu", fa1_p: "From salads and soups to steaks, shashlik and desserts, all in one menu.",
    fa2_t: "Families and groups", fa2_p: "Large sets like the Family Set and Royal platter are made for the whole table.",
    fa3_t: "Bar and desserts", fa3_p: "Mojitos, smoothies, fresh juices and cheesecakes.",
    menu_t: "Menu",
    visit_t: "Visit us", lbl_addr: "Address", lbl_hours: "Opening hours", lbl_phone: "Phone", daily: "Every day",
    book_t: "Book a table",
    f_name: "Your name", f_phone: "Phone number", f_date: "Date and time", f_guests: "Number of guests",
    f_send: "Send via WhatsApp",
    f_err: "Please fill in all fields.", f_ok: "WhatsApp opened. Send the message and we will confirm.",
    desc: "Asr Plaza: a premium restaurant in Jizzakh. Steaks, shashlik, platters, Turkish and Uzbek cuisine."
  }
};

/* MENYU: menyu sahifalari images/menu/pNN.jpg ko'rinishida turadi.
   pages: bo'lim -> sahifa raqamlari. Narx yoki taom o'zgarsa, shu sahifa rasmini
   almashtiring (fayl nomi bir xil bo'lsin). order: tablar tartibi. */
window.MENU = {
  base: "images/menu/p", ext: ".jpg", pdf: "asr-plaza-menu.pdf",
  order: ["dr", "bread", "sal", "app", "soup", "nat", "tr", "hot", "steak", "set", "grill", "pz", "side", "dess"],
  pages: {
    sal: [6, 7, 8, 9, 10],
    app: [11, 12, 13],
    soup: [14],
    nat: [22, 23],
    grill: [30, 31, 32],
    steak: [27],
    set: [28, 29],
    hot: [24, 25, 26],
    tr: [15, 16, 17, 18],
    pz: [19, 20, 21],
    side: [33, 34],
    bread: [2, 3],
    dess: [35],
    dr: [4, 5, 36, 37, 38]
  }
};

/* BOSH SAHIFA YOYLARI: img = rasm, cat = bosilganda ochiladigan menyu bo'limi, l = yozuv (uz, ru, en) */
window.HERO = [
  { img: "images/hero/h2.jpg", cat: "sal", l: { uz: "Salatlar", ru: "Салаты", en: "Salads" } },
  { img: "images/hero/h7.jpg", cat: "nat", l: { uz: "Milliy taomlar", ru: "Национальная кухня", en: "Uzbek dishes" } },
  { img: "images/hero/h8.jpg", cat: "tr", l: { uz: "Turk taomlari", ru: "Турецкая кухня", en: "Turkish dishes" } },
  { img: "images/hero/h9.jpg", cat: "hot", l: { uz: "Yevropa taomlari", ru: "Европейская кухня", en: "European dishes" } },
  { img: "images/hero/h1.jpg", cat: "steak", l: { uz: "Steyklar", ru: "Стейки", en: "Steaks" } },
  { img: "images/hero/h6.jpg", cat: "pz", l: { uz: "Fast food", ru: "Фастфуд", en: "Fast food" } }
];
