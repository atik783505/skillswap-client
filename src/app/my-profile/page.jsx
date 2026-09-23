"use client";

import { useState } from "react";
import { Avatar, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FiEdit2, FiMail, FiUser } from "react-icons/fi";
import { EditProfileModal } from "@/components/EditProfileModal";

export default function MyProfile() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [isOpen, setIsOpen] = useState(false);

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : 'US';

    return (
        <div
            className="min-h-screen p-6 md:p-12"
            style={{ background: "var(--bg-primary)" }}
        >
            <div className="max-w-3xl mx-auto space-y-5">

                {/* Profile card */}
                <div
                    className="rounded-3xl p-7 sm:p-9 flex flex-col md:flex-row items-center md:items-start gap-7"
                    style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        boxShadow: "var(--shadow-lg)",
                    }}
                >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div
                            className="absolute -inset-1 rounded-2xl pointer-events-none"
                            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(139,92,246,0.2))", filter: "blur(4px)" }}
                        />
                        <Avatar className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl relative border-2"
                            style={{ borderColor: "rgba(16,185,129,0.4)" }}
                        >
                            <Avatar.Image
                                alt={user?.name || "User"}
                                src={user?.image || "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"}
                                referrerPolicy="no-referrer"
                            />
                            <Avatar.Fallback className="text-2xl font-bold text-emerald-500">
                                {initials}
                            </Avatar.Fallback>
                        </Avatar>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left space-y-3.5">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                                {user?.name || "Your Name"}
                            </h1>
                            <div
                                className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                                style={{
                                    background: "rgba(16,185,129,0.08)",
                                    border: "1px solid rgba(16,185,129,0.2)",
                                    color: "#10b981",
                                }}
                            >
                                {user?.role || "Member"}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                                <FiMail className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                                {user?.email || "—"}
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                                <FiUser className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                                Member ID: <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{user?.id?.slice(0, 16)}…</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="inline-flex items-center gap-2 px-6 h-10 rounded-xl text-sm font-bold text-white transition-all mt-2"
                            style={{
                                background: "linear-gradient(135deg, #10b981, #059669)",
                                boxShadow: "0 4px 14px rgba(16,185,129,0.25)",
                            }}
                        >
                            <FiEdit2 size={14} />
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            <EditProfileModal isOpen={isOpen} onOpenChange={setIsOpen} user={user} />
        </div>
    );
}
