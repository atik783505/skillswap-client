"use client";
import React, { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { setDeliveryLink } from "@/lib/actions/proposals";

export default function DeliverableModal({ taskId }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDeliverable = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const deliverable_url = formData.get("url");

        const data = {
            taskId,
            deliverable_url,
        }

        try {
            const res = await setDeliveryLink(data)

            if (res.success) { 
                toast.success('Task marked as completed!');
                window.location.reload();
            } else {
                toast.error(res.message || 'Failed to submit deliverable');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal>
            <Modal.Trigger>
                <Button className="w-full font-semibold rounded-xl bg-emerald-500">
                    Submit Deliverable
                </Button>
            </Modal.Trigger>

            <Modal.Backdrop className="backdrop-blur-sm bg-black/50">
                <Modal.Container>
                    <Modal.Dialog className="bg-slate-950 text-slate-100 border border-slate-900 rounded-2xl p-6">
                        <Modal.Header className="pb-4">
                            <Modal.Heading className="text-xl font-bold">Submit Your Work</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body>
                            <form onSubmit={handleDeliverable} className="flex flex-col gap-4">
                                <TextField name="url" isRequired className="flex flex-col gap-2">
                                    <Label className="text-xs font-semibold text-slate-400">Deliverable URL (GitHub/Docs)</Label>
                                    <Input
                                        type="url"
                                        placeholder="https://github.com/..."
                                        className="rounded-xl border border-slate-900 bg-slate-900/50 h-11"
                                    />
                                </TextField>

                                <Modal.Footer className="mt-4 flex gap-2">
                                    <Button
                                        type="submit"
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
                                        isLoading={isSubmitting}
                                    >
                                        Complete Task
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}