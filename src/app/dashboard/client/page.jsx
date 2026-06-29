
import ClientOverview from '@/components/Dashboard/ClientOverVeiw';
import { getTasks } from '@/lib/api/tasks';
import React from 'react';

const ClientHome = async () => {
    const tasks = await getTasks()
    return (
        <div>
            <ClientOverview tasks={tasks}></ClientOverview>
        </div>
    );
};

export default ClientHome;