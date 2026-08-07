"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { Person, SquareListUl } from '@gravity-ui/icons';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { FaBolt } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

function StatCard({ stat, index }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-2xl p-5 flex flex-col justify-between min-h-[130px]"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
        borderLeft: `4px solid ${stat.accentHex}`,
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: stat.accentBg, border: `1px solid ${stat.accentBorder}` }}
        >
          <Icon className="w-5 h-5" style={{ color: stat.accentHex }} />
        </div>
        <span
          className="text-[11px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: stat.accentBg, color: stat.accentHex }}
        >
          {stat.trend}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
          {stat.title}
        </p>
        <h3 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
          {stat.value}
        </h3>
      </div>
    </motion.div>
  );
}

const chartStyle = {
  contentStyle: {
    borderRadius: "12px",
    fontSize: "12px",
  },
};

const AdminOverview = ({ stats }) => {
  const { data } = useSession();
  const user = data?.user;
  const [isMounted, setIsMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsMounted(true); }, []);

  const dashboardStats = [
    { title: "Total Users", value: stats?.totalUsers || "0", icon: Person, accentHex: "#10b981", accentBg: "rgba(16,185,129,0.08)", accentBorder: "rgba(16,185,129,0.2)", trend: "+12%" },
    { title: "Total Tasks", value: stats?.totalTasks || "0", icon: SquareListUl, accentHex: "#8b5cf6", accentBg: "rgba(139,92,246,0.08)", accentBorder: "rgba(139,92,246,0.2)", trend: "+5.2%" },
    { title: "Total Revenue", value: `$${stats?.totalRevenue || "0"}`, icon: HiOutlineBanknotes, accentHex: "#f43f5e", accentBg: "rgba(244,63,94,0.08)", accentBorder: "rgba(244,63,94,0.2)", trend: "+18.4%" },
    { title: "Active Tasks", value: stats?.inProgressTasks || "0", icon: FaBolt, accentHex: "#38bdf8", accentBg: "rgba(56,189,248,0.08)", accentBorder: "rgba(56,189,248,0.2)", trend: "Live" },
  ];

  const revenueData = stats?.revenueHistory || [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: stats?.totalRevenue || 6000 },
  ];

  const taskDistributionData = [
    { name: 'Active', value: Number(stats?.inProgressTasks) || 12 },
    { name: 'Completed', value: Number(stats?.completedTasks) || 25 },
    { name: 'Pending', value: Number(stats?.pendingTasks) || 8 },
  ];

  const COLORS = ['#38bdf8', '#10b981', '#a855f7'];

  if (!isMounted) return null;

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
          Admin Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Welcome back,{" "}
          <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
            {user?.name || "Admin"}
          </span>
          . Here is the full platform overview.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue chart */}
        <div
          className="lg:col-span-2 rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <div className="mb-5">
            <h3 className="text-base font-bold" style={{ color: "var(--text-heading)" }}>Revenue Analytics</h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Monthly revenue growth trend</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--bg-primary)",
                    borderColor: "var(--border-color)",
                    borderRadius: "12px",
                    color: "var(--text-primary)",
                  }}
                  itemStyle={{ color: "var(--text-primary)" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task distribution chart */}
        <div
          className="rounded-2xl p-5 flex flex-col"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <div className="mb-3">
            <h3 className="text-base font-bold" style={{ color: "var(--text-heading)" }}>Task Overview</h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Platform task distribution</p>
          </div>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskDistributionData}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskDistributionData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--bg-primary)",
                    borderColor: "var(--border-color)",
                    borderRadius: "12px",
                    color: "var(--text-primary)",
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", color: "var(--text-secondary)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Completed Tasks", value: stats?.completedTasks || 0, accent: "#10b981" },
          { label: "Pending Tasks", value: stats?.pendingTasks || 0, accent: "#f59e0b" },
          { label: "Blocked Users", value: stats?.blockedUsers || 0, accent: "#f43f5e" },
        ].map(({ label, value, accent }, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 flex items-center justify-between"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{label}</p>
            <span className="text-xl font-extrabold" style={{ color: accent }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
