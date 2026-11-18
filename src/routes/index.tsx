import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Building2, Home, Briefcase, Sparkles, Sofa, Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import logoImg from "@/assets/bresser-uklid-logo.png";
import iconImg from "@/assets/bresser-uklid-icon.png";
const NAME = "BRESSER ÚKLID";
const MOTO = "SPOLEHLIVOST • KVALITA";
const PHONE = "+420 602 236 881";
const EMAIL = "michael.v.b@seznam.cz";
const TITLE = `Úklidová firma Boskovice a Blansko | Úklid bytových domů, bytů a kanceláří – ${NAME}`;
const DESC = "Spolehlivý úklid SVJ, rodinných domů, kanceláří, mytí oken a tepování nábytku v Boskovicích, Blansku, Letovicích a okolí. Garantovaný záskok, kalkulace zdarma.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "HouseCleaningService", name: NAME, slogan: MOTO, telephone: PHONE, email: EMAIL,
      logo: logoImg, image: logoImg,
      address: { "@type": "PostalAddress", addressLocality: "Boskovice", addressCountry: "CZ" },
      areaServed: ["Boskovice","Blansko","Letovice","Kunštát","Rájec-Jestřebí","Velké Opatovice","Lysice","Černá Hora","Svitávka"],
      hasOfferCatalog: { "@type": "OfferCatalog", name: "Úklidové služby", itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.t } })) },
      taxID: "21821062" }) }],
  }),
  component: Index,
});

const services: { icon: LucideIcon; t: string; d: string; wide?: boolean }[] = [
  { icon: Building2, t: "Pravidelný úklid bytových domů (SVJ)", d: "Vytírání chodeb, mytí výtahů a zábradlí, úklid vchodů. Garantovaný záskok – úklid proběhne vždy." },
  { icon: Home, t: "Úklid rodinných domů a bytů", d: "Pravidelný i jednorázový úklid domácností. Možnost ekologické čisticí chemie." },
  { icon: Briefcase, t: "Úklid kanceláří, ordinací a firem", d: "Diskrétní a pečlivý úklid kanceláří a provozoven v Boskovicích a Blansku." },
  { icon: Sparkles, t: "Generální úklidy a mytí oken", d: "Úklid po malování a rekonstrukcích, mytí oken a rámů, důkladný generální úklid." },
  { icon: Sofa, t: "Tepování nábytku a koberců", d: "Hlubkové čištění gaučů, sedacích souprav, židlí, matrací i koberců – zbavíme je nečistot, skvrn i zápachu.", wide: true },
];
const prices: [string, string][] = [
  ["Úklid vchodů a společných prostor SVJ", "od 2 000 Kč / měsíc"],
  ["Úklid bytů a rodinných domů", "od 300 Kč / hod."],
  ["Generální úklidy a mytí oken", "od 380 Kč / hod."],
];
const towns = ["Boskovice","Blansko","Letovice","Kunštát","Rájec-Jestřebí","Velké Opatovice","Lysice","Černá Hora","Svitávka"];
const faq: [string, string][] = [
  ["Jak probíhá nacenění?", "Po telefonu nebo přes formulář se domluvíme na bezplatné prohlídce. Na místě zjistíme rozsah prací a obratem pošleme přesnou kalkulaci – zdarma a nezávazně."],
  ["Co když uklízečka onemocní?", "Máme vždy zajištěný záskok. Při nemoci či dovolené za ni nastoupí zaškolená kolegyně, takže úklid proběhne v domluveném termínu."],
  ["Používáte vlastní čisticí prostředky?", "Ano, přivezeme vlastní profesionální prostředky i vybavení. Na přání použijeme ekologickou čisticí chemii."],
  ["Ve kterých obcích uklízíte?", "Působíme v Boskovicích, Blansku, Letovicích, Kunštátě, Rájci-Jestřebí, Velkých Opatovicích, Lysicích, Černé Hoře a Svitávce – a v okolí do 25 km. Pokud vaše obec není v seznamu, zavolejte nebo napište, domluvíme se."],
];

