"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Paintbrush, PencilToLine, Code, ChartBar, Plus } from '@gravity-ui/icons';

export default function PopularCategories() {
    const categories = [
        { name: "Design", icon: <Paintbrush className="w-5 h-5 text-purple-400" />, href: "/all-tasks?category=Design", color: "hover:border-purple-500/40" },
        { name: "Writing", icon: <PencilToLine className="w-5 h-5 text-blue-400" />, href: "/all-tasks?category=Writing", color: "hover:border-blue-500/40" },
        { name: "Development", icon: <Code className="w-5 h-5 text-emerald-400" />, href: "/all-tasks?category=Development", color: "hover:border-emerald-500/40" },
        { name: "Marketing", icon: <ChartBar className="w-5 h-5 text-pink-400" />, href: "/all-tasks?category=Marketing", color: "hover:border-pink-500/40" },
        { name: "Other", icon: <Plus className="w-5 h-5 text-amber-400" />, href: "/all-tasks?category=Other", color: "hover:border-amber-500/40" },
    ];

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <div className="bg-slate-950 py-12 border-t border-gray-900/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
                <div className="text-center space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 uppercase tracking-wide">
                        Popular Categories
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400">
                        Explore tasks by your field of expertise and start pitching proposals
                    </p>
                </div>
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-11/12 sm:w-full mx-auto"
                >
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link href={cat.href} className="block h-full">
                                <div className={`bg-slate-900/40 backdrop-blur-xl border border-gray-800/80 rounded-xl p-5 flex flex-col items-center justify-center gap-3 text-center transition-all duration-200 group h-full cursor-pointer ${cat.color}`}>
                                    
                                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 group-hover:bg-slate-900 transition-all duration-200">
                                        {cat.icon}
                                    </div>

                                    <span className="text-sm font-bold text-slate-300 group-hover:text-slate-100 transition-colors">
                                        {cat.name}
                                    </span>
                                    
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
                
            </div>
        </div>
    );
}