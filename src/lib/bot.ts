import { DAMAGED_WORDS, ENTRIES, ORDERS, ORDER_WORDS } from "./kb";

export type Reply = {
  text: string;
  chips?: string[];
  email?: string;
  ticket?: string;
  topic?: string | null;
};

const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/;
const FALLBACK_CHIPS = ["Shipping times", "Returns and refunds", "Subscriptions", "Track my order"];

const has = (text: string, word: string) =>
  new RegExp(`(^|[^a-z])${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}s?([^a-z]|$)`).test(text);

const score = (text: string, words: string[]) => words.filter((w) => has(text, w)).length;

export function reply(input: string, topic: string | null, hasEmail: boolean): Reply {
  const text = input.toLowerCase().trim();

  const email = input.match(EMAIL)?.[0];
  if (email) {
    return {
      text: `Thanks. I saved ${email}. A teammate will follow up within one business day. In this demo no email is really sent.`,
      email,
      topic: null,
      chips: ["Shipping times", "Track my order"],
    };
  }

  if (score(text, DAMAGED_WORDS) > 0) {
    return {
      text: "I am sorry about that. Please send a photo of the item and the box so we can replace it. Use the camera button next to the message box.",
      chips: ["I will attach a photo"],
      topic: "damaged",
    };
  }

  const num = text.match(/\b(\d{4})\b/)?.[1];
  if (num && (topic === "order" || score(text, ORDER_WORDS) > 0)) {
    const order = ORDERS[num];
    return order
      ? { text: `Order ${num}: ${order.status}. ${order.detail}`, topic: null, chips: ["Shipping times", "Talk to a person"] }
      : { text: `I could not find order ${num}. In this demo the sample orders are 1042, 1043 and 1044.`, topic: "order", chips: ["1042", "1043", "1044"] };
  }

  if (score(text, ORDER_WORDS) > 0 && score(text, ["ship", "shipping", "how long"]) === 0) {
    return { text: "Send me your order number (4 digits, for example 1042) and I will check it.", topic: "order", chips: ["1042", "1043", "1044"] };
  }

  let best = { id: "", s: 0 };
  for (const e of ENTRIES) {
    const s = score(text, e.words);
    if (s > best.s) best = { id: e.id, s };
  }
  const entry = ENTRIES.find((e) => e.id === best.id);
  if (entry) return { text: entry.answer, chips: entry.chips, topic: null };

  return {
    text: hasEmail
      ? "I am not sure about that one. A teammate has your email and will follow up. You can also try one of these."
      : "I am not sure about that one. Leave your email and a teammate will follow up, or try one of these.",
    chips: FALLBACK_CHIPS,
    topic: null,
  };
}

export function replyToPhoto(topic: string | null): Reply {
  if (topic === "damaged") {
    const id = `T-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      text: `Thank you, that helps. I opened ticket ${id} for the damaged item. A replacement ships free of charge. Leave your email here if you want updates.`,
      ticket: id,
      topic: null,
      chips: ["Talk to a person", "Shipping times"],
    };
  }
  return {
    text: "I got your photo. Tell me what it shows or what you need help with.",
    chips: ["Item arrived damaged", "Wrong item", "Track my order"],
    topic: null,
  };
}
