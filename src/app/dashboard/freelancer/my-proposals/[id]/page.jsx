import { getPorposal } from '@/lib/api/proposals';
import { Avatar, Chip } from '@heroui/react';
import Link from 'next/link';
import { ArrowLeft } from '@gravity-ui/icons';

const statusColors = {
    pending:  { bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.25)",  color: "#6366f1" },
    accepted: { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)",  color: "#10b981" },
    rejected: { bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.25)",   color: "#f43f5e" },
};

const MyProposalDetails = async ({ params }) => {
    const { id } = await params;
    const proposalData = await getPorposal(id);

    if (!proposalData) {
        return (
            <div className="p-10 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                Proposal not found.
            </div>
        );
    }

    const { taskDetails, coverNote, proposedBudget, estimatedDays, status } = proposalData;
    const sc = statusColors[status?.toLowerCase()] || statusColors.pending;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-5">

            {/* Back button */}
            <Link
                href="/dashboard/freelancer/my-proposals"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-emerald-500"
                style={{ color: "var(--text-secondary)" }}
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Proposals
            </Link>

            {/* Task details card */}
            <div
                className="rounded-2xl p-6 sm:p-8 space-y-5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}
            >
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "#8b5cf6" }}
                    >
                        {taskDetails.category}
                    </span>
                    <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981" }}
                    >
                        {taskDetails.status}
                    </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                    {taskDetails.title}
                </h1>

                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {taskDetails.description}
                </p>

                {/* Task meta grid */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-5"
                    style={{ borderTop: "1px solid var(--border-color)" }}
                >
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Budget</p>
                        <p className="text-xl font-extrabold text-emerald-500">${taskDetails.budget}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Deadline</p>
                        <p className="font-semibold text-sm" style={{ color: "var(--text-heading)" }}>
                            {new Date(taskDetails.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Client</p>
                        <div className="flex items-center gap-2.5">
                            <Avatar className="w-8 h-8 rounded-xl">
                                <Avatar.Image alt={taskDetails.clientName} src={taskDetails.clientImage} />
                                <Avatar.Fallback className="text-xs font-bold">
                                    {taskDetails.clientName?.charAt(0)}
                                </Avatar.Fallback>
                            </Avatar>
                            <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
                                {taskDetails.clientName}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Proposal details card */}
            <div
                className="rounded-2xl p-6 sm:p-8 space-y-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}
            >
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold" style={{ color: "var(--text-heading)" }}>
                        Your Proposal
                    </h3>
                    <span
                        className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                        style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}
                    >
                        {status}
                    </span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: "Proposed Bid", value: `$${proposedBudget}`, color: "text-emerald-500" },
                        { label: "Estimated Days", value: `${estimatedDays} days`, color: "var(--text-heading)" },
                        { label: "Status", value: status?.toUpperCase(), color: sc.color },
                    ].map(({ label, value, color }) => (
                        <div
                            key={label}
                            className="rounded-xl p-4"
                            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
                        >
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-muted)" }}>
                                {label}
                            </p>
                            <p className="text-xl font-extrabold" style={{ color }}>
                                {value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Cover note */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                        Cover Note
                    </p>
                    <div
                        className="rounded-xl p-5 text-sm leading-relaxed"
                        style={{
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border-color)",
                            color: "var(--text-secondary)",
                        }}
                    >
                        {coverNote}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProposalDetails;
