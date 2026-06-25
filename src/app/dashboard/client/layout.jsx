import { getSessionData } from '@/lib/core/session';
import { redirect } from 'next/navigation';

const AdminLayout = async ({children }) => {
    const user = await getSessionData()
    const role = user?.role
    if(role !== 'client'){
        redirect('/unauthorized')
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminLayout;