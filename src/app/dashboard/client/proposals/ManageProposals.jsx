"use client";
import { useState, useEffect } from "react";
import { Button, Avatar, Chip } from "@heroui/react";
import { Person, Check, Xmark, Briefcase } from "@gravity-ui/icons";
import { motion } from "framer-motion";

const ManageProposals = ({ proposals }) => {
    const [data] = useState(proposals);
    const [isMounted, setIsMounted] = useState(false);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setIsMounted(true); }, []);

    if (!isMounted) return null;

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div
                    className="p-2 rounded-xl"
                    style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                    <Person className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                    <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-heading)" }}>
                        Manage Proposals
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {data.length} proposals received across all your tasks
                    </p>
                </div>
            </div>

            {/* Proposal cards */}
            <div className="space-y-3">
                {data.length === 0 ? (
                    <div
                        className="rounded-2xl p-10 text-center text-sm"
                        style={{ border: "1px dashed var(--border-subtle)", color: "var(--text-muted)" }}
                    >
                        No proposals yet. Post a task to start receiving bids.
                    </div>
                ) : (
                    data.map((p, i) => (
                        <motion.div
                            key={p._id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: i * 0.06 }}
                            className="rounded-2xl p-5 transition-all"
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-color)",
                                boxShadow: "var(--shadow-sm)",
                            }}
                        >
                            {/* Task title */}
                            <div
                                className="flex items-center gap-2 pb-3 mb-4"
                                style={{ borderBottom: "1px solid var(--border-color)" }}
                            >
                                <Briefcase className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                                <h3 className="text-sm font-semibold truncate" style={{ color: "var(--text-secondary)" }}>
                                    {p.taskDetails?.title}
                                </h3>
                            </div>

                            {/* Freelancer info + actions */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                {/* Avatar + details */}
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-11 h-11 rounded-xl shrink-0" style={{ border: "1px solid var(--border-color)" }}>
                                        <Avatar.Image
                                            referrerPolicy="no-referrer"
                                            src={p?.freelancerInfo?.image || "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"}
                                        />
                                        <Avatar.Fallback className="rounded-xl font-bold">
                                            {p?.freelancerInfo?.name ? p.freelancerInfo.name.charAt(0).toUpperCase() : "U"}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <p className="font-bold text-base truncate" style={{ color: "var(--text-heading)" }}>
                                            {p.freelancerInfo?.name}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                                            <span>
                                                Bid: <span className="font-bold text-emerald-500">${p.proposedBudget}</span>
                                            </span>
                                            <span>
                                                Duration: <span style={{ color: "var(--text-secondary)" }}>{p.estimatedDays} days</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-2.5 w-full md:w-auto">
                                    {p.status === 'pending' ? (
                                        <>
                                            <form action={'/api/payment'} method="POST" className="flex gap-2.5 w-full md:w-auto">
                                                <input type="hidden" name="task_id" value={p.taskId} />
                                                <input type="hidden" name="task_title" value={p.taskDetails?.title} />
                                                <input type="hidden" name="freelancer_email" value={p.freelancerInfo?.email} />
                                                <input type="hidden" name="client_email" value={p.taskDetails?.clientEmail} />
                                                <input type="hidden" name="amount" value={p.proposedBudget} />
                                                <input type="hidden" name="proposal_id" value={p._id.toString()} />
                                                <Button
                                                    type="submit"
                                                    className="flex-1 md:flex-none font-bold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-5 text-sm"
                                                >
                                                    <Check className="w-4 h-4" />
                                                    Accept
                                                </Button>
                                            </form>
                                            <Button
                                                className="flex-1 md:flex-none font-bold rounded-xl px-5 text-sm bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 transition-all"
                                                variant="flat"
                                            >
                                                <Xmark className="w-4 h-4" />
                                                Reject
                                            </Button>
                                        </>
                                    ) : (
                                        <Chip
                                            radius="sm"
                                            className={`${
                                                p.status === 'accepted'
                                                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                            }`}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                {p.status === 'accepted' ? <Check className="w-3.5 h-3.5" /> : <Xmark className="w-3.5 h-3.5" />}
                                                <span className="text-xs font-bold uppercase tracking-wide">
                                                    {p.status === 'accepted' ? "Accepted" : "Rejected"}
                                                </span>
                                            </div>
                                        </Chip>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageProposals;
