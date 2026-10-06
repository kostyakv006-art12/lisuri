"use strict";
/* ==========================================================================
   История бесконечной любви, которая идёт 10 месяцев
   11.12.2025 — 11.10.2026
   Все тексты, фото, треки и даты меняются в блоке «ДАННЫЕ» ниже.
   ========================================================================== */

/* ============================ ДАННЫЕ ===================================== */
const SITE_TITLE = "История бесконечной любви, которая идёт 10 месяцев";
const START_DATE = new Date("2025-12-11T00:00:00");   // 11.12.2025
const TEN_MONTHS = new Date("2026-10-11T00:00:00");   // 11.10.2026

/* Обратный отсчёт (секция «Скоро снова праздник») */
const COUNTDOWN = { date: new Date("2026-11-11T00:00:00"), label: "до следующей годовщины" };

/* ---------- ФОТО (порядок = порядок в таймлайне) ----------
   caption — текст под фото, icon — значок точки таймлайна,
   date / title — по желанию (пустые не показываются).                      */
const photos = [
  { file: "1 (2)", icon: "✨", date: "", title: "",
    caption: "Тот самый день, когда начались наши путешествия ❤️" },
  { file: "1", icon: "🏙️", date: "", title: "",
    caption: "Первый день в центре, с тобой мы были самыми красивыми" },
  { file: "2", icon: "☕", date: "", title: "",
    caption: "Наша первая встреча в теплом уголке, тогда было так холодно на улице" },
  { file: "3", icon: "🐾", date: "", title: "",
    caption: "Твои слова: ты как дикий зверь и я держу тебя  одной рукой зная что ты меня не укусишь" },
  { file: "4", icon: "🎂", date: "", title: "",
    caption: "День рождения, вошли вместе в твою взрослую жизнь" },
  { file: "5", icon: "🚗", date: "", title: "",
    caption: "Мы часто фоткаемся когда едем куда-то гулять или отдыхать" },
  { file: "6", icon: "🍽️", date: "", title: "",
    caption: "Кальянная, но без него, просто ужин и просто вместе" },
  { file: "7", icon: "💐", date: "", title: "",
    caption: "Тогда я просто так подарил тебе цветы, ты была так счастлива" },
  { file: "8", icon: "🏡", date: "", title: "",
    caption: "А тут мы с тобой очень красивые, у тебя дома и также ездили гулять" },
  { file: "9", icon: "👑", date: "", title: "",
    caption: "Принц с принцессой, мы с тобой и вправду волшебные среди всего этого мира" },
  { file: "10", icon: "🤍", date: "", title: "",
    caption: "Белые мои и твои волосы, отдыхаем, счастливые, спокойные" },
  { file: "11", icon: "🌃", date: "", title: "",
    caption: "Исполняем нашу мечту, вместе мы смотрели на ночной город с высока на пару минут, но эти пару минут были не забываемые" },
  { file: "12", icon: "🌿", date: "", title: "",
    caption: "Мы гуляем и радуемся)" },
  { file: "13", icon: "🎉", date: "", title: "",
    caption: "День рождения родителей, мы вместе укрепляем связь друг с другом, веселимся и главное проводим вместе со всеми" }
];

/* «и 9» — коллаж с фото «9» и соседней. Идёт отдельным блоком после «9». */
const collage = { file: "и 9", icon: "📸", caption: "Принц и принцесса", positionAfter: "9",
  date: "", text: "" };

/* Фоны: сверху вниз по мере прокрутки (assets/…, расширение подставляется само) */
const backgrounds = ["задний фон", "фон 2", "фон 3"];
const background = backgrounds[0];
const cursorImg = "курсор";

/* ---------- ВИДЕО (номер = номер фото в паре) ---------- */
const videos = [
  { file: "1", date: "", title: "", caption: "Тебе так понравилось это видео, я делал его со всей своей душой" },
  { file: "2", date: "", title: "", caption: "Липсинги на квартире, где мы радостные и спокойные отдыхаем от всего тяжелого" },
  { file: "3", date: "", title: "", caption: "Букетик - Костюлик" },
  { file: "4", date: "", title: "", caption: "Прикольное видео, нам только и снимать вместе подобное)" },
  { file: "последнее", date: "", title: "", caption: "Спасибо тебе, за веру, за любовь и за то что мы до сих пор вместе, наш ждет великое будущее и бесконечные потоки счастья и спокойствия" }
];

