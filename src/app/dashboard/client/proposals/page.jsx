import { getClientProposals } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import React from 'react';
import ManageProposals from './ManageProposals';

const Proposals = async () => {
    const user = await getSessionData()
    const proposals = await getClientProposals(user.id)
    console.log(proposals)
    return (
        <div>
            <ManageProposals proposals={proposals}></ManageProposals>
        </div>
    );
};

export default Proposals;