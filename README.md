# ASR Plaza — restoran sayti

Ochish: VS Code -> File -> Open Folder -> asr-plaza. "Live Server" kengaytmasi bilan index.html ni ishga tushiring.

## Tuzilma

- `index.html` — sahifa tuzilmasi
- `css/style.css` — asosiy dizayn (ranglar va shriftlar tepada `:root` ichida)
- `css/hero.css` — bosh sahifa: video fon va dumaloq bo'limlar
- `css/menu.css` — menyu sahifalari va kattalashtirish oynasi
- `css/nav.css` — telefon uchun burger-menyu
- `js/data.js` — BARCHA ma'lumot: telefon, manzil, ish vaqti, menyu, uch tilli matnlar, Worker manzili
- `js/main.js` — asosiy mantiq: til almashtirish, menyu, "hozir ochiq", bron formasini yuborish
- `js/menu-slider.js` — menyu sahifalarini slayderga aylantiradi
- `js/nav.js` — burger-menyuni ochish va yopish
- `js/booking.js` — bron bilan bog'liq qo'shimcha mantiq
- `js/booking-form.js` — sana, vaqt va joy turi maydonlari
- `js/delivery.js` — yetkazib berish bo'limi (sozlamalari shu faylning o'zida)
- `telegram-worker.js` — Cloudflare Worker: bronni Telegram guruhiga yuboradi (saytga yuklanmaydi, Cloudflare'ga joylanadi)
- `images/` — logotip, hero video va rasmlar, `images/menu/pNN.jpg` menyu sahifalari

## Sozlash

1. `js/data.js` dagi `TODO` belgili joylarni haqiqiy ma'lumot bilan almashtiring (telefon, email, manzil va h.k.).
2. Menyu narxi yoki taomi o'zgarsa, tegishli sahifa rasmini `images/menu/` da shu nom bilan almashtiring.
3. Yetkazib berish ma'lumotlari `js/delivery.js` boshidagi `DELIVERY` ob'ektida.

## Bron Telegram guruhiga to'g'ridan-to'g'ri tushishi uchun (Worker)

1. Cloudflare Dashboard -> Workers & Pages -> Create -> Worker. `telegram-worker.js` kodini joylang va Deploy qiling.
2. Worker -> Settings -> Variables and Secrets: `BOT_TOKEN` (Secret, @BotFather'dan) va `CHAT_ID` (guruh ID'si). Bot guruhda a'zo bo'lishi kerak.
3. Worker manzilini (`https://....workers.dev`) `js/data.js` dagi `workerUrl` ga yozing.
4. Saytni yangilab, test bron yuboring.

`workerUrl` bo'sh qolsa yoki Worker javob bermasa, sayt avvalgidek Telegram'ni ochib xabarni tayyorlab beradi.

## Worker himoyasi (spamga qarshi)

Worker quyidagilardan himoyalangan: noto'g'ri domen, yashirin tuzoq maydon (`company_website`), juda tez yuborilgan forma, noto'g'ri ma'lumot, o'tgan sana.

1. **Domen cheklovi:** Worker -> Settings -> Variables and Secrets -> `ALLOWED_ORIGINS` ni qo'shing, masalan `https://asrplaza.uz,https://www.asrplaza.uz`. Mahalliy sinov uchun (Live Server) `http://127.0.0.1:5500` ni ham vergul bilan qo'shing. Bo'sh qoldirilsa Worker hamma saytdan ochiq bo'ladi.
2. **IP bo'yicha cheklov (ixtiyoriy):** Cloudflare -> Storage & Databases -> KV -> namespace yarating, so'ng Worker -> Settings -> Bindings -> KV Namespace, nomi `RL`. Shunda bir IP dan 10 daqiqada 10 tadan ko'p bron o'tmaydi.
3. KV ishlatmasangiz: Cloudflare dashboard -> Security -> WAF -> Rate limiting rules orqali ham cheklash mumkin.
