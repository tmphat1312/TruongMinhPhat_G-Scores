import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

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
        <div className="[--header-height:calc(--spacing(18))]">
          <SidebarProvider className="flex flex-col">
            <SiteHeader />
            <div className="flex flex-1">
              <AppSidebar />
              <SidebarInset>
                <main className="p-8">{children}</main>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
