"use client";

import React, { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { PencilToLine, PencilToSquare } from "@gravity-ui/icons";

export function TaskUpdateModal({ task, onEdit }) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateModal = async (e) => {
        e.preventDefault();

        if (!onEdit) return;
        setIsUpdating(true);

        const formData = new FormData(e.currentTarget);
        const updatedTaskData = Object.fromEntries(formData.entries());

        const loadingToast = toast.loading('Updating task...');

        try {
            const res = await onEdit(task._id, updatedTaskData);
            toast.dismiss(loadingToast);

            if (res?.success) {
                toast.success('Updated Successfully');
            } else {
                toast.error(res?.message || 'Error updating task');
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Something went wrong');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Modal>
            {/* 🌟 ট্রিগার বাটন আগের মতোই আনটাচড */}
            <Modal.Trigger>
                <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                    title="Edit Task"
                >
                    <PencilToLine className="w-4 h-4" />
                </Button>
            </Modal.Trigger>

            <Modal.Backdrop className="backdrop-blur-sm bg-black/50">
                <Modal.Container placement="auto">
                    {/* 🌟 ডায়ালগ ব্যাকগ্রাউন্ড bg-slate-950 এবং বর্ডার ম্যাচ করা হয়েছে */}
                    <Modal.Dialog className="sm:max-w-3xl bg-slate-950 text-slate-100 border border-slate-900 rounded-2xl shadow-2xl">
                        <Modal.CloseTrigger className="text-slate-500 hover:text-slate-300 transition-colors" />

                        <Modal.Header className="border-b border-slate-900 pb-4">
                            <div className="flex items-center gap-3">
                                <Modal.Icon className="bg-purple-500/10 text-purple-400 p-2 rounded-xl border border-purple-500/20">
                                    <PencilToSquare className="size-5" />
                                </Modal.Icon>
                                <div>
                                    <Modal.Heading className="text-lg font-bold text-slate-100 tracking-tight">Update Your Task</Modal.Heading>
                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Modify the fields below to update your task details, budget, or timeline.
                                    </p>
                                </div>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default" className="bg-transparent border-0 p-0 shadow-none">
                                <form className="flex flex-col gap-5" onSubmit={handleUpdateModal}>

                                    {/* Task Title */}
                                    <TextField defaultValue={task?.title} name="title" isRequired className="w-full flex flex-col gap-2">
                                        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Task Title</Label>
                                        {/* 🌟 ইনপুট ফিল্ড ডার্ক স্ল্যাট করা হয়েছে */}
                                        <Input className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-purple-500/50 transition-all h-11" placeholder="Enter task title" />
                                    </TextField>

                                    {/* Description */}
                                    <TextField defaultValue={task?.description} name="description" isRequired className="w-full flex flex-col gap-2">
                                        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Task Description</Label>
                                        {/* 🌟 টেক্সট-এরিয়া ডার্ক স্ল্যাট করা হয়েছে */}
                                        <TextArea className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-purple-500/50 transition-all min-h-[120px] p-3" placeholder="Describe the task workflow or requirements" />
                                    </TextField>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Budget */}
                                        <TextField defaultValue={task?.budget} name="budget" isRequired className="w-full flex flex-col gap-2">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Budget ($)</Label>
                                            <Input type="number" className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-purple-500/50 transition-all h-11" placeholder="e.g. 500" />
                                        </TextField>

                                        {/* Deadline */}
                                        <TextField defaultValue={task?.deadline} name="deadline" isRequired className="w-full flex flex-col gap-2">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Deadline</Label>
                                            <Input type="date" className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 focus:border-purple-500/50 transition-all h-11" />
                                        </TextField>
                                    </div>

                                    <Modal.Footer className="border-t border-slate-900 pt-4 mt-2">
                                        <Button
                                            type="submit"
                                            slot="close"
                                            className='w-full font-semibold rounded-xl bg-purple-500 hover:bg-purple-600 text-white py-2.5 transition-all shadow-lg shadow-purple-500/10'
                                            isLoading={isUpdating}
                                        >
                                            Update Task
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}