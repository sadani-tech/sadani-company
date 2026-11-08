/* =========================================================
   Sadatech — interactions
   Vanilla JS. Native scroll + sticky "locked" scenes driven by
   a single requestAnimationFrame loop with eased progress.
   ========================================================= */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktopMQ = window.matchMedia('(min-width: 900px)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var I18N = window.SadatechI18n;

  /* ---------- helpers ---------- */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function seg(p, a, b) { return clamp((p - a) / (b - a), 0, 1); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* =========================================================
     TEXT RENDERING + SPLITTING
     ========================================================= */
  function renderText(el, text) {
    var mode = el.getAttribute('data-split');
    if (mode === null) {
      el.innerHTML = esc(text).replace(/\n/g, '<br>');
      return;
    }
    var i = 0;
    var html = text.split('\n').map(function (line) {
      return line.split(/\s+/).filter(Boolean).map(function (word) {
        var k = i++;
        if (mode === 'color') return '<span class="cw">' + esc(word) + '</span>';
        return '<span class="w"><span class="w__i" style="--i:' + k + '">' + esc(word) + '</span></span>';
      }).join(' ');
    }).join('<br>');
    el.innerHTML = '<span class="sr-only">' + esc(text.replace(/\n/g, ' ')) + '</span><span aria-hidden="true">' + html + '</span>';
  }

  // Split elements that are not translated (brand names, numbers) once.
  $$('[data-split]:not([data-i18n])').forEach(function (el) {
    renderText(el, el.textContent.trim());
  });

  /* =========================================================
     LANGUAGE
     ========================================================= */
  var langWrap = $('.lang');
  function applyLang(lang) {
    lang = I18N.set(lang);
    doc.lang = lang;
    $$('[data-i18n]').forEach(function (el) {
      renderText(el, I18N.t(el.getAttribute('data-i18n')));
    });
    document.title = I18N.t('meta.title');
    var md = $('meta[name="description"]');
    if (md) md.setAttribute('content', I18N.t('meta.desc'));
    langWrap.setAttribute('data-active', lang);
    $$('.lang__btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    document.dispatchEvent(new CustomEvent('sadatech:lang'));
  }
  $$('.lang__btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.getAttribute('data-lang');
      if (l !== I18N.lang) applyLang(l);
    });
  });
  applyLang(I18N.initial());

  /* =========================================================
     NAV
     ========================================================= */
  var nav = $('[data-nav]');
  var burger = $('[data-burger]');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  $$('.nav__links a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* =========================================================
     SCROLL ENGINE
     ========================================================= */
  var scenes = [];
  var hooks = [];
  var vh = window.innerHeight;
  var last = performance.now();

  function addScene(el, def) {
    if (!el) return;
    var s = { el: el, def: def, p: 0, raw: 0, px: 0, top: 0, len: 1, lastP: -1, force: true };
    scenes.push(s);
    if (def.init) def.init(s);
  }

  function measure() {
    vh = window.innerHeight;
    var y = window.scrollY;
    scenes.forEach(function (s) {
      var stage = s.el.querySelector('.pin__stage');
      var r = s.el.getBoundingClientRect();
      s.top = r.top + y;
      s.len = Math.max(1, s.el.offsetHeight - (stage ? stage.offsetHeight : vh));
      s.force = true;
    });
  }

  function refreshAll() {
    scenes.forEach(function (s) { if (s.def.refresh) s.def.refresh(s); s.force = true; });
  }

  function tick(now) {
    var dt = Math.min(.1, (now - last) / 1000);
    last = now;
    var y = window.scrollY;
    var alpha = reduceMQ.matches ? 1 : 1 - Math.exp(-dt * 9);

    for (var i = 0; i < scenes.length; i++) {
      var s = scenes[i];
      s.px = y - s.top;
      s.raw = s.px / s.len;
      var target = clamp(s.raw, 0, 1);
      var near = y > s.top - vh * 1.25 && y < s.top + s.len + vh * 1.25;
      if (!near) {
        s.p = target;
      } else {
        s.p += (target - s.p) * alpha;
        if (Math.abs(target - s.p) < .0004) s.p = target;
      }
      if (s.p !== s.lastP || s.force) {
        s.def.update(s.p, s);
        s.lastP = s.p;
        s.force = false;
      }
      if (near && s.def.frame) s.def.frame(s);
    }
    for (var h = 0; h < hooks.length; h++) hooks[h](y, dt);
    requestAnimationFrame(tick);
  }

  /* =========================================================
     SCENE: ABOUT — words go grey → black, then card rises
     ========================================================= */
  addScene($('[data-scene="about"]'), (function () {
    var words = [], lit = -1, card;
    return {
      init: function (s) { card = $('[data-about-card]', s.el); this.refresh(s); },
      refresh: function (s) { words = $$('.about__big .cw', s.el); lit = -1; },
      update: function (p, s) {
        s.el.classList.toggle('is-live', s.px > -vh * .55);
        var n = Math.round(seg(p, .04, .58) * words.length);
        if (n !== lit) {
          words.forEach(function (w, i) { w.classList.toggle('is-on', i < n); });
          lit = n;
        }
        var k = easeOut(seg(p, .62, .88));
        card.style.opacity = k;
        card.style.transform = 'translate3d(0,' + ((1 - k) * 90).toFixed(2) + 'px,0)';
        card.style.filter = k < 1 ? 'blur(' + ((1 - k) * 8).toFixed(2) + 'px)' : 'none';
      }
    };
  })());

  /* =========================================================
     SCENE: PROJECTS → dissolve → NEXT PRODUCT
     ========================================================= */
  addScene($('[data-scene="projects"]'), (function () {
    var N = 4, idx = -1, proj, media, bgs, swaps, roll, bar, sr, veil, next, glowL, glowR, leaveTimer;
    function setIndex(i) {
      if (i === idx) return;
      var dir = i > idx ? 'down' : 'up';
      var prev = idx;
      proj.setAttribute('data-dir', dir);
      // allow the direction-dependent hidden state to settle before swapping
      requestAnimationFrame(function () {
        media.forEach(function (img, k) {
          img.classList.toggle('is-active', k === i);
          img.classList.toggle('is-prev', k === prev);
        });
        bgs.forEach(function (img, k) { img.classList.toggle('is-active', k === i); });
        swaps.forEach(function (el) {
          var k = +el.getAttribute('data-i');
          el.classList.remove('is-leaving');
          if (k === prev) el.classList.add('is-leaving');
          el.classList.toggle('is-active', k === i);
        });
        clearTimeout(leaveTimer);
        leaveTimer = setTimeout(function () {
          swaps.forEach(function (el) { el.classList.remove('is-leaving'); });
          media.forEach(function (img) { if (!img.classList.contains('is-active')) img.classList.remove('is-prev'); });
        }, 1200);
      });
      roll.style.transform = 'translate3d(0,' + (-i) + 'em,0)';
      sr.textContent = I18N.t('p.sr').replace('{n}', i + 1);
      idx = i;
    }
    return {
      init: function (s) {
        proj = $('[data-proj]', s.el);
        media = $$('.proj__media img', s.el);
        bgs = $$('.proj__card-bg img', s.el);
        swaps = $$('.swap', s.el);
        roll = $('[data-roll]', s.el);
        bar = $('[data-proj-bar]', s.el);
        sr = $('[data-proj-sr]', s.el);
        veil = $('[data-veil]', s.el);
        next = $('[data-next]', s.el);
        glowL = $('[data-glow-l]', s.el);
        glowR = $('[data-glow-r]', s.el);
        idx = 0;
      },
      refresh: function () { sr.textContent = I18N.t('p.sr').replace('{n}', idx + 1); },
      update: function (p) {
        var slots = seg(p, 0, .56) * N;
        var i = Math.min(N - 1, Math.floor(slots));
        setIndex(i);
        bar.style.transform = 'scaleX(' + ((i + clamp(slots - i, 0, 1)) / N).toFixed(4) + ')';

        var d = easeInOut(seg(p, .58, .68));
        veil.style.opacity = d;
        proj.style.transform = d ? 'scale(' + (1 - .05 * d).toFixed(4) + ')' : '';
        proj.style.filter = d ? 'blur(' + (d * 10).toFixed(2) + 'px)' : '';

        var g = easeOut(seg(p, .67, .8));
        next.classList.toggle('is-visible', p > .6);
        glowL.style.opacity = g;
        glowR.style.opacity = g;
        glowL.style.transform = 'translate3d(' + lerp(-40, 12, g).toFixed(2) + 'vw,0,0)';
        glowR.style.transform = 'translate3d(' + lerp(40, -12, g).toFixed(2) + 'vw,0,0)';
        // Title, text and button slide in with the scroll (0 = off to the side, 1 = in place)
        var c1 = easeOut(seg(p, .76, .90));   // title
        var c2 = easeOut(seg(p, .79, .93));   // text
        var c3 = easeOut(seg(p, .82, .96));   // button
        next.style.setProperty('--c1', c1.toFixed(3));
        next.style.setProperty('--c2', c2.toFixed(3));
        next.style.setProperty('--c3', c3.toFixed(3));
      }
    };
  })());

  /* =========================================================
     SCENE: BUILD — scroll-scrubbed video, 4 stages
     ========================================================= */
  addScene($('[data-scene="build"]'), (function () {
    // keyframe times (s) where the computer rests for each stage
    var T = [1.1, 4.1, 6.3, 9.2];
    // horizontal centre of the computer in the frame (0–1), sampled every 0.25s
    var CX = [.744,.742,.739,.739,.739,.739,.739,.739,.744,.741,.662,.503,.341,.25,.242,.241,.241,.241,.236,.262,.412,.603,.72,.722,.72,.722,.723,.717,.642,.486,.328,.242,.241,.242,.244,.244,.244,.242,.241,.239];
    var video, vbox, logo, steps, dots, active = -1, want = 0, leaveTimer, loaded = false;

    function centroid(t) {
      var f = clamp(t / .25, 0, CX.length - 1);
      var a = Math.floor(f), b = Math.min(CX.length - 1, a + 1);
      return lerp(CX[a], CX[b], f - a);
    }
    function setStep(i) {
      if (i === active) return;
      var prev = active;
      steps.forEach(function (el, k) {
        el.classList.remove('is-leaving');
        if (k === prev) el.classList.add('is-leaving');
        el.classList.toggle('is-active', k === i);
        el.setAttribute('aria-hidden', String(k !== i));
      });
      if (i >= 0) dots.forEach(function (d, k) { d.classList.toggle('is-active', k === i); });
      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(function () { steps.forEach(function (el) { el.classList.remove('is-leaving'); }); }, 900);
      active = i;
    }
    function loadFull() {
      if (loaded) return;
      loaded = true;
      var srcs = $$('source', video);
      // Prefer "probably" over "maybe" so browsers without H.264 get the WebM.
      var ranked = srcs.slice().sort(function (a, b) {
        var r = function (el) { var c = video.canPlayType(el.getAttribute('type')); return c === 'probably' ? 2 : c === 'maybe' ? 1 : 0; };
        return r(b) - r(a);
      });
      var n = 0;
      function tryNext() {
        var el = ranked[n++];
        if (!el) return;
        var src = el.getAttribute('src');
        var t = want;
        var setSrc = function (url) {
          video.preload = 'auto';          // preload="none" in the HTML would otherwise block loading
          video.src = url;
          video.load();
          video.addEventListener('loadeddata', function once() {
            video.removeEventListener('loadeddata', once);
            // Safari only paints seeked frames after the video has played once
            var pr = video.play();
            if (pr && pr.then) pr.then(function () { video.pause(); seekNow(); }).catch(seekNow);
            else seekNow();
          });
        };
        var seekNow = function () { try { video.currentTime = want; } catch (e) { /* ignore */ } };
        // Fetch the whole file so seeking is instant (no range requests).
        if (window.fetch && location.protocol !== 'file:') {
          fetch(src).then(function (r) { return r.ok ? r.blob() : Promise.reject(); })
            .then(function (blob) { setSrc(URL.createObjectURL(blob)); })
            .catch(function () { setSrc(src); });
        } else {
          setSrc(src);
        }
      }
      video.addEventListener('error', tryNext);
      tryNext();
    }
    return {
      init: function (s) {
        video = $('[data-video]', s.el);
        vbox = $('[data-vbox]', s.el);
        logo = $('[data-screen-logo]', s.el);
        steps = $$('.bstep', s.el);
        dots = $$('.build__dots li', s.el);
        setStep(0);
        video.pause();
        // Start loading when the section is getting close.
        if ('IntersectionObserver' in window) {
          var io = new IntersectionObserver(function (en) {
            if (en[0].isIntersecting) { loadFull(); io.disconnect(); }
          }, { rootMargin: '150% 0px' });
          io.observe(s.el);
        } else { loadFull(); }
        // iOS needs a user gesture before it paints seeked frames.
        var unlock = function () {
          var pr = video.play();
          if (pr && pr.then) pr.then(function () { video.pause(); }).catch(function () {});
          window.removeEventListener('touchstart', unlock);
        };
        window.addEventListener('touchstart', unlock, { passive: true });
      },
      update: function (p) {
        var x = p * 3;
        var i = Math.min(2, Math.floor(x));
        var e = easeInOut(seg(x - i, .22, .78));
        want = lerp(T[i], T[i + 1], e);
        // old copy leaves as the computer starts moving, new copy arrives as it settles
        setStep(e > .72 ? i + 1 : e > .16 ? -1 : i);
        if (!desktopMQ.matches) {
          var w = vbox.offsetWidth;
          var pan = (.5 - centroid(want)) * w;
          vbox.style.setProperty('--pan', pan.toFixed(1) + 'px');
        } else {
          vbox.style.removeProperty('--pan');
        }
      },
      frame: function () {
        if (video.readyState >= 1 && !video.seeking && Math.abs(video.currentTime - want) > .015) {
          try { video.currentTime = want; } catch (err) { /* not seekable yet */ }
        }
      }
    };
  })());

  /* =========================================================
     SCENE: AI — image grows, white halo, content
     ========================================================= */
    addScene($('[data-scene="ai"]'), (function () {
    var media, img, halo, content;
    return {
      init: function (s) {
        media = $('[data-ai-media]', s.el);
        img = $('[data-ai-img]', s.el);
        halo = $('[data-ai-halo]', s.el);
        content = $('[data-ai-content]', s.el);
      },
      update: function (p) {
        if (!desktopMQ.matches) {            // mobile: no scroll animation, clear desktop styles
          media.style.clipPath = ''; media.style.opacity = '';
          img.style.transform = ''; halo.style.opacity = '';
          return;
        }
        var a = easeInOut(seg(p, .02, .4));
        var inset = (1 - a) * 34;
        var sideInset = (1 - a) * 34;
        media.style.clipPath = 'inset(' + inset.toFixed(2) + '% ' + sideInset.toFixed(2) + '% ' + inset.toFixed(2) + '% ' + sideInset.toFixed(2) + '%)';
        media.style.opacity = seg(p, 0, .16).toFixed(3);
        var b = easeInOut(seg(p, .42, .64));
        img.style.transform = 'scale(' + (1.3 - .3 * a - .2 * b).toFixed(4) + ')';
        halo.style.opacity = b.toFixed(3);
        content.classList.toggle('is-in', p > .68);
      },
      frame: function (s) {
        if (desktopMQ.matches) return;
        var inView = s.px > -vh * .6;       // section top has reached 60% down the screen
        s.el.classList.toggle('is-in', inView);
        content.classList.toggle('is-in', inView);
      }
    };
  })());

  /* =========================================================
     SCENE: DIRECTION — dot follows path, copy fades in
     ========================================================= */
  addScene($('[data-scene="direction"]'), (function () {
    var trail, dot, L = 0, words = [], lastO = [];
    return {
      init: function (s) {
        trail = $('[data-trail]', s.el);
        dot = $('[data-dot]', s.el);
        L = trail.getTotalLength();
        trail.style.strokeDasharray = L;
        this.refresh(s);
      },
      refresh: function (s) { words = $$('[data-dir-content] .w__i', s.el); lastO = []; },
      update: function (p) {
        var k = seg(p, .02, .92);
        var pt = trail.getPointAtLength(k * L);
        // Dot grows in at the start, then shrinks and fades out as it reaches the finish
        var show = easeOut(seg(p, .02, .12));
        var hide = easeInOut(seg(p, .82, .92));
        var vis = show * (1 - hide);
        dot.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ') scale(' + (.3 + .7 * vis).toFixed(3) + ')');
        dot.style.opacity = vis.toFixed(3);
        trail.style.strokeDashoffset = (L * (1 - k)).toFixed(1);
        var r = seg(p, .1, .86) * (words.length + 6);
        for (var i = 0; i < words.length; i++) {
          var o = Math.round(clamp((r - i) / 6, .08, 1) * 100) / 100;
          if (lastO[i] !== o) { words[i].style.setProperty('--o', o); lastO[i] = o; }
        }
      }
    };
  })());

  /* =========================================================
     HERO — parallax + pointer tilt on the 3D mark
     ========================================================= */
  (function () {
    var hero = $('.hero');
    var wrap = $('[data-hero-logo]');
    var tilt = $('[data-tilt]');
    var tx = 0, ty = 0, cx = 0, cy = 0;
    if (finePointer.matches) {
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - .5) * 2;
        ty = ((e.clientY - r.top) / r.height - .5) * 2;
      });
      hero.addEventListener('pointerleave', function () { tx = ty = 0; });
    }
    hooks.push(function (y, dt) {
      if (y > vh * 1.3) return;
      var a = reduceMQ.matches ? 1 : 1 - Math.exp(-dt * 5);
      cx += (tx - cx) * a; cy += (ty - cy) * a;
      var par = reduceMQ.matches ? 0 : y * .18;
      wrap.style.transform = 'translate3d(-50%,' + par.toFixed(1) + 'px,0)';
      tilt.style.transform = 'perspective(1200px) rotateY(' + (cx * 7).toFixed(2) + 'deg) rotateX(' + (-cy * 5).toFixed(2) + 'deg)';
    });
  })();

  /* =========================================================
     CAPABILITIES — active item + progress meter
     ========================================================= */
  (function () {
    var list = $('[data-caps]');
    var items = $$('.cap', list);
    var meter = $('[data-caps-meter]');
    var section = $('.caps');
    var panel = $('.caps__panel');
    var cur = -1;
    hooks.push(function () {
      var r = section.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var focus = desktopMQ.matches ? vh * .5 : panel.offsetHeight + (vh - panel.offsetHeight) * .45;
      var best = 0, bestD = Infinity;
      for (var i = 0; i < items.length; i++) {
        var b = items[i].getBoundingClientRect();
        var d = Math.abs(b.top + b.height / 2 - focus);
        if (d < bestD) { bestD = d; best = i; }
      }
      if (best !== cur) {
        items.forEach(function (it, k) { it.classList.toggle('is-active', k === best); });
        cur = best;
      }
      var prog = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
      meter.style.transform = 'scaleX(' + prog.toFixed(3) + ')';
      // Grey background fades in once the section has locked to the top
      var locked = -r.top;                                   // px scrolled since the section reached the top
      panel.style.setProperty('--caps-bg', clamp(locked / (vh * .25), 0, 1).toFixed(3));

      // After the last item, the whole section dissolves to white before the next one
      var end = r.height - vh;                               // point where the section releases
      var fade = clamp((locked - (end - vh * .6)) / (vh * .6), 0, 1);
      section.style.opacity = (1 - fade).toFixed(3);
    });
  })();

  /* =========================================================
     IN-VIEW REVEALS
     ========================================================= */
  (function () {
    var targets = $$('.reveal, [data-wordmark]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: .12 });
    targets.forEach(function (el) { io.observe(el); });
  })();

  /* =========================================================
     MARQUEE — clone the text until the screen is always full
     ========================================================= */
  (function () {
    var SPEED = 70; // pixels per second: higher = faster
    var track = $('.marquee__track');
    if (!track) return;
    function build() {
      var groups = $$('.marquee__group', track);
      var first = groups[0];
      groups.slice(1).forEach(function (g) { g.remove(); });   // keep only the original
      var w = first.offsetWidth;
      var copies = Math.ceil(window.innerWidth / w) + 1;       // enough to cover the screen, plus one
      for (var i = 0; i < copies; i++) track.appendChild(first.cloneNode(true));
      track.style.setProperty('--mq-shift', -w + 'px');         // move exactly one group, then loop
      track.style.setProperty('--mq-dur', (w / SPEED) + 's');
    }
    build();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    document.addEventListener('sadatech:lang', build);
    var t;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(build, 200); });
  })();

    /* =========================================================
     MARQUEE — eases down to a slow speed on hover
     ========================================================= */
  (function () {
    var marquee = $('.marquee');
    var track = $('.marquee__track');
    if (!marquee || !track || !track.getAnimations) return;
    var rate = 1, target = 1;
    marquee.addEventListener('pointerenter', function () { target = .25; });
    marquee.addEventListener('pointerleave', function () { target = 1; });
    hooks.push(function (y, dt) {
      if (Math.abs(target - rate) < .001) return;
      rate += (target - rate) * (1 - Math.exp(-dt * 4));
      track.getAnimations().forEach(function (a) { a.playbackRate = rate; });
    });
  })();

  /* =========================================================
     ABOUT — card width matches the widest line of the big text
     ========================================================= */
  (function () {
    var card = $('[data-about-card]');
    if (!card) return;
    function fit() {
      card.style.width = '';   // reset first, so we measure the text at its natural width
      var left = Infinity, right = -Infinity;
      $$('.about__big .cw').forEach(function (w) {
        var b = w.getBoundingClientRect();
        if (b.left < left) left = b.left;
        if (b.right > right) right = b.right;
      });
      if (right > left) card.style.width = Math.round(right - left) + 'px';
    }
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    document.addEventListener('sadatech:lang', function () { requestAnimationFrame(fit); });
    var t;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(fit, 150); });
  })();

  /* ---------- nav state ---------- */
  hooks.push(function (y) { nav.classList.toggle('is-scrolled', y > 24); });

  /* ---------- boot ---------- */
  document.addEventListener('sadatech:lang', function () { refreshAll(); requestAnimationFrame(measure); });
  var rT;
  window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(measure, 120); });
  window.addEventListener('load', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  measure();
  requestAnimationFrame(tick);

  (function () {
    var started = false;
    function start() { if (started) return; started = true; requestAnimationFrame(function () { doc.classList.add('is-loaded'); }); }
    var waits = []; var img = $('.hero__logo img');
    if (img && img.decode) waits.push(img.decode().catch(function () {}));
    if (document.fonts && document.fonts.ready) waits.push(document.fonts.ready);
    Promise.all(waits).then(start); setTimeout(start, 2500);
  })();
})();
