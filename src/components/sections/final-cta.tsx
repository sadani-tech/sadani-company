import { ButtonLink } from "../ui/button-link";
import { Container } from "../ui/container";

export function FinalCta() {
  return <section className="bg-green py-20 text-white sm:py-28"><Container><div className="grid items-end gap-9 lg:grid-cols-[1fr_auto]"><div className="max-w-3xl"><p className="eyebrow text-mint">Build something useful</p><h2 className="section-title mt-4 text-white">Ideas are better when they become real.</h2><p className="section-copy mt-5 max-w-2xl text-white/70">We’re building products, exploring technology, and looking for meaningful problems worth solving.</p></div><div className="flex flex-wrap gap-3"><ButtonLink href="/products" variant="light">Explore our products</ButtonLink><ButtonLink href="/contact" variant="secondary" className="border-white/25 text-white hover:bg-white/10">Talk to Sadani</ButtonLink></div></div></Container></section>;
}
