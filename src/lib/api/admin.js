import { serverFetch } from "../core/server"


export const getUsersInfo = async () => {
    return serverFetch('/api/users-data')
}