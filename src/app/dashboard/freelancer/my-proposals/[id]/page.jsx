import { Card, Avatar, Chip, Button } from '@heroui/react';
import { getPorposal } from '@/lib/api/proposals';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from '@gravity-ui/icons';

const MyPorposalsDetails = async ({ params }) => {
    const { id } = await params;
    const proposalData = await getPorposal(id);

    if (!proposalData) return <div className="p-10 text-white">Proposal not found!</div>;

    const { taskDetails, coverNote, proposedBudget, estimatedDays, status } = proposalData;

    return (
        <div className="min-h-screen bg-slate-950 p-4 md:p-12">
            <div className="max-w-4xl mx-auto space-y-6">

                <div className="mb-4">
                    <Link href="/dashboard/freelancer/my-proposals" >
                        <Button
                            variant="light"
                            className="text-slate-400 hover:text-white"
                        >
                           <ArrowLeft></ArrowLeft> Back to Proposals
                        </Button>
                    </Link>
                </div>

                <Card className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
                    <h1 className="text-3xl font-bold text-white mb-2">{taskDetails.title}</h1>
                    <div className="flex gap-3 mb-6">
                        <Chip variant="flat" color="primary">{taskDetails.category}</Chip>
                        <Chip variant="flat" color={taskDetails.status === 'open' ? 'success' : 'default'}>{taskDetails.status}</Chip>
                    </div>

                    <p className="text-slate-400 mb-8">{taskDetails.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800 pt-6">
                        <div>
                            <p className="text-slate-500 text-xs uppercase">Budget</p>
                            <p className="text-xl font-bold text-emerald-400">${taskDetails.budget}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs uppercase">Deadline</p>
                            <p className="text-white font-semibold">{new Date(taskDetails.deadline).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs uppercase">Client</p>
                            <div className="flex items-center gap-2 mt-1">
                                <Avatar>
                                    <Avatar.Image alt={taskDetails.clientName} src={taskDetails.clientImage} />
                                    <Avatar.Fallback>{taskDetails.clientName?.charAt(0)}</Avatar.Fallback>
                                </Avatar>
                                <span className="text-white text-sm">{taskDetails.clientName}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Freelancer Proposal</h3>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                                <p className="text-slate-500 text-xs uppercase">Proposed Bid</p>
                                <p className="text-2xl font-bold text-white">${proposedBudget}</p>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                                <p className="text-slate-500 text-xs uppercase">Estimated Days</p>
                                <p className="text-2xl font-bold text-white">{estimatedDays} Days</p>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                                <p className="text-slate-500 text-xs uppercase">Status</p>
                                <p className={`text-xl font-bold ${status === 'pending' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                                    {status.toUpperCase()}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-slate-500 text-xs uppercase mb-2">Cover Note</p>
                            <p className="text-slate-300 leading-relaxed bg-slate-950 p-6 rounded-xl border border-slate-800">
                                {coverNote}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MyPorposalsDetails;