'use client';
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const TaskStatusChart = ({ stats }) => {
  const pieData = [
    { name: 'Open', value: stats.openTasks, color: '#a855f7' },
    { name: 'In Progress', value: stats.inProgressTasks, color: '#38bdf8' },
    { name: 'Completed', value: stats.completedTasks || 0, color: '#10b981' },
  ].filter(item => item.value > 0);

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
          Task Status
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          Distribution by stage
        </p>
      </div>
      <div className="flex-1">
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                  borderRadius: "10px",
                  color: "var(--text-primary)",
                  fontSize: "12px",
                }}
              />
              <Legend
                iconType="circle"
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: "12px", color: "var(--text-secondary)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-xs" style={{ color: "var(--text-muted)" }}>
            No task data available
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskStatusChart;
