import DeliverableModal from '@/components/Dashboard/DeliverableLInkModal';
import { getProposals } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import { Chip } from "@heroui/react";
import { CircleCheck, Clock } from '@gravity-ui/icons';
import Link from 'next/link';

function ProjectCard({ p }) {
    const isCompleted = p.taskDetails.status === 'completed';

    return (
        <div
            className="rounded-2xl p-6 transition-all"
            style={{
                background: "var(--bg-card)",
                border: `1px solid ${isCompleted ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"}`,
                boxShadow: "var(--shadow-sm)",
            }}
        >
            {/* Title + status */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-base font-bold leading-snug" style={{ color: "var(--text-heading)" }}>
                    {p.taskDetails.title}
                </h2>
                <Chip
                    color={isCompleted ? "success" : "warning"}
                    variant="flat"
                    size="sm"
                    className="shrink-0 capitalize text-[10px] font-bold"
                >
                    {p.taskDetails.status.toUpperCase()}
                </Chip>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                {p.taskDetails.description}
            </p>

            {/* Meta */}
            <div
                className="grid grid-cols-2 gap-3 text-xs mb-5 pb-4"
                style={{ borderBottom: "1px solid var(--border-color)" }}
            >
                <div style={{ color: "var(--text-muted)" }}>
                    Budget:{" "}
                    <span className="font-bold text-emerald-500">${p.proposedBudget}</span>
                </div>
                <div style={{ color: "var(--text-muted)" }}>
                    Category:{" "}
                    <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>
                        {p.taskDetails.category}
                    </span>
                </div>
            </div>

            {/* Action */}
            {isCompleted ? (
                <Link
                    href={p.taskDetails.deliverable_url || "#"}
                    target="_blank"
                    className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                >
                    🔗 View Submission
                </Link>
            ) : (
                <DeliverableModal taskId={p.taskDetails._id} />
            )}
        </div>
    );
}

const ActiveProjects = async () => {
    const user = await getSessionData();
    const proposals = await getProposals(user?.email);
    const activeData = proposals.filter(p => p.status === 'accepted');
    const completedProjects = activeData.filter(p => p.taskDetails.status === 'completed');
    const inProgressProjects = activeData.filter(p => p.taskDetails.status === 'in progress');

    return (
        <div className="w-full space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                    Active Projects
                </h1>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                    {inProgressProjects.length} in progress · {completedProjects.length} completed
                </p>
            </div>

            {/* Empty state */}
            {activeData.length === 0 && (
                <div
                    className="rounded-2xl p-12 text-center"
                    style={{ border: "1px dashed var(--border-subtle)", color: "var(--text-muted)" }}
                >
                    <p className="text-sm font-medium mb-2">No active projects yet.</p>
                    <Link href="/all-tasks" className="text-emerald-500 font-semibold text-sm hover:underline">
                        Browse available tasks →
                    </Link>
                </div>
            )}

            {/* In Progress */}
            {inProgressProjects.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                        <Clock className="w-5 h-5 text-amber-500" />
                        <h2 className="text-lg font-bold" style={{ color: "var(--text-heading)" }}>
                            In Progress
                            <span
                                className="ml-2 text-sm px-2 py-0.5 rounded-full font-semibold"
                                style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}
                            >
                                {inProgressProjects.length}
                            </span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {inProgressProjects.map(p => <ProjectCard key={p._id} p={p} />)}
                    </div>
                </div>
            )}

            {/* Completed */}
            {completedProjects.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                        <CircleCheck className="w-5 h-5 text-emerald-500" />
                        <h2 className="text-lg font-bold" style={{ color: "var(--text-heading)" }}>
                            Completed
                            <span
                                className="ml-2 text-sm px-2 py-0.5 rounded-full font-semibold"
                                style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
                            >
                                {completedProjects.length}
                            </span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {completedProjects.map(p => <ProjectCard key={p._id} p={p} />)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveProjects;
