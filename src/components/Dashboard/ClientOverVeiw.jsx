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

    const openTasksCount = tasks?.filter(task => task.status === 'open').length || 0;
    const inProgressTasksCount = tasks?.filter(task => task.status === 'in progress').length || 0;

    const totalSpentAmount = tasks?.reduce((sum, task) => sum + (Number(task.budget) || 0), 0) || 0;

    const stats = {
        totalTasks: tasks.length,
        openTasks: openTasksCount,         
        inProgressTasks: inProgressTasksCount, 
        totalSpent: totalSpentAmount     
    };

    return (
        <div className="w-full p-4 md:p-8 bg-slate-950 min-h-screen text-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-100">Client Dashboard</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Welcome back, <span className="font-semibold text-slate-200">{user?.name || "Alex"}</span>. Here's what's happening with your projects today.
                    </p>
                </div>

                <Button
                    as={Link}
                    href="/dashboard/client/manage-task/new"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl px-4 py-2.5 shadow-lg shadow-emerald-500/10 flex items-center gap-1.5 transition-all self-start sm:self-auto"
                >
                    <Plus className="size-4 stroke-[3]" />
                    <span>Create New Task</span>
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <Card className="border border-slate-900 bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-emerald-400">
                            <LayoutCellsLarge className="size-5" />
                        </div>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            +12%
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Tasks</p>
                        <h3 className="text-3xl font-bold text-slate-100 mt-1 tracking-tight">{stats.totalTasks}</h3>
                    </div>
                </Card>

                {/* ২. Open Tasks Card */}
                <Card className="border border-slate-900 border-l-3 border-l-purple-500 bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-purple-400 w-fit">
                        <SquareListUl className="size-5" />
                    </div>
                    <div className="mt-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Open</p>
                        <h3 className="text-3xl font-bold text-slate-100 mt-1 tracking-tight">{stats.openTasks}</h3>
                    </div>
                </Card>

                {/* ৩. In Progress Card */}
                <Card className="border border-slate-900 border-l-3 border-l-emerald-500 bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-emerald-400 w-fit">
                        <ArrowRight className="size-5" />
                    </div>
                    <div className="mt-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">In Progress</p>
                        <h3 className="text-3xl font-bold text-slate-100 mt-1 tracking-tight">{stats.inProgressTasks}</h3>
                    </div>
                </Card>
                <Card className="border border-slate-900 border-l-3 border-l-indigo-500 bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-indigo-400 w-fit">
                        <Bucket className="size-5" />
                    </div>
                    <div className="mt-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Spent</p>
                        <h3 className="text-3xl font-bold text-slate-100 mt-1 tracking-tight">
                            ${stats.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </h3>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default ClientOverview;