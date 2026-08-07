import { getUsersInfo } from '@/lib/api/admin';
import UserTable from './UserTable';

const ManageUsers = async () => {
    const users = await getUsersInfo();

    return (
        <div className="w-full space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                    Manage Users
                </h1>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                    View, block, or unblock all registered users.
                </p>
            </div>
            <UserTable initialUsers={users} />
        </div>
    );
};

export default ManageUsers;
