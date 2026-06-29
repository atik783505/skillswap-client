import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b bg-slate-950 from-gray-950 to-gray-900 text-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-md w-full text-center space-y-6 relative z-10">
     
                <div className="relative inline-block">
                    <h1 className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 selection:bg-transparent">
                        404
                    </h1>
                 
                    <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mt-2 opacity-80 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Page Not Found
                    </h2>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                        Oops! The page you are looking for does not exist, has been removed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="pt-4">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] group"
                    >
              
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2} 
                            stroke="currentColor" 
                            className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
        </div>
    );
};

export default NotFoundPage;