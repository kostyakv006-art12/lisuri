/* =============================================================================
   МУЗЫКАЛЬНЫЙ ПЛЕЕР
   • Песни играют прямо на сайте (без переходов на YouTube).
   • Файлы лежат в папке music/ и называются по номеру в списке tracks:
     1.mp3, 2.mp3, 3.mp3 … (порядок как в script.js → tracks).
     Можно указать своё имя: { title: "...", artist: "...", file: "perfect" } → music/perfect.mp3
   • Когда песня заканчивается — сама включается следующая.
   • Сверху появляется панель: перемотка, громкость, назад / вперёд.
     На первой песне «назад» выключено, на последней — «вперёд».
   Этот файл не нужно редактировать — он сам берёт список песен из script.js.
   ============================================================================= */
(() => {
  if (typeof tracks === "undefined" || !Array.isArray(tracks) || !tracks.length) return;

  const MUSIC_DIR = "music";
  const EXTS = [".mp3", ".m4a", ".ogg", ".wav", ".MP3", ".M4A"];
  const list = document.getElementById("tracks");
  const audio = new Audio();
  audio.preload = "none";

  let index = -1;          // какая песня выбрана
  let loadToken = 0;       // защита от «гонки», если быстро жать кнопки
  const missing = new Set();

  /* иконки — SVG, чтобы одинаково выглядели на всех устройствах (эмодзи-кнопки рисуются по-разному) */
  const svg = (d) => `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="${d}"/></svg>`;
  const ICON = {
    play: svg("M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"),
    pause: svg("M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"),
    prev: svg("M6 5h2.2v14H6zM19 6.2v11.6a.9.9 0 0 1-1.4.75L9.6 12.75a.9.9 0 0 1 0-1.5l8-5.8A.9.9 0 0 1 19 6.2z"),
    next: svg("M15.8 5H18v14h-2.2zM5 6.2v11.6a.9.9 0 0 0 1.4.75l8-5.8a.9.9 0 0 0 0-1.5l-8-5.8A.9.9 0 0 0 5 6.2z"),
    vol: svg("M4 9h4l5-4v14l-5-4H4zM15.5 8.2l1.3-1.1a7 7 0 0 1 0 9.8l-1.3-1.1a5.3 5.3 0 0 0 0-7.6z"),
    mute: svg("M4 9h4l5-4v14l-5-4H4zM16.3 9.2l1.4-1.4 2.1 2.1 2.1-2.1 1.4 1.4-2.1 2.1 2.1 2.1-1.4 1.4-2.1-2.1-2.1 2.1-1.4-1.4 2.1-2.1z")
  };

  /* ---------- панель плеера ---------- */
  const bar = document.createElement("div");
  bar.className = "player";
  bar.id = "player";
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Музыкальный плеер");
  bar.hidden = true;
  bar.innerHTML = `
    <span class="player__cover" aria-hidden="true"></span>
    <div class="player__info">
      <span class="player__title"></span>
      <span class="player__artist"></span>
    </div>
    <div class="player__controls">
      <button class="player__btn" type="button" data-act="prev" aria-label="Предыдущая песня">${ICON.prev}</button>
      <button class="player__btn player__btn--main" type="button" data-act="toggle" aria-label="Пауза">${ICON.pause}</button>
      <button class="player__btn" type="button" data-act="next" aria-label="Следующая песня">${ICON.next}</button>
    </div>
    <div class="player__progress">
      <span class="player__time" data-time="cur">0:00</span>
      <input class="player__range player__seek" type="range" min="0" max="1000" value="0" step="1" aria-label="Перемотка">
      <span class="player__time" data-time="dur">0:00</span>
    </div>
    <div class="player__volume">
      <button class="player__btn player__btn--small" type="button" data-act="mute" aria-label="Выключить звук">${ICON.vol}</button>
      <input class="player__range player__vol" type="range" min="0" max="100" value="70" step="1" aria-label="Громкость">
    </div>
    <button class="player__close" type="button" data-act="close" aria-label="Закрыть плеер">×</button>`;
  document.body.appendChild(bar);

  const $p = (s) => bar.querySelector(s);
  const ui = {
    cover: $p(".player__cover"), title: $p(".player__title"), artist: $p(".player__artist"),
    prev: $p('[data-act="prev"]'), next: $p('[data-act="next"]'), toggle: $p('[data-act="toggle"]'),
    mute: $p('[data-act="mute"]'), seek: $p(".player__seek"), vol: $p(".player__vol"),
    cur: $p('[data-time="cur"]'), dur: $p('[data-time="dur"]')
  };

  /* ---------- громкость (запоминается) ---------- */
  let savedVol = 70;
  try { const v = Number(localStorage.getItem("love-volume")); if (v >= 0 && v <= 100 && localStorage.getItem("love-volume") !== null) savedVol = v; } catch (e) {}
  audio.volume = savedVol / 100;
  ui.vol.value = savedVol;

  /* ---------- помощники ---------- */
  const fmt = (s) => {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };
  const fileBase = (t, i) => {
    const f = (t.file || String(i + 1)).trim();
    return f.includes("/") ? f : `${MUSIC_DIR}/${f}`;
  };
  const candidates = (t, i) => {
    const base = fileBase(t, i);
    return /\.[a-z0-9]{2,4}$/i.test(base) ? [base] : EXTS.map((e) => base + e);
  };
  const encode = (p) => p.split("/").map(encodeURIComponent).join("/");
  const paintRange = (el) => {
    const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
    el.style.setProperty("--pct", `${pct}%`);
  };

  function toast(msg) {
    let t = document.querySelector(".player-toast");
    if (!t) { t = document.createElement("div"); t.className = "player-toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("is-shown");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("is-shown"), 3800);
  }

  /* ---------- загрузка и запуск: пробуем расширения по очереди ----------
     Сразу вызываем play() — так работает и на iPhone (Safari не грузит
     аудио заранее, пока его не попросят играть).                         */
  function startTrack(i) {
    const token = ++loadToken;
    const urls = candidates(tracks[i], i);
    return new Promise((resolve) => {
      let k = 0;
      const tryNext = () => {
        if (token !== loadToken) return resolve("stale");
        if (k >= urls.length) return resolve("missing");
        const onError = () => { if (token === loadToken) tryNext(); };
        audio.addEventListener("error", onError, { once: true });
        audio.src = encode(urls[k++]);
        audio.play().then(() => {
          audio.removeEventListener("error", onError);
          resolve(token === loadToken ? "ok" : "stale");
        }).catch((err) => {
          if (err && err.name === "NotAllowedError") {   // файл есть, но браузер ждёт нажатия
            audio.removeEventListener("error", onError);
            resolve("ok");
          }
          // иначе (файл не найден / формат) сработает onError → следующее расширение
        });
      };
      tryNext();
    });
  }

  /* ---------- главное: включить песню i ---------- */
  async function playIndex(i, auto = false) {
    if (i < 0 || i >= tracks.length) return;
    index = i;
    showBar();
    render();
    bar.classList.add("is-loading");
    const res = await startTrack(i);
    if (res === "stale" || index !== i) return;   // пока грузили — выбрали другую
    bar.classList.remove("is-loading");
    if (res === "missing") {
      missing.add(i);
      render();
      const name = fileBase(tracks[i], i).split("/").pop();
      toast(`Не нашёл файл песни «${tracks[i].title}». Положи его в папку music под именем ${name}.mp3`);
      if (auto && i < tracks.length - 1) playIndex(i + 1, true);   // при автопереходе — пропускаем
      return;
    }
    missing.delete(i);
    render();
  }

  /* ---------- отрисовка состояния ---------- */
  function render() {
    const t = tracks[index];
    if (!t) return;
    ui.cover.textContent = t.icon || "♪";
    ui.cover.style.setProperty("--c1", t.c1 || "#E8B4B8");
    ui.cover.style.setProperty("--c2", t.c2 || "#C9A961");
    ui.title.textContent = t.title || "";
    ui.artist.textContent = t.artist || "";
    ui.prev.disabled = index <= 0;                     // первая — назад нельзя
    ui.next.disabled = index >= tracks.length - 1;     // последняя — вперёд нельзя
    const playing = !audio.paused && !audio.ended;
    ui.toggle.innerHTML = playing ? ICON.pause : ICON.play;
    ui.toggle.setAttribute("aria-label", playing ? "Пауза" : "Играть");
    bar.classList.toggle("is-playing", playing);
    markRows();
    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({ title: t.title || "", artist: t.artist || "", album: "Наш плейлист" });
        navigator.mediaSession.playbackState = playing ? "playing" : "paused";
      } catch (e) {}
    }
  }

  function markRows() {
    if (!list) return;
    [...list.children].forEach((li, i) => {
      const btn = li.querySelector(".track__play");
      const isCur = i === index;
      const playing = isCur && !audio.paused && !audio.ended;
      li.classList.toggle("is-current", isCur);
      li.classList.toggle("is-playing", playing);
      li.classList.toggle("is-missing", missing.has(i));
      if (btn) {
        btn.innerHTML = playing ? ICON.pause : ICON.play;
        btn.setAttribute("aria-label", `${playing ? "Пауза" : "Слушать"}: ${tracks[i]?.artist || ""} — ${tracks[i]?.title || ""}`);
      }
    });
  }

  function showBar() {
    if (!bar.hidden) return;
    bar.hidden = false;
    requestAnimationFrame(() => bar.classList.add("is-open"));
  }
  function closeBar() {
    audio.pause();
    bar.classList.remove("is-open");
    setTimeout(() => { if (!bar.classList.contains("is-open")) bar.hidden = true; }, 400);
    markRows();
  }

  function toggle() {
    if (index < 0) return playIndex(0);
    if (audio.paused || audio.ended) audio.play().catch(() => {});
    else audio.pause();
  }

  /* ---------- клики по списку песен (вместо перехода на сайты) ---------- */
  if (list) {
    // делаем ссылки кнопками: никаких переходов
    const prepare = () => [...list.querySelectorAll(".track__play")].forEach((a) => {
      a.removeAttribute("target"); a.setAttribute("role", "button"); a.setAttribute("href", "#music");
      if (!a.querySelector("svg")) a.innerHTML = ICON.play;
    });
    prepare();
    new MutationObserver(prepare).observe(list, { childList: true });

    list.addEventListener("click", (e) => {
      const li = e.target.closest(".track");
      if (!li) return;
      e.preventDefault();
      const i = [...list.children].indexOf(li);
      if (i === index && !bar.hidden) toggle();
      else playIndex(i);
    }, true);
    list.addEventListener("keydown", (e) => {
      if (e.key === " " && e.target.classList.contains("track__play")) { e.preventDefault(); e.target.click(); }
    });
  }

  /* ---------- кнопки панели ---------- */
  bar.addEventListener("click", (e) => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (act === "toggle") toggle();
    if (act === "prev" && index > 0) playIndex(index - 1);
    if (act === "next" && index < tracks.length - 1) playIndex(index + 1);
    if (act === "close") closeBar();
    if (act === "mute") {
      audio.muted = !audio.muted;
      ui.mute.innerHTML = audio.muted || audio.volume === 0 ? ICON.mute : ICON.vol;
      ui.mute.setAttribute("aria-label", audio.muted ? "Включить звук" : "Выключить звук");
    }
  });

  /* перемотка */
  let seeking = false;
  ui.seek.addEventListener("input", () => {
    seeking = true; paintRange(ui.seek);
    if (isFinite(audio.duration)) ui.cur.textContent = fmt((ui.seek.value / 1000) * audio.duration);
  });
  ui.seek.addEventListener("change", () => {
    if (isFinite(audio.duration)) audio.currentTime = (ui.seek.value / 1000) * audio.duration;
    seeking = false;
  });

  /* громкость */
  ui.vol.addEventListener("input", () => {
    audio.volume = ui.vol.value / 100;
    audio.muted = false;
    ui.mute.innerHTML = audio.volume === 0 ? ICON.mute : ICON.vol;
    paintRange(ui.vol);
    try { localStorage.setItem("love-volume", ui.vol.value); } catch (e) {}
  });

  /* ---------- события аудио ---------- */
  audio.addEventListener("timeupdate", () => {
    if (seeking || !isFinite(audio.duration)) return;
    ui.seek.value = Math.round((audio.currentTime / audio.duration) * 1000) || 0;
    ui.cur.textContent = fmt(audio.currentTime);
    paintRange(ui.seek);
  });
  audio.addEventListener("loadedmetadata", () => { ui.dur.textContent = fmt(audio.duration); ui.cur.textContent = "0:00"; ui.seek.value = 0; paintRange(ui.seek); });
  audio.addEventListener("play", render);
  audio.addEventListener("pause", render);
  audio.addEventListener("ended", () => {
    if (index < tracks.length - 1) playIndex(index + 1, true);   // следующая — сама
    else { render(); toast("Плейлист закончился ♥"); }
  });

  /* когда включают видео со звуком — музыку ставим на паузу */
  document.addEventListener("play", (e) => {
    const v = e.target;
    if (v instanceof HTMLVideoElement && !v.muted && !audio.paused) audio.pause();
  }, true);

  /* кнопки на экране блокировки телефона / клавиатуре */
  if ("mediaSession" in navigator) {
    try {
      navigator.mediaSession.setActionHandler("play", () => audio.play().catch(() => {}));
      navigator.mediaSession.setActionHandler("pause", () => audio.pause());
      navigator.mediaSession.setActionHandler("previoustrack", () => { if (index > 0) playIndex(index - 1); });
      navigator.mediaSession.setActionHandler("nexttrack", () => { if (index < tracks.length - 1) playIndex(index + 1); });
    } catch (e) {}
  }

  /* панель сдвигается вверх, когда верхнее меню прячется при прокрутке */
  const topbar = document.getElementById("topbar");
  if (topbar) {
    const sync = () => bar.classList.toggle("is-top", topbar.classList.contains("is-hidden"));
    new MutationObserver(sync).observe(topbar, { attributes: true, attributeFilter: ["class"] });
    sync();
  }

  paintRange(ui.vol); paintRange(ui.seek);
})();
