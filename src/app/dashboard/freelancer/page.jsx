import DashboardOverview from '@/components/Dashboard/DashboardOverView';
import { getProposals } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import { Bucket, CircleCheck, Clock, Folder, Calendar } from '@gravity-ui/icons';
import React from 'react';
import { Card } from '@heroui/react';

const FreelancerHome = async () => {
    const user = await getSessionData();
    const proposals = await getProposals(user?.email) || [];

    const totalProposals = proposals.length;
    const pendingProposals = proposals.filter(p => p.status === 'pending').length;
    const acceptedProposals = proposals.filter(p => p.status === 'accepted').length;
    const totalEarnings = proposals.filter(p => p.status === 'accepted').reduce((sum, p) => sum + (Number(p.proposedBudget) || 0), 0);

    const freelancerStats = [
        { title: "TOTAL PROPOSALS", value: totalProposals, icon: Folder, color: "text-purple-400", border: "border-l-purple-500", trend: "Sent" },
        { title: "PENDING PROPOSALS", value: pendingProposals, icon: Clock, color: "text-amber-400", border: "border-l-amber-500", trend: "Awaiting" },
        { title: "ACCEPTED PROPOSALS", value: acceptedProposals, icon: CircleCheck, color: "text-sky-400", border: "border-l-sky-500", trend: "Success" },
        { title: "TOTAL EARNINGS", value: `$${totalEarnings.toFixed(2)}`, icon: Bucket, color: "text-emerald-400", border: "border-l-emerald-500", trend: "USD" },
    ];

    const recentProposals = [...proposals]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

    return (
        <div className=" bg-slate-950 min-h-screen">
            <DashboardOverview
                title="Freelancer Dashboard"
                description="Welcome back, professional"
                userName={user?.name}
                statsData={freelancerStats}
            />

            <div className="px-4 md:px-8 space-y-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-100 tracking-tight">Recent Proposals</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Your latest 4 submitted job applications.</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {recentProposals.length > 0 ? (
                        recentProposals.map((proposal) => (
                            <Card 
                                key={proposal._id}
                                className="border border-gray-800/80 bg-slate-900/30 backdrop-blur-md p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700/60 transition-all group"
                            >
                                <div className="space-y-2 flex-1">
                                    <p className="text-sm font-medium text-slate-200 group-hover:text-purple-400 transition-colors line-clamp-2 md:line-clamp-1">
                                        {proposal.coverNote || "No cover note provided"}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            }) : "N/A"}
                                        </div>
                                        <div>
                                            Duration: <span className="text-slate-400">{proposal.estimatedDays} Days</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-6 border-t border-gray-800/40 md:border-t-0 pt-3 md:pt-0">
                                    <div className="text-left md:text-right">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Proposed Budget</p>
                                        <p className="text-lg font-bold text-emerald-400 mt-0.5">
                                            ${Number(proposal.proposedBudget || 0).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="min-w-24 text-right">
                                        <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                                            proposal.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            proposal.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                            'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                        }`}>
                                            {proposal.status || 'pending'}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="border border-dashed border-gray-800 p-8 rounded-2xl text-center text-slate-500 text-sm">
                            You havent submitted any proposals yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FreelancerHome;