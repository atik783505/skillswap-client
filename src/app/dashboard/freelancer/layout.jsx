import { getSessionData } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React, { Children } from 'react';

const AdminLayout = async ({children }) => {
    const user = await getSessionData()
    const role = user?.role
    if(role !== 'freelancer'){
        redirect('/unauthorized')
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminLayout;