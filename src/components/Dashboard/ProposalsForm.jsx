'use client';
import React from 'react';
import { Button, Form, TextField, Label, Input, FieldError, TextArea } from '@heroui/react';
import { makeProposal } from '@/lib/actions/proposals';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { LuSend } from 'react-icons/lu';

const ProposalsForm = ({ taskId, user }) => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const finalData = {
      ...data,
      proposedBudget: parseInt(data.proposedBudget),
      estimatedDays: parseInt(data.estimatedDays),
      freelancerId: user.id,
      freelancerEmail: user.email,
      taskId,
      status: 'pending',
    };

    const res = await makeProposal(finalData);
    if (res.insertedId) {
      toast.success('Proposal submitted successfully!');
      e.target.reset();
      router.refresh();
    } else {
      toast.error('Failed to submit proposal. Please try again.');
    }
  };

  return (
    <div
      className="rounded-2xl p-6 sm:p-7"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-5" style={{ borderBottom: "1px solid var(--border-color)" }}>
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
        >
          <LuSend className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: "var(--text-heading)" }}>
            Submit a Proposal
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Make a compelling offer to win this project
          </p>
        </div>
      </div>

      <Form className="flex flex-col gap-5" onSubmit={onSubmit}>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Budget */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              Your Budget (USD) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              >
                $
              </span>
              <input
                type="number"
                name="proposedBudget"
                required
                min="1"
                placeholder="250"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
                onFocus={e => e.currentTarget.style.borderColor = "#8b5cf6"}
                onBlur={e => e.currentTarget.style.borderColor = "var(--border-color)"}
              />
            </div>
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              Estimated Days <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="estimatedDays"
              required
              min="1"
              placeholder="7"
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "var(--bg-input)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
              onFocus={e => e.currentTarget.style.borderColor = "#8b5cf6"}
              onBlur={e => e.currentTarget.style.borderColor = "var(--border-color)"}
            />
          </div>
        </div>

        {/* Cover note */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
            Cover Note <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="coverNote"
            required
            rows={5}
            placeholder="Describe your approach, relevant experience, and why you're the best fit for this task..."
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none leading-relaxed"
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
            onFocus={e => e.currentTarget.style.borderColor = "#8b5cf6"}
            onBlur={e => e.currentTarget.style.borderColor = "var(--border-color)"}
          />
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Tip: Mention specific skills and a rough timeline to stand out.
          </p>
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            boxShadow: "0 4px 14px rgba(139,92,246,0.3)",
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(139,92,246,0.4)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 14px rgba(139,92,246,0.3)"}
        >
          <LuSend className="w-4 h-4" />
          Submit Proposal
        </button>
      </Form>
    </div>
  );
};

export default ProposalsForm;
