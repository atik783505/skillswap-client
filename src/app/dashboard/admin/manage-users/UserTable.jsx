"use client";
import { useState } from "react";
import { Button, Avatar } from "@heroui/react";
import { blockUser } from "@/lib/actions/admin";

export default function UserTable({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers);

    const handleToggleBlock = async (id, currentStatus) => {
        const result = await blockUser(id, { isBlocked: !currentStatus });
        if (result.success) {
            setUsers(prev => prev.map(u => u._id === id ? { ...u, isBlocked: !currentStatus } : u));
        } else {
            alert("Failed to update status");
        }
    };

    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{
                                borderBottom: "1px solid var(--border-color)",
                                background: "var(--bg-secondary)",
                                color: "var(--text-muted)",
                            }}
                        >
                            <th className="px-5 py-3.5">Name</th>
                            <th className="px-5 py-3.5">Email</th>
                            <th className="px-5 py-3.5">Role</th>
                            <th className="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="transition-colors"
                                style={{ borderBottom: "1px solid var(--border-color)" }}
                                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                                <td className="px-5 py-4 flex items-center gap-3 whitespace-nowrap">
                                    <Avatar className="cursor-pointer w-9 h-9 shrink-0">
                                        <Avatar.Image
                                            referrerPolicy="no-referrer"
                                            alt={user?.name || "User"}
                                            src={user?.image || "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"}
                                        />
                                        <Avatar.Fallback>
                                            {user?.name ? user.name.slice(0, 2).toUpperCase() : "US"}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <span className="font-semibold text-sm" style={{ color: "var(--text-heading)" }}>
                                        {user.name}
                                    </span>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap text-sm" style={{ color: "var(--text-secondary)" }}>
                                    {user.email}
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                                        user.role === 'admin'
                                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                    }`}>
                                        {user.role.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap text-right">
                                    {user.role !== 'admin' && (
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            className={`font-semibold text-xs rounded-xl ${
                                                user.isBlocked
                                                    ? 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/20'
                                                    : 'bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20'
                                            }`}
                                            onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                                        >
                                            {user.isBlocked ? 'Unblock' : 'Block'}
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
