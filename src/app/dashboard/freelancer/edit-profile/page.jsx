import { getSessionData } from '@/lib/core/session';
import React from 'react';
import EditProfile from './EditProfile';

const Profile = async () => {
    const user = await getSessionData()
    return (
        <div>
            <EditProfile user={user}></EditProfile>
        </div>
    );
};

export default Profile;