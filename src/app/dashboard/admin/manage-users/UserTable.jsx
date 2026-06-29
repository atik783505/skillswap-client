"use client";
import { useState } from "react";
import { Card, Button, Avatar } from "@heroui/react";
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
        <Card className="bg-slate-900/40 border border-slate-800 p-4">
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="text-slate-400 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider">
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b border-slate-800/60 text-slate-200 hover:bg-slate-800/20 transition-colors">
                                <td className="p-4 flex items-center gap-3 whitespace-nowrap">
                                    <Avatar
                                        className="cursor-pointer transition-transform hover:scale-105 shrink-0"

                                    >
                                        <Avatar.Image
                                            referrerPolicy="no-referrer"
                                            alt={user?.name || "User"}
                                            src={user?.image || "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"}
                                        />
                                        <Avatar.Fallback>
                                            {user?.name ? user.name.slice(0, 2).toUpperCase() : "US"}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <span className="font-medium">{user.name}</span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-slate-300">{user.email}</td>
                                <td className="p-4 whitespace-nowrap">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${user.role === 'admin' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                                        {user.role.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-right">
                                    {user.role !== 'admin' && (
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            className={`font-semibold text-xs rounded-xl ${user.isBlocked
                                                    ? 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20'
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
        </Card>
    );
}