function Index() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "").trim().slice(0, 200);
    const body = `Jméno: ${g("name")}\nTelefon: ${g("phone")}\nTyp úklidu: ${g("type")}\nMěsto: ${g("city")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Poptávka úklidu")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const tel = `tel:${PHONE.replace(/\s/g, "")}`;
  const input = "w-full rounded-lg border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2.5">
            <img src={iconImg} alt="" aria-hidden="true" className="h-9 w-9 shrink-0" />
            <span className="font-display text-lg font-extrabold tracking-tight text-primary">{NAME}</span>
          </a>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <a href="#sluzby" className="hover:text-primary">Služby</a><a href="#cenik" className="hover:text-primary">Ceník</a>
            <a href="#lokalita" className="hover:text-primary">Kde působíme</a><a href="#faq" className="hover:text-primary">FAQ</a>
            <a href="#kontakt" className="hover:text-primary">Kontakt</a>
          </nav>
          <a href={tel} className="flex items-center gap-2 text-sm font-semibold text-primary"><Phone className="h-4 w-4" />{PHONE}</a>
        </div>
      </header>

      <main>
        <section className="bg-hero">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
            <div className="order-2 md:order-1">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-success">{MOTO}</p>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground"><ShieldCheck className="h-4 w-4" />Úklid v Boskovicích, Blansku a okolí</p>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Spolehlivá úklidová firma pro <span className="text-primary">Boskovice, Blansko</span> a okolí</h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">100% spolehlivost a vždy zajištěný záskok při nemoci uklízečky. Uklízíme bytové domy, domácnosti i kanceláře – pečlivě a včas.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-8 text-base shadow-soft"><a href="#kontakt">Nezávazná poptávka</a></Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base"><a href={tel}><Phone className="h-4 w-4" />{PHONE}</a></Button>
              </div>
              <ul className="mt-10 grid gap-3 text-sm font-medium sm:grid-cols-3">
                {["Garantovaný záskok", "Prohlídka a kalkulace zdarma", "Zodpovědný přístup"].map((x) => (
                  <li key={x} className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-success" />{x}</li>))}
              </ul>
            </div>
            <div className="order-1 flex justify-center md:order-2 md:justify-end">
              <img src={logoImg} alt="BRESSER ÚKLID – úklidové služby Boskovice" className="h-32 w-auto md:h-56" />
            </div>
          </div>
        </section>

        <section id="sluzby" className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">Naše úklidové služby v Boskovicích a Blansku</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: I, t, d, wide }) => (
              <article key={t} className={`rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1${wide ? " sm:col-span-2 lg:col-span-2" : ""}`}>
                <div className="mb-4 inline-flex rounded-xl bg-secondary p-3 text-primary"><I className="h-6 w-6" /></div>
                <h3 className="text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </article>))}
          </div>
        </section>

        <section id="cenik" className="bg-muted">
          <div className="mx-auto max-w-3xl px-4 py-20">
            <h2 className="text-3xl font-bold md:text-4xl">Orientační ceník úklidu</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-left">
                <thead className="bg-primary text-primary-foreground"><tr><th className="p-4">Služba</th><th className="p-4 text-right">Cena</th></tr></thead>
                <tbody>{prices.map(([a, b]) => (
                  <tr key={a} className="border-t border-border"><td className="p-4">{a}</td><td className="p-4 text-right font-bold whitespace-nowrap text-primary">{b}</td></tr>))}</tbody>
              </table>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-success" />Prohlídka a přesná kalkulace jsou zdarma.</p>
          </div>
        </section>

        <section id="lokalita" className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">Kde působíme – úklid na Boskovicku a Blanensku</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">Úklidové služby poskytujeme v těchto městech a obcích a v okolí do 25 km:</p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {towns.map((t) => (<li key={t} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-medium"><MapPin className="h-4 w-4 text-success" />Úklid {t}</li>))}
            <li className="rounded-full bg-accent px-4 py-2 font-medium text-accent-foreground">a okolí do 25 km</li>
          </ul>
        </section>

        <section id="faq" className="bg-muted">
          <div className="mx-auto max-w-3xl px-4 py-20">
            <h2 className="text-3xl font-bold md:text-4xl">Časté dotazy – FAQ</h2>
            <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-border bg-card px-6">
              {faq.map(([q, a]) => (<AccordionItem key={q} value={q}><AccordionTrigger className="text-left text-base font-semibold"><h3>{q}</h3></AccordionTrigger><AccordionContent className="text-muted-foreground">{a}</AccordionContent></AccordionItem>))}
            </Accordion>
          </div>
        </section>

        <section id="kontakt" className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Nezávazná poptávka úklidu</h2>
            <p className="mt-4 text-muted-foreground">Vyplňte formulář, nebo nám rovnou zavolejte. Ozveme se nejpozději do 24 hodin.</p>
            <div className="mt-8 space-y-3 font-medium">
              <a href={tel} className="flex items-center gap-3 text-primary"><Phone className="h-5 w-5" />{PHONE}</a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-primary"><Mail className="h-5 w-5" />{EMAIL}</a>
              <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-success" />Boskovice</p>
            </div>
          </div>
          <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <input name="name" required maxLength={100} placeholder="Jméno" className={input} aria-label="Jméno" />
            <input name="phone" required type="tel" maxLength={20} pattern="[0-9+ ]{9,20}" placeholder="Telefon" className={input} aria-label="Telefon" />
            <select name="type" required defaultValue="" className={input} aria-label="Typ úklidu">
              <option value="" disabled>Typ úklidu</option>
              {services.map((s) => <option key={s.t}>{s.t}</option>)}
            </select>
            <input name="city" required maxLength={60} placeholder="Město" className={input} aria-label="Město" />
            <Button type="submit" size="lg" className="h-12 w-full text-base">Odeslat poptávku</Button>
            {sent && <p className="text-sm text-success">Děkujeme! Otevřel se váš e-mail k odeslání poptávky.</p>}
          </form>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 text-sm md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="rounded-2xl bg-card px-6 py-3"><img src={logoImg} alt="BRESSER ÚKLID – úklidové služby Boskovice" className="h-20 w-auto" /></div>
          </div>
          <div className="text-center md:text-right">
            <p className="font-semibold">{NAME} – úklidová firma Boskovice a Blansko</p>
            <p className="mt-1 text-primary-foreground/80">IČO: 21821062 · Boskovice · {PHONE} · {EMAIL}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
