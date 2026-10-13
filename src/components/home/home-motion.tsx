"use client";

import { useEffect } from "react";

/*
 * Homepage motion, ported from the static landing page's main.js.
 * Native scroll + sticky "locked" scenes (.pin) driven by one requestAnimationFrame
 * loop with eased progress. Markup is server-rendered (see components/home/*);
 * this only toggles classes and inline styles, and tears everything down on unmount.
 */

type Scene = { el: HTMLElement; def: SceneDef; p: number; px: number; top: number; len: number; lastP: number; force: boolean };
type SceneDef = { update: (p: number, s: Scene) => void; frame?: (s: Scene) => void };
type Hook = (y: number, dt: number) => void;

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-home]");
    if (!root) return;
    const $ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = root) => ctx.querySelector<T>(sel);
    const $$ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = root) => Array.from(ctx.querySelectorAll<T>(sel));
    const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMQ = window.matchMedia("(min-width: 900px)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    let alive = true;
    const cleanups: Array<() => void> = [];
    const timers = new Set<number>();
    const on = (target: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => { timers.delete(id); fn(); }, ms);
      timers.add(id);
      return id;
    };
    const cancel = (id: number) => { clearTimeout(id); timers.delete(id); };
    const whenFontsReady = (fn: () => void) => { document.fonts?.ready.then(() => { if (alive) fn(); }); };

    /* ---------------- scroll engine ---------------- */
    const scenes: Scene[] = [];
    const hooks: Hook[] = [];
    let vh = window.innerHeight;
    let last = performance.now();
    let raf = 0;

    const addScene = (el: HTMLElement | null, make: (el: HTMLElement) => SceneDef | null) => {
      if (!el) return;
      const def = make(el);
      if (def) scenes.push({ el, def, p: 0, px: 0, top: 0, len: 1, lastP: -1, force: true });
    };

    const measure = () => {
      vh = window.innerHeight;
      const y = window.scrollY;
      scenes.forEach((s) => {
        const stage = s.el.querySelector<HTMLElement>(".pin__stage");
        s.top = s.el.getBoundingClientRect().top + y;
        s.len = Math.max(1, s.el.offsetHeight - (stage ? stage.offsetHeight : vh));
        s.force = true;
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const y = window.scrollY;
      const alpha = reduceMQ.matches ? 1 : 1 - Math.exp(-dt * 9);
      for (const s of scenes) {
        s.px = y - s.top;
        const target = clamp(s.px / s.len, 0, 1);
        const near = y > s.top - vh * 1.25 && y < s.top + s.len + vh * 1.25;
        if (!near) s.p = target;
        else {
          s.p += (target - s.p) * alpha;
          if (Math.abs(target - s.p) < 0.0004) s.p = target;
        }
        if (s.p !== s.lastP || s.force) {
          s.def.update(s.p, s);
          s.lastP = s.p;
          s.force = false;
        }
        if (near && s.def.frame) s.def.frame(s);
      }
      for (const hook of hooks) hook(y, dt);
      raf = requestAnimationFrame(tick);
    };

    /* ---------------- ABOUT: words go grey → ink, then the card rises ---------------- */
    addScene($("[data-scene='about']"), (el) => {
      const words = $$(".about__big .cw", el);
      const card = $("[data-about-card]", el);
      if (!card) return null;
      let lit = -1;
      return {
        update(p, s) {
          el.classList.toggle("is-live", s.px > -vh * 0.55);
          const n = Math.round(seg(p, 0.04, 0.58) * words.length);
          if (n !== lit) {
            words.forEach((w, i) => w.classList.toggle("is-on", i < n));
            lit = n;
          }
          const k = easeOut(seg(p, 0.62, 0.88));
          card.style.opacity = String(k);
          card.style.transform = `translate3d(0,${((1 - k) * 90).toFixed(2)}px,0)`;
          card.style.filter = k < 1 ? `blur(${((1 - k) * 8).toFixed(2)}px)` : "none";
        },
      };
    });

    /* ---------------- PRODUCTS → dissolve → NEXT PRODUCT ---------------- */
    addScene($("[data-scene='projects']"), (el) => {
      const proj = $("[data-proj]", el);
      const roll = $("[data-roll]", el);
      const bar = $("[data-proj-bar]", el);
      const sr = $("[data-proj-sr]", el);
      const veil = $("[data-veil]", el);
      const next = $("[data-next]", el);
      const glowL = $("[data-glow-l]", el);
      const glowR = $("[data-glow-r]", el);
      if (!proj || !roll || !bar || !sr || !veil || !next || !glowL || !glowR) return null;
      const media = $$(".proj__media img", el);
      const bgs = $$(".proj__card-bg img", el);
      const swaps = $$(".swap", el);
      const links = $$("[data-proj-more] > a", el);
      const N = media.length;
      const template = sr.dataset.template ?? "";
      let idx = 0;
      let leaveTimer = 0;

      const setIndex = (i: number) => {
        if (i === idx) return;
        const prev = idx;
        proj.dataset.dir = i > idx ? "down" : "up";
        // let the direction-dependent hidden state settle before swapping
        requestAnimationFrame(() => {
          if (!alive) return;
          media.forEach((img, k) => {
            img.classList.toggle("is-active", k === i);
            img.classList.toggle("is-prev", k === prev);
          });
          bgs.forEach((img, k) => img.classList.toggle("is-active", k === i));
          swaps.forEach((s) => {
            const k = Number(s.dataset.i);
            s.classList.remove("is-leaving");
            if (k === prev) s.classList.add("is-leaving");
            s.classList.toggle("is-active", k === i);
          });
          links.forEach((a, k) => a.classList.toggle("is-active", k === i));
          cancel(leaveTimer);
          leaveTimer = later(() => {
            swaps.forEach((s) => s.classList.remove("is-leaving"));
            media.forEach((img) => { if (!img.classList.contains("is-active")) img.classList.remove("is-prev"); });
          }, 1200);
        });
        roll.style.transform = `translate3d(0,${-i}em,0)`;
        sr.textContent = template.replace("{n}", String(i + 1));
        idx = i;
      };

      return {
        update(p) {
          const slots = seg(p, 0, 0.56) * N;
          const i = Math.min(N - 1, Math.floor(slots));
          setIndex(i);
          bar.style.transform = `scaleX(${((i + clamp(slots - i, 0, 1)) / N).toFixed(4)})`;

          const d = easeInOut(seg(p, 0.58, 0.68));
          veil.style.opacity = String(d);
          proj.style.transform = d ? `scale(${(1 - 0.05 * d).toFixed(4)})` : "";
          proj.style.filter = d ? `blur(${(d * 10).toFixed(2)}px)` : "";

          const g = easeOut(seg(p, 0.67, 0.8));
          next.classList.toggle("is-visible", p > 0.6);
          glowL.style.opacity = String(g);
          glowR.style.opacity = String(g);
          glowL.style.transform = `translate3d(${lerp(-40, 12, g).toFixed(2)}vw,0,0)`;
          glowR.style.transform = `translate3d(${lerp(40, -12, g).toFixed(2)}vw,0,0)`;
          // title, text and button slide in with the scroll (0 = off to the side, 1 = in place)
          next.style.setProperty("--c1", easeOut(seg(p, 0.76, 0.9)).toFixed(3));
          next.style.setProperty("--c2", easeOut(seg(p, 0.79, 0.93)).toFixed(3));
          next.style.setProperty("--c3", easeOut(seg(p, 0.82, 0.96)).toFixed(3));
        },
      };
    });

    /* ---------------- BUILD: scroll-scrubbed video, four stages ---------------- */
    let objectUrl: string | null = null;
    const videoAbort = new AbortController();
    addScene($("[data-scene='build']"), (el) => {
      const video = $<HTMLVideoElement>("[data-video]", el);
      const vbox = $("[data-vbox]", el);
      if (!video || !vbox) return null;
      // keyframe times (s) where the computer rests for each stage
      const T = [1.1, 4.1, 6.3, 9.2];
      // horizontal centre of the computer in the frame (0–1), sampled every 0.25s
      const CX = [.744, .742, .739, .739, .739, .739, .739, .739, .744, .741, .662, .503, .341, .25, .242, .241, .241, .241, .236, .262, .412, .603, .72, .722, .72, .722, .723, .717, .642, .486, .328, .242, .241, .242, .244, .244, .244, .242, .241, .239];
      const steps = $$(".bstep", el);
      const dots = $$(".build__dots li", el);
      let active = 0;
      let want = 0;
      let leaveTimer = 0;
      let loaded = false;

      const centroid = (t: number) => {
        const f = clamp(t / 0.25, 0, CX.length - 1);
        const a = Math.floor(f);
        const b = Math.min(CX.length - 1, a + 1);
        return lerp(CX[a], CX[b], f - a);
      };
      const setStep = (i: number) => {
        if (i === active) return;
        const prev = active;
        steps.forEach((s, k) => {
          s.classList.remove("is-leaving");
          if (k === prev) s.classList.add("is-leaving");
          s.classList.toggle("is-active", k === i);
          s.setAttribute("aria-hidden", String(k !== i));
        });
        if (i >= 0) dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
        cancel(leaveTimer);
        leaveTimer = later(() => steps.forEach((s) => s.classList.remove("is-leaving")), 900);
        active = i;
      };
      const seekNow = () => { try { video.currentTime = want; } catch { /* not seekable yet */ } };
      const loadFull = () => {
        if (loaded) return;
        loaded = true;
        // prefer "probably" over "maybe" so browsers without H.264 get the WebM
        const rank = (s: HTMLSourceElement) => { const c = video.canPlayType(s.type); return c === "probably" ? 2 : c === "maybe" ? 1 : 0; };
        const ranked = $$<HTMLSourceElement>("source", video).sort((a, b) => rank(b) - rank(a));
        let n = 0;
        const setSrc = (url: string) => {
          video.preload = "auto"; // preload="none" in the markup would otherwise block loading
          video.src = url;
          video.load();
          video.addEventListener("loadeddata", () => {
            // Safari only paints seeked frames after the video has played once
            video.play().then(() => { video.pause(); seekNow(); }).catch(seekNow);
          }, { once: true });
        };
        const tryNext = () => {
          const source = ranked[n++];
          if (!source || !alive) return;
          // fetch the whole file so seeking is instant (no range requests)
          fetch(source.src, { signal: videoAbort.signal })
            .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
            .then((blob) => { objectUrl = URL.createObjectURL(blob); setSrc(objectUrl); })
            .catch(() => { if (alive) setSrc(source.src); });
        };
        on(video, "error", tryNext);
        tryNext();
      };

      video.pause();
      // start loading when the section is getting close
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { loadFull(); io.disconnect(); }
      }, { rootMargin: "150% 0px" });
      io.observe(el);
      cleanups.push(() => io.disconnect());
      // iOS needs a user gesture before it paints seeked frames
      on(window, "touchstart", () => { video.play().then(() => video.pause()).catch(() => {}); }, { passive: true, once: true });

      return {
        update(p) {
          const x = p * 3;
          const i = Math.min(2, Math.floor(x));
          const e = easeInOut(seg(x - i, 0.22, 0.78));
          want = lerp(T[i], T[i + 1], e);
          // old copy leaves as the computer starts moving, new copy arrives as it settles
          setStep(e > 0.72 ? i + 1 : e > 0.16 ? -1 : i);
          if (!desktopMQ.matches) vbox.style.setProperty("--pan", `${((0.5 - centroid(want)) * vbox.offsetWidth).toFixed(1)}px`);
          else vbox.style.removeProperty("--pan");
        },
        frame() {
          if (video.readyState >= 1 && !video.seeking && Math.abs(video.currentTime - want) > 0.015) seekNow();
        },
      };
    });

    /* ---------------- AI: image grows, white halo, content ---------------- */
    addScene($("[data-scene='ai']"), (el) => {
      const media = $("[data-ai-media]", el);
      const img = $("[data-ai-img]", el);
      const halo = $("[data-ai-halo]", el);
      const content = $("[data-ai-content]", el);
      if (!media || !img || !halo || !content) return null;
      return {
        update(p) {
          if (!desktopMQ.matches) { // mobile: no scroll animation, clear desktop styles
            media.style.clipPath = ""; media.style.opacity = "";
            img.style.transform = ""; halo.style.opacity = "";
            return;
          }
          const a = easeInOut(seg(p, 0.02, 0.4));
          const inset = ((1 - a) * 34).toFixed(2);
          media.style.clipPath = `inset(${inset}% ${inset}% ${inset}% ${inset}%)`;
          media.style.opacity = seg(p, 0, 0.16).toFixed(3);
          const b = easeInOut(seg(p, 0.42, 0.64));
          img.style.transform = `scale(${(1.3 - 0.3 * a - 0.2 * b).toFixed(4)})`;
          halo.style.opacity = b.toFixed(3);
          content.classList.toggle("is-in", p > 0.68);
        },
        frame(s) {
          if (desktopMQ.matches) return;
          const inView = s.px > -vh * 0.6; // section top has reached 60% down the screen
          el.classList.toggle("is-in", inView);
          content.classList.toggle("is-in", inView);
        },
      };
    });

    /* ---------------- DIRECTION: dot follows the path, copy fades in ---------------- */
    addScene($("[data-scene='direction']"), (el) => {
      const trail = $<SVGPathElement>("[data-trail]", el);
      const dot = $<SVGGElement>("[data-dot]", el);
      if (!trail || !dot) return null;
      const L = trail.getTotalLength();
      trail.style.strokeDasharray = String(L);
      const words = $$("[data-dir-content] .w__i", el);
      const lastO: number[] = [];
      return {
        update(p) {
          const k = seg(p, 0.02, 0.92);
          const pt = trail.getPointAtLength(k * L);
          // the dot grows in at the start, then shrinks and fades out at the finish
          const vis = easeOut(seg(p, 0.02, 0.12)) * (1 - easeInOut(seg(p, 0.82, 0.92)));
          dot.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) scale(${(0.3 + 0.7 * vis).toFixed(3)})`);
          dot.style.opacity = vis.toFixed(3);
          trail.style.strokeDashoffset = (L * (1 - k)).toFixed(1);
          const r = seg(p, 0.1, 0.86) * (words.length + 6);
          words.forEach((w, i) => {
            const o = Math.round(clamp((r - i) / 6, 0.08, 1) * 100) / 100;
            if (lastO[i] !== o) { w.style.setProperty("--o", String(o)); lastO[i] = o; }
          });
        },
      };
    });

    /* ---------------- HERO: parallax + pointer tilt on the 3D mark ---------------- */
    const hero = $(".hero");
    const logoWrap = $("[data-hero-logo]");
    const tilt = $("[data-tilt]");
    if (hero && logoWrap && tilt) {
      let tx = 0, ty = 0, cx = 0, cy = 0;
      if (finePointer.matches) {
        on(hero, "pointermove", ((e: PointerEvent) => {
          const r = hero.getBoundingClientRect();
          tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        }) as EventListener);
        on(hero, "pointerleave", () => { tx = ty = 0; });
      }
      hooks.push((y, dt) => {
        if (y > vh * 1.3) return;
        const a = reduceMQ.matches ? 1 : 1 - Math.exp(-dt * 5);
        cx += (tx - cx) * a;
        cy += (ty - cy) * a;
        const par = reduceMQ.matches ? 0 : y * 0.18;
        logoWrap.style.transform = `translate3d(-50%,${par.toFixed(1)}px,0)`;
        tilt.style.transform = `perspective(1200px) rotateY(${(cx * 7).toFixed(2)}deg) rotateX(${(-cy * 5).toFixed(2)}deg)`;
      });
    }

    /* ---------------- CAPABILITIES: active item + progress meter ---------------- */
    const caps = $(".caps");
    const panel = $(".caps__panel");
    const meter = $("[data-caps-meter]");
    if (caps && panel && meter) {
      const items = $$(".cap", caps);
      let cur = -1;
      hooks.push(() => {
        const r = caps.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const focus = desktopMQ.matches ? vh * 0.5 : panel.offsetHeight + (vh - panel.offsetHeight) * 0.45;
        let best = 0, bestD = Infinity;
        items.forEach((item, i) => {
          const b = item.getBoundingClientRect();
          const d = Math.abs(b.top + b.height / 2 - focus);
          if (d < bestD) { bestD = d; best = i; }
        });
        if (best !== cur) {
          items.forEach((item, k) => item.classList.toggle("is-active", k === best));
          cur = best;
        }
        meter.style.transform = `scaleX(${clamp(-r.top / Math.max(1, r.height - vh), 0, 1).toFixed(3)})`;
        // the grey panel background fades in once the section has locked to the top
        const locked = -r.top;
        panel.style.setProperty("--caps-bg", clamp(locked / (vh * 0.25), 0, 1).toFixed(3));
        // after the last item, the whole section dissolves to white before the next one
        const end = r.height - vh;
        caps.style.opacity = (1 - clamp((locked - (end - vh * 0.6)) / (vh * 0.6), 0, 1)).toFixed(3);
      });
    }

    /* ---------------- in-view reveals ---------------- */
    const revealIo = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); revealIo.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    $$(".reveal, [data-wordmark]").forEach((t) => revealIo.observe(t));
    cleanups.push(() => revealIo.disconnect());

    /* ---------------- marquee: loop exactly one group; ease to a crawl on hover ---------------- */
    let fitMarquee: (() => void) | undefined;
    const marquee = $(".marquee");
    const track = $(".marquee__track");
    if (marquee && track) {
      const SPEED = 70; // pixels per second
      const fit = () => {
        const w = track.querySelector<HTMLElement>(".marquee__group")?.offsetWidth ?? 0;
        if (!w) return;
        track.style.setProperty("--mq-shift", `${-w}px`);
        track.style.setProperty("--mq-dur", `${w / SPEED}s`);
      };
      fit();
      whenFontsReady(fit);
      let rate = 1, target = 1;
      on(marquee, "pointerenter", () => { target = 0.25; });
      on(marquee, "pointerleave", () => { target = 1; });
      hooks.push((_, dt) => {
        if (Math.abs(target - rate) < 0.001) return;
        rate += (target - rate) * (1 - Math.exp(-dt * 4));
        track.getAnimations().forEach((a) => { a.playbackRate = rate; });
      });
      fitMarquee = fit;
    }

    /* ---------------- About card width matches the widest line of the big text ---------------- */
    const aboutCard = $("[data-about-card]");
    const fitCard = () => {
      if (!aboutCard) return;
      aboutCard.style.width = ""; // reset first, so the text is measured at its natural width
      let left = Infinity, right = -Infinity;
      $$(".about__big .cw").forEach((w) => {
        const b = w.getBoundingClientRect();
        left = Math.min(left, b.left);
        right = Math.max(right, b.right);
      });
      if (right > left) aboutCard.style.width = `${Math.round(right - left)}px`;
    };
    fitCard();
    whenFontsReady(fitCard);

    /* ---------------- boot ---------------- */
    let resizeTimer = 0;
    on(window, "resize", () => {
      cancel(resizeTimer);
      resizeTimer = later(() => { measure(); fitCard(); fitMarquee?.(); }, 150);
    });
    on(window, "load", measure);
    // images and fonts settling change the page height; keep scene offsets in sync
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    cleanups.push(() => ro.disconnect());
    whenFontsReady(measure);
    measure();
    raf = requestAnimationFrame(tick);

    // start the hero intro once the 3D logo and fonts are ready (or after 2.5s regardless)
    const start = () => { if (alive) requestAnimationFrame(() => document.documentElement.classList.add("is-loaded")); };
    const logo = $<HTMLImageElement>(".hero__logo img");
    Promise.all([logo?.decode().catch(() => {}), document.fonts?.ready]).then(start);
    later(start, 2500);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      videoAbort.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      timers.forEach((id) => clearTimeout(id));
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
