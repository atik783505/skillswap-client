import { getTransactions } from '@/lib/api/admin';
import { Chip } from "@heroui/react";
import React from 'react';

const Transactions = async () => {
    const transactions = await getTransactions();

    return (
        <div className="w-full space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                    Transaction History
                </h2>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                    Full record of all platform payments.
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
                                <th className="px-5 py-3.5">Client Email</th>
                                <th className="px-5 py-3.5">Freelancer Email</th>
                                <th className="px-5 py-3.5">Amount</th>
                                <th className="px-5 py-3.5">Date</th>
                                <th className="px-5 py-3.5">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((item) => (
                                <tr
                                    key={item._id}
                                    className="transition-colors"
                                    style={{ borderBottom: "1px solid var(--border-color)" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                >
                                    <td className="px-5 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                                        {item.client_email}
                                    </td>
                                    <td className="px-5 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                                        {item.freelancer_email}
                                    </td>
                                    <td className="px-5 py-4 font-bold text-emerald-500 text-sm">
                                        ${item.amount.toFixed(2)}
                                    </td>
                                    <td className="px-5 py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                                        {new Date(item.paid_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </td>
                                    <td className="px-5 py-4">
                                        <Chip
                                            color={item.payment_status === 'paid' ? "success" : "warning"}
                                            variant="flat"
                                            size="sm"
                                            className="capitalize"
                                        >
                                            {item.payment_status}
                                        </Chip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
