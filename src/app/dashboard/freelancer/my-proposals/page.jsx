import React from 'react';
import MyProposals from './MyProposals';
import { getSessionData } from '@/lib/core/session';
import { getProposals } from '@/lib/api/proposals';

const page = async () => {
    const user = await getSessionData();
    const proposals = await getProposals(user?.email);
    return (
        <div>
            <MyProposals proposals={proposals}></MyProposals>
        </div>
    );
};

export default page;