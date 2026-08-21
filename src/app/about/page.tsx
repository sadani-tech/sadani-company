import type { Metadata } from "next";
import { ArrowUpRight, Gauge, Lightbulb, RefreshCcw, Shapes } from "lucide-react";
import { FinalCta } from "@/components/sections/final-cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "About", description: "Sadani is an Indonesian technology company turning useful ideas into digital products.", alternates: { canonical: "/about" } };

const values = [
  { icon: Lightbulb, title: "Build useful things", copy: "Technology should solve real problems instead of existing only for novelty." },
  { icon: Shapes, title: "Keep things simple", copy: "Complex technology should result in experiences that feel clear and natural." },
  { icon: RefreshCcw, title: "Learn through products", copy: "Products improve through experimentation, thoughtful observation, and user feedback." },
  { icon: Gauge, title: "Technology as leverage", copy: "Modern software and AI help focused teams turn ambitious ideas into working products efficiently." },
];

export default function AboutPage() { return <><section className="page-hero"><Container><p className="eyebrow text-green">About Sadani</p><h1>We build first. We learn fast. <em>We keep improving.</em></h1><p>Sadani is a technology company focused on turning useful ideas into digital products people can actually use.</p></Container></section><section className="section bg-white"><Container><div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24"><SectionHeading eyebrow="What we believe" title="Good products begin with a useful point of view." description="We are building a portfolio—not a collection of disconnected experiments. Every Sadani product shares the same intent: make an everyday problem simpler." /><div className="grid gap-4 sm:grid-cols-2">{values.map(({ icon: Icon, title, copy }) => <article className="value-card" key={title}><Icon size={24} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></Container></section><section className="section bg-ink text-white"><Container><div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24"><div className="about-grid" aria-hidden="true"><span>S</span>{[1,2,3,4,5,6,7,8].map((item) => <i key={item} />)}</div><div><SectionHeading eyebrow="Built in Indonesia, relevant anywhere" title="Local context. Global product standards." description="We build from Indonesia with the belief that clear thinking, useful technology, and well-crafted products travel well." light /><ButtonLink href="/products" variant="secondary" className="mt-8 border-white/20 text-white hover:bg-white/10">See our products <ArrowUpRight size={16} /></ButtonLink></div></div></Container></section><section className="section bg-surface"><Container><div className="vision-block text-left"><p className="eyebrow text-green">The road ahead</p><h2>Sadani is designed to keep building.</h2><p>Serahin, Money Flow, and Tuju are part of a wider direction: a growing portfolio of thoughtful digital products across industries and everyday needs.</p></div></Container></section><FinalCta /></>; }
