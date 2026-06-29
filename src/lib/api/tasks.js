import { serverFetch } from "../core/server"
import { getSessionData } from "../core/session"


export const getTasks = async () => {
    const user = await getSessionData()
    return serverFetch(`/api/tasks?clientId=${user.id}`)
}

export const getTask = async (id) => {
    return serverFetch(`/api/tasks/${id}` , false)
}

export const getAllTask = async (page = 1, search = '', category = '') => {
    return serverFetch(`/api/all-tasks?page=${page}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`, false);
}

export const getFeauturedTask = async () => {
    return serverFetch('/api/featured-tasks' , false)
}