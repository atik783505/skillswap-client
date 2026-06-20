import React from 'react';
import MyTasks from './MyTasks';
import { getTasks } from '@/lib/api/tasks';
import { deleteTask } from '@/lib/actions/tasks';
import toast from 'react-hot-toast';
import { revalidatePath } from 'next/cache';

const TasksPage = async () => {
    const tasks = await getTasks()

    const handleDelete = async (id) => {
        'use server'
        try {
            const res = await deleteTask(id);
            revalidatePath('/dashboard/client/manage-task');
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }

    return (
        <div>
            <MyTasks tasks={tasks} onDelete={handleDelete}></MyTasks>
        </div>
    );
};

export default TasksPage;