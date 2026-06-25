'use client';
import React from 'react';
import { Card } from '@heroui/react';
import { useSession } from '@/lib/auth-client';
import { Person, SquareListUl } from '@gravity-ui/icons';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { FaBolt } from 'react-icons/fa6';

const AdminOverview = ({ stats }) => {
    const { data } = useSession();
    const user = data?.user;

    const dashboardStats = [
        { title: "TOTAL USERS", value: stats?.totalUsers || "0", icon: Person, color: "text-emerald-400", border: "border-l-emerald-500", trend: "+12%", bg: "bg-emerald-500/10" },
        { title: "TOTAL TASKS", value: stats?.totalTasks || "0", icon: SquareListUl, color: "text-purple-400", border: "border-l-purple-500", trend: "+5.2%", bg: "bg-purple-500/10" },
        { title: "TOTAL REVENUE", value: `$${stats?.totalRevenue || "0"}`, icon: HiOutlineBanknotes, color: "text-rose-400", border: "border-l-rose-500", trend: "+18.4%", bg: "bg-rose-500/10" },
        { title: "ACTIVE TASKS", value: stats?.activeTasks || "0", icon: FaBolt, color: "text-sky-400", border: "border-l-sky-500", trend: "Active Now", bg: "bg-sky-500/10" },
    ];

    return (
        <div className="w-full p-4 md:p-8 bg-slate-950 min-h-screen text-slate-100">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-100">Admin Dashboard</h1>
                <p className="text-sm text-slate-400 mt-1">
                    Welcome back, <span className="font-semibold text-slate-200">{user?.name || "Admin"}</span>. Here is the platform overview.
                </p>
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
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stat.bg} ${stat.color}`}>
                                {stat.trend}
                            </span>
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

export default AdminOverview;