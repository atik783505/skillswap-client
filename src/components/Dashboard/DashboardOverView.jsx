import React from 'react';
import { Card } from '@heroui/react';

const DashboardOverview = ({ title, description, userName, statsData = [] }) => {
    return (
        <div className="w-full p-4 md:p-8 bg-slate-950 text-slate-100">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-100">{title}</h1>
                <p className="text-sm text-slate-400 mt-1">
                    {description} <span className="font-semibold text-slate-200">{userName || "User"}</span>.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {statsData.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <Card 
                            key={index} 
                            className={`border-l-4 ${stat.border} border-t border-r border-b  bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between`}
                        >
                            <div className="flex items-center justify-between">
                                <div className={`p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 ${stat.color}`}>
                                    {IconComponent && <IconComponent className="size-5" />}
                                </div>
                                {stat.trend && (
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stat.bg || 'bg-slate-800'} ${stat.color}`}>
                                        {stat.trend}
                                    </span>
                                )}
                            </div>
                            <div className="mt-6">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.title}</p>
                                <h3 className="text-3xl font-bold text-slate-100 mt-1 tracking-tight">{stat.value}</h3>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardOverview;