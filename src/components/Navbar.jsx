'use client';
import { useState } from "react";
import { Link, Button, Avatar } from "@heroui/react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import ThemeToggle from "@/components/ThemeToggle";

const SkillSwapLogo = () => (
  <div className="p-2 rounded-xl border transition-colors"
    style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)" }}>
    <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </div>
);

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user || null;

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ fetchOptions: { onSuccess: () => window.location.reload() } });
    } catch {
      setIsLoggingOut(false);
    }
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Browse Tasks", href: "/all-tasks" },
    { name: "Freelancers", href: "/freelancers" },
  ];

  const UserActions = (
    <div className="flex items-center gap-3 w-full justify-between sm:justify-start sm:w-auto">
      <Link
        href={`/dashboard/${user?.role}`}
        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
          pathname === `/dashboard/${user?.role}` ? "text-emerald-500 font-semibold" : "text-slate-400 hover:text-emerald-500"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <MdOutlineSpaceDashboard size={18} />
        <span>Dashboard</span>
      </Link>
      <div className="flex items-center gap-2.5">
        <Link href="/my-profile" onClick={() => setIsMenuOpen(false)}>
          <Avatar className="cursor-pointer transition-transform hover:scale-105 w-8 h-8">
            <Avatar.Image referrerPolicy="no-referrer" alt={user?.name || "User"} src={user?.image || "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"} />
            <Avatar.Fallback>{user?.name ? user.name.slice(0, 2).toUpperCase() : "US"}</Avatar.Fallback>
          </Avatar>
        </Link>
        <Button
          size="sm" variant="flat" isLoading={isLoggingOut} onClick={handleSignOut}
          className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 font-semibold px-3 h-8 text-xs rounded-xl transition-all"
        >
          {!isLoggingOut && <FiLogOut className="text-sm shrink-0" />}
        </Button>
      </div>
    </div>
  );

  if (pathname.includes('/dashboard')) return null;

  return (
    <nav
      className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors"
      style={{
        background: "var(--navbar-bg)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <header className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <SkillSwapLogo />
          <p className="font-bold text-xl" style={{ color: "var(--text-heading)" }}>
            Skill<span className="text-emerald-500">Swap</span>
          </p>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-emerald-500 font-semibold" : "hover:text-emerald-500"
                  }`}
                  style={{ color: isActive ? undefined : "var(--text-secondary)" }}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isPending ? (
            <div className="h-8 w-20 rounded-lg animate-pulse" style={{ background: "var(--bg-secondary)" }} />
          ) : user ? (
            <div className="hidden sm:flex items-center gap-3">{UserActions}</div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/auth/signin"
                className="text-sm font-medium transition-colors hover:text-emerald-500"
                style={{ color: "var(--text-secondary)" }}
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-500/20"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden p-4 flex flex-col gap-3 border-t"
          style={{
            background: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium px-2 py-1.5 rounded-lg transition-colors ${
                pathname === link.href ? "text-emerald-500 font-semibold" : "hover:text-emerald-500"
              }`}
              style={{ color: pathname === link.href ? undefined : "var(--text-secondary)" }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="border-t pt-3 mt-1 w-full" style={{ borderColor: "var(--border-color)" }}>
              {UserActions}
            </div>
          ) : (
            <div className="border-t pt-3 mt-1 flex flex-col gap-2.5" style={{ borderColor: "var(--border-color)" }}>
              <Link
                href="/auth/signin"
                className="w-full text-center text-sm font-medium py-2 rounded-xl border transition-colors hover:text-emerald-500"
                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
