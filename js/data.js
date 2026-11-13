/* ===================================================================
   ASR PLAZA — BARCHA MA'LUMOTLAR SHU YERDA.
   Telefon, manzil, ish vaqti, menyu va matnlarni faqat shu faylda
   o'zgartiring: sayt hamma joyda avtomatik yangilanadi.
   =================================================================== */

window.SITE = {
  name: "ASR Plaza",
  phone: "+998990257071",            // TODO: haqiqiy raqam (yagona manba)
  email: "",                         // TODO: haqiqiy email yozing (bo'sh bo'lsa sayt uni ko'rsatmaydi)
  // Cloudflare Worker manzili (telegram-worker.js deploy qilingach shu yerga qo'ying).
  // Bo'sh qoldirilsa, bron eski usulda: Telegram ochiladi.
  workerUrl: "",                     // masalan: "https://asr-bron.SIZNING-NOM.workers.dev"
  instagram: "https://www.instagram.com/asrplaza?psln=MXFoaXphcmJ0bGZxcQ==",   // TODO
  telegram: "https://t.me/asrplaza_bron",             // TODO
  open: 11, close: 22,               // ish vaqti (soat), har kuni
  mapQuery: "ASR Plaza, Jizzax shahri, Uzbekistan",  // TODO: aniq manzil yoki koordinata
  geo: { lat: 40.122138, lng: 67.845977 },                        // restoranning aniq koordinatasi: marshrut tugmalari va xarita shuni ishlatadi
  address: {
    uz: "Jizzax shahri, Obod mahallasi, Ko'tarma ko'chasi",
    ru: "Город Джизак, махалля Обод, улица Кутарма",
    en: "Jizzakh City, Obod Mahalla, Ko'tarma Street"
  },
  currency: { uz: "so'm", ru: "сум", en: "UZS" }
};

