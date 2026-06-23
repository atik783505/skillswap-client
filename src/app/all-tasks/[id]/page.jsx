import { getTask } from '@/lib/api/tasks';
import React from 'react';
import { Calendar, Clock, User, Tag, CircleDollar } from '@gravity-ui/icons';
import ProposalsForm from '@/components/Dashboard/ProposalsForm';
import { Card } from '@heroui/react';
import { getSessionData } from '@/lib/core/session';
import { checkProposalSubmited } from '@/lib/api/proposals';

const SingleTask = async ({ params }) => {
    const { id } = await params;
    const task = await getTask(id);
    const user = await getSessionData()
    const { submitted } = await checkProposalSubmited(user?.id, task._id)
    console.log('data is', submitted)
    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-100">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-slate-900 text-xs font-medium border border-slate-800 text-slate-400">
                            {task?.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                            {task?.status}
                        </span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-white">{task?.title}</h1>
                    <p className="text-slate-400 text-lg">{task?.clientName}</p>

                    <Card className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl">
                        <h3 className="text-xl font-semibold mb-4 text-white">Description</h3>
                        <p className="text-slate-300 leading-relaxed">{task?.description}</p>
                    </Card>
                    {user?.role === 'freelancer' ? (
                        submitted ? (
                            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4 text-emerald-400">
                                <div className="p-2 bg-emerald-500/20 rounded-full">✅</div>
                                <div>
                                    <h4 className="font-bold">Proposal Submitted</h4>
                                    <p className="text-sm opacity-80">You have already submitted a proposal for this task.</p>
                                </div>
                            </div>
                        ) : (
                            <ProposalsForm taskId={task._id} user={user} />
                        )
                    ) : (
                        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 text-center">
                            Only freelancers can submit proposals for this task.
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <Card className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl"><CircleDollar /></div>
                            <div>
                                <p className="text-slate-500 text-sm">Budget</p>
                                <p className="text-xl font-bold">${task?.budget}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Calendar /></div>
                            <div>
                                <p className="text-slate-500 text-sm">Deadline</p>
                                <p className="font-semibold">{task?.deadline}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><Clock /></div>
                            <div>
                                <p className="text-slate-500 text-sm">Posted</p>
                                <p className="font-semibold">{new Date(task?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                            <img src={task?.clientImage} alt="client" className="w-12 h-12 rounded-full border-2 border-slate-700" />
                            <div>
                                <p className="text-slate-500 text-xs">Client</p>
                                <p className="font-medium">{task?.clientEmail}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SingleTask;