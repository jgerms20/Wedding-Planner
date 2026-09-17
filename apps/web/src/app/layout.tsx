import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Bower";

export const metadata: Metadata = {
  title: appName,
  description: "A calm, unhurried home for planning a wedding — yours, in your browser.",
};

// Applies dark mode from the system preference before first paint, so there's
// no flash. No manual toggle yet; this just keeps `.dark` in sync.
const DARK_MODE_SCRIPT = `
(function () {
  try {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var apply = function (isDark) {
      document.documentElement.classList.toggle("dark", isDark);
    };
    apply(mq.matches);
    mq.addEventListener("change", function (e) {
      apply(e.matches);
    });
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: DARK_MODE_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
