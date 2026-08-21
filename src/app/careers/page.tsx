import type { Metadata } from "next";
import { Code2, DraftingCompass, Hammer, Lightbulb } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Careers", description: "Learn about future opportunities to build useful digital products with Sadani.", alternates: { canonical: "/careers" } };
const people = [{ icon: Code2, label: "Engineers" }, { icon: DraftingCompass, label: "Designers" }, { icon: Lightbulb, label: "Product thinkers" }, { icon: Hammer, label: "Builders" }];

export default function CareersPage() { return <><section className="page-hero"><Container><p className="eyebrow text-green">Careers</p><h1>Build with us.</h1><p>We’re interested in meeting thoughtful people who care about useful products, clear experiences, and doing the work.</p></Container></section><section className="pb-24 sm:pb-32"><Container><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{people.map(({ icon: Icon, label }) => <div className="career-type" key={label}><Icon size={24} /><span>{label}</span></div>)}</div><div className="empty-state mt-8"><span className="status-dot" /><div><p className="eyebrow text-green">Current openings</p><h2>No open positions right now.</h2><p>That may change as our products grow. If Sadani’s way of building resonates with you, introduce yourself and tell us what you care about making.</p><ButtonLink href="/contact?type=career" className="mt-7">Share your interest</ButtonLink></div></div></Container></section></>; }