/* ---------- ЗАПИСКИ (переворачиваются по клику) ---------- */
const notes = [
  { icon: "☀️", text: "Ты моё утро, даже если оно дождливое." },
  { icon: "💞", text: "Скучаю, даже когда ты рядом." },
  { icon: "😊", text: "Твоя улыбка — мое самое любимое утро." },
  { icon: "🌷", text: "Спасибо, что ты есть. Просто есть." },
  { icon: "✨", text: "Ты умеешь делать обычный вторник волшебным." },
  { icon: "🦊", text: "Костюлик и Лисурик — лучшая команда на свете." },
  { icon: "🏡", text: "Ты — мой дом, куда бы мы ни поехали." },
  { icon: "💍", text: "Я выбираю тебя. Каждый день." },
  { icon: "🎶", text: "Твой смех — моя любимая песня." },
  { icon: "🤗", text: "Что ты захочешь сделать, после того, когда дочитаешь это." },
  { icon: "🌙", text: "Засыпаю с мыслью о тебе — и просыпаюсь с ней же." },
  { icon: "🏆", text: "Горжусь тобой — всегда и во всём." },
  { icon: "☕", text: "С тобой чай вкуснее." },
  { icon: "♾️", text: "Мы — бесконечная история, и это только начало." },
  { icon: "🌹", text: "Я тебя так люлю, что слов нету." },
  { icon: "💌", text: "Давай снова как в первый раз будем смотрерть друг на другу." }
];
const NOTE_STYLES = ["sticker", "napkin", "heart", "scroll"]; // чередуются по кругу

/* ---------- «Скажи что-то важное» — случайная записка ---------- */
const importantMessages = [
  "Я всегда на твоей стороне.",
  "Ты справишься. А я буду рядом.",
  "Ты — лучшее, что со мной случалось.",
  "Просто знай: ты очень-очень важна.",
  "Мир стал теплее, когда в нём появилась ты.",
  "Я помню каждый наш день.",
  "Давай сегодня просто скажем друг- другу мяу?",
  "Ты моя самая любимая привычка.",
  "Спасибо за заботу и терпение.",
  "Ты светишься, даже когда устала.",
  "Эти 10 месяцев — лучшие в моей жизни.",
  "Если страшно - я ппомогу тебе справится.",
  "Люлю очень очень сильно.",
  "Ты красивая. Всегда. Без исклюлючений.",
  "Наше будущее будет легким и счастливым."
];

/* ---------- ПЛЕЙЛИСТ ----------
   PLAYLIST_EMBED — ссылка для встраивания (необязательно), например:
   "https://open.spotify.com/embed/playlist/ID"  или
   "https://www.youtube.com/embed/videoseries?list=ID"
   Если пусто — показывается только список треков ниже.
   link — своя ссылка на трек; если нет — откроется поиск на YouTube.      */
const PLAYLIST_EMBED = "";
/* ПЛЕЙЛИСТ. Песни лежат в папке music/.
   file: "1"  →  music/1.mp3  (можно и своё имя: file: "perfect" → music/perfect.mp3)
   title — название песни, artist — исполнитель, genre — подпись мелким текстом,
   icon — значок на обложке, c1/c2 — цвета обложки.
   Песни играют по порядку этого списка; после последней плейлист останавливается. */
const tracks = [
  { title: "Утро вдвоём", artist: "Я тебя", genre: "очень", file: "1", c1: "#E8B4B8", c2: "#C9A961", icon: "🎸" },
  { title: "Музыкальная шкатулка", artist: "ЛЮЛЮ", genre: "и если", file: "2", c1: "#8E4A49", c2: "#E8B4B8", icon: "🎹" },
  { title: "Тёплый вечер", artist: "Ты заметила", genre: "это", file: "3", c1: "#C9A961", c2: "#8E4A49", icon: "🎷" },
  { title: "Наш танец", artist: "И читаешь", genre: "этот текст", file: "4", c1: "#D8C3A5", c2: "#E8B4B8", icon: "💿" },
  { title: "Весенний ветер", artist: "Не говори мне", genre: "что заметила его", file: "5", c1: "#E8B4B8", c2: "#D8C3A5", icon: "🌸" },
  { title: "Солнечная прогулка", artist: "А просто", genre: "возьми", file: "6", c1: "#C9A961", c2: "#E8B4B8", icon: "☀️" },
  { title: "Под луной", artist: "И сделай то", genre: "чтобы я понял", file: "7", c1: "#8E4A49", c2: "#C9A961", icon: "🌙" },
  { title: "Колыбельная для Лисурика", artist: "Что ты прочитала", genre: "это, ведь у тебя по-настоящему богатая фантазия", file: "8", c1: "#D8C3A5", c2: "#8E4A49", icon: "💗" }
];

/* ============================ ДВИЖОК ===================================== */
const PHOTO_EXTS = [".webp", ".jpg", ".jpeg", ".png", ".WEBP", ".JPG", ".JPEG", ".PNG"];
const VIDEO_EXTS = [".mp4", ".webm", ".mov", ".MP4", ".WEBM", ".MOV", ".m4v"];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const isFinePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pad = (n) => String(n).padStart(2, "0");
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x) => x * x * (3 - 2 * x); // smoothstep — мягкие края кроссфейда
const fileUrl = (folder, name, ext) => `${folder}/${encodeURIComponent(name)}${ext}`;
const plural = (n, one, few, many) => {
  const a = n % 10, b = n % 100;
  if (a === 1 && b !== 11) return one;
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few;
  return many;
};

/* ---------- resolveFile: ищет файл с любым расширением ----------
   Пробует расширения по очереди (сначала лёгкий .webp) и возвращает Promise
   с первым рабочим URL или null. Работает и с сервера, и при открытии с диска. */
const resolveCache = new Map();
function probe(url, kind) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (ok) => { if (!done) { done = true; clearTimeout(t); resolve(ok); } };
    const t = setTimeout(() => finish(false), 15000);
    if (kind === "video") {
      const v = document.createElement("video");
      v.preload = "metadata"; v.muted = true;
      v.onloadedmetadata = () => { finish(true); v.removeAttribute("src"); v.load(); };
      v.onerror = () => finish(false);
      v.src = url;
    } else {
      const img = new Image();
      img.onload = () => finish(true);
      img.onerror = () => finish(false);
      img.src = url;
    }
  });
}
function resolveFile(folder, name, exts) {
  const key = `${folder}/${name}|${exts[0]}`;
  if (!resolveCache.has(key)) {
    const kind = exts === VIDEO_EXTS ? "video" : "image";
    resolveCache.set(key, (async () => {
      for (const ext of exts) {
        const url = fileUrl(folder, name, ext);
        if (await probe(url, kind)) return url;
      }
      return null;
    })());
  }
  return resolveCache.get(key);
}

/* ============================ ФОН ======================================== */
/* Каждый следующий слой лежит поверх предыдущего и проявляется в своём «окне»
   прокрутки. Окно узкое (FADE), поэтому большую часть времени виден один чистый
   кадр, а смена происходит мягким растворением — без шва и без ряби.          */
function setupBackground() {
  const layers = $$(".bg__layer");
  const FADE = 0.5; // ширина перехода в долях «отрезка» одного фона
  let active = layers.slice();

  backgrounds.forEach((name, i) => {
    const layer = layers[i];
    if (!layer) return;
    resolveFile("assets", name, PHOTO_EXTS).then((url) => {
      if (url) layer.style.backgroundImage = `url("${url}")`;
      else if (i > 0) { layer.remove(); active = active.filter((l) => l !== layer); update(); }
    });
  });

  function update() {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = clamp01(scrollY / max);          // 0 — верх страницы, 1 — самый низ
    const n = active.length;
    const t = p * (n - 1);                      // «позиция» в последовательности фонов
    active.forEach((layer, i) => {
      // слой i проявляется вокруг t = i - 0.5
      const o = i === 0 ? 1 : smooth(clamp01((t - (i - 0.5)) / FADE + 0.5));
      layer.style.opacity = o.toFixed(3);
    });
  }
  let ticking = false;
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  addEventListener("load", update);
  update();
  return update;
}

