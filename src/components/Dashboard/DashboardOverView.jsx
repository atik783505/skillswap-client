"use client";
import React from 'react';

const DashboardOverview = ({ title, description, userName, statsData = [] }) => {
  return (
    <div className="w-full space-y-5 mb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
          {title}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          {description}{" "}
          <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
            {userName || "User"}
          </span>
          .
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="rounded-2xl p-5 flex flex-col justify-between min-h-[120px] transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-sm)",
                borderLeft: `4px solid ${stat.accentHex || '#10b981'}`,
                animationDelay: `${index * 80}ms`,
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: stat.bg || "rgba(16,185,129,0.08)",
                    border: `1px solid ${stat.accentHex || '#10b981'}30`,
                  }}
                >
                  {IconComponent && (
                    <IconComponent
                      className="w-5 h-5"
                      style={{ color: stat.accentHex || '#10b981' }}
                    />
                  )}
                </div>
                {stat.trend && (
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: stat.bg || "rgba(16,185,129,0.08)",
                      color: stat.accentHex || '#10b981',
                    }}
                  >
                    {stat.trend}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                  {stat.title}
                </p>
                <h3 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                  {stat.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardOverview;
