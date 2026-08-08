import { getTransactions } from '@/lib/api/admin';
import { Chip } from "@heroui/react";
import React from 'react';

const Transactions = async () => {
    let transactions = [];
    try {
        const res = await getTransactions();
        transactions = Array.isArray(res) ? res : res?.data || [];
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
    }

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
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-6 text-center text-sm text-gray-500">
                                        No transactions found.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="transition-colors hover:bg-[var(--bg-secondary)]"
                                        style={{ borderBottom: "1px solid var(--border-color)" }}
                                    >
                                        <td className="px-5 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                                            {item.client_email || 'N/A'}
                                        </td>
                                        <td className="px-5 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                                            {item.freelancer_email || 'N/A'}
                                        </td>
                                        <td className="px-5 py-4 font-bold text-emerald-500 text-sm">
                                            ${Number(item.amount || 0).toFixed(2)}
                                        </td>
                                        <td className="px-5 py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                                            {item.paid_at
                                                ? new Date(item.paid_at).toLocaleDateString('en-US', {
                                                      year: 'numeric',
                                                      month: 'short',
                                                      day: 'numeric',
                                                  })
                                                : 'N/A'}
                                        </td>
                                        <td className="px-5 py-4">
                                            <Chip
                                                color={item.payment_status === 'paid' ? "success" : "warning"}
                                                variant="flat"
                                                size="sm"
                                                className="capitalize"
                                            >
                                                {item.payment_status || 'Pending'}
                                            </Chip>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;