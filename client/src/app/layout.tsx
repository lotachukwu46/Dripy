// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import SmoothScrollProvider from "./smooth-scroll-provider"; // import the provider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Drippy - Earn Money Online",
  description: "Play and earn with Drippy's gamified GPT platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}
