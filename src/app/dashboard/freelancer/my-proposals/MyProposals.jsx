'use client';
import React from 'react';
import { Card, Button } from '@heroui/react';
import Link from 'next/link';
import { Eye } from '@gravity-ui/icons';

const MyProposals = ({ proposals = [] }) => {

    const getStatusClass = (status) => {
        const statusClasses = {
            'accepted': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
            'pending': 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
            'rejected': 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
        };
        return statusClasses[status?.toLowerCase()] || 'bg-slate-800 text-slate-400 border border-slate-700';
    };

    return (
        <div className="w-full bg-slate-950 p-4 md:p-8 min-h-screen">
            <Card className="w-full max-w-5xl mx-auto rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-md p-6 shadow-2xl">

                <div className="flex items-center gap-2 pb-6 border-b border-slate-900 mb-4">
                    <div className="w-2 h-6 bg-emerald-500 rounded-full" />
                    <h2 className="text-xl font-bold text-slate-100 tracking-tight">My Proposals</h2>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <th className="py-4 px-4">Title</th>
                                <th className="py-4 px-4">Bid ($)</th>
                                <th className="py-4 px-4">Date</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/50">
                            {proposals.map((item) => (
                                <tr key={item._id} className="hover:bg-slate-900/20 transition-all duration-150">
                                    <td className="py-5 px-4 font-semibold text-slate-200">
                                        {item.taskDetails?.title || 'Untitled Task'}
                                    </td>
                                    <td className="py-5 px-4 font-bold text-slate-300">
                                        ${Number(item.proposedBudget).toLocaleString()}
                                    </td>
                                    <td className="py-5 px-4 text-slate-400">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-5 px-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusClass(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    {/* এই সেই ডানদিকের বাটন */}
                                    <td className="py-5 px-4 text-right">
                                        <Link href={`/dashboard/freelancer/my-proposals/${item._id}`}>
                                            <Button 
                                                isIconOnly 
                                                size="sm" 
                                                variant="light" 
                                                className="text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default MyProposals;