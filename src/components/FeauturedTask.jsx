"use client";
import React from 'react';
import TaskCard from './TaskCard';

export default function FeaturedTasksClient({ tasks }) {

    return (
        <div className='bg-slate-950 py-5'>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-5 uppercase tracking-wide text-center">Latest Featured Tasks</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 max-w-7xl mx-auto'>

                {
                    tasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)
                }
            </div>

        </div>
    );
}