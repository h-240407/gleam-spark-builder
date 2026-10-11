import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IntelligenceMap } from "@/components/intelligence-map";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "CLIAS — Adaptive Learning Intelligence" },
    { name: "description", content: "Learn smarter with CLIAS. Adaptive learning intelligence, personalized assessments and learning analytics." },
    { property: "og:title", content: "CLIAS — Adaptive Learning Intelligence" },
    { property: "og:description", content: "Learn faster, understand deeper, and achieve more with personalized learning." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  return <div className="home grid-paper">
    <header className="home-header"><Link to="/" className="brand" aria-label="CLIAS home">CLIAS<span className="coral">.</span></Link><span className="mono">(A) — LEARNING INTELLIGENCE</span><span className="status mono"><i className="status-dot" />SYSTEM ONLINE</span></header>
    <main className="home-main"><div><div className="eyebrow mono"><span className="index-box">01</span>ADAPTIVE EDUCATION PLATFORM</div><h1 className="home-title display"><span>LEARN</span><span className="coral">SMARTER</span><span>WITH CLIAS.</span></h1><p className="home-description">Powered by adaptive learning intelligence and personalized assessments, CLIAS helps you learn faster, understand deeper, and achieve more.</p><Button variant="action" asChild><Link to="/workspace/$section" params={{ section: "dashboard" }}>EXPLORE LEARNING<ArrowRight /></Link></Button></div><IntelligenceMap /></main>
    <footer className="home-footer mono"><span>CHARUSAT / EDUCATION SYSTEM / 2025</span><span>FIG. 01 — ADAPTIVE LEARNING SYSTEM</span></footer>
  </div>;
}
