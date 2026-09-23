import React from 'react';
import MyTasks from './MyTasks';
import { getTasks } from '@/lib/api/tasks';

// Server Actions are imported here and called from server-side wrappers
// then passed as strings/IDs — but HeroUI requires them as functions.
// The correct pattern in Next.js App Router is to wrap them in a separate
// Server Action bridge component or pass task data only and handle actions
// inside the Client Component via inline server actions.

import { deleteTask, editTask } from '@/lib/actions/tasks';

const TasksPage = async () => {
    const raw = await getTasks();
    const tasks = Array.isArray(raw) ? raw
        : Array.isArray(raw?.data) ? raw.data
        : Array.isArray(raw?.tasks) ? raw.tasks
        : [];

    return (
        <MyTasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
    );
};

export default TasksPage;
