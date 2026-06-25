'use client';
import React from 'react';
import { Card, Button } from '@heroui/react';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

import {
    LayoutCellsLarge,
    SquareListUl,
    ArrowRight,
    Bucket,
    Plus
} from '@gravity-ui/icons';

const ClientOverview = ({ tasks = [] }) => {
    const { data } = useSession();
    const user = data?.user;

    const stats = {
        totalTasks: tasks.length,
        openTasks: tasks.filter(t => t.status === 'open').length,
        inProgressTasks: tasks.filter(t => t.status === 'in progress').length,
        totalSpent: tasks.reduce((sum, t) => sum + (Number(t.budget) || 0), 0)
    };

    const dashboardStats = [
        { title: "TOTAL TASKS", value: stats.totalTasks, icon: LayoutCellsLarge, color: "text-emerald-400", border: "border-l-emerald-500", trend: "+12%", bg: "bg-emerald-500/10" },
        { title: "OPEN TASKS", value: stats.openTasks, icon: SquareListUl, color: "text-purple-400", border: "border-l-purple-500", trend: "Pending", bg: "bg-purple-500/10" },
        { title: "IN PROGRESS", value: stats.inProgressTasks, icon: ArrowRight, color: "text-sky-400", border: "border-l-sky-500", trend: "Active", bg: "bg-sky-500/10" },
        { title: "TOTAL SPENT", value: `$${stats.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: Bucket, color: "text-indigo-400", border: "border-l-indigo-500", trend: "Paid", bg: "bg-indigo-500/10" },
    ];

    return (
        <div className="w-full p-4 md:p-8 bg-slate-950 min-h-screen text-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-100">Client Dashboard</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Welcome back, <span className="font-semibold text-slate-200">{user?.name || "Alex"}</span>. Here's what's happening with your projects.
                    </p>
                </div>
                <Link href="/dashboard/client/manage-task/new">
                    <Button
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl px-4 py-2.5 shadow-lg shadow-emerald-500/10 flex items-center gap-1.5 transition-all self-start sm:self-auto"
                    >
                        <Plus className="size-4 stroke-[3]" />
                        <span>Create New Task</span>
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {dashboardStats.map((stat, index) => (
                    <Card
                        key={index}
                        className={`border-l-4 ${stat.border} border-t border-r border-b bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between`}
                    >
                        <div className="flex items-center justify-between">
                            <div className={`p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 ${stat.color}`}>
                                <stat.icon className="size-5" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.title}</p>
                            <h3 className="text-3xl font-bold text-slate-100 mt-1 tracking-tight">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ClientOverview;