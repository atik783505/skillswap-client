import { getProposals } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import RecentProposals from './RecentProposals';
import FreelancerStats from './FreelancerStats';

const FreelancerHome = async () => {
  const user = await getSessionData();
  const raw = await getProposals(user?.email);
  const proposals = Array.isArray(raw) ? raw
    : Array.isArray(raw?.data) ? raw.data
    : Array.isArray(raw?.proposals) ? raw.proposals
    : [];

  const totalProposals    = proposals.length;
  const pendingProposals  = proposals.filter(p => p.status === 'pending').length;
  const acceptedProposals = proposals.filter(p => p.status === 'accepted').length;
  const totalEarnings     = proposals
    .filter(p => p.status === 'accepted')
    .reduce((sum, p) => sum + (Number(p.proposedBudget) || 0), 0);

  const recentProposals = [...proposals]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="w-full space-y-8">
      {/* Client component receives only plain serializable values */}
      <FreelancerStats
        userName={user?.name}
        totalProposals={totalProposals}
        pendingProposals={pendingProposals}
        acceptedProposals={acceptedProposals}
        totalEarnings={totalEarnings}
      />
      <RecentProposals proposals={recentProposals} />
    </div>
  );
};

export default FreelancerHome;
