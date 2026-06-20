'use client';
import React from 'react';
import { Card, Button } from '@heroui/react';
import Link from 'next/link';
import { PencilToLine, TrashBin, Eye, Calendar } from '@gravity-ui/icons'; 

const MyTasks = ({ tasks = [], onDelete, onEdit }) => {

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.status === 'open' && b.status !== 'open') return -1;
        if (a.status !== 'open' && b.status === 'open') return 1;
        return 0;
    });
    const getStatusClass = (status) => {
        const statusClasses = {
            'open': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
            'in progress': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
            'completed': 'bg-slate-800 text-slate-400 border border-slate-700'
        };

        return statusClasses[status] || 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
    };

    return (
        <div className="w-full bg-slate-950 p-4 md:p-8 min-h-screen">
            <Card className="w-full max-w-5xl mx-auto rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-md p-6 shadow-2xl">
                
                <div className="flex items-center justify-between pb-6 border-b border-slate-900">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-6 bg-emerald-500 rounded-full" />
                        <h2 className="text-xl font-bold text-slate-100 tracking-tight">My Tasks</h2>
                    </div>
                    <Link href="/dashboard/client/my-tasks/all" className="text-xs font-semibold text-emerald-400 hover:underline transition-all">
                        View All
                    </Link>
                </div>
                <div className="w-full overflow-x-auto mt-4">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-900 text-xs font-bold uppercase tracking-wider text-slate-500">
                                <th className="py-4 px-4">Title</th>
                                <th className="py-4 px-4">Budget</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/50">
                            {sortedTasks.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-sm text-slate-500">
                                        No tasks posted yet.
                                    </td>
                                </tr>
                            ) : (
                                sortedTasks.map((task) => (
                                    <tr key={task._id} className="group hover:bg-slate-900/20 transition-all duration-150">
                                        
                                        {/* ৩. Title & Deadline Column */}
                                        <td className="py-5 px-4 max-w-[280px] sm:max-w-xs">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors block truncate">
                                                    {task.title}
                                                </span>
                                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    Deadline: {task.deadline}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-4 font-bold text-slate-300">
                                            ${Number(task.budget).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="py-5 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${getStatusClass(task.status)}`}>
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="py-5 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {task.status === 'open' ? (
                                                    <>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            onClick={() => onEdit && onEdit(task)}
                                                            className="text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                                                            title="Edit Task"
                                                        >
                                                            <PencilToLine className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            onClick={() => onDelete && onDelete(task._id)}
                                                            className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                                            title="Delete Task"
                                                        >
                                                            <TrashBin className="w-4 h-4" />
                                                        </Button>
                                                    </>
                                                ) : (
                                                    /* 'open' ছাড়া অন্য সব স্ট্যাটাসের (in progress, completed) জন্য শুধু View বাটন থাকবে */
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="light"
                                                        className="text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </Card>
        </div>
    );
};

export default MyTasks;