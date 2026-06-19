import { DashboardSidebar } from '@/components/Dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">

            <DashboardSidebar />
            <main className="flex-1 min-w-0 overflow-y-auto bg-slate-950 p-4 sm:p-6 md:p-8 pt-20 md:pt-8">
                {children}
            </main>
            
        </div>
    );
};

export default DashboardLayout;