"use client";
import Link from 'next/link';
import { Calendar } from '@gravity-ui/icons';

const statusConfig = {
  accepted: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)", color: "#10b981" },
  pending:  { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", color: "#f59e0b" },
  rejected: { bg: "rgba(244,63,94,0.08)",  border: "rgba(244,63,94,0.25)",  color: "#f43f5e" },
};

export default function RecentProposals({ proposals = [] }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-heading)" }}>
          Recent Proposals
        </h2>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          Your latest 4 submitted job applications
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {proposals.length > 0 ? (
          proposals.map((proposal) => {
            const sc = statusConfig[proposal.status] || statusConfig.pending;
            return (
              <div
                key={proposal._id}
                className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Left: cover note + meta */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1" style={{ color: "var(--text-heading)" }}>
                    {proposal.coverNote || "No cover note provided"}
                  </p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {proposal.createdAt
                        ? new Date(proposal.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                        : "N/A"}
                    </div>
                    <span>
                      Duration:{" "}
                      <span style={{ color: "var(--text-secondary)" }}>{proposal.estimatedDays} days</span>
                    </span>
                  </div>
                </div>

                {/* Right: budget + status */}
                <div className="flex items-center justify-between md:justify-end gap-5 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Budget
                    </p>
                    <p className="text-lg font-extrabold text-emerald-500">
                      ${Number(proposal.proposedBudget || 0).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}
                  >
                    {proposal.status || 'pending'}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div
            className="rounded-2xl p-10 text-center text-sm"
            style={{ border: "1px dashed var(--border-color)", color: "var(--text-muted)" }}
          >
            You haven&apos;t submitted any proposals yet.{' '}
            <Link href="/all-tasks" className="text-emerald-500 font-semibold hover:underline">
              Browse tasks →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
