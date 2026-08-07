"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { LayoutCellsLarge, SquareListUl, ArrowRight, Bucket, Plus } from '@gravity-ui/icons';
import TaskStatusChart from './OverviewRecharts/ClientPieCharts';
import BudgetOverviewChart from './OverviewRecharts/ClientBarCharts';
import { motion } from 'framer-motion';

function StatCard({ stat, index }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-2xl p-5 flex flex-col justify-between min-h-[130px] relative overflow-hidden"
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
        {stat.trend && (
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: stat.accentBg, color: stat.accentHex }}
          >
            {stat.trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--text-muted)" }}
        >
          {stat.title}
        </p>
        <h3
          className="text-3xl font-extrabold tracking-tight"
          style={{ color: "var(--text-heading)" }}
        >
          {stat.value}
        </h3>
      </div>
    </motion.div>
  );
}

const ClientOverview = ({ tasks = [] }) => {
  const { data } = useSession();
  const user = data?.user;
  const [isMounted, setIsMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsMounted(true); }, []);

  const stats = {
    totalTasks: tasks.length,
    openTasks: tasks.filter(t => t.status === 'open').length,
    inProgressTasks: tasks.filter(t => t.status === 'in progress').length,
    totalSpent: tasks
      .filter(t => t.status === 'in progress')
      .reduce((sum, t) => sum + (Number(t.budget) || 0), 0),
  };

  const dashboardStats = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: LayoutCellsLarge,
      accentHex: "#10b981",
      accentBg: "rgba(16,185,129,0.08)",
      accentBorder: "rgba(16,185,129,0.2)",
      trend: `+${stats.totalTasks}`,
    },
    {
      title: "Open Tasks",
      value: stats.openTasks,
      icon: SquareListUl,
      accentHex: "#8b5cf6",
      accentBg: "rgba(139,92,246,0.08)",
      accentBorder: "rgba(139,92,246,0.2)",
      trend: "Pending",
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: ArrowRight,
      accentHex: "#38bdf8",
      accentBg: "rgba(56,189,248,0.08)",
      accentBorder: "rgba(56,189,248,0.2)",
      trend: "Active",
    },
    {
      title: "Total Spent",
      value: `$${stats.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Bucket,
      accentHex: "#6366f1",
      accentBg: "rgba(99,102,241,0.08)",
      accentBorder: "rgba(99,102,241,0.2)",
      trend: "USD",
    },
  ];

  if (!isMounted) return null;

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
            Client Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Welcome back,{" "}
            <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
              {user?.name || "there"}
            </span>
            . Here&apos;s your project overview.
          </p>
        </div>
        <Link href="/dashboard/client/manage-task/new">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md"
            style={{
              background: "#10b981",
              color: "white",
              boxShadow: "0 4px 14px rgba(16,185,129,0.25)",
            }}
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TaskStatusChart stats={stats} />
        <BudgetOverviewChart tasks={tasks} />
      </div>

      {/* Quick links */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <h2 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Post a Task", href: "/dashboard/client/manage-task/new", accent: "#10b981" },
            { label: "My Tasks", href: "/dashboard/client/manage-task", accent: "#8b5cf6" },
            { label: "Proposals", href: "/dashboard/client/proposals", accent: "#38bdf8" },
            { label: "Browse Freelancers", href: "/freelancers", accent: "#6366f1" },
          ].map(({ label, href, accent }) => (
            <Link key={href} href={href}>
              <button
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background: `${accent}15`,
                  border: `1px solid ${accent}30`,
                  color: accent,
                }}
              >
                {label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;
