'use client';
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { FiLogOut } from "react-icons/fi";

// প্রিমিয়াম লাইটনিং লোগো
const SkillSwapLogo = () => (
    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-inner">
        <svg
            className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    </div>
);

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const { data: session, isPending } = useSession();
    const user = session?.user || null;

    const links = [
        { name: "Home", href: "/" },
        { name: "Browse Tasks", href: "/tasks" },
        { name: "Freelancers", href: "/freelancers" },
    ];

    const getLinkClass = (href) => {
        const isActive = pathname === href;
        return `text-sm font-medium transition-all relative py-1.5 px-1 ${isActive
            ? "text-emerald-400 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-emerald-500 after:rounded-full"
            : "text-slate-400 hover:text-emerald-400"
            }`;
    };
    if (pathname.includes('/dashboard')) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/75 backdrop-blur-md">
            <header className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform">
                        <SkillSwapLogo />
                        <p className="font-bold text-xl tracking-tight text-white font-sans">
                            Skill<span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.2)]">Swap</span>
                        </p>
                    </Link>
                </div>
                <ul className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className={getLinkClass(link.href)}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="items-center gap-4 flex">
                    {isPending ? (
                        <div className="h-8 w-20 bg-slate-900 rounded-lg animate-pulse" />
                    ) : user ? (
                        <div className="hidden items-center gap-3 sm:gap-4 sm:flex">
                            <Link
                                href={`/dashboard/${user?.role}`}
                                className={`text-sm font-medium transition-colors hidden sm:inline-block ${pathname === `/dashboard/${user?.role}`? "text-emerald-400 font-semibold" : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                Dashboard
                            </Link>
                            <div className="flex items-center gap-2 bg-slate-900/60 pl-2 pr-3 py-1.5 rounded-full border border-slate-800">
                                <div className="h-6 w-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center uppercase shrink-0">
                                    {user.name ? user.name[0] : "U"}
                                </div>
                                <span className="text-xs font-medium text-slate-300 max-w-[80px] truncate">
                                    {user.name.split(" ")[0]} {/* শুধু ফার্স্ট নেম দেখাবে ক্লিনের জন্য */}
                                </span>
                            </div>

                            <Button
                                size="sm"
                                variant="light"
                                onClick={async () => {
                                    await signOut({
                                        fetchOptions: {
                                            onSuccess: () => window.location.reload()
                                        }
                                    });
                                }}
                                className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 font-semibold px-3 h-8 text-xs rounded-xl transition-all"
                            >
                                <FiLogOut className="text-sm shrink-0" />
                            </Button>
                        </div>
                    ) : (
                     
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link href="/auth/signin" className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-2 py-1">
                                Login
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 h-9 text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-98"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {isMenuOpen && (
                <div className="border-t border-slate-900 bg-slate-950/95 backdrop-blur-lg md:hidden absolute left-0 w-full shadow-2xl">
                    <ul className="flex flex-col gap-1 p-4">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`block py-2.5 px-3 rounded-xl text-base transition-colors ${pathname === link.href
                                        ? "bg-emerald-500/10 text-emerald-400 font-semibold border-l-4 border-emerald-500"
                                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        {user && (
                            <li className="border-t border-slate-900 pt-3 mt-2 flex flex-col gap-2">
                                <Link
                                    href={`/dashboard/${user?.role}`}
                                    className={`block py-2.5 px-3 rounded-xl text-base ${pathname === `/dashboard/${user?.role}` ? "bg-slate-900 text-emerald-400" : "text-slate-400"}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard ({user.name})
                                </Link>
                                <button
                                    onClick={async () => {
                                        setIsMenuOpen(false);
                                        await signOut({
                                            fetchOptions: { onSuccess: () => window.location.reload() }
                                        });
                                    }}
                                    className="text-left py-2.5 px-3 text-rose-400 font-medium hover:bg-rose-500/10 rounded-xl transition-colors"
                                >
                                    <FiLogOut className="text-sm shrink-0" />
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}