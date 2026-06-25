"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, Button, Drawer } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { LuLayoutDashboard, LuClipboardPlus, LuClipboardList, LuFileSpreadsheet, LuMenu, LuSearch, LuBriefcase, LuDollarSign, LuUsers, LuHistory } from "react-icons/lu";

export function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [drawerKey, setDrawerKey] = useState(0);
    useEffect(() => {
        setIsOpen(false);
        setDrawerKey(prev => prev + 1);
    }, [pathname]);

    const user = session?.user


    const getFallbackText = (name) => {
        if (!name) return "US";
        const words = name.trim().split(" ");
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const clientMenuItems = [
        { name: "Overview", href: "/dashboard/client", icon: LuLayoutDashboard },
        { name: "Post Task", href: "/dashboard/client/manage-task/new", icon: LuClipboardPlus },
        { name: "My Tasks", href: "/dashboard/client/manage-task", icon: LuClipboardList },
        { name: "Manage Proposals", href: "/dashboard/client/proposals", icon: LuFileSpreadsheet },
    ];

    const freelancerMenuItems = [
        { name: "Overview", href: "/dashboard/freelancer", icon: LuLayoutDashboard },
        { name: "Browse Tasks", href: "/all-tasks", icon: LuSearch },
        { name: "My Proposals", href: "/dashboard/freelancer/my-proposals", icon: LuFileSpreadsheet },
        { name: "Active Projects", href: "/dashboard/freelancer/active-projects", icon: LuBriefcase },
        { name: "My Earnings", href: "/dashboard/freelancer/earnings", icon: LuDollarSign },
    ];

    const adminMenuItems = [
        { name: "Overview", href: "/dashboard/admin", icon: LuLayoutDashboard },
        { name: "Manage Users", href: "/dashboard/admin/manage-users", icon: LuUsers },
        { name: "Manage Tasks", href: "/dashboard/admin/manage-task", icon: LuClipboardList },
        { name: "Transactions", href: "/dashboard/admin/transactions", icon: LuHistory },
    ];

    const navLinkMap = {
        client: clientMenuItems,
        freelancer: freelancerMenuItems,
        admin: adminMenuItems
    }

    const menuItems = navLinkMap[user?.role || 'client']


    const renderNavLinks = () => (
        <nav className="flex-1 space-y-1.5 w-full">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                            ${isActive
                                ? "bg-purple-600 text-white font-semibold shadow-lg shadow-purple-600/10"
                                : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
                            }`}
                    >
                        <Icon className={`text-lg shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                        <span>{item.name}</span>
                    </Link>
                );
            })}


        </nav>
    );

    const renderProfileHeader = () => (
        <>
            <div className="mb-8 px-2">
                <h1 className="text-xl font-bold text-emerald-400 font-sans tracking-tight">
                    <Link href='/'> Skill<span className="text-emerald-400">Swap</span></Link>
                   
                </h1>
            </div>

            <div className="flex flex-col items-start gap-3 px-2 mb-8 select-none">
                <div className="relative group">
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-[6px] group-hover:bg-emerald-400/30 transition-all" />
                    <Avatar className="w-16 h-16 rounded-full border-2 border-emerald-400 p-0.5 bg-slate-900 text-emerald-400 font-bold text-lg overflow-hidden">
                        {user?.image && (
                            <Avatar.Image
                                alt={user?.name || "User"}
                                src={user?.image}
                                referrerPolicy="no-referrer"
                                className="rounded-full object-cover"
                            />
                        )}
                        <Avatar.Fallback className="rounded-full">{getFallbackText(user?.name)}</Avatar.Fallback>
                    </Avatar>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-100 tracking-wide">{user?.name || "Client"}</h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5 capitalize">{user?.role || "Freelancer"}</p>
                </div>
            </div>
        </>
    );

    return (
        <>
            <div className="md:hidden fixed top-0 left-0 w-full h-14 bg-slate-950 border-b border-slate-900 px-4 flex items-center justify-between z-40">
                <h1 className="text-lg font-bold text-emerald-400">SkillSwap</h1>

                <Button
                    onPress={() => {
                        setDrawerKey(prev => prev + 1);
                        setIsOpen(true);
                    }}
                    variant="light"
                    isIconOnly
                    className="text-slate-400 hover:text-white min-w-8 w-10 h-10 rounded-xl"
                >
                    <LuMenu className="size-6" />
                </Button>

                <Drawer
                    key={drawerKey}
                    isOpen={isOpen}
                    onOpenChange={(open) => {
                        setIsOpen(open);
                        if (!open) setDrawerKey(prev => prev + 1);
                    }}
                >
                    <Drawer.Backdrop />
                    <Drawer.Content placement="left" className="bg-slate-950 max-w-[270px] border-r border-slate-900 p-5 text-white">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger className="text-slate-400 hover:text-white top-4 right-4" />
                            <Drawer.Header className="px-0 pt-2 pb-0">
                                {renderProfileHeader()}
                            </Drawer.Header>
                            <Drawer.Body className="px-0 py-2">
                                {renderNavLinks()}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer>
            </div>

            <aside className="hidden md:flex w-64 bg-slate-950 border-r border-slate-900 flex-col h-screen sticky top-0 px-4 py-6 shrink-0 select-none">
                {renderProfileHeader()}
                {renderNavLinks()}
            </aside>

            <div className="md:hidden h-14 w-full" />
        </>
    );
}