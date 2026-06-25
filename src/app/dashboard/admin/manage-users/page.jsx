import { getUsersInfo } from '@/lib/api/admin';
import UserTable from './UserTable';


const ManageUsers = async () => {
    const users = await getUsersInfo();

    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-white mb-6">Manage Users</h1>
    
                <UserTable initialUsers={users} />
            </div>
        </div>
    );
};

export default ManageUsers;