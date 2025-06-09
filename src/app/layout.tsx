import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harsha Portfolio",
  description: "Software Developer & Designer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Satoshi', 'Inter', sans-serif" }}>
        <main className="min-h-screen text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
