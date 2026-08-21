import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
export default function NotFound() { return <section className="not-found"><Container><span>404</span><h1>This page hasn’t been built yet.</h1><p>The product might have moved, evolved, or simply doesn’t exist.</p><ButtonLink href="/" className="mt-8"><ArrowLeft size={17} /> Back to Sadani</ButtonLink></Container></section>; }
