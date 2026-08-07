import DashboardOverview from '@/components/Dashboard/DashboardOverView';
import { getProposals } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import { Bucket, CircleCheck, Clock, Folder, Calendar } from '@gravity-ui/icons';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const FreelancerHome = async () => {
  const user = await getSessionData();
  const proposals = await getProposals(user?.email) || [];

  const totalProposals = proposals.length;
  const pendingProposals = proposals.filter(p => p.status === 'pending').length;
  const acceptedProposals = proposals.filter(p => p.status === 'accepted').length;
  const totalEarnings = proposals
    .filter(p => p.status === 'accepted')
    .reduce((sum, p) => sum + (Number(p.proposedBudget) || 0), 0);

  const freelancerStats = [
    { title: "Total Proposals", value: totalProposals, icon: Folder, accentHex: "#8b5cf6", bg: "rgba(139,92,246,0.08)", trend: "Sent" },
    { title: "Pending", value: pendingProposals, icon: Clock, accentHex: "#f59e0b", bg: "rgba(245,158,11,0.08)", trend: "Awaiting" },
    { title: "Accepted", value: acceptedProposals, icon: CircleCheck, accentHex: "#38bdf8", bg: "rgba(56,189,248,0.08)", trend: "Won" },
    { title: "Total Earnings", value: `$${totalEarnings.toFixed(2)}`, icon: Bucket, accentHex: "#10b981", bg: "rgba(16,185,129,0.08)", trend: "USD" },
  ];

  const recentProposals = [...proposals]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const statusConfig = {
    accepted: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)", color: "#10b981" },
    pending:  { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", color: "#f59e0b" },
    rejected: { bg: "rgba(244,63,94,0.08)", border: "rgba(244,63,94,0.25)", color: "#f43f5e" },
  };

  return (
    <div className="w-full space-y-8">
      <DashboardOverview
        title="Freelancer Dashboard"
        description="Welcome back,"
        userName={user?.name}
        statsData={freelancerStats}
      />

      {/* Recent proposals */}
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
          {recentProposals.length > 0 ? (
            recentProposals.map((proposal, i) => {
              const sc = statusConfig[proposal.status] || statusConfig.pending;
              return (
                <motion.div
                  key={proposal._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <p
                      className="text-sm font-medium line-clamp-1"
                      style={{ color: "var(--text-heading)" }}
                    >
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
                </motion.div>
              );
            })
          ) : (
            <div
              className="rounded-2xl p-10 text-center text-sm"
              style={{
                border: "1px dashed var(--border-subtle)",
                color: "var(--text-muted)",
              }}
            >
              You haven&apos;t submitted any proposals yet.{' '}
              <Link href="/all-tasks" className="text-emerald-500 font-semibold hover:underline">
                Browse tasks →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerHome;
