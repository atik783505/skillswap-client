import DeleteTaskButton from '@/components/Dashboard/DeleteButton';
import PaginationBasic from '@/components/pagination/Pagination';
import { getAllTask } from '@/lib/api/tasks';
import Image from 'next/image';

const ManageAllTask = async ({ searchParams }) => {
    // Next.js 15 Safe searchParams Resolution
    const params = searchParams ? await searchParams : {};
    const currentPage = Number(params?.page) || 1;

    let taskData = null;
    try {
        taskData = await getAllTask(currentPage);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }

    const allTask = Array.isArray(taskData?.data) ? taskData.data : [];
    const totalPages = taskData?.totalPage || 1;

    const statusColors = {
        open: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)", color: "#10b981" },
        "in progress": { bg: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.25)", color: "#38bdf8" },
        completed: { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)", color: "#8b5cf6" },
    };

    return (
        <div className="w-full space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                    Manage All Tasks
                </h2>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                    Review and delete tasks across the platform.
                </p>
            </div>

            <div
                className="rounded-2xl overflow-hidden"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr
                                className="text-xs font-bold uppercase tracking-wider"
                                style={{
                                    background: "var(--bg-secondary)",
                                    borderBottom: "1px solid var(--border-color)",
                                    color: "var(--text-muted)",
                                }}
                            >
                                <th className="px-5 py-3.5">Title</th>
                                <th className="px-5 py-3.5">Client</th>
                                <th className="px-5 py-3.5">Budget</th>
                                <th className="px-5 py-3.5">Status</th>
                                <th className="px-5 py-3.5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTask.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-6 text-center text-sm text-gray-500">
                                        No tasks found.
                                    </td>
                                </tr>
                            ) : (
                                allTask.map((task) => {
                                    const sc = statusColors[task?.status] || statusColors.open;
                                    return (
                                        <tr
                                            key={task._id}
                                            className="transition-colors hover:bg-[var(--bg-secondary)]"
                                            style={{ borderBottom: "1px solid var(--border-color)" }}
                                        >
                                            <td className="px-5 py-4 font-semibold text-sm max-w-xs truncate" style={{ color: "var(--text-heading)" }}>
                                                {task.title}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2.5 whitespace-nowrap">
                                                    {task.clientImage && (
                                                        <Image
                                                            src={task.clientImage}
                                                            alt={task.clientName || "Client"}
                                                            width={32}
                                                            height={32}
                                                            className="w-8 h-8 rounded-full object-cover shrink-0"
                                                            style={{ border: "1px solid var(--border-color)" }}
                                                            referrerPolicy="no-referrer"
                                                        />
                                                    )}
                                                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                                        {task.clientName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 font-bold text-emerald-500 text-sm">
                                                ${task.budget}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span
                                                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                                    style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}
                                                >
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <DeleteTaskButton id={task._id} />
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <PaginationBasic pages={currentPage} totalPages={totalPages} baseRoute={'/dashboard/admin/manage-task'} />
        </div>
    );
};

export default ManageAllTask;