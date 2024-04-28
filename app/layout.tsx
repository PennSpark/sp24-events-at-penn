import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/navbar";
import AuthProvider from "./(components)/auth/authprovider";
import Head from "next/head";

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
    return (
    <html lang="en">
      <body className={inter.className}>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        </Head>
        <AuthProvider>
          <Navbar/>
          <main>
              {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
