import type { Metadata } from "next";
import { Tiro_Bangla, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const tiroBangla = Tiro_Bangla({
  weight: "400",
  subsets: ["bengali"],
  variable: "--font-tiro-bangla",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600"],
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: "ই-বইপত্র — বাংলা বইয়ের ঘর",
  description: "প্রতিদিন একটি করে বাংলা বই, সংক্ষিপ্তসার সহ।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className={`${tiroBangla.variable} ${hindSiliguri.variable} font-body antialiased`}>
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-parchment/70 border-b border-ink/5">
          <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
            <a href="/" className="font-display text-2xl text-ink">ই-বইপত্র</a>
            <nav className="text-sm text-ink-muted">
              <a href="/" className="hover:text-rust transition-colors">সব বই</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="max-w-5xl mx-auto px-5 py-10 text-center text-sm text-ink-muted">
          তৈরি হয়েছে বইপ্রেমীদের জন্য, ভালোবাসা 💖 দিয়ে।
        </footer>
      </body>
    </html>
  );
}