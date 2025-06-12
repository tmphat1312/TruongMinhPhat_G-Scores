import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

const rubikSans = Rubik({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "G Scores - Look Up GCSE Scores",
  description: "Golden Owl Asia Web Dev Internship Coding Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubikSans.variable} antialiased`}>
        <div className="h-dvh grid grid-rows-[auto_1fr]">
          <Header />
          <div className="grid grid-cols-[auto_1fr]">
            <Sidebar />
            <div className="p-8">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
