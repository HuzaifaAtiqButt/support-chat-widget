import Link from "next/link";
import { ChatWidget } from "@/components/ChatWidget";
import { BUSINESS } from "@/lib/kb";

const PRODUCTS = [
  { name: "Harbor House", note: "Medium roast. Chocolate and nut.", hue: 28 },
  { name: "Morning Tide", note: "Light roast. Citrus and floral.", hue: 45 },
  { name: "Night Watch", note: "Dark roast. Smoky and rich.", hue: 15 },
];

const TRY = ["How long does shipping take?", "Track order 1042", "My bag arrived damaged (then send a photo)", "Can I pause my subscription?"];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 36 36" aria-hidden="true">
            <rect width="36" height="36" rx="9" fill="var(--brand)" />
            <path d="M10 15h13v6a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5z" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M23 17h2a2.5 2.5 0 0 1 0 5h-2M14 9v2M18 9v2" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span className="text-lg font-semibold tracking-tight">{BUSINESS.name}</span>
        </div>
        <Link href="/admin" className="text-sm underline" style={{ color: "var(--muted)" }}>
          Admin inbox
        </Link>
      </header>

      <section className="py-14">
        <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight">{BUSINESS.tagline}</h1>
        <p className="mt-3 max-w-lg text-sm" style={{ color: "var(--muted)" }}>
          This is a sample shop page. The chat button at the bottom right is the demo: a support widget you could add to any site.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {PRODUCTS.map((p) => (
          <div key={p.name} className="overflow-hidden rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--line)" }}>
            <div className="h-28" style={{ background: `linear-gradient(135deg, hsl(${p.hue} 55% 38%), hsl(${p.hue} 60% 22%))` }} aria-hidden="true" />
            <div className="p-4">
              <h2 className="font-medium">{p.name}</h2>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{p.note}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--line)" }}>
        <h2 className="font-semibold">Things to try in the chat</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm" style={{ color: "var(--muted)" }}>
          {TRY.map((t) => <li key={t}>{t}</li>)}
          <li>Type an email address to leave your details with the team</li>
          <li>Use the camera button to take or choose a photo</li>
        </ul>
        <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
          Then open the <Link href="/admin" className="underline">admin inbox</Link> to see the conversation, the lead and the ticket.
        </p>
      </section>

      <footer className="mt-10 border-t pt-4 text-xs" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
        Demo project with a made-up shop. Answers come from a small built-in list of facts, not a language model. Conversations and photos stay in your browser and nothing is sent anywhere.
      </footer>
      <ChatWidget />
    </main>
  );
}
