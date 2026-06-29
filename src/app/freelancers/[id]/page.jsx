import { getFreelancer } from '@/lib/api/proposals';
import React from 'react';
import { Avatar } from '@heroui/react';

const FreelancerDetailsPage = async ({ params }) => {
    const { id } = await params;
    const freelancer = await getFreelancer(id);
    if (!freelancer) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-400">
                <p className="text-xl font-semibold">Freelancer profile not found.</p>
            </div>
        );
    }

    const {
        name,
        email,
        bio,
        image,
        hourlyRate,
        skills = [],
        completedTasksCount = 0,
        createdAt
    } = freelancer;

    const initials = name
        ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : 'FL';

    const joinDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });

    return (
        <div className="min-h-screen bg-gradient-to-b bg-slate-950 from-gray-950 to-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto ">
                
      
                <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
           
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                        
                        <Avatar className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-2 border-gray-800 bg-gray-800 text-xl font-bold">
                            <Avatar.Image 
                                alt={name} 
                                src={image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} 
                            />
                            <Avatar.Fallback>{initials}</Avatar.Fallback>
                        </Avatar>
                    </div>

        
                    <div className="flex-1 text-center md:text-left space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold text-white tracking-tight">{name}</h1>
                                <p className="text-emerald-400 font-medium text-sm mt-1">Professional Freelancer</p>
                            </div>
  
                            <div className="flex items-center justify-center md:justify-end gap-3">
                                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-center">
                                    <span className="block text-xs uppercase tracking-wider opacity-60">Hourly Rate</span>
                                    <span className="text-lg font-bold">${hourlyRate}/hr</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm">
                            <span className="font-semibold text-gray-300">Email:</span> {email}
                        </p>
                        <p className="text-gray-500 text-xs">
                            Member since {joinDate}
                        </p>
                    </div>
                </div>

      
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    

                    <div className="space-y-6 md:col-span-1">
                        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-teal-500/10 rounded-xl text-teal-400 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Completed Tasks</h3>
                            <p className="text-4xl font-black text-white mt-1">{completedTasksCount}</p>
                            <p className="text-xs text-gray-500 mt-2">Successfully delivered micro-tasks</p>
                        </div>
                    </div>


                    <div className="md:col-span-2 space-y-6">
                        

                        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
                                Biography
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                                {bio || "No biography provided by the freelancer yet."}
                            </p>
                        </div>


                        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-teal-500 rounded-full"></span>
                                Skills & Expertise
                            </h3>
                            {skills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <span 
                                            key={index} 
                                            className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-800 border border-gray-700/60 rounded-lg text-xs font-semibold text-gray-300 transition cursor-default shadow-sm capitalize"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No skills listed.</p>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default FreelancerDetailsPage;