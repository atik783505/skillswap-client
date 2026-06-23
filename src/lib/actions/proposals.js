'use server'

import { serverMutation } from "../core/server"

export const makeProposal = async (newProposalData) => {
    return serverMutation('/api/proposals', newProposalData)
}
