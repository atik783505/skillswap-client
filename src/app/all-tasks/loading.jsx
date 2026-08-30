import { Spinner } from '@heroui/react';
import React from 'react';

const Loading = () => {
    return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 theme-bg-primary">
            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl theme-bg-card theme-border border theme-shadow">
                <Spinner 
                    size="lg" 
                    color="success" 
                />
                <span className="text-sm font-medium theme-text-secondary tracking-wider">
                    Loading...
                </span>
            </div>
        </div>
    );
};

export default Loading;