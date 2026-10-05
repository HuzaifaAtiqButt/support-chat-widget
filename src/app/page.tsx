import Link from "next/link";
import { ChatWidget } from "@/components/ChatWidget";

const MENU = [
  { name: "Harbor House", notes: "Chocolate and toasted hazelnut", roast: "Medium", price: 16 },
  { name: "Morning Tide", notes: "Orange peel and jasmine", roast: "Light", price: 18 },
  { name: "Night Watch", notes: "Dark cocoa and smoke", roast: "Dark", price: 16 },
  { name: "Harbor House Decaf", notes: "Same roast, water-processed", roast: "Medium", price: 17 },
];

const TRY = [
  "How long does shipping take?",
  "Track order 1042",
  "My bag arrived damaged (then send a photo)",
  "Can I pause my subscription?",
  "Or type an email address to leave your details",
];

export default function Home() {
  return (
    <main>
      <section className="text-white" style={{ background: "var(--brand)" }}>
        <div className="mx-auto max-w-5xl px-5 pb-14 pt-6 sm:px-8">
          <div className="flex items-baseline justify-between">
            <p className="display text-3xl font-black tracking-tight">Harbor</p>
            <Link href="/admin" className="text-sm underline underline-offset-4">Admin inbox</Link>
          </div>
          <h1 className="display mt-16 max-w-4xl text-[clamp(3.4rem,11vw,8.5rem)] font-black leading-[0.88]">
            Roasted Monday.
            <br />
            Packed Tuesday.
            <br />
            <span style={{ color: "var(--accent)" }}>At your door by Friday.</span>
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
        <section aria-labelledby="menu-h" className="pt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 id="menu-h" className="display text-4xl font-extrabold">This week&apos;s coffee</h2>
            <p className="text-sm" style={{ color: "var(--muted)" }}>340 g bags. Free delivery over $35.</p>
          </div>
          <ul className="mt-5">
            {MENU.map((m, i) => (
              <li
                key={m.name}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-t-2 py-5 sm:grid-cols-[260px_1fr_90px_80px]"
                style={{ borderColor: i === 0 ? "var(--ink)" : "var(--line)" }}
              >
                <span className="display text-2xl font-extrabold">{m.name}</span>
                <span className="order-3 col-span-2 text-base sm:order-none sm:col-span-1" style={{ color: "var(--muted)" }}>{m.notes}</span>
                <span className="hidden text-sm sm:block">{m.roast} roast</span>
                <span className="display text-right text-3xl font-extrabold tabular-nums">${m.price}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 grid gap-8 border-t-2 pt-10 md:grid-cols-[1fr_1.2fr]" style={{ borderColor: "var(--ink)" }}>
          <div>
            <h2 className="display text-4xl font-extrabold leading-none">Questions about an order?</h2>
            <p className="mt-3 max-w-sm text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              Open the yellow chat button at the bottom right. This is the support widget demo, and it works like it would on any shop.
            </p>
          </div>
          <div>
            <p className="font-bold">Try asking</p>
            <ul className="mt-2 space-y-1.5 text-base">
              {TRY.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
              You can also send a photo with the camera button. Then see what the shop team receives in the{" "}
              <Link href="/admin" className="underline underline-offset-4" style={{ color: "var(--ink)" }}>admin inbox</Link>.
            </p>
          </div>
        </section>

        <footer className="mt-16 border-t pt-4 text-sm leading-relaxed" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
          A demo with a made-up shop. The chat answers from a short list of facts, not a language model. Conversations and photos stay in your browser.
        </footer>
      </div>
      <ChatWidget />
    </main>
  );
}
