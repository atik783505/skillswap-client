import { getUsersInfo } from '@/lib/api/admin';
import React from 'react';

const ManageUsers = async () => {
    const users = await getUsersInfo()
    console.log(users)
    return (
        <div>
            <h2>this is user page</h2>
        </div>
    );
};

export default ManageUsers;