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
    const user = await getSessionData();
    const { submitted } = await checkProposalSubmited(user?.id, task._id);
    console.log('data is', submitted);

    return (
        /* bg-slate-950 এবং text-slate-100 তুলে দিয়ে theme-bg-primary ও theme-text-primary দেওয়া হয়েছে */
        <div className="min-h-screen theme-bg-primary p-6 md:p-12 theme-text-primary">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full theme-bg-secondary text-xs font-medium theme-border border theme-text-secondary">
                            {task?.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
                            {task?.status}
                        </span>
                    </div>

                    <h1 className="text-4xl font-extrabold theme-text-primary">{task?.title}</h1>
                    <p className="theme-text-secondary text-lg">{task?.clientName}</p>

                    {/* Card-এ theme-bg-card এবং theme-border যোগ করা হয়েছে */}
                    <Card className="p-8 theme-bg-card theme-border border rounded-2xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-4 theme-text-primary">Description</h3>
                        <p className="theme-text-secondary leading-relaxed">{task?.description}</p>
                    </Card>

                    {user?.role === 'freelancer' ? (
                        submitted ? (
                            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4 text-emerald-600 dark:text-emerald-400">
                                <div className="p-2 bg-emerald-500/20 rounded-full">✅</div>
                                <div>
                                    <h4 className="font-bold">Proposal Submitted</h4>
                                    <p className="text-sm opacity-80">You have already submitted a proposal for this task.</p>
                                </div>
                            </div>
                        ) : task?.status === 'open' ? (
                            <ProposalsForm taskId={task._id} user={user} />
                        ) : (
                            <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-4 text-amber-600 dark:text-amber-400">
                                <div className="p-2 bg-amber-500/20 rounded-full">🔒</div>
                                <div>
                                    <h4 className="font-bold">Task Unavailable</h4>
                                    <p className="text-sm opacity-80">This task is currently {task?.status} and is no longer accepting new proposals.</p>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="p-6 theme-bg-card theme-border border rounded-2xl theme-text-muted text-center">
                            Only freelancers can submit proposals for this task.
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <Card className="p-6 theme-bg-card theme-border border rounded-2xl flex flex-col gap-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl"><CircleDollar /></div>
                            <div>
                                <p className="theme-text-muted text-sm">Budget</p>
                                <p className="text-xl font-bold theme-text-primary">${task?.budget}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Calendar /></div>
                            <div>
                                <p className="theme-text-muted text-sm">Deadline</p>
                                <p className="font-semibold theme-text-primary">{task?.deadline}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><Clock /></div>
                            <div>
                                <p className="theme-text-muted text-sm">Posted</p>
                                <p className="font-semibold theme-text-primary">{new Date(task?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="pt-4 theme-border border-t flex items-center gap-3">
                            <img src={task?.clientImage} alt="client" className="w-12 h-12 rounded-full border-2 theme-border" />
                            <div>
                                <p className="theme-text-muted text-xs">Client</p>
                                <p className="font-medium theme-text-primary">{task?.clientEmail}</p>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default SingleTask;