/* ============================ РАЗМЕТКА =================================== */
function photoFigure(item, extraAlt = "") {
  const alt = `${SITE_TITLE} — фото «${item.file}»${item.caption ? `: ${item.caption}` : ""}${extraAlt}`;
  return `<figure class="photo" data-missing="Здесь будет фото «${esc(item.file)}»">
      <img data-photo="${esc(item.file)}" alt="${esc(alt)}" loading="lazy" decoding="async">
    </figure>`;
}

function videoFrame(v, strong = false) {
  const cap = [v.date, v.caption].filter(Boolean).join(" — ");
  return `<div class="glow-frame${strong ? " glow-frame--strong" : ""}">
      <span class="glow-frame__ribbon" aria-hidden="true"></span>
      <div class="glow-frame__inner">
        <video data-video="${esc(v.file)}" data-caption="${esc(cap)}" preload="metadata" controls playsinline
               aria-label="${esc(`${SITE_TITLE} — видео «${v.file}»${v.caption ? `: ${v.caption}` : ""}`)}"></video>
        <button class="video-hit" type="button" aria-label="Открыть видео «${esc(v.file)}» на весь экран"></button>
        <span class="video-missing">♥<br>Здесь будет видео «${esc(v.file)}»</span>
      </div>
    </div>`;
}

function buildTimeline() {
  const videoMap = new Map(videos.map((v) => [v.file, v]));
  const items = [];
  photos.forEach((p) => {
    items.push({ type: "photo", ...p });
    if (p.file === collage.positionAfter) items.push({ type: "collage", ...collage });
  });
  let side = 0;
  $("#timeline").innerHTML = items.map((it, i) => {
    const divider = i > 0 ? `<li class="tl-divider" aria-hidden="true"><span>♥</span></li>` : "";
    if (it.type === "collage") {
      return `${divider}<li class="tl-item tl-item--collage reveal">
          <span class="tl-icon" aria-hidden="true">${it.icon || "📸"}</span>
          <article class="tl-card card">
            ${it.date ? `<time class="tl-date">${esc(it.date)}</time>` : ""}
            ${it.caption ? `<h3>${esc(it.caption)}</h3>` : ""}
            ${photoFigure(it, " (коллаж)")}
            ${it.text ? `<p class="tl-text">${esc(it.text)}</p>` : ""}
          </article></li>`;
    }
    const v = videoMap.get(it.file);
    return `${divider}<li class="tl-item tl-item--${side++ % 2 ? "right" : "left"} reveal">
        <span class="tl-icon" aria-hidden="true">${it.icon || "♥"}</span>
        <article class="tl-card card">
          ${it.date ? `<time class="tl-date">${esc(it.date)}</time>` : ""}
          ${it.title ? `<h3>${esc(it.title)}</h3>` : ""}
          ${photoFigure(it)}
          ${it.caption ? `<p class="tl-text">${esc(it.caption)}</p>` : ""}
          ${v ? `<div class="video-block">${videoFrame(v)}${v.caption ? `<p class="tl-text">${esc(v.caption)}</p>` : ""}</div>` : ""}
        </article></li>`;
  }).join("");
}

function buildNotes() {
  const rots = [-4, 3, -2, 5, -5, 2, -3, 4];
  $("#notesBoard").innerHTML = notes.map((n, i) => {
    const style = NOTE_STYLES[i % NOTE_STYLES.length];
    return `<button class="note note--${style} reveal" type="button" style="--rot:${rots[i % rots.length]}deg"
              aria-pressed="false" aria-label="Записка ${i + 1}: нажми, чтобы прочитать">
        <span class="note__inner">
          <span class="note__face note__face--front"><span class="note__icon" aria-hidden="true">${n.icon || "💌"}</span><span class="note__hint">открой меня</span></span>
          <span class="note__face note__face--back"><span class="note__text">${esc(n.text)}</span></span>
        </span>
      </button>`;
  }).join("");
  $$(".note").forEach((btn, i) => btn.addEventListener("click", () => {
    const flipped = btn.classList.toggle("is-flipped");
    btn.setAttribute("aria-pressed", String(flipped));
    btn.setAttribute("aria-label", flipped ? `Записка ${i + 1}: ${notes[i].text}` : `Записка ${i + 1}: нажми, чтобы прочитать`);
  }));
}

