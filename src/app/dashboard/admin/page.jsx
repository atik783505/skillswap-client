import AdminOverview from '@/components/Dashboard/AdminOverveiw';
import { getAdminStats } from '@/lib/api/admin';
import React from 'react';

const AdminPage = async () => {
    const stats = await getAdminStats()
    return (
        <div>
            <AdminOverview stats={stats}></AdminOverview>
        </div>
    );
};

export default AdminPage;