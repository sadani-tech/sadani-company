"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

type SceneLink = { href: string; color: string };

export function HeroExperience({ links }: { links: SceneLink[] }) {
  return <div className="hero-scene-shell"><div className="hero-scene-glow" /><HeroScene links={links} /><div className="hero-scene-noise" /></div>;
}
