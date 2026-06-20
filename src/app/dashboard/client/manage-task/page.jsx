import React from 'react';
import MyTasks from './MyTasks';
import { getTasks } from '@/lib/api/tasks';
import { getSessionData } from '@/lib/core/session';

const TasksPage = async () => {
    const tasks = await getTasks()
    const user = await getSessionData()
    console.log(user)
    return (
        <div>
            <MyTasks tasks={tasks}></MyTasks>
        </div>
    );
};

export default TasksPage;