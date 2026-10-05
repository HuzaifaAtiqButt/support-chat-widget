"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { reply, replyToPhoto } from "@/lib/bot";
import { BUSINESS, STARTER_CHIPS, WELCOME } from "@/lib/kb";
import { fileToDataUrl } from "@/lib/image";
import { addMessage, applyReply, getServerSnapshot, getSnapshot, subscribe } from "@/lib/store";
import { CameraModal } from "./CameraModal";

export function ChatWidget() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const [max, setMax] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chips, setChips] = useState<string[]>(STARTER_CHIPS);
  const [menu, setMenu] = useState(false);
  const [camera, setCamera] = useState(false);
  const [notice, setNotice] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [state.messages.length, typing, open, camera]);

  const send = (text: string, image?: string) => {
    const t = text.trim();
    if (!t && !image) return;
    setNotice("");
    setMenu(false);
    addMessage("user", t, image);
    setInput("");
    setChips([]);
    setTyping(true);
    const snap = getSnapshot();
    const r = image ? replyToPhoto(snap.topic) : reply(t, snap.topic, !!snap.email);
    setTimeout(() => {
      applyReply(r, image);
      addMessage("bot", r.text);
      setChips(r.chips ?? []);
      setTyping(false);
    }, 650);
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setMenu(false);
    try {
      send("", await fileToDataUrl(file));
    } catch (e) {
      setNotice(e instanceof Error ? e.message : "That photo could not be used.");
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        className="fixed bottom-5 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-[10px] border-2"
        style={{ background: "var(--accent)", color: "#1a1300", borderColor: "var(--ink)", boxShadow: "4px 4px 0 var(--ink)" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 5h16v11H9l-5 4z" />
        </svg>
      </button>
    );
  }

  const shell = max
    ? "fixed inset-0 z-50 sm:inset-6"
    : "fixed inset-0 z-50 sm:inset-auto sm:bottom-5 sm:right-6 sm:h-[560px] sm:w-[380px]";

  return (
    <section
      aria-label={`${BUSINESS.short} support chat`}
      className={`${shell} flex flex-col overflow-hidden border-2 sm:rounded-[10px]`}
      style={{ background: "var(--card)", borderColor: "var(--ink)", boxShadow: max ? "none" : "6px 6px 0 var(--ink)" }}
    >
      <header className="flex items-center justify-between px-4 py-3 text-white" style={{ background: "var(--brand)" }}>
        <div>
          <p className="font-semibold leading-tight" style={{ fontFamily: "var(--font-display)" }}>{BUSINESS.short} Support</p>
          <p className="text-xs opacity-85">Replies right away. Demo assistant.</p>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setMax((m) => !m)} aria-label={max ? "Restore size" : "Maximize chat"} className="hidden rounded-md px-2 py-1 text-sm hover:bg-white/15 sm:block">
            {max ? "Restore" : "Expand"}
          </button>
          <button onClick={() => setOpen(false)} aria-label="Minimize chat" className="rounded-md px-2 py-1 text-sm hover:bg-white/15">
            Minimize
          </button>
        </div>
      </header>

      <div role="log" aria-live="polite" aria-label="Conversation" className="flex-1 space-y-3 overflow-y-auto p-4">
        <Bubble role="bot" text={WELCOME} />
        {state.messages.map((m) => (
          <Bubble key={m.id} role={m.role} text={m.text} image={m.image} />
        ))}
        {typing && (
          <div className="flex gap-1 px-1" aria-label="Assistant is typing">
            <span className="dot" /><span className="dot" /><span className="dot" />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {chips.length > 0 && !typing && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => (c === "I will attach a photo" ? setMenu(true) : send(c))}
              className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-[var(--accent)]"
              style={{ borderColor: "var(--ink)" }}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {notice && <p role="alert" className="px-4 pb-1 text-xs" style={{ color: "#b91c1c" }}>{notice}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="relative flex items-center gap-2 border-t p-3"
        style={{ borderColor: "var(--line)" }}
      >
        {menu && (
          <div className="absolute bottom-16 left-3 w-60 rounded-xl border p-1 shadow-lg" style={{ background: "var(--card)", borderColor: "var(--line)" }} role="menu">
            <button type="button" role="menuitem" onClick={() => { setMenu(false); setCamera(true); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-black/5">
              Use the camera
            </button>
            <label className="block cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-black/5" role="menuitem">
              Open phone camera or choose photo
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={(e) => {
                  void onFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
        )}
        <button type="button" onClick={() => setMenu((m) => !m)} aria-label="Attach a photo" aria-expanded={menu} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border" style={{ borderColor: "var(--line)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 8h4l2-3h4l2 3h4v11H4z" /><circle cx="12" cy="13" r="3.2" />
          </svg>
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder="Type your message"
          aria-label="Message"
          className="min-w-0 flex-1 rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--line)" }}
        />
        <button type="submit" disabled={!input.trim()} className="rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-50" style={{ background: "var(--accent)", color: "#1a1300" }}>
          Send
        </button>
      </form>

      {camera && (
        <CameraModal
          onClose={() => setCamera(false)}
          onCapture={(url) => {
            setCamera(false);
            send("", url);
          }}
        />
      )}
    </section>
  );
}

function Bubble({ role, text, image }: { role: "user" | "bot"; text: string; image?: string }) {
  const mine = role === "user";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-[14px] px-3 py-2 text-sm leading-relaxed ${mine ? "rounded-br-[3px]" : "rounded-bl-[3px]"}`}
        style={mine ? { background: "var(--accent)", color: "#1a1300" } : { background: "var(--bubble)", color: "var(--ink)", border: "1px solid var(--line)" }}
      >
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="Photo you sent" className="mb-1 max-h-48 rounded-lg" />
        )}
        {text && <p>{text}</p>}
      </div>
    </div>
  );
}
