import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import AppNavbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillSwap",
  description:
    "SkillSwap is a modern freelance marketplace and skill-sharing platform where clients can post tasks and expert freelancers can submit proposals to collaborate and trade skills seamlessly.",
};

// This runs synchronously before any paint — prevents theme flash on every navigation
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col"
        style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
      >
        {/*
          This script runs before React hydrates — it reads localStorage and
          sets data-theme on <html> synchronously, eliminating the flash.
          suppressHydrationWarning is required because server renders data-theme="dark"
          but client may change it to "light" before hydration completes.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        <AppNavbar />
        <main className="flex-1">{children}</main>
        <Toaster
          toastOptions={{
            style: {
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              fontSize: "13px",
            },
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
