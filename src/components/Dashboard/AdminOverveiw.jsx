"use client";
import React, { useEffect, useState } from 'react';
import { Card } from '@heroui/react';
import { useSession } from '@/lib/auth-client';
import { Person, SquareListUl } from '@gravity-ui/icons';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { FaBolt } from 'react-icons/fa6';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

const AdminOverview = ({ stats }) => {
    const { data } = useSession();
    const user = data?.user;
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const dashboardStats = [
        { title: "TOTAL USERS", value: stats?.totalUsers || "0", icon: Person, color: "text-emerald-400", border: "border-l-emerald-500", trend: "+12%", bg: "bg-emerald-500/10" },
        { title: "TOTAL TASKS", value: stats?.totalTasks || "0", icon: SquareListUl, color: "text-purple-400", border: "border-l-purple-500", trend: "+5.2%", bg: "bg-purple-500/10" },
        { title: "TOTAL REVENUE", value: `$${stats?.totalRevenue || "0"}`, icon: HiOutlineBanknotes, color: "text-rose-400", border: "border-l-rose-500", trend: "+18.4%", bg: "bg-rose-500/10" },
        { title: "ACTIVE TASKS", value: stats?.inProgressTasks || "0", icon: FaBolt, color: "text-sky-400", border: "border-l-sky-500", trend: "Active Now", bg: "bg-sky-500/10" },
    ];

    const revenueData = stats?.revenueHistory || [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 5000 },
        { name: 'Apr', revenue: 4500 },
        { name: 'May', revenue: stats?.totalRevenue || 6000 },
    ];

    const taskDistributionData = [
        { name: 'Active Tasks', value: Number(stats?.inProgressTasks) || 12 },
        { name: 'Completed', value: Number(stats?.completedTasks) || 25 },
        { name: 'Pending', value: Number(stats?.pendingTasks) || 8 },
    ];

    const COLORS = ['#38bdf8', '#10b981', '#a855f7'];

    if (!isMounted) return null;

    return (
        <div className="w-full p-4 md:p-8 bg-slate-950 min-h-screen text-slate-100">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-100">Admin Dashboard</h1>
                <p className="text-sm text-slate-400 mt-1">
                    Welcome back, <span className="font-semibold text-slate-200">{user?.name || "Admin"}</span>. Here is the platform overview.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {dashboardStats.map((stat, index) => {
                    const IconComponent = stat.icon; 
                    
                    return (
                        <Card 
                            key={index} 
                            className={`bg-slate-900/40 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800 border-l-4 ${stat.border}`}
                        >
                            <div className="p-5 flex flex-col justify-between h-full">
                                <div className="flex items-center justify-between">
                                    <div className={`p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 ${stat.color}`}>
                                        <IconComponent className="size-5" />
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stat.bg} ${stat.color}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.title}</p>
                                    <h3 className="text-3xl font-bold text-slate-100 mt-1 tracking-tight">{stat.value}</h3>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-5 rounded-2xl">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-slate-200">Revenue Analytics</h3>
                        <p className="text-xs text-slate-400">Monthly revenue growth status</p>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px' }}
                                    itemStyle={{ color: '#f1f5f9' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                    <div className="mb-2">
                        <h3 className="text-lg font-semibold text-slate-200">Task Overview</h3>
                        <p className="text-xs text-slate-400">Current platform tasks status</p>
                    </div>
                    <div className="h-64 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={taskDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {taskDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px' }}
                                    itemStyle={{ color: '#f1f5f9' }}
                                />
                                <Legend 
                                    iconType="circle" 
                                    layout="horizontal" 
                                    verticalAlign="bottom" 
                                    align="center"
                                    wrapperStyle={{ fontSize: '12px', padding臨: '10px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminOverview;