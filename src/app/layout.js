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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
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
