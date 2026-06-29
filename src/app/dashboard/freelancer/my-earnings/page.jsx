import { getFreelancerEarnings } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import React from 'react';
import { Card } from '@heroui/react';
import { Bucket, Calendar, Person, File } from '@gravity-ui/icons';

const MyEarnings = async () => {
    const user = await getSessionData();
    const email = user?.email;
    
    const earnings = await getFreelancerEarnings(email) || [];

    const totalAmount = earnings.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    return (
        <div className="w-full p-4 md:p-8 bg-slate-950 min-h-screen text-slate-100 space-y-8">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-100">My Earnings</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        A complete breakdown list of finished tasks and payments received.
                    </p>
                </div>
                
                <Card className="border-l-4 border-l-emerald-500 border-gray-800/80 bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl w-full lg:w-72 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-emerald-400">
                            <Bucket className="size-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total Amount Made</p>
                        <h3 className="text-3xl font-bold text-slate-100 mt-1 tracking-tight">
                            ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </h3>
                    </div>
                </Card>
            </div>

            <div className="bg-slate-900/20 border border-gray-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 bg-slate-900/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                <th className="p-4"><div className="flex items-center gap-2"><File className="w-4 h-4 text-purple-400" /> Task Title</div></th>
                                <th className="p-4"><div className="flex items-center gap-2"><Person className="w-4 h-4 text-blue-400" /> Client Name</div></th>
                                <th className="p-4">Amount Made</th>
                                <th className="p-4"><div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-400" /> Completion Date</div></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/60 text-sm">
                            {earnings.length > 0 ? (
                                earnings.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-900/30 transition-colors group">
                                        
                                        {/* 🎯 Column 1: Task Title */}
                                        <td className="p-4 font-semibold text-slate-200 group-hover:text-purple-400 transition-colors max-w-xs sm:max-w-md truncate">
                                            {item.task_title || "Untitled Task"}
                                        </td>
                                        
                                        {/* 🎯 Column 2: Client Name */}
                                        <td className="p-4 text-slate-400 font-medium">
                                            {item.client_name || "Unknown Client"}
                                        </td>
                                        
                                        {/* 🎯 Column 3: Amount Made */}
                                        <td className="p-4 font-bold text-emerald-400">
                                            +${(Number(item.amount) || 0).toFixed(2)}
                                        </td>
                                        
                                        {/* 🎯 Column 4: Completion Date */}
                                        <td className="p-4 text-slate-500 text-xs font-medium">
                                            {item.paid_at ? new Date(item.paid_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            }) : "N/A"}
                                        </td>
                                        
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-sm text-slate-500 font-medium">
                                        No payments or finished tasks found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyEarnings;