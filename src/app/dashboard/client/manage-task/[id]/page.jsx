import { getTask } from '@/lib/api/tasks';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from '@heroui/react';
import { Calendar, CircleDollar, ArrowLeft, Tag } from '@gravity-ui/icons';
import { getTaskProposals } from '@/lib/api/proposals';

const TaskDetails = async ({ params }) => {
    const { id } = await params;
    const task = await getTask(id);
    const proposals = await getTaskProposals(id)
    console.log(proposals)

    const getStatusClass = (status) => {
        const statusClasses = {
            'open': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
            'in progress': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
            'completed': 'bg-slate-800 text-slate-400 border border-slate-700'
        };
        return statusClasses[status?.toLowerCase()] || 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
    };

    return (
        <div className="w-full bg-slate-950 p-4 md:p-8 min-h-screen text-slate-100">
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">

                <div className="flex items-center justify-between">
                    <Link href="/dashboard/client/manage-task">
                        <Button
                            size="sm"
                            variant="light"
                            className="text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-xl gap-2 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Tasks
                        </Button>
                    </Link>
                </div>

                <Card className="w-full rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 shadow-2xl flex flex-col gap-6">

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-900">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight leading-tight">
                                {task?.title || 'Loading Task Title...'}
                            </h1>
                            <p className="text-xs text-slate-500">Task ID: {id}</p>
                        </div>

                        <div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusClass(task?.status)}`}>
                                {task?.status || 'open'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-900/60 bg-slate-900/20">
                            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                <CircleDollar className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Budget</span>
                                <span className="text-lg font-bold text-slate-200">
                                    ${task?.budget ? Number(task.budget).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-900/60 bg-slate-900/20">
                            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Deadline</span>
                                <span className="text-lg font-bold text-slate-200">
                                    {task?.deadline || 'No deadline set'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Tag className="w-4 h-4 text-purple-400" />
                            Task Description
                        </h3>
                        <div className="p-5 rounded-xl border border-slate-900 bg-slate-950/40 text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">
                            {task?.description || 'No description provided for this task.'}
                        </div>
                    </div>


                    <div className="mt-4 pt-6 border-t border-slate-900 text-center text-xs text-slate-600 italic">
                        Additional details and management options can be added here in the future.
                    </div>

                </Card>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                    Proposals ({proposals?.length || 0})
                </h2>

                <div className="flex flex-col gap-4">
                    {proposals?.map((proposal) => (
                        <Card key={proposal._id} className="p-5 border border-slate-900 bg-slate-900/40 rounded-none shadow-none max-w-96">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-slate-200">{proposal.freelancerEmail}</p>
                                        <p className="text-xs text-slate-500">Submitted: {new Date(proposal.createdAt).toLocaleDateString()}</p>
                                    </div>

                                    {/* Ternary Operator দিয়ে স্ট্যাটাস কালার নির্ধারণ */}
                                    <span className={`text-[10px] px-2 py-1 uppercase tracking-wider font-bold ${proposal.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' :
                                        proposal.status === 'rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
                                            'bg-amber-500/20 text-amber-400 border border-amber-500/20'
                                        }`}>
                                        {proposal.status}
                                    </span>
                                </div>

                                <div className="flex gap-4 text-sm text-slate-400">
                                    <p>Bid: <span className="text-white font-bold">${proposal.proposedBudget}</span></p>
                                    <p>Time: <span className="text-white font-bold">{proposal.estimatedDays} Days</span></p>
                                </div>

                                <p className="text-sm text-slate-400 italic bg-slate-950/50 p-3 border border-slate-800 rounded-none">
                                    {proposal.coverNote}
                                </p>

                                {/* বাটন কন্ডিশন */}
                                {proposal.status === 'pending' && (
                                    <div className="flex gap-2 mt-2">
                                        <form action={'/api/payment'} method="POST" className="flex gap-2 w-full">
                                            {/* <input type="hidden" name="proposalId" value={p._id} /> */}
                                            <input type="hidden" name="task_id" value={id} />
                                            <input type="hidden" name="client_email" value={task.clientEmail} />
                                            <input type="hidden" name="freelancer_email" value={proposal.
                                                freelancerEmail} />
                                            <input type="hidden" name="amount" value={proposal.proposedBudget} />

                                            <Button type='submit' size="sm" className="bg-emerald-600 text-white rounded-none w-full hover:bg-emerald-700">
                                                Accept
                                            </Button>
                                        </form>
                                        <Button size="sm" className="bg-transparent border border-pink-500 text-pink-500 rounded-none w-full hover:bg-pink-500/10" variant="bordered">
                                            Reject
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {proposals?.length === 0 && (
                    <div className="p-8 border border-dashed border-slate-800 text-center text-slate-600 rounded-none">
                        No proposals received yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskDetails;