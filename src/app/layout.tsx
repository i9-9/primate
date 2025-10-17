import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ffMarkPro = localFont({
  src: [
    {
      path: "../../public/fonts/FF Mark Pro Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FF Mark Pro Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ff-mark-pro",
});

const ttNormsPro = localFont({
  src: [
    {
      path: "../../public/fonts/TT Norms Pro Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/TT Norms Pro Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-tt-norms-pro",
});

export const metadata: Metadata = {
  title: "Primate",
  description: "Aplicación Next.js básica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${ffMarkPro.variable} ${ttNormsPro.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
