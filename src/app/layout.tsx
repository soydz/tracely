import { Toast } from "@heroui/react";
import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "@/styles/globals.css";
import { NavLinks } from "@/shared/components";

import { Providers } from "@/core/providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"]
});

const newreader = Newsreader({
  variable: "--font-newreader",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Tracely",
  description: "Financial App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${newreader.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-full flex flex-col ">
        <Providers>
          <Toast.Provider placement="top" />
          <div className="px-24 py-4 max-w-[1500] mx-auto w-full">
            <NavLinks />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
