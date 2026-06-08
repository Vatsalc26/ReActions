import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReActions Demo",
  description: "A small demo project for testing ReActions."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
