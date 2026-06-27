'use client';
import { useState } from "react";
import { Link, Button, Avatar } from "@heroui/react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const SkillSwapLogo = () => (
    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-inner">
        <svg className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    </div>
);

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    const user = session?.user || null;


    const handleSignOut = async () => {
        setIsLoggingOut(true);
        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => window.location.reload()
                }
            });
        } catch (error) {
            console.error("Logout failed", error);
            setIsLoggingOut(false);
        }
    }

    const links = [
        { name: "Home", href: "/" },
        { name: "Browse Tasks", href: "/all-tasks" },
        { name: "Freelancers", href: "/freelancers" },
    ];

    const UserActions =
        <>
            <Link
                href={`/dashboard/${user?.role}`}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${pathname === `/dashboard/${user?.role}`
                    ? "text-emerald-400 font-semibold"
                    : "text-slate-400 hover:text-white"
                    }`}
            >
                <MdOutlineSpaceDashboard size={20} />
                <span>Dashboard</span>
            </Link>

            <Link href="/my-profile">
                <Avatar className="cursor-pointer transition-transform hover:scale-105">
                    <Avatar.Image alt={user?.name || "User"} src={user?.image || "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"} />
                    <Avatar.Fallback>{user?.name ? user.name.slice(0, 2).toUpperCase() : "US"}</Avatar.Fallback>
                </Avatar>
            </Link>

            <Button
                size="sm"
                variant="flat"
                isLoading={isLoggingOut}
                onClick={handleSignOut}
                className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 font-semibold px-3 h-8 text-xs rounded-xl"
            >
                {!isLoggingOut && <FiLogOut className="text-sm shrink-0" />}
            </Button>
        </>
        ;

    if (pathname.includes('/dashboard')) return null;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/75 backdrop-blur-md">
            <header className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <SkillSwapLogo />
                        <p className="font-bold text-xl text-white">Skill<span className="text-emerald-400">Swap</span></p>
                    </Link>
                </div>
                <ul className="hidden items-center gap-8 md:flex">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`text-sm transition-colors ${isActive ? "text-emerald-400 font-semibold" : "text-slate-400 hover:text-white"}`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="items-center gap-4 flex">
                    {isPending ? <div className="h-8 w-20 bg-slate-900 rounded-lg animate-pulse" /> : user ? (
                        <div className="hidden sm:flex items-center gap-4">{UserActions}</div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-4">
                            <Link href="/auth/signin" className="text-sm text-slate-400">Login</Link>
                            <Link href="/auth/signup" className="bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl text-sm font-bold">Get Started</Link>
                        </div>
                    )}
                    <button
                        className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 ml-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </header>

            {isMenuOpen && (
                <div className="border-t border-slate-900 bg-slate-950 p-4 md:hidden flex flex-col gap-4">
                    {links.map((link) => <Link key={link.href} href={link.href} className="text-slate-400" onClick={() => setIsMenuOpen(false)}>{link.name}</Link>)}
                    {user && <div className="border-t border-slate-800 pt-4 flex items-center justify-between">{UserActions}</div>}
                </div>
            )}
        </nav>
    );
}