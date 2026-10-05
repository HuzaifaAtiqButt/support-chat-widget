import Link from "next/link";
import { ChatWidget } from "@/components/ChatWidget";
import { BUSINESS } from "@/lib/kb";

const MENU = [
  { name: "Harbor House", notes: "Chocolate, toasted hazelnut", roast: 3, price: "$16" },
  { name: "Morning Tide", notes: "Orange peel, jasmine", roast: 2, price: "$18" },
  { name: "Night Watch", notes: "Dark cocoa, smoke", roast: 5, price: "$16" },
  { name: "Harbor House Decaf", notes: "Same roast, water-processed", roast: 3, price: "$17" },
];

const TRY = [
  "How long does shipping take?",
  "Track order 1042",
  "My bag arrived damaged, then send a photo",
  "Can I pause my subscription?",
  "Type an email address to leave your details",
];

function Roast({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-1" role="img" aria-label={`Roast level ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: "var(--ink)", background: n <= level ? "var(--ink)" : "transparent" }} />
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-16 pt-6 sm:px-8">
      <header className="flex items-center justify-between border-b-2 pb-4" style={{ borderColor: "var(--ink)" }}>
        <div className="flex items-center gap-2.5">
          <svg width="30" height="30" viewBox="0 0 36 36" aria-hidden="true">
            <rect width="36" height="36" rx="6" fill="var(--ink)" />
            <path d="M10 15h13v6a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5z" fill="none" stroke="#f4b400" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M23 17h2a2.5 2.5 0 0 1 0 5h-2" fill="none" stroke="#f4b400" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <span className="display text-xl font-bold tracking-tight">{BUSINESS.name}</span>
        </div>
        <Link href="/admin" className="text-sm underline underline-offset-4">Admin inbox</Link>
      </header>

      <section className="grid items-end gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
        <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
          Roasted on Monday. At your door by Friday.
        </h1>
        <dl className="border-2 p-4 text-sm" style={{ borderColor: "var(--ink)", background: "var(--card)" }}>
          <div className="flex justify-between gap-4 border-b border-dashed py-2" style={{ borderColor: "var(--line)" }}>
            <dt>Roasted</dt><dd className="font-medium">Every Monday</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-dashed py-2" style={{ borderColor: "var(--line)" }}>
            <dt>Ships same day</dt><dd className="font-medium">Before 2 pm</dd>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <dt>Free delivery</dt><dd className="font-medium">Over $35</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="menu-h">
        <h2 id="menu-h" className="text-2xl font-bold tracking-tight">Coffee, 340 g bags</h2>
        <ul className="mt-4 border-t-2" style={{ borderColor: "var(--ink)" }}>
          {MENU.map((m) => (
            <li key={m.name} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b py-4 sm:grid-cols-[220px_1fr_auto_60px]" style={{ borderColor: "var(--line)" }}>
              <span className="display text-lg font-semibold">{m.name}</span>
              <span className="order-3 col-span-2 text-sm sm:order-none sm:col-span-1" style={{ color: "var(--muted)" }}>{m.notes}</span>
              <Roast level={m.roast} />
              <span className="text-right font-semibold tabular-nums">{m.price}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>Filled dots show how dark the roast is.</p>
      </section>

      <section className="mt-14 max-w-xl">
        <h2 className="text-2xl font-bold tracking-tight">Try the support chat</h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          This page is a sample shop. The button at the bottom right opens the demo: a support widget you could add to any site. Things to ask:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {TRY.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Use the camera button to take or choose a photo. Then open the <Link href="/admin" className="underline underline-offset-4">admin inbox</Link> to see the conversation, the lead and the ticket.
        </p>
      </section>

      <footer className="mt-14 border-t pt-4 text-xs leading-relaxed" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
        Demo project with a made-up shop. Answers come from a small built-in list of facts, not a language model. Conversations and photos stay in your browser and nothing is sent anywhere.
      </footer>
      <ChatWidget />
    </main>
  );
}
