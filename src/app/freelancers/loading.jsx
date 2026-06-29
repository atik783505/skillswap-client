import { Spinner } from '@heroui/react';
import React from 'react';

const Loading = () => {
    return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 bg-slate-950">
            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-slate-900/50 border border-slate-800 shadow-xl">
                <Spinner 
                    size="lg" 
                    color="success" 
                />
                <span className="text-sm font-medium text-slate-400 tracking-wider">
                    Loading...
                </span>
            </div>
        </div>
    );
};

export default Loading;