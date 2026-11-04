// Cloudflare Worker: saytdagi bronni Telegram guruhingizga yuboradi (spamdan himoyalangan).
// Sozlamalar (Settings > Variables and Secrets):
//   BOT_TOKEN (Secret)      — @BotFather bergan token
//   CHAT_ID                 — guruh ID'si
//   ALLOWED_ORIGINS         — ixtiyoriy: ruxsat etilgan saytlar, vergul bilan. Masalan: https://asrplaza.uz,https://www.asrplaza.uz
//                             Bo'sh bo'lsa hamma saytdan ochiq (faqat sinov uchun!).
// Ixtiyoriy: KV namespace'ni "RL" nomi bilan ulang (Settings > Bindings) — IP bo'yicha tezlik cheklovi uchun.

const MIN_FORM_MS = 3000;     // forma bundan tez yuborilsa: bot
const RL_MAX = 10;            // bir IP dan (mobil operatorlarda bir IP ni ko'p odam ishlatadi)
const RL_WINDOW_S = 600;      // shuncha soniya ichida eng ko'pi bilan RL_MAX ta bron

export default {
  async fetch(req, env) {
    const allowed = String(env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
    const open = allowed.length === 0;
    const origin = req.headers.get("Origin") || "";
    const originOk = open || allowed.includes(origin);
    const cors = {
      "Access-Control-Allow-Origin": open ? "*" : (originOk ? origin : allowed[0]),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    const json = (obj, status) => new Response(JSON.stringify(obj), {
      status: status || 200, headers: Object.assign({ "Content-Type": "application/json" }, cors)
    });

    if (req.method === "OPTIONS") return originOk ? new Response(null, { headers: cors }) : json({ ok: false, error: "forbidden" }, 403);
    if (req.method !== "POST") return json({ ok: true });
    if (!originOk) return json({ ok: false, error: "forbidden" }, 403);

    let d;
    try { d = await req.json(); } catch (e) { return json({ ok: false, error: "bad_json" }, 400); }
    if (!d || typeof d !== "object") return json({ ok: false, error: "bad_json" }, 400);

    // 1) Honeypot: odam ko'rmaydigan maydon to'ldirilgan bo'lsa, botni "muvaffaqiyat" bilan aldaymiz
    if (String(d.company_website || "").trim() !== "") return json({ ok: true });

    // 2) Vaqt tuzog'i
    // t = formani ochgandan beri o'tgan vaqt (ms), saytdan keladi; mijoz soati noto'g'ri bo'lsa ham ta'sir qilmaydi
    const t = Number(d.t);
    if (!(t >= MIN_FORM_MS)) return json({ ok: false, error: "too_fast" }, 400);

    // 3) Tekshiruv
    const clean = (s, n) => String(s == null ? "" : s).replace(/[<>]/g, "").trim().slice(0, n);
    const name = clean(d.name, 60), phone = clean(d.phone, 30), date = clean(d.date, 16), seat = clean(d.seat, 60);
    const guests = Number(d.guests), lang = String(d.lang || "");
    const digits = phone.replace(/\D/g, "");

    if (name.length < 2) return json({ ok: false, error: "name" }, 400);
    if (!/^[0-9+\-()\s]+$/.test(phone) || digits.length < 9 || digits.length > 15) return json({ ok: false, error: "phone" }, 400);
    if (!Number.isInteger(guests) || guests < 1 || guests > 100) return json({ ok: false, error: "guests" }, 400);
    if (!["uz", "ru", "en"].includes(lang)) return json({ ok: false, error: "lang" }, 400);

    const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/.exec(date);
    if (!m) return json({ ok: false, error: "date" }, 400);
    // Sana Toshkent vaqti (UTC+5) bo'yicha: o'tmishda bo'lmasin
    const when = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) - 5 * 3600 * 1000;
    if (isNaN(when) || when < Date.now() - 5 * 60 * 1000) return json({ ok: false, error: "date_past" }, 400);

    // 4) IP bo'yicha tezlik cheklovi (KV ulangan bo'lsa)
    if (env.RL) {
      try {
        const key = "rl:" + (req.headers.get("CF-Connecting-IP") || "unknown");
        const n = parseInt((await env.RL.get(key)) || "0", 10);
        if (n >= RL_MAX) return json({ ok: false, error: "rate_limited" }, 429);
        await env.RL.put(key, String(n + 1), { expirationTtl: RL_WINDOW_S });
      } catch (e) { /* KV xatosi bronni to'xtatmasin */ }
    }

    const text = "Yangi bron\nIsm: " + name + "\nTelefon: " + phone + "\nSana va vaqt: " + date +
                 "\nMehmonlar: " + guests + (seat ? "\n" + seat : "") + "\nTil: " + lang;
    let r;
    try {
      r = await fetch("https://api.telegram.org/bot" + env.BOT_TOKEN + "/sendMessage", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.CHAT_ID, text })
      });
    } catch (e) { return json({ ok: false, error: "telegram_unreachable" }, 502); }
    return r.ok ? json({ ok: true }) : json({ ok: false, error: "telegram_failed" }, 502);
  }
};