function buildGallery() {
  const all = [];
  photos.forEach((p) => { all.push(p); if (p.file === collage.positionAfter) all.push({ ...collage, isCollage: true }); });
  const rots = [-3, 2, -1.5, 3, -2.5, 1.5];
  $("#photoGrid").innerHTML = all.map((p, i) => {
    const text = p.isCollage ? (p.caption || p.text) : p.caption;
    return `<button class="polaroid${p.isCollage ? " polaroid--collage" : ""} reveal" type="button" style="--rot:${rots[i % rots.length]}deg"
              data-full="${esc(p.file)}" data-caption="${esc(text || "")}" aria-label="Открыть фото «${esc(p.file)}»">
        <span class="polaroid__img"><img data-photo="${esc(p.file)}" alt="${esc(`${SITE_TITLE} — фото «${p.file}»${text ? `: ${text}` : ""}`)}" loading="lazy" decoding="async"></span>
      </button>`;
  }).join("");

  $("#videoGrid").innerHTML = videos.filter((v) => v.file !== "последнее").map((v) => `
      <article class="video-card card reveal">${videoFrame(v)}${v.caption ? `<p>${esc(v.caption)}</p>` : ""}</article>`).join("");
}

function buildPlaylist() {
  if (PLAYLIST_EMBED) {
    const box = $("#playlistEmbed");
    box.hidden = false;
    box.innerHTML = `<iframe src="${esc(PLAYLIST_EMBED)}" title="Наш плейлист" loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
  }
  $("#tracks").innerHTML = tracks.map((t) => {
    const link = t.link || `https://www.youtube.com/results?search_query=${encodeURIComponent(`${t.artist} ${t.title}`)}`;
    return `<li class="track">
        <span class="track__cover" style="--c1:${t.c1};--c2:${t.c2}" aria-hidden="true">${t.icon || "♪"}</span>
        <span><span class="track__title">${esc(t.title)}</span><br><span class="track__meta">${esc(t.artist)} · ${esc(t.genre)}</span></span>
        <a class="track__play" href="${esc(link)}" target="_blank" rel="noopener" aria-label="Слушать: ${esc(t.artist)} — ${esc(t.title)}">▶</a>
      </li>`;
  }).join("");
}

function buildFinal() {
  const last = videos.find((v) => v.file === "последнее");
  if (last) $("#finalVideoWrap").innerHTML = videoFrame(last, true) + (last.caption ? `<p class="final__caption">${esc(last.caption)}</p>` : "");
}

/* ============================ ЗАГРУЗКА МЕДИА ============================= */
const trailSources = [];
const addTrail = (url) => { if (url && !trailSources.includes(url)) trailSources.push(url); };

async function loadPhoto(img) {
  const url = await resolveFile("photos", img.dataset.photo, PHOTO_EXTS);
  const fig = img.closest(".photo");
  if (!url) { fig?.classList.add("is-missing"); return; }
  img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
  img.src = url;
  addTrail(url);
  if (fig) img.addEventListener("click", () => {
    const text = fig.parentElement.querySelector(".tl-text, h3")?.textContent || "";
    openLightbox({ type: "image", src: url, caption: text, alt: img.alt });
  });
}
async function loadVideo(video) {
  const url = await resolveFile("videos", video.dataset.video, VIDEO_EXTS);
  if (!url) { video.closest(".glow-frame__inner").classList.add("is-video-missing"); return; }
  video.dataset.src = url;
  video.src = `${url}#t=0.1`; // #t=0.1 — показать первый кадр на iPhone
}
function setupLazy() {
  const els = [...$$("img[data-photo]"), ...$$("video[data-video]")];
  const load = (el) => (el.tagName === "IMG" ? loadPhoto(el) : loadVideo(el));
  if (!("IntersectionObserver" in window)) { els.forEach(load); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { io.unobserve(e.target); load(e.target); }
  }), { rootMargin: "600px 0px" });
  els.forEach((el) => io.observe(el));
}

