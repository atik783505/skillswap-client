import { serverFetch } from "../core/server"


export const getUsersInfo = async () => {
    return serverFetch('/api/users-data')
}

export const getAdminStats = async () => {
    return serverFetch('/api/admin/stats')
}