import DeliverableModal from '@/components/Dashboard/DeliverableLInkModal';
import { getProposals } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import { Card, Button, Chip } from "@heroui/react";

const ActiveProjects = async () => {
    const user = await getSessionData();
    const proposals = await getProposals(user?.email);

    const activeData = proposals.filter(p => p.status === 'accepted');

    const sortedData = activeData.sort((a, b) => 
        (b.taskDetails.status === 'completed') - (a.taskDetails.status === 'completed')
    );

    const completedCount = sortedData.filter(p => p.taskDetails.status === 'completed').length;

    return (
        <div className="p-8 bg-slate-950 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-6">Active Projects ({sortedData.length})</h1>
            <p className="mb-6 text-slate-400">Completed Projects: <span className="text-emerald-400 font-bold">{completedCount}</span></p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedData.map((p) => (
                    <Card key={p._id} className="bg-slate-900 border border-slate-800 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-bold">{p.taskDetails.title}</h2>
                            <Chip color={p.taskDetails.status === 'completed' ? "success" : "warning"} variant="flat">
                                {p.taskDetails.status.toUpperCase()}
                            </Chip>
                        </div>
                        <p className="text-slate-400 mb-4 text-sm">{p.taskDetails.description.slice(0, 100)}...</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                            <p className="text-slate-500">Budget: <span className="text-white">${p.proposedBudget}</span></p>
                            <p className="text-slate-500">Category: <span className="text-white">{p.taskDetails.category}</span></p>
                            <p className="text-slate-500">Due: <span className="text-white">{p.estimatedDays} Days</span></p>
                        </div>

                        {p.taskDetails.status === 'in progress' ? (
                            <DeliverableModal proposalId={p._id} taskId={p.taskDetails._id} />
                        ) : (
                            <Button className="w-full bg-slate-800" disabled>Completed</Button>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ActiveProjects;