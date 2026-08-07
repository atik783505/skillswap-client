'use client';
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const COLORS = ['#10b981', '#8b5cf6', '#38bdf8', '#f59e0b', '#f43f5e', '#6366f1'];

const BudgetOverviewChart = ({ tasks = [] }) => {
  const barData = tasks.slice(-6).map(t => ({
    name: t.title.length > 12 ? `${t.title.slice(0, 12)}…` : t.title,
    Budget: Number(t.budget) || 0,
  }));

  return (
    <div
      className="rounded-2xl p-5 h-[320px] flex flex-col"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="mb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--text-heading)" }}>
          Budget Overview
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          Latest 6 tasks by budget
        </p>
      </div>
      <div className="flex-1">
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                  borderRadius: "10px",
                  color: "var(--text-primary)",
                  fontSize: "12px",
                }}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar dataKey="Budget" radius={[6, 6, 0, 0]}>
                {barData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-xs" style={{ color: "var(--text-muted)" }}>
            No budget data available
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetOverviewChart;
