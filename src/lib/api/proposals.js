import { serverFetch } from "../core/server"


export const checkProposalSubmited = async (userId,id) => {
    return serverFetch(`/api/proposals/check?freelancerId=${userId}&taskId=${id}`)
}
export const getProposals = async (email) => {
    return serverFetch(`/api/my-proposals?freelancerEmail=${email}`)
}
