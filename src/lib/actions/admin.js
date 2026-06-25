'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const blockUser = async (id , data) => {
    try {
        const res = await serverMutation(`/api/user-data/${id}`, data , 'PATCH');
        revalidatePath('/dashboard/admin/manage-users');
        
        return { success: true, data: res };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}