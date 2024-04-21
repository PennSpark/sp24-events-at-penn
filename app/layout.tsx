import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/navbar";
import { useState } from "react";
import Header from "./(components)/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SocialCalendar@Penn",
  description: "Discover the heartbeat of campus life with our comprehensive listings of social events at the University of Pennsylvania. From student gatherings to cultural showcases, find the pulse of Penn's vibrant community right here. Stay connected and never miss out on the latest happenings!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const isAuthenticated = true; // TODO: 
    
    return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar isAuthenticated={isAuthenticated} />
        {children}
      </body>
    </html>
  );
}
