import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/client";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flexible Store",
  description: "Shopping with multiple products, flexible and customizable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
