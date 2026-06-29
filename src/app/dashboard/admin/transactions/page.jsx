import { getTransactions } from '@/lib/api/admin';
import { Table, Chip } from "@heroui/react";
import React from 'react';

const Transactions = async () => {
    const transactions = await getTransactions();

    return (
        <div className="p-6 md:p-10 w-full max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Transactions History</h2>
    
            <Table variant="secondary" className="bg-slate-900/40 rounded-2xl">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Transactions history" className="min-w-[800px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Client Email</Table.Column>
                            <Table.Column>Freelancer Email</Table.Column>
                            <Table.Column>Payout Size</Table.Column>
                            <Table.Column>Payment Date</Table.Column>
                            <Table.Column>Payment Status</Table.Column>
                        </Table.Header>
                        
                        <Table.Body>
                            {transactions.map((item) => (
                                <Table.Row key={item._id}>
                                    <Table.Cell>{item.client_email}</Table.Cell>
                                    <Table.Cell>{item.freelancer_email}</Table.Cell>
                                    <Table.Cell className="font-semibold text-emerald-400">
                                        ${item.amount.toFixed(2)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {new Date(item.paid_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip 
                                            color={item.payment_status === 'paid' ? "success" : "warning"} 
                                            variant="flat" 
                                            size="sm"
                                            className="capitalize"
                                        >
                                            {item.payment_status}
                                        </Chip>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default Transactions;