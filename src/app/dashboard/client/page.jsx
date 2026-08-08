import ClientOverview from '@/components/Dashboard/ClientOverVeiw';
import { getTasks } from '@/lib/api/tasks';
import React from 'react';

const ClientHome = async () => {
    const raw = await getTasks();
    const tasks = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : Array.isArray(raw?.tasks) ? raw.tasks : [];
    return (
        <div>
            <ClientOverview tasks={tasks} />
        </div>
    );
};

export default ClientHome;
