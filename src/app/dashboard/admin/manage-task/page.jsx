import { getAllTask } from '@/lib/api/tasks';
import React from 'react';

const ManageAllTask = async () => {
    const allTask = await getAllTask()
    console.log(allTask)
    return (
        <div>
            <h2>this is all task</h2>
        </div>
    );
};

export default ManageAllTask;