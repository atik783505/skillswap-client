import { getClientProposals } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import React from 'react';
import ManageProposals from './ManageProposals';

const Proposals = async () => {
    const user = await getSessionData();
    const raw = await getClientProposals(user?.id);
    const proposals = Array.isArray(raw) ? raw
        : Array.isArray(raw?.data) ? raw.data
        : Array.isArray(raw?.proposals) ? raw.proposals
        : [];

    if (proposals.length === 0) {
        return (
            <div className="w-full space-y-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                        Manage Proposals
                    </h2>
                    <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                        Review and respond to freelancer proposals.
                    </p>
                </div>
                <div
                    className="rounded-2xl p-12 text-center text-sm"
                    style={{ border: "1px dashed var(--border-color)", color: "var(--text-muted)" }}
                >
                    No proposals received yet. Post a task to start getting bids.
                </div>
            </div>
        );
    }

    return (
        <div>
            <ManageProposals proposals={proposals} />
        </div>
    );
};

export default Proposals;
