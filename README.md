# Support Chat Widget

A customer support chat widget for a sample shop. It answers from the shop's own facts, looks up orders, takes photos from the camera, and captures leads. A small admin page shows what the support team would see.

This is a demo project. The shop is made up, there is no database, and everything stays in your browser (localStorage). The answers come from a short built-in list of facts, not a language model, so it works for free with no keys.

## What it shows

- A chat bubble that opens to a panel, expands to a large view, and minimizes again. Full screen on phones.
- Answers matched from a knowledge base, with suggested replies after each answer and a typing indicator.
- Order tracking by order number (sample orders 1042, 1043 and 1044).
- Lead capture: type an email address and it is saved to the conversation.
- Photo sending: use the live camera (with front and back switch) or open the phone camera or photo library. Photos are resized, and errors such as permission denied, no camera and files that are not images get clear messages.
- Damaged item flow: report a damaged bag, send a photo, and a ticket is created with the photo attached.
- An admin page with the conversation, the lead and the tickets.
- Light and dark themes, keyboard-friendly controls, screen-reader labels and reduced-motion support.

## How the replies work

`src/lib/bot.ts` takes the message and returns a reply. It checks for an email, a damaged item, an order number, and then scores the message against the entries in `src/lib/kb.ts`. If nothing fits, it offers to take an email and shows suggested topics.

To use a language model later, replace the `reply` function with a call to your own server route that holds the API key. The widget does not need to change.

## Stack

Next.js, React, TypeScript, Tailwind CSS. No chat or state libraries.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. The live camera needs https or localhost.
