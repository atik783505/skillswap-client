'use client';
import React from 'react';
import Link from 'next/link';
import { Eye } from '@gravity-ui/icons';

const statusConfig = {
    accepted: { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)",  color: "#10b981" },
    pending:  { bg: "rgba(99,102,241,0.08)",   border: "rgba(99,102,241,0.25)",  color: "#6366f1" },
    rejected: { bg: "rgba(244,63,94,0.08)",    border: "rgba(244,63,94,0.25)",   color: "#f43f5e" },
};

const MyProposals = ({ proposals = [] }) => {
    return (
        <div className="w-full space-y-5">
            {/* Header */}
            <div className="flex items-center gap-2.5">
                <div className="w-1 h-6 rounded-full bg-purple-500" />
                <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-heading)" }}>
                    My Proposals
                </h2>
            </div>

            {/* Table */}
            <div
                className="rounded-2xl overflow-hidden"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}
            >
                {proposals.length === 0 ? (
                    <div
                        className="p-12 text-center text-sm"
                        style={{ color: "var(--text-muted)" }}
                    >
                        You haven&apos;t submitted any proposals yet.{" "}
                        <Link href="/all-tasks" className="text-emerald-500 font-semibold hover:underline">
                            Browse tasks →
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm min-w-[560px]">
                            <thead>
                                <tr
                                    className="text-xs font-bold uppercase tracking-wider"
                                    style={{
                                        background: "var(--bg-secondary)",
                                        borderBottom: "1px solid var(--border-color)",
                                        color: "var(--text-muted)",
                                    }}
                                >
                                    <th className="px-5 py-3.5">Task Title</th>
                                    <th className="px-5 py-3.5">Your Bid</th>
                                    <th className="px-5 py-3.5">Date</th>
                                    <th className="px-5 py-3.5">Status</th>
                                    <th className="px-5 py-3.5 text-right">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proposals.map((item) => {
                                    const sc = statusConfig[item.status?.toLowerCase()] || statusConfig.pending;
                                    return (
                                        <tr
                                            key={item._id}
                                            className="group transition-colors"
                                            style={{ borderBottom: "1px solid var(--border-color)" }}
                                            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            <td className="px-5 py-4 font-semibold max-w-[220px] truncate transition-colors group-hover:text-purple-500" style={{ color: "var(--text-heading)" }}>
                                                {item.taskDetails?.title || 'Untitled Task'}
                                            </td>
                                            <td className="px-5 py-4 font-bold text-emerald-500 whitespace-nowrap">
                                                ${Number(item.proposedBudget).toLocaleString()}
                                            </td>
                                            <td className="px-5 py-4 text-sm whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                                                {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span
                                                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                                                    style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <Link href={`/dashboard/freelancer/my-proposals/${item._id}`}>
                                                    <button
                                                        className="p-1.5 rounded-lg transition-colors hover:text-emerald-500"
                                                        style={{ color: "var(--text-muted)" }}
                                                        title="View Proposal"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProposals;
