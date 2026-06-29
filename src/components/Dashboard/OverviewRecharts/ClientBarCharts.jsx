'use client';
import React from 'react';
import { Card } from '@heroui/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const BudgetOverviewChart = ({ tasks = [] }) => {
    const barData = tasks.slice(-6).map(t => ({
        name: t.title.length > 12 ? `${t.title.slice(0, 12)}...` : t.title,
        Budget: Number(t.budget) || 0
    }));

    return (
        <Card className="bg-slate-900/40 backdrop-blur-md border border-gray-800/80 p-6 rounded-2xl h-[350px] flex flex-col justify-between">
            <div>
                <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider">Project Budget Overview</h3>
                <p className="text-xs text-slate-500 mt-0.5">Comparing budget across latest tasks</p>
            </div>
            <div className="w-full h-[240px] mt-2">
                {barData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="Budget" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#6366f1'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-xs text-slate-500">No budget metrics available</div>
                )}
            </div>
        </Card>
    );
};

export default BudgetOverviewChart;