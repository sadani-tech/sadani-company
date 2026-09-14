"use client";

import { useEffect } from "react";

export function HomeEffects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".home-experience");
    if (!root) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = root.querySelectorAll<HTMLElement>("section:not(.hero), .product-card, .principle, .capability, .ai-panel, .vision-block");
    revealTargets.forEach((target) => target.classList.add("home-reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("home-reveal-visible"); observer.unobserve(entry.target); } });
    }, { rootMargin: "0px 0px -10%", threshold: 0.08 });
    revealTargets.forEach((target) => observer.observe(target));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--home-scroll", `${max > 0 ? window.scrollY / max : 0}`);
    };
    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    onScroll();

    const cleanupTilt: Array<() => void> = [];
    if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
      root.querySelectorAll<HTMLElement>(".product-card, .capability").forEach((card) => {
        const move = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`);
          card.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`);
        };
        const leave = () => { card.style.setProperty("--tilt-x", "0deg"); card.style.setProperty("--tilt-y", "0deg"); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanupTilt.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); });
      });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      cleanupTilt.forEach((cleanup) => cleanup());
    };
  }, []);

  return <><div className="home-scroll-progress" aria-hidden="true" /><div className="home-pointer-aura" aria-hidden="true" /></>;
}
