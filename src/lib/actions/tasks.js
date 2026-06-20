'use server'

import { serverMutation } from "../core/server"

export const postTask = async (newTaskData) => {
    return serverMutation('/api/tasks', newTaskData)
}

export const deleteTask = async (id) => {
    return serverMutation(`/api/tasks/${id}`, null, 'DELETE')
}