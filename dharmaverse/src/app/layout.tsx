import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SettingsProvider } from "@/context/SettingsContext";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DHARMAVERSE | Don't Read The Epic. Live It.",
  description: "Experience the Mahabharata through a cinematic, immersive web universe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-primary/30 selection:text-white`}>
        <Providers>
          <SettingsProvider>
            <Navbar />
            <div className="relative pt-[80px]">
              {children}
            </div>
          </SettingsProvider>
        </Providers>
      </body>
    </html>
  );
}
