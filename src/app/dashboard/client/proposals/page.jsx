import { getClientProposals } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import React from 'react';
import ManageProposals from './ManageProposals';

const Proposals = async () => {
    const user = await getSessionData()
    const proposals = await getClientProposals(user.id)
    
    if (!proposals || proposals.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center bg-slate-950 text-slate-400">
                <p className="text-lg font-medium text-slate-300">No proposals found</p>
                <p className="text-sm mt-1 text-slate-500">You have not received any proposals yet.</p>
            </div>
        );
    }

    return (
        <div>
            <ManageProposals proposals={proposals}></ManageProposals>
        </div>
    );
};

export default Proposals;