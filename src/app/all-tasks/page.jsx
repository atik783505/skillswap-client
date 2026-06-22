
import TaskCard from '@/components/TaskCard';
import { getAllTask } from '@/lib/api/tasks';
import React from 'react';

const AllTasks = async () => {
    const tasks = await getAllTask();

    return (
        <div className="w-full bg-slate-950 p-6 md:p-10 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-100 mb-8">All Tasks ({tasks.length})</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))}
                </div>

                {tasks.length === 0 && (
                    <p className="text-slate-500 text-center mt-20">No tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default AllTasks;