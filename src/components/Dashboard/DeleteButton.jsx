"use client";
import { Button } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { deleteAdminTask } from "@/lib/actions/admin";

export default function DeleteTaskButton({ id }) {
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this task?")) return;

        const res = await deleteAdminTask(id)
        if (res.success) {
            toast.success("Task deleted successfully!");
        } else {
            toast.error('error')
        }

    };

    return (
        <Button
            isIconOnly
            variant="light"
            className="text-slate-400 hover:text-red-500 transition-colors"
            onClick={handleDelete}
        >
            <TrashBin size={18} />
        </Button>
    );
}