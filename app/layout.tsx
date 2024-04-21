import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Calender @ Penn",
  description: "Your one-stop shop for Penn events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const isAuthenticated = false; // TODO: 
    
    return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar isAuthenticated={isAuthenticated} />
        {children}
      </body>
    </html>
  );
}
