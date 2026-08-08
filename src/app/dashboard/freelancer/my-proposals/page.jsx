import React from 'react';
import MyProposals from './MyProposals';
import { getSessionData } from '@/lib/core/session';
import { getProposals } from '@/lib/api/proposals';

const page = async () => {
    const user = await getSessionData();
    const raw = await getProposals(user?.email);
    const proposals = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : Array.isArray(raw?.proposals) ? raw.proposals : [];
    return (
        <div>
            <MyProposals proposals={proposals}></MyProposals>
        </div>
    );
};

export default page;