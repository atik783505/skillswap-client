'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, Button, Drawer } from "@heroui/react";
import { useSession, authClient } from "@/lib/auth-client";
import {
  LuLayoutDashboard, LuClipboardPlus, LuClipboardList,
  LuFileSpreadsheet, LuMenu, LuSearch, LuBriefcase,
  LuDollarSign, LuUsers, LuHistory, LuLogOut, LuX
} from "react-icons/lu";
import { PersonPencil } from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import ThemeToggle from '@/components/ThemeToggle';

const Logo = () => (
  <Link href='/' className="flex items-center gap-2.5 group">
    <div className="p-1.5 rounded-lg" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
      <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <span className="font-bold text-lg" style={{ color: "var(--text-heading)" }}>
      Skill<span className="text-emerald-500">Swap</span>
    </span>
  </Link>
);

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

function getFallbackText(name) {
  if (!name) return "US";
  const words = name.trim().split(" ");
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function NavLinks({ items, pathname }) {
  return (
    <nav className="flex-1 space-y-1 w-full px-3">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={
              isActive
                ? {
                    background: "rgba(16,185,129,0.12)",
                    color: "#10b981",
                    border: "1px solid rgba(16,185,129,0.2)",
                  }
                : {
                    color: "var(--text-secondary)",
                    border: "1px solid transparent",
                  }
            }
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.background = "var(--bg-secondary)";
                e.currentTarget.style.color = "var(--text-primary)";
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-secondary)";
              }
            }}
          >
            <Icon
              className="text-base shrink-0"
              style={{ color: isActive ? "#10b981" : "var(--text-muted)" }}
            />
            <span>{item.name}</span>
            {isActive && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function UserFooter({ user, onSignOut }) {
  return (
    <div className="px-3 pb-3 pt-4 mt-auto border-t" style={{ borderColor: "var(--border-color)" }}>
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-9 h-9 rounded-xl shrink-0" style={{ border: "2px solid rgba(16,185,129,0.4)" }}>
          {user?.image ? (
            <Avatar.Image src={user.image} className="object-cover" />
          ) : (
            <Avatar.Fallback className="text-xs font-bold text-emerald-500">
              {getFallbackText(user?.name)}
            </Avatar.Fallback>
          )}
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: "var(--text-heading)" }}>
            {user?.name || "User"}
          </p>
          <p className="text-[11px] capitalize" style={{ color: "var(--text-muted)" }}>
            {user?.role || "Member"}
          </p>
        </div>
        <button
          onClick={onSignOut}
          title="Sign out"
          className="p-1.5 rounded-lg transition-colors text-rose-400 hover:bg-rose-500/10"
        >
          <LuLogOut className="text-base" />
        </button>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [drawerKey, setDrawerKey] = useState(0);
  const user = session?.user;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setDrawerKey(prev => prev + 1);
  }, [pathname]);

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully");
    window.location.href = "/";
  };

  const menuItems = navLinkMap[user?.role || 'client'];

  const sidebarContent = (
    <div className="flex flex-col h-full py-5">
      <div className="px-4 mb-7">
        <Logo />
      </div>

      {/* Role badge */}
      {user?.role && (
        <div className="px-4 mb-5">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.15)",
              color: "#10b981",
            }}
          >
            {user.role} Dashboard
          </span>
        </div>
      )}

      <NavLinks items={menuItems} pathname={pathname} />

      <div className="px-4 mt-4">
        <ThemeToggle />
      </div>

      {user && <UserFooter user={user} onSignOut={handleSignOut} />}
    </div>
  );

  return (
    <>
      {/* Mobile topbar */}
      <div
        className="md:hidden fixed top-0 left-0 w-full h-14 px-4 flex items-center justify-between z-40 backdrop-blur-md"
        style={{
          background: "var(--navbar-bg)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-xl transition-colors"
            style={{ color: "var(--text-secondary)", background: "var(--bg-secondary)" }}
            aria-label="Open menu"
          >
            <LuMenu className="w-5 h-5" />
          </button>
        </div>

        <Drawer key={drawerKey} isOpen={isOpen} onOpenChange={setIsOpen}>
          <Drawer.Backdrop />
          <Drawer.Content
            placement="left"
            className="max-w-[270px]"
            style={{ background: "var(--bg-primary)", borderRight: "1px solid var(--border-color)" }}
          >
            <Drawer.Dialog className="flex flex-col h-full">
              <div className="flex items-center justify-between px-5 pt-5 pb-2">
                <Logo />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: "var(--text-muted)", background: "var(--bg-secondary)" }}
                >
                  <LuX className="w-4 h-4" />
                </button>
              </div>
              {user?.role && (
                <div className="px-5 mb-4">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", color: "#10b981" }}
                  >
                    {user.role} Dashboard
                  </span>
                </div>
              )}
              <NavLinks items={menuItems} pathname={pathname} />
              {user && <UserFooter user={user} onSignOut={handleSignOut} />}
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer>
      </div>

      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex w-64 flex-col h-screen sticky top-0 shrink-0"
        style={{
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--sidebar-border)",
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile spacer */}
      <div className="md:hidden h-14 w-full" />
    </>
  );
}