/* ============================ ВИДЕО ====================================== */
function setupVideos() {
  $$("video[data-video]").forEach((video) => {
    const inner = video.closest(".glow-frame__inner");
    if (isFinePointer) { // hover-preview без звука
      inner.addEventListener("mouseenter", () => {
        if (!video.src || !video.paused) return;
        video.muted = true; video.dataset.preview = "1"; video.play().catch(() => {});
      });
      inner.addEventListener("mouseleave", () => {
        if (!video.dataset.preview) return;
        delete video.dataset.preview; video.pause(); video.muted = false;
      });
    }
    video.addEventListener("volumechange", () => { if (!video.muted) delete video.dataset.preview; });
    video.addEventListener("play", () => {
      if (video.dataset.preview) return;
      $$("video[data-video]").forEach((o) => { if (o !== video && !o.paused) o.pause(); });
    });
    $(".video-hit", inner).addEventListener("click", () => {
      if (!video.dataset.src) return;
      const t = video.currentTime;
      delete video.dataset.preview; video.pause(); video.muted = false;
      openLightbox({ type: "video", src: video.dataset.src, caption: video.dataset.caption, time: t > .3 ? t : 0 });
    });
  });
  $("#replayBtn").addEventListener("click", () => {
    const v = $("#finalVideoWrap video");
    if (!v || !v.src) return;
    v.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    delete v.dataset.preview; v.muted = false; v.currentTime = 0; v.play().catch(() => {});
  });
  // клик по полароиду → лайтбокс
  $("#photoGrid").addEventListener("click", (e) => {
    const card = e.target.closest(".polaroid");
    const img = card && $("img", card);
    if (img && img.src) openLightbox({ type: "image", src: img.src, caption: card.dataset.caption, alt: img.alt });
  });
}

/* ---------- Лайтбокс ---------- */
const lightbox = $("#lightbox"), lbContent = $("#lightboxContent"), lbCaption = $("#lightboxCaption");
let lastFocus = null;
function openLightbox({ type, src, caption = "", alt = "", time = 0 }) {
  lastFocus = document.activeElement;
  $$("video").forEach((v) => v.pause());
  lbContent.innerHTML = "";
  let el;
  if (type === "video") {
    el = document.createElement("video");
    Object.assign(el, { src, controls: true, playsInline: true, preload: "auto" });
    el.setAttribute("playsinline", "");
    el.addEventListener("loadedmetadata", () => { if (time) el.currentTime = time; }, { once: true });
  } else {
    el = new Image(); el.src = src; el.alt = alt || SITE_TITLE;
  }
  lbContent.appendChild(el);
  lbCaption.textContent = caption;
  lightbox.hidden = false;
  document.body.classList.add("no-scroll");
  requestAnimationFrame(() => lightbox.classList.add("is-open"));
  if (type === "video") el.play().catch(() => {});
  $("#lightboxClose").focus({ preventScroll: true });
}
function closeLightbox() {
  const v = $("video", lbContent);
  if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
  lightbox.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  setTimeout(() => { lightbox.hidden = true; lbContent.innerHTML = ""; }, 300);
  lastFocus?.focus?.({ preventScroll: true });
}
$("#lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });

/* ============================ СЧЁТЧИКИ =================================== */
const split = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor(s % 86400 / 3600), minutes: Math.floor(s % 3600 / 60), seconds: s % 60 };
};
const FORMS = { days: ["день", "дня", "дней"], hours: ["час", "часа", "часов"], minutes: ["минута", "минуты", "минут"], seconds: ["секунда", "секунды", "секунд"] };
const fmtDate = (d) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
const fmtShort = (t) => `${t.days} ${plural(t.days, ...FORMS.days)} ${pad(t.hours)}:${pad(t.minutes)}:${pad(t.seconds)}`;

