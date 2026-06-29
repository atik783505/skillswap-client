"use client";
import React from 'react';
import { Card, Avatar } from '@heroui/react';
import { Briefcase, CircleDollar } from '@gravity-ui/icons';
import { motion } from 'framer-motion';
import { BiAward } from 'react-icons/bi';

export default function TopFreelancersClient({ freelancers }) {

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest mx-auto">
                        <BiAward className="w-4 h-4" /> Top Performers
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase bg-gradient-to-r from-slate-100 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                        Meet Our Elite Freelancers
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
                        Discover the top-rated experts based on successfully completed projects and diverse technical skill sets.
                    </p>
                </div>


                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 sm:w-full mx-auto"
                >
                    {freelancers?.map((freelancer, index) => (
                        <motion.div
                            key={freelancer._id}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="h-full relative"
                        >
                            <div className="absolute -top-3 -left-3 z-10 w-8 h-8 rounded-xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-xs font-black text-purple-400 shadow-md">
                                #{index + 1}
                            </div>

                            <Card className="bg-slate-900/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-2xl hover:border-purple-500/30 transition-all duration-300 group cursor-default h-full">

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="w-14 h-14 text-large rounded-2xl border border-slate-800 group-hover:border-purple-500/40 transition-colors duration-300 flex-shrink-0">
                                            <Avatar.Image
                                                alt={freelancer.name}
                                                src={freelancer.image}
                                            />
                                            <Avatar.Fallback>
                                                {freelancer.name ? freelancer.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : "FL"}
                                            </Avatar.Fallback>
                                        </Avatar>
                                        <div className="space-y-1 min-w-0 flex-1">
                                            <h2 className="text-base font-bold text-slate-100 truncate group-hover:text-purple-400 transition-colors duration-200">
                                                {freelancer.name}
                                            </h2>
                                            <p className="text-xs text-emerald-400 font-bold flex items-center gap-0.5">
                                                <CircleDollar className="w-3.5 h-3.5" />
                                                {freelancer.hourlyRate || 0}/hr
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed min-h-[32px]">
                                        {freelancer.bio || "Professional Freelancer specializing in modern web solutions."}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {freelancer.skills?.slice(0, 4).map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-semibold uppercase tracking-wider transition-colors group-hover:bg-purple-500/20"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {freelancer.skills?.length > 4 && (
                                            <span className="text-[10px] text-slate-500 self-center font-medium pl-1">
                                                +{freelancer.skills.length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-800/60 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Briefcase className="w-4 h-4 text-purple-400" />
                                        <span>Jobs Finished:</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-200 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 group-hover:border-purple-500/20 transition-colors">
                                        {freelancer.completedTasksCount || 0} {freelancer.completedTasksCount === 1 ? 'Job' : 'Jobs'}
                                    </span>
                                </div>

                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}