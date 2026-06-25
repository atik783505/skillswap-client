"use client";
import { useState } from "react";
import { Card, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
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
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                        <th className="p-4">NAME</th>
                        <th className="p-4">EMAIL</th>
                        <th className="p-4">ROLE</th>
                        <th className="p-4">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b border-slate-800 text-slate-200">
                            <td className="p-4 flex items-center gap-3">
                                <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                                {user.name}
                            </td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-red-900/30 text-red-400' : 'bg-purple-900/30 text-purple-400'}`}>
                                    {user.role.toUpperCase()}
                                </span>
                            </td>
                            <td className="p-4">

                                {user.role !== 'admin' && (
                                    <Button
                                        size="sm"
                                        className={`${user.isBlocked ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'}`}
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
        </Card>
    );
}