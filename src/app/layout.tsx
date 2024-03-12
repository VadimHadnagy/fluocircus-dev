import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fluocircus",
  description: "Fluocircus' personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr  ">
      <body className={inter.className} data-theme="light">{children}</body>
    </html>
  );
}