function countdownTarget(now) {
  if (now < COUNTDOWN.date) return COUNTDOWN.date;
  // дата прошла → следующее 11-е число (ежемесячная годовщина)
  const d = new Date(now.getFullYear(), now.getMonth(), START_DATE.getDate());
  if (d <= now) d.setMonth(d.getMonth() + 1);
  return d;
}
function tick() {
  const now = new Date();
  const t = split(now - START_DATE);
  for (const k in FORMS) {
    $(`[data-unit="${k}"]`).textContent = k === "days" ? t[k] : pad(t[k]);
    $(`[data-label="${k}"]`).textContent = plural(t[k], ...FORMS[k]);
  }
  $("#tenMonths").innerHTML = now < TEN_MONTHS
    ? `До 11.10.2026 — наших 10 месяцев — осталось <b>${fmtShort(split(TEN_MONTHS - now))}</b>`
    : `11.10.2026 — <b>10 месяцев вместе</b> 🎉 и дальше — бесконечно`;

  const target = countdownTarget(now);
  const c = split(target - now);
  $("#countdownDate").textContent = fmtDate(target);
  for (const k in FORMS) {
    $(`[data-cd="${k}"]`).textContent = k === "days" ? c[k] : pad(c[k]);
    $(`[data-cd-label="${k}"]`).textContent = plural(c[k], ...FORMS[k]);
  }
}

/* ============================ ИНТЕРАКТИВ ================================= */
function setupImportant() {
  const btn = $("#sayBtn"), note = $("#dropNote");
  let last = -1;
  btn.addEventListener("click", () => {
    let i;
    do { i = Math.floor(Math.random() * importantMessages.length); } while (i === last && importantMessages.length > 1);
    last = i;
    note.hidden = false;
    note.textContent = importantMessages[i];
    note.classList.remove("is-dropping");
    void note.offsetWidth; // перезапуск CSS-анимации
    note.classList.add("is-dropping");
  });
}

/* ---------- Лепестки и сердечки (canvas — легче, чем десятки DOM-узлов) ---------- */
function setupPetals() {
  if (reduceMotion) return;
  const cv = $("#petals"), ctx = cv.getContext("2d");
  const colors = ["#E8B4B8", "#F3CDD0", "#C9A961", "#FAF0E6", "#D99498"];
  let W, H, dpr, items = [], running = true;
  const count = () => (innerWidth < 640 ? 14 : 26);
  const make = (initial) => ({
    x: Math.random() * W, y: initial ? Math.random() * H : -20,
    s: 6 + Math.random() * 9, vy: .25 + Math.random() * .55, vx: -.2 + Math.random() * .4,
    a: Math.random() * Math.PI * 2, va: -.02 + Math.random() * .04, sw: Math.random() * Math.PI * 2,
    heart: Math.random() < .35, c: colors[Math.floor(Math.random() * colors.length)], o: .45 + Math.random() * .4
  });
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    items = Array.from({ length: count() }, () => make(true));
  }
  function drawHeart(s) {
    ctx.beginPath(); ctx.moveTo(0, s * .35);
    ctx.bezierCurveTo(-s, -s * .3, -s * .45, -s, 0, -s * .45);
    ctx.bezierCurveTo(s * .45, -s, s, -s * .3, 0, s * .35); ctx.fill();
  }
  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    for (const p of items) {
      p.sw += .015; p.y += p.vy; p.x += p.vx + Math.sin(p.sw) * .35; p.a += p.va;
      if (p.y > H + 20) Object.assign(p, make(false));
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.globalAlpha = p.o; ctx.fillStyle = p.c;
      if (p.heart) drawHeart(p.s); else { ctx.beginPath(); ctx.ellipse(0, 0, p.s * .55, p.s, 0, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    }
    requestAnimationFrame(frame);
  }
  resize(); addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    const was = running; running = !document.hidden;
    if (running && !was) requestAnimationFrame(frame); // не запускаем второй цикл
  });
  requestAnimationFrame(frame);
}

