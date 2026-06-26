import DeliverableModal from '@/components/Dashboard/DeliverableLInkModal';
import { getProposals } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import { Card, Button, Chip } from "@heroui/react";
import { CircleCheck, Clock } from '@gravity-ui/icons';

const ActiveProjects = async () => {
    const user = await getSessionData();
    const proposals = await getProposals(user?.email);

    const activeData = proposals.filter(p => p.status === 'accepted');

    // ডাটা গ্রুপ করা
    const completedProjects = activeData.filter(p => p.taskDetails.status === 'completed');
    const inProgressProjects = activeData.filter(p => p.taskDetails.status === 'in progress');

    const ProjectCard = ({ p }) => (
        <Card className="bg-slate-900/40 border border-slate-800 p-6">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white">{p.taskDetails.title}</h2>
                <Chip color={p.taskDetails.status === 'completed' ? "success" : "warning"} variant="flat">
                    {p.taskDetails.status.toUpperCase()}
                </Chip>
            </div>
            <p className="text-slate-400 mb-4 text-sm">{p.taskDetails.description.slice(0, 100)}...</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <p className="text-slate-500">Budget: <span className="text-white">${p.proposedBudget}</span></p>
                <p className="text-slate-500">Category: <span className="text-white">{p.taskDetails.category}</span></p>
            </div>

            {p.taskDetails.status === 'completed' ? (
                <a href={p.taskDetails.deliverable_url} target="_blank" className="text-blue-400 text-sm flex items-center gap-2 hover:underline">
                    🔗 View Submission
                </a>
            ) : (
                <DeliverableModal taskId={p.taskDetails._id} />
            )}
        </Card>
    );

    return (
        <div className="p-8 bg-slate-950 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-2">Active Projects</h1>
            <p className="mb-8 text-slate-400">
                {inProgressProjects.length} in progress · {completedProjects.length} completed
            </p>

            {/* Completed Section */}
            {completedProjects.length > 0 && (
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-4 text-emerald-400">
                        <CircleCheck size={24} />
                        <h2 className="text-xl font-bold">Completed ({completedProjects.length})</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {completedProjects.map(p => <ProjectCard key={p._id} p={p} />)}
                    </div>
                </div>
            )}

            {/* In Progress Section */}
            {inProgressProjects.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-4 text-amber-400">
                        <Clock size={24} />
                        <h2 className="text-xl font-bold">In Progress ({inProgressProjects.length})</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {inProgressProjects.map(p => <ProjectCard key={p._id} p={p} />)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveProjects;