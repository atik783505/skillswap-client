"use client";
import React from 'react';
import { Card, Button } from '@heroui/react';
import Link from 'next/link';
import { Calendar, CircleDollar, Tag, Person } from '@gravity-ui/icons';
import { motion } from 'framer-motion';

const TaskCard = ({ task }) => {
    const dueDate = new Date(task.deadline).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full"
        >
            <Card className="bg-slate-950 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-xl hover:border-slate-700/80 transition-colors group cursor-default h-full">
              
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
            
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold capitalize">
                            <Tag className="w-3 h-3" />
                            {task.category || "General"}
                        </span>
            
                        <span className="inline-flex items-center text-emerald-400 font-bold text-sm tracking-tight gap-1">
                            <CircleDollar className="w-3.5 h-3.5" />
                            {Number(task.budget).toLocaleString()} USD
                        </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-100 line-clamp-2 leading-snug group-hover:text-emerald-400 transition-colors duration-200">
                        {task.title}
                    </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800/60 space-y-3.5">
                    <div className="flex flex-col gap-2 text-xs text-slate-400">
                        {/* ক্লায়েন্ট নেম */}
                        <div className="flex items-center gap-2">
                            <Person className="w-3.5 h-3.5 text-slate-500" />
                            <span className="truncate">
                                Client: <span className="text-slate-300 font-medium">{task.clientName || "Anonymous"}</span>
                            </span>
                        </div>
              
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>
                                Due: <span className="text-slate-300 font-medium">{dueDate}</span>
                            </span>
                        </div>
                    </div>
                    <Link href={`/all-tasks/${task._id}`} className="w-full block">
                        <Button
                            className="w-full bg-slate-800/80 hover:bg-emerald-500 text-slate-300 hover:text-slate-950 font-bold h-9 rounded-xl text-xs transition-all duration-200"
                        >
                            View Details
                        </Button>
                    </Link>
                </div>

            </Card>
        </motion.div>
    );
};

export default TaskCard;