/* ---------- Шлейф из фото за курсором: lerp + requestAnimationFrame ---------- */
function setupTrail() {
  if (!isFinePointer || reduceMotion) return;
  const layer = $("#trail"), mouse = { x: innerWidth / 2, y: innerHeight / 2 }, pos = { ...mouse }, last = { ...mouse };
  let idx = 0, active = false, lastSpawn = 0, live = 0;
  addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; active = true; }, { passive: true });
  document.addEventListener("mouseleave", () => { active = false; });
  function spawn(x, y) {
    if (!trailSources.length || live >= 12 || !lightbox.hidden) return;
    const item = document.createElement("div");
    item.className = "trail-item";
    const img = new Image(); img.src = trailSources[idx++ % trailSources.length]; img.alt = "";
    item.appendChild(img);
    item.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${(Math.random() - .5) * 18}deg)`;
    layer.appendChild(item); live++;
    item.addEventListener("animationend", () => { item.remove(); live--; }, { once: true });
  }
  (function frame(ts) {
    pos.x += (mouse.x - pos.x) * .16; pos.y += (mouse.y - pos.y) * .16; // lerp — мягкое «догоняние»
    if (active && Math.hypot(pos.x - last.x, pos.y - last.y) > 70 && ts - lastSpawn > 70) {
      spawn(pos.x, pos.y); last.x = pos.x; last.y = pos.y; lastSpawn = ts;
    }
    requestAnimationFrame(frame);
  })(0);
  const warm = () => [...photos, collage].forEach((p) => resolveFile("photos", p.file, PHOTO_EXTS).then(addTrail));
  "requestIdleCallback" in window ? requestIdleCallback(warm, { timeout: 3000 }) : setTimeout(warm, 1500);
}

/* ---------- Появление при прокрутке, панель, кнопка «наверх», тема ---------- */
function setupReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach((e) => e.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: "0px 0px -30px 0px" });
  els.forEach((e) => io.observe(e));
}
function setupScrollUi() {
  const toTop = $("#toTop"), bar = $("#topbar");
  let lastY = scrollY, ticking = false;
  const update = () => {
    const y = scrollY;
    toTop.classList.toggle("is-visible", y > 600);
    if (y > 300 && y > lastY + 4) bar.classList.add("is-hidden");
    else if (y < lastY - 4 || y < 300) bar.classList.remove("is-hidden");
    lastY = y; ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
}
function setupTheme() {
  const btn = $("#themeToggle");
  const apply = (t) => {
    document.documentElement.dataset.theme = t;
    btn.textContent = t === "dark" ? "☀️" : "🌙";
    btn.setAttribute("aria-label", t === "dark" ? "Включить светлую тему" : "Включить тёмную тему");
  };
  let saved = "light";
  try { saved = localStorage.getItem("love-theme") || "light"; } catch (e) {}
  apply(saved);
  btn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem("love-theme", next); } catch (e) {}
  });
}
async function setupCursorFallback() {
  if (!isFinePointer) return;
  if (await resolveFile("assets", cursorImg, [".png", ".PNG", ".webp"])) return;
  const st = document.createElement("style");
  st.textContent = `html,body{cursor:url('assets/cursor-fallback.svg') 16 16,auto}a,button,.polaroid,.note,.video-hit{cursor:url('assets/cursor-fallback.svg') 16 16,pointer}`;
  document.head.appendChild(st);
}

/* ============================ СТАРТ ====================================== */
document.title = SITE_TITLE;
$$("[data-site-title]").forEach((el) => { el.textContent = SITE_TITLE; });
setupTheme();
buildTimeline();
buildNotes();
buildGallery();
buildPlaylist();
buildFinal();
const updateBackground = setupBackground();
setupLazy();
setupVideos();
setupImportant();
setupReveal();
setupScrollUi();
setupPetals();
setupTrail();
setupCursorFallback();
tick();
setInterval(tick, 1000);
// высота страницы меняется по мере загрузки фото → пересчитываем фон
if ("ResizeObserver" in window) new ResizeObserver(() => updateBackground()).observe(document.body);
