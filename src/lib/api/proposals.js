import { serverFetch } from "../core/server"


export const checkProposalSubmited = async (userId,id) => {
    return serverFetch(`/api/proposals/check/${userId}?taskId=${id}` , false)
}
export const getProposals = async (email) => {
    return serverFetch(`/api/my-proposals?freelancerEmail=${email}`)
}

export const getPorposal = async (id) => {
    return serverFetch(`/api/my-proposals/${id}`)
}

export const getClientProposals = async (id) => {
    return serverFetch(`/api/client-proposals/${id}`)
}
export const getTaskProposals = async (id) => {
    return serverFetch(`/api/proposals/${id}`)
}

export const getAllFreelancer = async () => {
    return serverFetch('/api/freelancerInfo' , false)
}

export const getFreelancer = async (id) => {
    return serverFetch(`/api/freelancerInfo/${id}`, false)
}

export const getTopFreelancer = async () => {
    return serverFetch('/api/top-freelancers' , false)
}
