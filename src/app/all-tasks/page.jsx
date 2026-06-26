
import PaginationBasic from '@/components/pagination/Pagination';
import TaskCard from '@/components/TaskCard';
import { getAllTask } from '@/lib/api/tasks';
import React from 'react';

const AllTasks = async ({searchParams}) => {
    const params = await searchParams
    console.log(params)
    const taskData = await getAllTask(params.page);
    const tasks = taskData.data
    const pages = taskData.page
    const totalPages = taskData.totalPage

    return (
        <div className="w-full bg-slate-950 p-6 md:p-10 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-100 mb-8">All Tasks ({tasks.length})</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))}
                </div>

                {tasks.length === 0 && (
                    <p className="text-slate-500 text-center mt-20">No tasks found.</p>
                )}
            </div>
            <PaginationBasic pages={pages} totalPages={totalPages}></PaginationBasic>
        </div>
    );
};

export default AllTasks;