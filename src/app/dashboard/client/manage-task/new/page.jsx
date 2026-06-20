import React from 'react';
import PostTaskForm from './PostTaskForm';
import { getSessionData } from '@/lib/core/session';

const PostTask = async () => {
    return (
        <div>
            <PostTaskForm></PostTaskForm>
        </div>
    );
};

export default PostTask;