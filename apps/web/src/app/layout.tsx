import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/instrument-sans";
import "./globals.css";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Bower";

export const metadata: Metadata = {
  title: `${appName} · Joshua & Janel`,
  description: "Joshua & Janel's wedding atlas: destinations, plan, budget, guests, and an assistant that does the legwork.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#27453a" },
    { media: "(prefers-color-scheme: dark)", color: "#16241f" },
  ],
};

// Applies dark mode from the system preference (or a saved choice) before
// first paint, so there is no flash.
const THEME_SCRIPT = `
(function () {
  try {
    var saved = window.localStorage.getItem("bower:theme");
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var apply = function () {
      var pref = window.localStorage.getItem("bower:theme");
      var isDark = pref === "dark" ? true : pref === "light" ? false : mq.matches;
      document.documentElement.classList.toggle("dark", isDark);
    };
    apply();
    mq.addEventListener("change", apply);
    window.addEventListener("bower:theme", apply);
    void saved;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
