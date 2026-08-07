import { DashboardSidebar } from '@/components/Dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div
      className="flex flex-col md:flex-row min-h-screen antialiased font-sans"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <DashboardSidebar />
      <main
        className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 pt-20 md:pt-8"
        style={{ background: "var(--bg-primary)" }}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
