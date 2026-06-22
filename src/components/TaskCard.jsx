import React from 'react';
import { Card } from '@heroui/react';
import Link from 'next/link';
import { Calendar, CircleDollar } from '@gravity-ui/icons';

const TaskCard = ({ task }) => {
    return (
        <Card className="p-5 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-md hover:border-purple-500/30 transition-all group">
            <Link href={`/all-tasks/${task._id}`}>
                <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-purple-400 transition-colors truncate">
                    {task.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {task.description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-4">
                    <div className="flex items-center gap-1">
                        <CircleDollar className="w-3.5 h-3.5 text-emerald-500" />
                        <span>${Number(task.budget).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{task.deadline}</span>
                    </div>
                </div>
            </Link>
        </Card>
    );
};

export default TaskCard;