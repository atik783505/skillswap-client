import { getProposals } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import React from 'react';

const ActiveProjects = async () => {
    const user = await getSessionData();
    const proposals = await getProposals(user?.email);
    console.log(proposals)
    return (
        <div>
            <h2>Active project page</h2>
        </div>
    );
};

export default ActiveProjects;