import { getTask } from '@/lib/api/tasks';
import { getTaskProposals } from '@/lib/api/proposals';
import React from 'react';
import Link from 'next/link';
import { Calendar, CircleDollar, ArrowLeft, Tag, Link as LinkIcon } from '@gravity-ui/icons';

const statusConfig = {
    open:        { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)",  color: "#10b981" },
    'in progress':{ bg: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.25)", color: "#38bdf8" },
    completed:   { bg: "rgba(139,92,246,0.1)",   border: "rgba(139,92,246,0.3)",  color: "#8b5cf6" },
};

const proposalStatusConfig = {
    accepted: { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)",  color: "#10b981" },
    rejected: { bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.25)",   color: "#f43f5e" },
    pending:  { bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)",  color: "#f59e0b" },
};

const TaskDetails = async ({ params }) => {
    const { id } = await params;
    const task = await getTask(id);
    const rawProposals = await getTaskProposals(id);
    const proposals = Array.isArray(rawProposals) ? rawProposals
        : Array.isArray(rawProposals?.data) ? rawProposals.data
        : [];

    const sc = statusConfig[task?.status?.toLowerCase()] || statusConfig.open;

    return (
        <div className="w-full space-y-6">
            {/* Back */}
            <Link
                href="/dashboard/client/manage-task"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-emerald-500"
                style={{ color: "var(--text-secondary)" }}
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Tasks
            </Link>

            {/* Task card */}
            <div
                className="rounded-2xl p-6 sm:p-8"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}
            >
                {/* Header */}
                <div
                    className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 mb-5"
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                >
                    <div className="space-y-1.5">
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                            {task?.title || 'Untitled Task'}
                        </h1>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Task ID: {id}</p>
                    </div>
                    <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0"
                        style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}
                    >
                        {task?.status || 'open'}
                    </span>
                </div>

                {/* Meta row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div
                        className="flex items-center gap-4 p-4 rounded-xl"
                        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
                    >
                        <div className="p-3 rounded-xl" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
                            <CircleDollar className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>Budget</p>
                            <p className="text-lg font-extrabold text-emerald-500">
                                ${task?.budget ? Number(task.budget).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex items-center gap-4 p-4 rounded-xl"
                        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
                    >
                        <div className="p-3 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                            <Calendar className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>Deadline</p>
                            <p className="text-lg font-bold" style={{ color: "var(--text-heading)" }}>
                                {task?.deadline || 'Not set'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Deliverable */}
                {task?.deliverable_url && (
                    <div
                        className="flex flex-col gap-2.5 p-5 rounded-xl mb-5"
                        style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.3)" }}
                    >
                        <h3 className="text-sm font-bold text-emerald-500 flex items-center gap-2 uppercase tracking-wider">
                            <LinkIcon className="w-4 h-4" />
                            Submitted Deliverable
                        </h3>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            The freelancer has marked this task complete. Review the submission below:
                        </p>
                        <a
                            href={task.deliverable_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-emerald-500 hover:text-emerald-600 underline font-medium break-all"
                        >
                            {task.deliverable_url}
                        </a>
                    </div>
                )}

                {/* Description */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 mb-3" style={{ color: "var(--text-muted)" }}>
                        <Tag className="w-4 h-4 text-purple-500" />
                        Task Description
                    </h3>
                    <div
                        className="p-5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap"
                        style={{
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border-color)",
                            color: "var(--text-secondary)",
                        }}
                    >
                        {task?.description || 'No description provided.'}
                    </div>
                </div>
            </div>

            {/* Proposals section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: "var(--text-heading)" }}>
                    Proposals
                    <span
                        className="text-sm px-2.5 py-0.5 rounded-full font-bold"
                        style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
                    >
                        {proposals.length}
                    </span>
                </h2>

                {proposals.length === 0 ? (
                    <div
                        className="rounded-2xl p-10 text-center text-sm"
                        style={{ border: "1px dashed var(--border-color)", color: "var(--text-muted)" }}
                    >
                        No proposals received yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {proposals.map((proposal) => {
                            const ps = proposalStatusConfig[proposal.status] || proposalStatusConfig.pending;
                            return (
                                <div
                                    key={proposal._id}
                                    className="rounded-2xl p-5 flex flex-col gap-4"
                                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-sm truncate max-w-[200px]" style={{ color: "var(--text-heading)" }}>
                                                {proposal.freelancerEmail}
                                            </p>
                                            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                                                {new Date(proposal.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <span
                                            className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shrink-0"
                                            style={{ background: ps.bg, border: `1px solid ${ps.border}`, color: ps.color }}
                                        >
                                            {proposal.status}
                                        </span>
                                    </div>

                                    <div className="flex gap-4 text-sm">
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider block mb-0.5" style={{ color: "var(--text-muted)" }}>Bid</span>
                                            <span className="font-extrabold text-emerald-500">${proposal.proposedBudget}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider block mb-0.5" style={{ color: "var(--text-muted)" }}>Days</span>
                                            <span className="font-bold" style={{ color: "var(--text-heading)" }}>{proposal.estimatedDays}</span>
                                        </div>
                                    </div>

                                    <p
                                        className="text-sm leading-relaxed italic p-3.5 rounded-xl"
                                        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
                                    >
                                        {proposal.coverNote}
                                    </p>

                                    {proposal.status === 'pending' && (
                                        <div className="flex gap-2.5 mt-1">
                                            <form action="/api/payment" method="POST" className="flex-1">
                                                <input type="hidden" name="task_id" value={id} />
                                                <input type="hidden" name="task_title" value={task?.title} />
                                                <input type="hidden" name="client_email" value={task?.clientEmail} />
                                                <input type="hidden" name="freelancer_email" value={proposal.freelancerEmail} />
                                                <input type="hidden" name="amount" value={proposal.proposedBudget} />
                                                <input type="hidden" name="proposal_id" value={proposal._id.toString()} />
                                                <button
                                                    type="submit"
                                                    className="w-full h-9 rounded-xl text-sm font-bold text-white transition-all"
                                                    style={{ background: "#10b981" }}
                                                >
                                                    Accept & Pay
                                                </button>
                                            </form>
                                            <button
                                                className="flex-1 h-9 rounded-xl text-sm font-bold transition-all"
                                                style={{
                                                    background: "rgba(244,63,94,0.08)",
                                                    border: "1px solid rgba(244,63,94,0.25)",
                                                    color: "#f43f5e",
                                                }}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskDetails;
