'use client';
import React from 'react';
import Link from 'next/link';
import { Eye, Calendar } from '@gravity-ui/icons';
import { DeleteAlert } from '@/components/Dashboard/DeleteAlert';
import { TaskUpdateModal } from '@/components/Dashboard/TaskUpdateModal';

const statusConfig = {
    'open':        { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)",  color: "#10b981" },
    'in progress': { bg: "rgba(56,189,248,0.08)",  border: "rgba(56,189,248,0.25)",  color: "#38bdf8" },
    'completed':   { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)", color: "#8b5cf6" },
};

const MyTasks = ({ tasks = [], onDelete, onEdit }) => {
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.status === 'open' && b.status !== 'open') return -1;
        if (a.status !== 'open' && b.status === 'open') return 1;
        return 0;
    });

    return (
        <div className="w-full space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-1 h-6 rounded-full bg-emerald-500" />
                    <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-heading)" }}>
                        My Tasks
                    </h2>
                </div>
                <Link
                    href="/dashboard/client/my-tasks/all"
                    className="text-xs font-semibold text-emerald-500 hover:text-emerald-600 transition-colors"
                >
                    View All →
                </Link>
            </div>

            {/* Table card */}
            <div
                className="rounded-2xl overflow-hidden"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}
            >
                <div className="w-full overflow-x-auto">
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
                                <th className="px-5 py-3.5">Title</th>
                                <th className="px-5 py-3.5">Budget</th>
                                <th className="px-5 py-3.5">Status</th>
                                <th className="px-5 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTasks.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="py-12 text-center text-sm"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        No tasks posted yet.{" "}
                                        <Link href="/dashboard/client/manage-task/new" className="text-emerald-500 font-semibold hover:underline">
                                            Post your first task →
                                        </Link>
                                    </td>
                                </tr>
                            ) : (
                                sortedTasks.map((task) => {
                                    const sc = statusConfig[task.status] || { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)", color: "#8b5cf6" };
                                    return (
                                        <tr
                                            key={task._id}
                                            className="group transition-colors"
                                            style={{ borderBottom: "1px solid var(--border-color)" }}
                                            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            {/* Title */}
                                            <td className="p-0 max-w-[280px]">
                                                <Link
                                                    href={`/dashboard/client/manage-task/${task._id}`}
                                                    className="flex flex-col gap-1 py-4 px-5 w-full block"
                                                >
                                                    <span
                                                        className="font-semibold truncate transition-colors group-hover:text-emerald-500"
                                                        style={{ color: "var(--text-heading)" }}
                                                    >
                                                        {task.title}
                                                    </span>
                                                    <span
                                                        className="text-xs flex items-center gap-1"
                                                        style={{ color: "var(--text-muted)" }}
                                                    >
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        Deadline: {task.deadline}
                                                    </span>
                                                </Link>
                                            </td>

                                            {/* Budget */}
                                            <td className="px-5 py-4 font-bold text-emerald-500 whitespace-nowrap">
                                                ${Number(task.budget).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide whitespace-nowrap"
                                                    style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}
                                                >
                                                    {task.status}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {task.status === 'open' ? (
                                                        <>
                                                            <TaskUpdateModal onEdit={onEdit} task={task} />
                                                            <DeleteAlert onDelete={onDelete} task={task} />
                                                        </>
                                                    ) : (
                                                        <Link href={`/dashboard/client/manage-task/${task._id}`}>
                                                            <button
                                                                className="p-1.5 rounded-lg transition-colors hover:text-emerald-500"
                                                                style={{ color: "var(--text-muted)" }}
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                        </Link>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyTasks;
