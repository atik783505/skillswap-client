'use server'

import { revalidatePath } from "next/cache"
import { serverMutation } from "../core/server"

export const makeProposal = async (newProposalData) => {
    return serverMutation('/api/proposals', newProposalData)
}

export const editFreelancerProfile = async (id, data) => {
    try {
        const res = await serverMutation(`/api/freelancer-data/${id}`, data, 'PATCH');
        revalidatePath('/dashboard/freelancer/edit-profile');

        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}


