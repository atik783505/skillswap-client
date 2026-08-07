'use client';
import { Link, Button } from "@heroui/react";
import { Globe, ArrowRight } from "@gravity-ui/icons";
import { FaXTwitter } from "react-icons/fa6";
import { usePathname } from "next/navigation";

const SkillSwapLogo = () => (
  <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes('/dashboard')) return null;

  return (
    <footer
      className="w-full transition-colors"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
        color: "var(--text-secondary)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className="p-2 rounded-xl border"
                style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)" }}
              >
                <SkillSwapLogo />
              </div>
              <p className="font-bold text-xl" style={{ color: "var(--text-heading)" }}>
                Skill<span className="text-emerald-500">Swap</span>
              </p>
            </div>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "var(--text-muted)" }}>
              The premium micro-tasking ecosystem for the modern era. Quality execution, guaranteed.
            </p>
            <div className="flex items-center gap-3.5 mt-1">
              <button
                className="p-2 rounded-lg transition-colors hover:text-emerald-500"
                style={{ color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                aria-label="Twitter"
              >
                <FaXTwitter className="h-4 w-4" />
              </button>
              <button
                className="p-2 rounded-lg transition-colors hover:text-emerald-500"
                style={{ color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Marketplace */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-heading)" }}>
              Marketplace
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Browse Tasks", href: "/all-tasks" },
                { label: "Browse Freelancers", href: "/freelancers" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-emerald-500 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-heading)" }}>
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Security", href: "/security" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-emerald-500 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-heading)" }}>
              Stay Updated
            </h4>
            <div className="text-xs">
              <p style={{ color: "var(--text-muted)" }}>Questions or support?</p>
              <Link href="mailto:support@skillswap.com" className="text-emerald-500 font-medium hover:underline mt-1 block text-sm">
                atik13672@gmail.com
              </Link>
            </div>
            <div
              className="flex items-center rounded-xl overflow-hidden mt-1"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent text-xs px-3 py-2.5 outline-none w-full"
                style={{ color: "var(--text-primary)" }}
              />
              <button
                className="px-3 py-2.5 text-emerald-500 hover:text-emerald-400 transition-colors shrink-0"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t"
          style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
        >
          <p>© 2026 SkillSwap. All rights reserved.</p>
          <p>Built with ❤️ for the global freelance community</p>
        </div>
      </div>
    </footer>
  );
}
