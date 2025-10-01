// app/layout.tsx
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthInitializer from "./components/dashboard/AuthInitializer";
import "./globals.css";
import SmoothScrollProvider from "./smooth-scroll-provider";

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
        <SmoothScrollProvider>
          <AuthInitializer />
          {children}
          <Toaster position="top-right" />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
