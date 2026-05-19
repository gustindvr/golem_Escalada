import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { AlertProvider } from "./context/AlertContext";
import AlertContainer from "./components/Common/Alert/AlertContainer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Golem Escalada",
  description: "Gestión de pagos de Golem Escalada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* <link rel="manifest" href="./manifest.ts" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <Navbar />

        <div className="flex justify-center items-center w-full">
          <img
            src="/Logo.png"
            alt="Logo Golem Escalada"
            className="max-w-96"
          />
        </div>

        <main className="pt-6 md:px-6">
          <AlertProvider>
            <AlertContainer />
            {children}
          </AlertProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
