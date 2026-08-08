"use client";
import { Calendar, Person, File } from '@gravity-ui/icons';

export default function EarningsTable({ earnings = [] }) {
    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}
        >
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr
                            className="text-[11px] font-bold uppercase tracking-wider"
                            style={{
                                background: "var(--bg-secondary)",
                                borderBottom: "1px solid var(--border-color)",
                                color: "var(--text-muted)",
                            }}
                        >
                            <th className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                    <File className="w-4 h-4 text-purple-500" />
                                    Task Title
                                </div>
                            </th>
                            <th className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                    <Person className="w-4 h-4 text-blue-500" />
                                    Client
                                </div>
                            </th>
                            <th className="px-5 py-3.5">Amount</th>
                            <th className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-amber-500" />
                                    Date
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {earnings.length > 0 ? (
                            earnings.map((item) => (
                                <tr
                                    key={item._id}
                                    className="transition-colors group"
                                    style={{ borderBottom: "1px solid var(--border-color)" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                >
                                    <td className="px-5 py-4 font-semibold text-sm max-w-xs truncate transition-colors group-hover:text-purple-500"
                                        style={{ color: "var(--text-heading)" }}>
                                        {item.task_title || "Untitled Task"}
                                    </td>
                                    <td className="px-5 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                                        {item.client_name || "Unknown"}
                                    </td>
                                    <td className="px-5 py-4 font-bold text-emerald-500 text-sm">
                                        +${(Number(item.amount) || 0).toFixed(2)}
                                    </td>
                                    <td className="px-5 py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                                        {item.paid_at
                                            ? new Date(item.paid_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                            : "N/A"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-5 py-12 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                                    No completed tasks yet. Keep applying to proposals!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
