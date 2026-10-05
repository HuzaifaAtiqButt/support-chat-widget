import type { Metadata } from "next";
import { Big_Shoulders, Karla } from "next/font/google";
import "./globals.css";

const display = Big_Shoulders({ variable: "--font-display", subsets: ["latin"], weight: ["600", "800", "900"] });
const body = Karla({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Support Chat Widget",
  description:
    "A customer support chat widget for a sample shop: answers from the shop's own facts, tracks orders, takes photos and captures leads. Demo project, no account needed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
