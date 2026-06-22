"use client";

import React, { useState } from "react";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";

export function DeleteAlert({ onDelete, task }) {
  const [isDeleting, setIsDeleting] = useState(false);

  // 🌟 মডালের ভেতরের আসল ডিলিট লজিক
  const handleActionDelete = async (e) => {
    if (!onDelete) return;

    setIsDeleting(true);
    const loadingToast = toast.loading('Deleting task...');

    try {
      const res = await onDelete(task._id);
      toast.dismiss(loadingToast);

      if (res?.success) {
        toast.success('Task deleted successfully!');
      } else {
        toast.error(res?.message || 'Failed to delete task');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      {/* 🌟 তোমার প্রথম বাটন (ট্রিগার): আইকন ও ডিজাইন UI এর সাথে ম্যাচ করা */}
      <Button
        isIconOnly
        size="sm"
        variant="light"
        className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
        title="Delete Task"
      >
        <TrashBin className="w-4 h-4" />
      </Button>
      
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          {/* 🌟 ডিজাইন তোমার ডার্ক থিমের সাথে মেলানো */}
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-slate-900 text-slate-100 border border-slate-800 backdrop-blur-md">
            <AlertDialog.CloseTrigger className="text-slate-400 hover:text-slate-200" />
            
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-rose-400">Delete task permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            
            <AlertDialog.Body className="text-slate-300 text-sm">
              <p>
                This will permanently delete <strong>{task?.title || 'this task'}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            
            <AlertDialog.Footer>
              {/* Cancel বাটন */}
              <Button slot="close" variant="tertiary" className="bg-slate-800 text-slate-300 hover:bg-slate-700" isDisabled={isDeleting}>
                Cancel
              </Button>
              
              {/* 🌟 ডিলিট বাটন: তোমার দেওয়া slot="close" ঠিক রাখা হয়েছে */}
              <Button 
                slot="close" 
                variant="danger" 
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold"
                onClick={handleActionDelete}
                isLoading={isDeleting}
              >
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}