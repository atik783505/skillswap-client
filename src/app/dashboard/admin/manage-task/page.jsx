import DeleteTaskButton from '@/components/Dashboard/DeleteButton';
import PaginationBasic from '@/components/pagination/Pagination';
import { getAllTask } from '@/lib/api/tasks';


const ManageAllTask = async ({ searchParams }) => {
    const params = await searchParams
    const currentPage = Number(params.page) || 1;
    const taskData = await getAllTask(currentPage);
    const allTask = taskData?.data || [];
    const totalPages = taskData?.totalPage || 1;

    return (
        <div className="p-6 min-h-screen text-slate-200">
            <h2 className="text-2xl font-bold text-white mb-6">Manage All Tasks</h2>

            <div className="overflow-x-auto bg-slate-900/40 rounded-xl">
                <table className="w-full text-left border-collapse border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                    <thead className="bg-slate-900/50">
                        <tr>
                            <th className="p-4 border-b border-slate-800 text-slate-400 font-semibold">Title</th>
                            <th className="p-4 border-b border-slate-800 text-slate-400 font-semibold">Client</th>
                            <th className="p-4 border-b border-slate-800 text-slate-400 font-semibold">Budget</th>
                            <th className="p-4 border-b border-slate-800 text-slate-400 font-semibold">Status</th>
                            <th className="p-4 border-b border-slate-800 text-slate-400 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTask.map((task) => (
                            <tr key={task._id} className="hover:bg-slate-900/30 transition-all border-b border-slate-800 last:border-0">
                                <td className="p-4 font-medium">{task.title}</td>
                                <td className="p-4 flex items-center gap-3">
                                    <img src={task.clientImage} alt={task.clientName} className="w-8 h-8 rounded-full border border-slate-700" />
                                    <span>{task.clientName}</span>
                                </td>
                                <td className="p-4">${task.budget}</td>
                                <td className="p-4">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-emerald-400 border border-emerald-900/50 uppercase tracking-wider">
                                        {task.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <DeleteTaskButton id={task._id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PaginationBasic pages={currentPage} totalPages={totalPages} baseRoute={'/dashboard/admin/manage-task'}></PaginationBasic>
        </div>
    );
};

export default ManageAllTask;