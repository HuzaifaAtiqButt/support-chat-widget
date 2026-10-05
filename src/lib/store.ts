export type Msg = { id: string; role: "user" | "bot"; text: string; image?: string; at: string };
export type Ticket = { id: string; summary: string; image?: string; at: string };
export type State = { messages: Msg[]; email: string | null; tickets: Ticket[]; topic: string | null };

const KEY = "support-chat-widget-v1";
const EMPTY: State = { messages: [], email: null, tickets: [], topic: null };
const KEEP_IMAGES = 3;

let cache: State | null = null;
const listeners = new Set<() => void>();
const uid = () => Math.random().toString(36).slice(2, 9);

function read(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw) as State;
    return Array.isArray(p.messages) ? { ...EMPTY, ...p } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export const getSnapshot = (): State => (cache ??= read());
export const getServerSnapshot = (): State => EMPTY;

export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function commit(next: State) {
  cache = next;
  try {
    // Photos are large, so only the newest few are written to storage.
    let seen = 0;
    const slim = {
      ...next,
      messages: [...next.messages].reverse().map((m) => (m.image && ++seen > KEEP_IMAGES ? { ...m, image: undefined } : m)).reverse(),
    };
    localStorage.setItem(KEY, JSON.stringify(slim));
  } catch {
    // Storage may be full or blocked. The chat still works for this visit.
  }
  listeners.forEach((l) => l());
}

export function addMessage(role: Msg["role"], text: string, image?: string) {
  const s = getSnapshot();
  commit({ ...s, messages: [...s.messages, { id: uid(), role, text, image, at: new Date().toISOString() }] });
}

export function applyReply(r: { email?: string; ticket?: string; topic?: string | null }, image?: string) {
  const s = getSnapshot();
  commit({
    ...s,
    email: r.email ?? s.email,
    topic: r.topic === undefined ? s.topic : r.topic,
    tickets: r.ticket
      ? [{ id: r.ticket, summary: "Damaged item reported with photo", image, at: new Date().toISOString() }, ...s.tickets]
      : s.tickets,
  });
}

export function reset() {
  commit(EMPTY);
}
