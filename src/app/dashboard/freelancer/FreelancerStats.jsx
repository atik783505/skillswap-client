"use client";
import { Bucket, CircleCheck, Clock, Folder } from '@gravity-ui/icons';

const stats = (totals) => [
  {
    title: "Total Proposals",
    value: totals.totalProposals,
    icon: Folder,
    accentHex: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    trend: "Sent",
  },
  {
    title: "Pending",
    value: totals.pendingProposals,
    icon: Clock,
    accentHex: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    trend: "Awaiting",
  },
  {
    title: "Accepted",
    value: totals.acceptedProposals,
    icon: CircleCheck,
    accentHex: "#38bdf8",
    bg: "rgba(56,189,248,0.08)",
    trend: "Won",
  },
  {
    title: "Total Earnings",
    value: `$${Number(totals.totalEarnings).toFixed(2)}`,
    icon: Bucket,
    accentHex: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    trend: "USD",
  },
];

export default function FreelancerStats({
  userName,
  totalProposals,
  pendingProposals,
  acceptedProposals,
  totalEarnings,
}) {
  const cards = stats({ totalProposals, pendingProposals, acceptedProposals, totalEarnings });

  return (
    <div className="w-full space-y-5 mb-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
          Freelancer Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Welcome back,{" "}
          <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
            {userName || "User"}
          </span>
          .
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="rounded-2xl p-5 flex flex-col justify-between min-h-[120px] transition-all duration-200 hover:-translate-y-0.5"
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
                  style={{ background: stat.bg, border: `1px solid ${stat.accentHex}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.accentHex }} />
                </div>
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: stat.bg, color: stat.accentHex }}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
