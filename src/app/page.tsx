import { ArrowUpRight, Bot, Boxes, Braces, CloudCog, Database, Smartphone, Workflow } from "lucide-react";
import { Ecosystem } from "@/components/sections/ecosystem";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HomeProducts } from "@/components/sections/home-products";
import { SectionHeading } from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

const capabilities = [
  { icon: Braces, title: "Web applications", copy: "Focused, responsive products built for the browser." },
  { icon: Smartphone, title: "Mobile applications", copy: "Useful experiences designed around how people move." },
  { icon: CloudCog, title: "Cloud infrastructure", copy: "Reliable foundations that can evolve with a product." },
  { icon: Bot, title: "AI-assisted systems", copy: "Applied carefully where intelligence improves the outcome." },
  { icon: Workflow, title: "APIs & automation", copy: "Connections and workflows that remove repetitive work." },
  { icon: Database, title: "Data products", copy: "Clearer information for better product decisions." },
];

export default function Home() {
  return <><Hero /><Ecosystem /><HomeProducts /><section className="section bg-white"><Container><div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24"><SectionHeading eyebrow="Why Sadani" title="Build useful things. Keep them simple." description="We turn practical ideas into digital products, learning through the work and improving what we make over time." /><div className="principle-list"><Principle number="01" title="Start with a real problem" copy="Technology matters when it removes friction, creates clarity, or makes something genuinely easier." /><Principle number="02" title="Make complexity feel simple" copy="The systems behind a product can be sophisticated. The experience should still feel considered and clear." /><Principle number="03" title="Learn by building" copy="Working products create better questions. We use what we learn to improve each next version." /></div></div></Container></section><section className="section bg-surface"><Container><div className="ai-panel"><div className="ai-symbol" aria-hidden="true"><Boxes size={54} strokeWidth={1.25} /></div><div><p className="eyebrow text-green">Built in the age of AI</p><h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-ink sm:text-4xl">More leverage. The same product discipline.</h2><p className="section-copy mt-5">We see AI as a tool that expands what focused teams can build. We use modern technology to move from ideas to working products faster while keeping product thinking and user needs at the center.</p></div></div></Container></section><section className="section bg-ink text-white"><Container><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><SectionHeading eyebrow="How we build" title="Technology is the infrastructure. Products are the outcome." description="We choose capabilities for the problems they help solve—not simply to look technical." light /><ButtonLink href="/about" variant="secondary" className="self-start border-white/20 text-white hover:bg-white/10">Our approach <ArrowUpRight size={16} /></ButtonLink></div><div className="capability-grid mt-12">{capabilities.map(({ icon: Icon, title, copy }) => <div className="capability" key={title}><Icon size={23} strokeWidth={1.6} /><h3>{title}</h3><p>{copy}</p></div>)}</div></Container></section><section className="section bg-white"><Container><div className="vision-block"><p className="eyebrow text-green">Our direction</p><h2>Small ideas can become meaningful products.</h2><p>We believe technology should make it easier to turn ideas into products people can actually use. Our long-term direction is a growing portfolio of useful digital products across different parts of life.</p></div></Container></section><FinalCta /></>;
}

function Principle({ number, title, copy }: { number: string; title: string; copy: string }) { return <div className="principle"><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>; }
