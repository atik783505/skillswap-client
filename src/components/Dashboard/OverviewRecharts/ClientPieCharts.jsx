'use client';
import React from 'react';
import { Card } from '@heroui/react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const TaskStatusChart = ({ stats }) => {
    const pieData = [
        { name: 'Open', value: stats.openTasks, color: '#a855f7' },
        { name: 'In Progress', value: stats.inProgressTasks, color: '#38bdf8' },
        { name: 'Completed', value: stats.completedTasks, color: '#34d399' }
    ].filter(item => item.value > 0);

    return (
        <Card className="bg-slate-900/40 backdrop-blur-md border border-gray-800/80 p-6 rounded-2xl h-[350px] flex flex-col justify-between">
            <div>
                <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider">Task Status Distribution</h3>
                <p className="text-xs text-slate-500 mt-0.5">Visual representation of tasks stage wise</p>
            </div>
            <div className="w-full h-[240px] mt-2">
                {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={85}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-xs text-slate-500">No task statistics available</div>
                )}
            </div>
        </Card>
    );
};

export default TaskStatusChart;