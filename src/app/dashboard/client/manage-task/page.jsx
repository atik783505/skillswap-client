import React from 'react';
import MyTasks from './MyTasks';
import { getTasks } from '@/lib/api/tasks';
import { deleteTask, editTask } from '@/lib/actions/tasks';

const TasksPage = async () => {
    const tasks = await getTasks()

    return (
        <div>
            <MyTasks tasks={tasks} onDelete={deleteTask} onEdit={editTask}></MyTasks>
        </div>
    );
};

export default TasksPage;