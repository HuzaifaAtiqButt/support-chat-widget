"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, reset, subscribe } from "@/lib/store";

const card = { background: "var(--card)", borderColor: "var(--line)" };
const muted = { color: "var(--muted)" };

export default function Admin() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Admin inbox</h1>
        <Link href="/" className="text-sm underline" style={muted}>Back to the shop</Link>
      </div>
      <p className="mt-1 text-sm" style={muted}>What a support team would see. This reads from your browser only.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="border-2 p-5" style={{ ...card, borderColor: "var(--ink)" }}>
          <h2 className="font-semibold">Conversation</h2>
          {s.messages.length === 0 ? (
            <p className="mt-3 text-sm" style={muted}>No messages yet. Open the chat on the shop page and say hello.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {s.messages.map((m) => (
                <li key={m.id} className="text-sm">
                  <p className="text-xs" style={muted}>
                    {m.role === "user" ? "Customer" : "Assistant"} · {new Date(m.at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  {m.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.image} alt="Photo from the customer" className="my-1 max-h-40 rounded-lg" />
                  )}
                  {m.text && <p>{m.text}</p>}
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="space-y-6">
          <div className="border-2 p-5" style={{ ...card, borderColor: "var(--ink)" }}>
            <h2 className="font-semibold">Lead</h2>
            <p className="mt-2 text-sm" style={s.email ? undefined : muted}>{s.email ?? "No email captured yet."}</p>
          </div>
          <div className="border-2 p-5" style={{ ...card, borderColor: "var(--ink)" }}>
            <h2 className="font-semibold">Tickets</h2>
            {s.tickets.length === 0 ? (
              <p className="mt-2 text-sm" style={muted}>No tickets yet. Report a damaged item in the chat and send a photo.</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {s.tickets.map((t) => (
                  <li key={t.id} className="text-sm">
                    <p className="font-medium">{t.id}</p>
                    <p style={muted}>{t.summary}</p>
                    {t.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.image} alt="Photo attached to the ticket" className="mt-1 max-h-32 rounded-lg" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={reset} className="text-sm underline" style={muted}>Reset demo data</button>
        </aside>
      </div>
    </main>
  );
}
