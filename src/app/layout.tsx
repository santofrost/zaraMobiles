import type { Metadata } from "next";
import Toolbar from "@/components/layout/Toolbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zara Mobiles",
  description: "Zara Mobiles App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Toolbar />
        {children}
      </body>
    </html>
  );
}
