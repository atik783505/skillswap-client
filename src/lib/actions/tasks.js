'use server'

import { revalidatePath } from "next/cache"
import { serverMutation } from "../core/server"

export const postTask = async (newTaskData) => {
    return serverMutation('/api/tasks', newTaskData)
}

export const deleteTask = async (id) => {
    try {
        const res = await serverMutation(`/api/tasks/${id}`, null, 'DELETE');
        revalidatePath('/dashboard/client/manage-task'); 
        
        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}
export const editTask = async (id , data) => {
    try {
        const res = await serverMutation(`/api/tasks/${id}`, data , 'PATCH');
        revalidatePath('/dashboard/client/manage-task'); 
        
        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}