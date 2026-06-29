'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, Button, Drawer } from "@heroui/react";
import { useSession, authClient } from "@/lib/auth-client";
import { LuLayoutDashboard, LuClipboardPlus, LuClipboardList, LuFileSpreadsheet, LuMenu, LuSearch, LuBriefcase, LuDollarSign, LuUsers, LuHistory, LuLogOut } from "react-icons/lu";
import { PersonPencil } from '@gravity-ui/icons';
import toast from 'react-hot-toast';

export function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [drawerKey, setDrawerKey] = useState(0);

    useEffect(() => {
        setIsOpen(false);
        setDrawerKey(prev => prev + 1);
    }, [pathname]);

    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success("Signed out successfully");
        window.location.href = "/";
    };

    const getFallbackText = (name) => {
        if (!name) return "US";
        const words = name.trim().split(" ");
        if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
        return name.slice(0, 2).toUpperCase();
    };

    const navLinkMap = {
        client: [
            { name: "Overview", href: "/dashboard/client", icon: LuLayoutDashboard },
            { name: "Post Task", href: "/dashboard/client/manage-task/new", icon: LuClipboardPlus },
            { name: "My Tasks", href: "/dashboard/client/manage-task", icon: LuClipboardList },
            { name: "Manage Proposals", href: "/dashboard/client/proposals", icon: LuFileSpreadsheet },
        ],
        freelancer: [
            { name: "Overview", href: "/dashboard/freelancer", icon: LuLayoutDashboard },
            { name: "Browse Tasks", href: "/all-tasks", icon: LuSearch },
            { name: "My Proposals", href: "/dashboard/freelancer/my-proposals", icon: LuFileSpreadsheet },
            { name: "Active Projects", href: "/dashboard/freelancer/active-projects", icon: LuBriefcase },
            { name: "My Earnings", href: "/dashboard/freelancer/my-earnings", icon: LuDollarSign },
            { name: "Edit Profile", href: "/dashboard/freelancer/edit-profile", icon: PersonPencil },
        ],
        admin: [
            { name: "Overview", href: "/dashboard/admin", icon: LuLayoutDashboard },
            { name: "Manage Users", href: "/dashboard/admin/manage-users", icon: LuUsers },
            { name: "Manage Tasks", href: "/dashboard/admin/manage-task", icon: LuClipboardList },
            { name: "Transactions", href: "/dashboard/admin/transactions", icon: LuHistory },
        ]
    };

    const menuItems = navLinkMap[user?.role || 'client'];

    const renderNavLinks = () => (
        <nav className="flex-1 space-y-1.5 w-full">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                    <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? "bg-purple-600 text-white font-semibold shadow-lg shadow-purple-600/10" : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"}`}>
                        <Icon className={`text-lg shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </nav>
    );

    const renderUserInfo = () => (
        <div className="mt-auto flex pt-6 border-t border-slate-900/50">
            <div className="flex items-center gap-3 px-2 mb-4">
                <Avatar className="w-10 h-10 border-2 border-emerald-400 bg-slate-900 text-emerald-400 font-bold overflow-hidden">
                    {user?.image ? <Avatar.Image src={user.image} className="object-cover" /> : <Avatar.Fallback>{getFallbackText(user?.name)}</Avatar.Fallback>}
                </Avatar>
                <div className="overflow-hidden">
                    <h3 className="text-sm font-semibold text-slate-100 truncate">{user?.name || "User"}</h3>
                    <p className="text-[11px] text-slate-400 capitalize">{user?.role || "User"}</p>
                </div>
            </div>
            <Button
                onClick={handleSignOut}
                variant="flat"
                className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300"
                startContent={<LuLogOut className="text-lg" />}
            >
                <LuLogOut></LuLogOut>
            </Button>
        </div>
    );

    return (
        <>
            <div className="md:hidden fixed top-0 left-0 w-full h-14 bg-slate-950 border-b border-slate-900 px-4 flex items-center justify-between z-40">
                <Link href='/'>
                    <h1 className="text-lg font-bold text-emerald-400">SkillSwap</h1>
                </Link>
                <Button onPress={() => setIsOpen(true)} variant="light" isIconOnly className="text-slate-400"><LuMenu className="size-6" /></Button>
                <Drawer key={drawerKey} isOpen={isOpen} onOpenChange={setIsOpen}>
                    <Drawer.Backdrop />
                    <Drawer.Content placement="left" className="bg-slate-950 max-w-[270px] border-r border-slate-900 p-5 text-white flex flex-col h-full">
                        <Drawer.Dialog className="flex flex-col h-full">
                            <Link href='/' className="mb-8 font-bold text-xl text-emerald-400">SkillSwap</Link>
                            {renderNavLinks()}
                            {renderUserInfo()}
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer>
            </div>

            <aside className="hidden md:flex w-64 bg-slate-950 border-r border-slate-900 flex-col h-screen sticky top-0 px-4 py-6 shrink-0">
                <div className="mb-8 px-2">
                    <Link href='/' className="text-xl font-bold text-emerald-400">Skill<span className="text-slate-200">Swap</span></Link>
                </div>
                {renderNavLinks()}
                {renderUserInfo()}
            </aside>
            <div className="md:hidden h-14 w-full" />
        </>
    );
}