window.I18N = {
  uz: {
    nav_home: "Bosh sahifa",
    nav_about: "Biz haqimizda", nav_menu: "Menyu", nav_visit: "Manzil", book: "Stol band qilish",
    nav_hotel: "Mehmonxona", nav_pool: "Basseyn",
    nav_delivery: "Yetkazib berish",
    hotel_t: "ASR Plaza Hotel",
    hotel_p: "29 ta shinam xonalar, qulay sharoitlar va yuqori darajadagi servis. Nonushta va barcha qulayliklar narx ichida.",
    pool_t: "Yopiq basseyn va dam olish hududi",
    pool_p: "Yil bo'yi qulay haroratdagi suv, shinam dam olish zonalari va maxsus servis.",
    hotel_call: "Qo'ng'iroq qilish",
    hotel_book_tg: "Telegram orqali bron",
    pool_badge: "Yopiq basseyn",
    pool_for6: "6 kishi uchun",
    pool_extra_lbl: "+ Har bir qo'shimcha kishi uchun:",
    pool_p1: "Qishin-yozin iliq va toza suv",
    pool_p2: "Shinam va sokin dam olish joylari",
    pool_p3: "Restorandan taom va ichimliklar buyurtma qilish imkoniyati",
    pool_tg_btn: "Telegram orqali yozish",
    
    // ===== YAQINDA QO'SHILGAN BASSEYN GALEREYASI TARJIMALARI =====
    pool_g1: "Zamonaviy basseyn va kino-ekran",
    pool_g2: "Estetik kutib olish zonasi",
    pool_g3: "Shifobaxsh fin saunasi",
    pool_g4: "Atmosferali dam olish zonasi",
    pool_g5: "Kristaldek toza va iliq suv",
    // =============================================================

    hero_t: "Jizzaxdagi Premium Restoran — Asr Plaza",
    hero_p: "Steyk va shashlik, katta assortilar, turk taomlari, pitsa va milliy taomlar. Oila, do'stlar va ish uchrashuvlari uchun nafis muhit.",
    see_menu: "Menyuni ko'rish",
    open_now: "Hozir ochiq", closed_now: "Hozir yopiq", until: "gacha", opens: "ochilish",
    c_nat: "Milliy", c_eur: "Yevropa", c_tr: "Turk", c_ff: "Fast food",
    c_dr: "Ichimliklar", c_sal: "Salatlar", c_app: "Gazaklar", c_soup: "Sho'rvalar", c_grill: "Shashlik", c_steak: "Steyklar", c_set: "Assortilar", c_hot: "Yevropa taomlari", c_pz: "Pitsa va burger", c_side: "Garnir va snek", c_bread: "Non", c_dess: "Desert", dl_pdf: "Menyuni PDF yuklab olish", tap_hint: "Kattalashtirish uchun sahifani bosing.", s_ph: "Taom qidirish...", pop: "Mashhur", no_res: "Hech narsa topilmadi.",
    bar_call: "Qo'ng'iroq", bar_book: "Bron", bar_delivery: "Yetkazib berish",
    route_google: "Google Maps'da yo'l ko'rsatish", route_yandex: "Yandex Maps'da yo'l ko'rsatish", copy_addr: "Manzilni nusxalash", copied: "Nusxalandi ✓",
    about_t: "ASR Plaza haqida",
    about_p: "Asr Plaza 2025-yildan beri mehmonlarni qabul qiladi. Bizda har kim o'ziga yoqqanini topadi: kimdir steyk va shashlik, kimdir turk taomlari yoki pitsa tanlaydi. Hammasi bitta stolda, premium xizmat bilan.",
    fa1_t: "Katta menyu", fa1_p: "Salat va sho'rvadan steyk, shashlik va desertgacha bitta menyuda.",
    fa2_t: "Oila va davralar uchun", fa2_p: "Family Set va Royal assorti kabi katta to'plamlar butun stolga yetadi.",
    fa3_t: "Bar va desertlar", fa3_p: "Mojito, smuzi, yangi sharbatlar va cheesecake'lar.",
    menu_t: "Menyu",
    visit_t: "Bizga keling", lbl_addr: "Manzil", lbl_hours: "Ish vaqti", lbl_phone: "Telefon", daily: "Har kuni",
    book_t: "Stol band qilish",
    f_name: "Ismingiz", f_phone: "Telefon raqamingiz", f_date: "Sana va vaqt", f_guests: "Mehmonlar soni",
    f_send: "Bronni yuborish", f_sending: "Yuborilmoqda...", f_limit: "Juda ko'p urinish. Birozdan keyin qayta urinib ko'ring.", f_bad: "Ma'lumotlarni tekshiring: telefon raqami va sana to'g'ri bo'lishi kerak.", f_sent: "Bron qabul qilindi! Tez orada telefon orqali tasdiqlaymiz.", f_fail: "Yuborib bo'lmadi. Telegram ochilmoqda, xabarni shu yerdan yuboring.",
    f_err: "Iltimos, barcha maydonlarni to'ldiring.", f_ok: "Telegram ochildi. Xabarni yuboring, biz tasdiqlaymiz.",
    desc: "Asr Plaza: Jizzaxdagi premium restoran. Steyk, shashlik, assorti, turk va milliy taomlar."
  },
  ru: {
    nav_home: "Главная",
    nav_about: "О нас", nav_menu: "Меню", nav_visit: "Адрес", book: "Забронировать стол",
    nav_hotel: "Отель", nav_pool: "Бассейн",
    nav_delivery: "Доставка",
    hotel_t: "Отель ASR Plaza",
    hotel_p: "29 уютных номеров, первоклассные условия и сервис. Завтрак и все удобства включены в стоимость.",
    pool_t: "Крытый бассейн и зона отдыха",
    pool_p: "Комфортная температура воды круглый год, уютные зоны отдыха и сервис.",
    hotel_call: "Позвонить",
    hotel_book_tg: "Бронь через Telegram",
    pool_badge: "Крытый бассейн",
    pool_for6: "на 6 человек",
    pool_extra_lbl: "+ За каждого дополнительного человека:",
    pool_p1: "Теплая и чистая вода круглый год",
    pool_p2: "Уютная и спокойная зона отдыха",
    pool_p3: "Возможность заказа блюд и напитков из ресторана",
    pool_tg_btn: "Написать в Telegram",

    // ===== YAQINDA QO'SHILGAN BASSEYN GALEREYASI TARJIMALARI =====
    pool_g1: "Современный бассейн и киноэкран",
    pool_g2: "Эстетичная зона ожидания",
    pool_g3: "Целебная финская сауна",
    pool_g4: "Атмосферная зона отдыха",
    pool_g5: "Кристально чистая и теплая вода",
    // =============================================================

    hero_t: "Премиум-ресторан в Джизаке — Asr Plaza",
    hero_p: "Стейки и шашлык, большие ассорти, турецкие блюда, пицца и национальная кухня. Изысканная атмосфера для семьи, друзей и деловых встреч.",
    see_menu: "Смотреть меню",
    open_now: "Сейчас открыто", closed_now: "Сейчас закрыто", until: "до", opens: "открытие в",
    c_nat: "Национальная", c_eur: "Европейская", c_tr: "Турецкая", c_ff: "Фастфуд",
    c_dr: "Напитки", c_sal: "Салаты", c_app: "Закуски", c_soup: "Супы", c_grill: "Шашлык", c_steak: "Стейки", c_set: "Ассорти", c_hot: "Европейская кухня", c_pz: "Пицца и бургеры", c_side: "Гарниры и снеки", c_bread: "Хлеб", c_dess: "Десерты", dl_pdf: "Скачать меню в PDF", tap_hint: "Нажмите на страницу, чтобы увеличить.", s_ph: "Поиск блюда...", pop: "Хит", no_res: "Ничего не найдено.",
    bar_call: "Позвонить", bar_book: "Бронь", bar_delivery: "Доставка",
    route_google: "Маршрут в Google Maps", route_yandex: "Маршрут в Яндекс Картах", copy_addr: "Скопировать адрес", copied: "Скопировано ✓",
    about_t: "Об ASR Plaza",
    about_p: "Asr Plaza принимает гостей в Джизаке с 2025 года. У нас каждый найдёт своё: кто-то выберет стейк и шашлык, кто-то турецкие блюда или пиццу. Всё за одним столом, с сервисом премиум-класса.",
    fa1_t: "Большое меню", fa1_p: "От салатов и супов до стейков, шашлыка и десертов в одном меню.",
    fa2_t: "Для семей и компаний", fa2_p: "Большие сеты, как Family Set и Royal ассорти, рассчитаны на весь стол.",
    fa3_t: "Бар и десерты", fa3_p: "Мохито, смузи, свежевыжатые соки и чизкейки.",
    menu_t: "Меню",
    visit_t: "Как нас найти", lbl_addr: "Адрес", lbl_hours: "Время работы", lbl_phone: "Телефон", daily: "Ежедневно",
    book_t: "Бронирование стола",
    f_name: "Ваше имя", f_phone: "Номер телефона", f_date: "Дата и время", f_guests: "Количество гостей",
    f_send: "Отправить бронь", f_sending: "Отправка...", f_limit: "Слишком много попыток. Попробуйте чуть позже.", f_bad: "Проверьте данные: номер телефона и дата должны быть корректными.", f_sent: "Бронь принята! Скоро подтвердим по телефону.", f_fail: "Не удалось отправить. Открываем Telegram, отправьте сообщение там.",
    f_err: "Пожалуйста, заполните все поля.",     f_ok: "Telegram открыт. Отправьте сообщение, мы подтвердим бронь.",      // ru
    desc: "Asr Plaza: премиум-ресторан в Джизаке. Стейки, шашлык, ассорти, турецкая и национальная кухня."
  },
  en: {
    nav_home: "Home",
    nav_about: "About", nav_menu: "Menu", nav_visit: "Visit", book: "Book a table",
    nav_hotel: "Hotel", nav_pool: "Pool",
    nav_delivery: "Delivery",
    hotel_t: "ASR Plaza Hotel",
    hotel_p: "29 comfortable rooms, premium amenities, and top-tier service. Breakfast included.",
    pool_t: "Indoor Pool & Relaxation Area",
    pool_p: "Comfortable water temperature year-round, cozy rest areas, and dedicated service.",
    hotel_call: "Call Us",
    hotel_book_tg: "Book via Telegram",
    pool_badge: "Indoor pool",
    pool_for6: "for 6 persons",
    pool_extra_lbl: "+ For each additional guest:",
    pool_p1: "Warm and clean water all year round",
    pool_p2: "Cozy and tranquil relaxation areas",
    pool_p3: "Food and beverage ordering from the restaurant",
    pool_tg_btn: "Message on Telegram",

    // ===== YAQINDA QO'SHILGAN BASSEYN GALEREYASI TARJIMALARI =====
    pool_g1: "Modern pool and cinema screen",
    pool_g2: "Aesthetic reception area",
    pool_g3: "Healing Finnish sauna",
    pool_g4: "Atmospheric relaxation zone",
    pool_g5: "Crystal clear and warm water",
    // =============================================================

    hero_t: "Premium Restaurant in Jizzakh — Asr Plaza",
    hero_p: "Steaks and shashlik, grand platters, Turkish dishes, pizza and Uzbek cuisine. A refined setting for family, friends and business meetings.",
    see_menu: "See the menu",
    open_now: "Open now", closed_now: "Closed now", until: "until", opens: "opens at",
    c_nat: "Uzbek", c_eur: "European", c_tr: "Turkish", c_ff: "Fast food",
    c_dr: "Drinks", c_sal: "Salads", c_app: "Starters", c_soup: "Soups", c_grill: "Shashlik", c_steak: "Steaks", c_set: "Platters", c_hot: "European dishes", c_pz: "Pizza & burgers", c_side: "Sides & snacks", c_bread: "Bread", c_dess: "Desserts", dl_pdf: "Download menu (PDF)", tap_hint: "Tap a page to zoom in.", s_ph: "Search dishes...", pop: "Popular", no_res: "Nothing found.",
    bar_call: "Call", bar_book: "Book", bar_delivery: "Delivery",
    route_google: "Directions in Google Maps", route_yandex: "Directions in Yandex Maps", copy_addr: "Copy address", copied: "Copied ✓",
    about_t: "About ASR Plaza",
    about_p: "Asr Plaza has been welcoming guests in Jizzakh since 2025. Everyone finds something they love here: steak and shashlik for one, Turkish dishes or pizza for another. All at one table, with premium service.",
    fa1_t: "A big menu", fa1_p: "From salads and soups to steaks, shashlik and desserts, all in one menu.",
    fa2_t: "Families and groups", fa2_p: "Large sets like the Family Set and Royal platter are made for the whole table.",
    fa3_t: "Bar and desserts", fa3_p: "Mojitos, smoothies, fresh juices and cheesecakes.",
    menu_t: "Menu",
    visit_t: "Visit us", lbl_addr: "Address", lbl_hours: "Opening hours", lbl_phone: "Phone", daily: "Every day",
    book_t: "Book a table",
    f_name: "Your name", f_phone: "Phone number", f_date: "Date and time", f_guests: "Number of guests",
    f_send: "Send booking", f_sending: "Sending...", f_limit: "Too many attempts. Please try again in a few minutes.", f_bad: "Please check your details: phone number and date must be valid.", f_sent: "Booking received! We will confirm by phone shortly.", f_fail: "Could not send. Opening Telegram, please send the message there.",
    f_err: "Please fill in all fields.",     f_ok: "Telegram opened. Send the message and we will confirm.",         // en
    desc: "Asr Plaza: a premium restaurant in Jizzakh. Steaks, shashlik, platters, Turkish and Uzbek cuisine."
  }
};

