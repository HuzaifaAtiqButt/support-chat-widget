export const BUSINESS = {
  name: "Harbor Coffee Roasters",
  short: "Harbor",
  tagline: "Small-batch coffee, roasted on Monday and shipped fresh.",
};

export type Entry = { id: string; words: string[]; answer: string; chips?: string[] };

// Made-up facts for a fictional shop. The bot answers only from this list.
export const ENTRIES: Entry[] = [
  {
    id: "shipping",
    words: ["ship", "shipping", "delivery", "deliver", "how long", "arrive", "postage", "express"],
    answer:
      "Orders placed before 2 pm ship the same business day. Standard delivery takes 3 to 5 business days and is free over $35, otherwise $4.95. Express takes 1 to 2 business days and costs $12.",
    chips: ["Track my order", "Returns and refunds"],
  },
  {
    id: "returns",
    words: ["return", "refund", "money back", "exchange", "send back"],
    answer:
      "You can return unopened bags within 30 days for a full refund. If a bag arrives damaged or is the wrong one, tell me and send a photo, and we will replace it at no cost.",
    chips: ["Item arrived damaged", "Shipping times"],
  },
  {
    id: "subscription",
    words: ["subscription", "subscribe", "pause", "skip", "cancel", "recurring", "plan", "monthly"],
    answer:
      "Subscriptions ship every 2 or 4 weeks and save 10 percent. You can skip, pause or cancel any time from your account page, up to 24 hours before the next roast date.",
    chips: ["Discount codes", "Talk to a person"],
  },
  {
    id: "brewing",
    words: ["grind", "brew", "brewing", "espresso", "french press", "pour over", "drip", "aeropress", "ratio"],
    answer:
      "A good starting point is 1 part coffee to 16 parts water. Use a medium grind for drip, coarse for French press, fine for espresso. We can grind your bag at checkout, just pick the method.",
    chips: ["What beans do you sell?"],
  },
  {
    id: "products",
    words: ["beans", "roast", "blend", "product", "flavor", "decaf", "single origin", "menu", "sell"],
    answer:
      "We roast three everyday coffees: Harbor House (medium, chocolate and nut), Morning Tide (light, citrus and floral) and Night Watch (dark, smoky and rich). There is also a decaf of Harbor House.",
    chips: ["Brewing tips", "Discount codes"],
  },
  {
    id: "promo",
    words: ["discount", "promo", "coupon", "code", "offer", "sale", "deal"],
    answer: "New customers get 10 percent off their first bag with the code WELCOME10. This is a demo code and does nothing real.",
    chips: ["Subscriptions"],
  },
  {
    id: "hours",
    words: ["hours", "open", "contact", "phone", "support", "human", "agent", "person", "someone", "talk to"],
    answer:
      "Our team replies Monday to Friday, 9 am to 5 pm. Leave your email here and a teammate will follow up within one business day. In this demo nothing is actually sent.",
  },
  {
    id: "wholesale",
    words: ["wholesale", "cafe", "bulk", "reseller", "restaurant"],
    answer: "We supply cafes and offices with 5 kg bags and a standing weekly order. Leave your email and the wholesale team will send a price list.",
  },
  {
    id: "allergens",
    words: ["allergen", "allergy", "gluten", "vegan", "nut", "dairy"],
    answer: "Our coffee is just roasted beans: no gluten, dairy or nuts, and it is vegan. Flavor notes such as chocolate and nut describe the taste only.",
  },
  {
    id: "thanks",
    words: ["thanks", "thank you", "thx", "cheers", "great"],
    answer: "You are welcome. Anything else I can help with?",
    chips: ["Shipping times", "Talk to a person"],
  },
  {
    id: "greeting",
    words: ["hello", "hi", "hey", "good morning", "good afternoon"],
    answer: "Hello. I can help with shipping, returns, subscriptions, order tracking and brewing tips. What do you need?",
    chips: ["Shipping times", "Track my order", "Item arrived damaged"],
  },
];

export const DAMAGED_WORDS = ["damaged", "broken", "leak", "leaking", "wrong item", "wrong bag", "crushed", "spilled", "torn", "opened"];
export const ORDER_WORDS = ["tracking", "track", "where is my", "order status", "my order", "package", "parcel", "order"];

export const ORDERS: Record<string, { status: string; detail: string }> = {
  "1042": { status: "Shipped", detail: "It left our warehouse yesterday and should arrive on Thursday." },
  "1043": { status: "Processing", detail: "It is being packed today and ships tomorrow morning." },
  "1044": { status: "Delivered", detail: "It was delivered on Monday at 2:14 pm." },
};

export const STARTER_CHIPS = ["Shipping times", "Track my order", "Item arrived damaged", "Subscriptions"];

export const WELCOME = `Hi, I am the ${BUSINESS.short} assistant. Ask me about shipping, returns, subscriptions or your order. You can also send me a photo.`;
