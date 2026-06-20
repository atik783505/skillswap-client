'use client';
import React, { useState } from 'react';
import {
    Form,
    TextField,
    Label,
    Input,
    TextArea,
    Select,
    ListBox,
    Button,
    Card,
    CardHeader,
} from '@heroui/react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { MdAddTask } from 'react-icons/md';
import { postTask } from '@/lib/actions/tasks';

const PostTaskForm = () => {
    const [loading, setLoading] = useState(false);
    const { data } = useSession();
    const user = data?.user;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // 🌟 গুরুত্বপূর্ণ ফিক্স: এখানে ভেরিয়েবলটি ডিফাইন করা হলো
        const currentForm = e.currentTarget; 
        const formData = new FormData(currentForm);
        const taskFields = Object.fromEntries(formData.entries());

        if (taskFields.budget) {
            taskFields.budget = Number(taskFields.budget);
        }

        const finalData = {
            ...taskFields,
            clientName: user?.name,
            clientEmail: user?.email,
            clientId: user?.id,
            clientImage: user?.image,
            status: "open",
            deliverable_url: ""
        };

        console.log(finalData);

        try {
            // সার্ভার অ্যাকশন কল
            const res = await postTask(finalData);
            console.log("Server Response:", res);

            // মঙ্গোডিবির রেসপন্স অবজেক্ট কন্ডিশন চেক
            if (res && res.acknowledged) {
                toast.success('Task Published Successfully');
                currentForm.reset(); // 💥 এখন এটি পারফেক্টলি রিসেট হবে
            } else {
                toast.error(res?.error || 'Error publishing your task');
            }
        } catch (error) {
            console.error("Client Submit Error:", error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 md:p-8 bg-slate-950">
            <Card className="w-full max-w-2xl rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 shadow-2xl shadow-purple-950/10">
                <CardHeader className="flex flex-col items-start gap-1.5 pb-8 px-0">
                    <div className="flex items-center gap-2 text-emerald-400">
                        <MdAddTask className="text-2xl" />
                        <h2 className="text-2xl font-bold tracking-tight text-slate-100">Post a Task</h2>
                    </div>
                    <p className="text-sm text-slate-400">Fill in the details below to publish a new project block on the platform.</p>
                </CardHeader>

                <Form onSubmit={handleSubmit} className="w-full space-y-6">
                    <TextField name="title" isRequired className="w-full flex flex-col gap-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Task Title</Label>
                        <Input
                            className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                            placeholder="e.g. Website Bug Fix"
                        />
                    </TextField>

                    <div className="w-full flex flex-col gap-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Category</Label>
                        <Select name="category" isRequired className="w-full" placeholder="Select Category">
                            <Select.Trigger className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-slate-200 focus:border-purple-500 transition-all duration-200">
                                <Select.Value className="text-slate-300" />
                                <Select.Indicator className="text-slate-500" />
                            </Select.Trigger>
                            <Select.Popover className="border border-slate-800 bg-slate-900 text-slate-200 rounded-xl shadow-xl">
                                <ListBox className="p-1">
                                    <ListBox.Item id="Development" textValue="Development" className="rounded-lg px-3 py-2 text-sm hover:bg-purple-600 hover:text-white transition-colors">Development<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Design" textValue="Design" className="rounded-lg px-3 py-2 text-sm hover:bg-purple-600 hover:text-white transition-colors">Design<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Marketing" textValue="Marketing" className="rounded-lg px-3 py-2 text-sm hover:bg-purple-600 hover:text-white transition-colors">Marketing<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Writing" textValue="Writing" className="rounded-lg px-3 py-2 text-sm hover:bg-purple-600 hover:text-white transition-colors">Writing<ListBox.ItemIndicator /></ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <TextField name="description" isRequired className="w-full flex flex-col gap-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Description</Label>
                        <TextArea
                            className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-slate-200 placeholder-slate-600 min-h-[140px] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 resize-none"
                            placeholder="Describe the detailed specifications and scope of requirements..."
                        />
                    </TextField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <TextField name="budget" isRequired className="w-full flex flex-col gap-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Budget ($ USD)</Label>
                            <Input
                                type="number"
                                min="1"
                                className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                                placeholder="50.00"
                            />
                        </TextField>

                        <TextField name="deadline" isRequired className="w-full flex flex-col gap-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Deadline Date</Label>
                            <Input
                                type="date"
                                className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 [color-scheme:dark]"
                            />
                        </TextField>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3 mt-4 shadow-lg shadow-emerald-500/10 transition-all duration-200 active:scale-[0.99]"
                        isLoading={loading}
                    >
                        {loading ? "Publishing..." : "Publish Task"}
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default PostTaskForm;