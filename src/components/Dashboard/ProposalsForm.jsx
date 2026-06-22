'use client'
import React from 'react';
import { Card, Button, Input, Textarea, Form, TextField, Label, FieldError, TextArea } from '@heroui/react';

const ProposalsForm = ({ taskId , user}) => {
    console.log(user)
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const finalData = {
            ...data,
            freelancerId: user.id,
            freelancerEmail: user.email,
            taskId,
            status: 'pending'
        }

        console.log("Proposal Data:", {finalData});
    };
    return (
        <div>
            <Card className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">🚀 Submit a Proposal</h2>

                <Form onSubmit={onSubmit} className="w-full space-y-5">
                    <TextField isRequired name="proposedBudget" type="number" className="w-full">
                        <Label>Proposed Budget (USD)</Label>
                        <Input placeholder="50.00" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired name="estimatedDays" type="number" className="w-full">
                        <Label>Estimated Days</Label>
                        <Input placeholder="3" />
                    </TextField>

                    <TextField isRequired name="coverNote" className="w-full">
                        <Label>Cover Note</Label>
                        <TextArea placeholder="Explain why you're the best fit for this task..." className="h-32" />
                    </TextField>

                    <Button type="submit" className="w-full bg-purple-600 text-white font-bold">
                        Submit Proposal
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default ProposalsForm;