/* MENYU: menyu sahifalari images/menu/pNN.jpg ko'rinishida turadi.
   pages: bo'lim -> sahifa raqamlari. Narx yoki taom o'zgarsa, shu sahifa rasmini
   almashtiring (fayl nomi bir xil bo'lsin). order: tablar tartibi. */
window.MENU = {
  base: "images/menu/", ext: "", pdf: "asr-plaza-menu.pdf",
  order: ["dr", "bread", "sal", "app", "soup", "nat", "tr", "hot", "steak", "set", "grill", "pz", "side", "dess"],
    pages: {
  sal: ["salatlar.png", "p06.jpg", "p07.jpg", "p08.jpg", "p09.jpg", "p10.jpg"],
  app: ["gazaklar.png", "p11.jpg", "p12.jpg", "p13.jpg"],
  soup: ["shorvalar.png", "p14.jpg"],
  nat: ["milliytaomlar.png", "p22.jpg", "p23.jpg"],
  grill: ["shashliklar.png", "p30.jpg", "p31.jpg", "p32.jpg"],
  steak: ["steyklar.png", "p27.jpg"],
  set: ["assortilar.png", "p28.jpg", "p29.jpg"],
  hot: ["yevropataomlari.png", "p24.jpg", "p25.jpg", "p26.jpg"],
  tr: ["turktaomlari.png", "p15.jpg", "p16.jpg", "p17.jpg", "p18.jpg"],
  pz: ["fastfood.png", "p19.jpg", "p20.jpg", "p21.jpg"],
  side: ["garnirvasnek.png", "p33.jpg", "p34.jpg"],
  bread: ["non.png", "p02.jpg", "p03.jpg"],
  dess: ["desert.png", "p35.jpg"],
  dr: ["ichimliklar.png", "p04.jpg", "p05.jpg", "p36.jpg", "p37.jpg", "p38.jpg"]
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
/* ===== HOTEL, BASSEYN VA BRON MA'LUMOTLARI ===== */
window.HOTEL_ROOMS = [
  {
    id: "standard",
    name: { uz: "Standard toifasi", ru: "Категория Standard", en: "Standard Category" },
    total: { uz: "Jami 16 ta xona", ru: "Всего 16 номеров", en: "16 rooms total" },
    img: "images/hotel/standard.jpg",
    features: {
      uz: ["Bepul Wi-Fi", "Smart TV", "Mini-bar", "Konditsioner", "Shved stoli nonushta", "Tursbor kiritilgan"],
      ru: ["Бесплатный Wi-Fi", "Smart TV", "Мини-бар", "Кондиционер", "Завтрак шведский стол", "Турсбор включен"],
      en: ["Free Wi-Fi", "Smart TV", "Mini-bar", "Air Conditioning", "Buffet breakfast", "Tourism fee included"]
    }
  },
  {
    id: "deluxe",
    name: { uz: "Deluxe toifasi", ru: "Категория Deluxe", en: "Deluxe Category" },
    total: { uz: "Jami 8 ta xona", ru: "Всего 8 номеров", en: "8 rooms total" },
    img: "images/hotel/deluxe.jpg",
    features: {
      uz: ["Kengaytirilgan maydon", "Bepul Wi-Fi", "Smart TV", "Mini-bar", "Konditsioner", "Shved stoli nonushta"],
      ru: ["Увеличенная площадь", "Бесплатный Wi-Fi", "Smart TV", "Мини-бар", "Кондиционер", "Завтрак"],
      en: ["Spacious area", "Free Wi-Fi", "Smart TV", "Mini-bar", "Air Conditioning", "Buffet breakfast"]
    }
  },
  {
    id: "triple",
    name: { uz: "Triple toifasi", ru: "Номер Triple (3-местный)", en: "Triple Room" },
    total: { uz: "2 ta xona", ru: "2 номера", en: "2 rooms" },
    img: "images/hotel/triple.jpg",
    features: {
      uz: ["3 kishilik joy", "Bepul Wi-Fi", "Smart TV", "Konditsioner", "Shved stoli nonushta"],
      ru: ["Размещение на 3 чел.", "Wi-Fi", "Smart TV", "Кондиционер", "Завтрак"],
      en: ["3 guests capacity", "Wi-Fi", "Smart TV", "AC", "Buffet breakfast"]
    }
  },
  {
    id: "luxury",
    name: { uz: "Lyuks toifasi", ru: "Категория Luxury", en: "Luxury Category" },
    total: { uz: "3 ta xona", ru: "3 номера", en: "3 rooms" },
    img: "images/hotel/luxury.jpg",
    features: {
      uz: ["Eksklyuziv interyer", "King Size yotoq", "Mini-bar", "Konditsioner", "Shved stoli nonushta"],
      ru: ["Эксклюзивный интерьер", "Кровать King Size", "Мини-бар", "Кондиционер", "Завтрак"],
      en: ["Exclusive interior", "King Size bed", "Mini-bar", "AC", "Buffet breakfast"]
    }
  }
];
window.HOTEL_RULES = {
  uz: [
    { title: "Nonushta (Shved stoli)", desc: "Xona narxiga kiritilgan! Har kuni soat 07:00 dan 10:00 gacha." },
    { title: "Turistik yig'im (Tursbor)", desc: "Xona tarifiga to'liq kiritilgan, ortiqcha to'lov yo'q." },
    { title: "Check-in / Check-out", desc: "Kirish vaqti: 14:00 | Chiqish vaqti: 12:00." },
    { title: "Erta kirish / Kech chiqish", desc: "06:00 gacha: 100% (nonushta bilan) · 06:00-12:00: 50% · 12:00-18:00 kech chiqishda har bir soatga 10% to'lov." },
    { title: "Bron va oldindan to'lov", desc: "5 xonagacha oldindan to'lov olinmaydi. 5 xonadan oshsa, zaklad olinadi. Bekor qilishda oldindan xabar bering." },
    { title: "Chekish taqiqlanadi!", desc: "Barcha xonalarda chekish qat'iyan taqiqlangan. Jarima miqdori: 500 000 so'm." }
  ],
  ru: [
    { title: "Завтрак (Шведский стол)", desc: "Включен в стоимость! Ежедневно с 07:00 до 10:00." },
    { title: "Туристический сбор", desc: "Включен в стоимость проживания." },
    { title: "Check-in / Check-out", desc: "Время заезда: 14:00 | Время выезда: 12:00." },
    { title: "Ранний заезд / Поздний выезд", desc: "До 06:00: 100% (с завтраком) · 06:00-12:00: 50% · 12:00-18:00: 10% в час." },
    { title: "Бронь и предоплата", desc: "До 5 номеров без предоплаты. Свыше 5 номеров взимается залог." },
    { title: "Курение запрещено!", desc: "Курение в номерах строго запрещено. Штраф: 500 000 сум." }
  ],
  en: [
    { title: "Breakfast (Buffet)", desc: "Included in room rate! Daily from 07:00 to 10:00." },
    { title: "Tourism Fee", desc: "Fully included in the room rate." },
    { title: "Check-in / Check-out", desc: "Check-in: 14:00 | Check-out: 12:00." },
    { title: "Early Arrival / Late Departure", desc: "Before 06:00: 100% · 06:00-12:00: 50% · 12:00-18:00: 10% per hour." },
    { title: "Booking Policy", desc: "No prepayment up to 5 rooms. Deposit required for 5+ rooms." },
    { title: "No Smoking!", desc: "Smoking is strictly prohibited in all rooms. Fine: 500,000 UZS." }
  ]
};

window.POOL_DATA = {
  priceBase: "900 000",
  extraPerson: "150 000",
  contacts: {
    phone: "551527070",
    phoneDisplay: "+998 55 152 70 70",
    telegram: "https://t.me/asrplaza_hotel",
    instagram: "https://instagram.com/asrplazahotel"
  }
};