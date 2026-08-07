'use client';
import React, { useState } from 'react';
import { Form, Select, ListBox, Button, Card } from '@heroui/react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { MdAddTask } from 'react-icons/md';
import { postTask } from '@/lib/actions/tasks';

const inputStyle = {
    background: "var(--bg-input)",
    border: "1px solid var(--border-color)",
    color: "var(--text-primary)",
    borderRadius: "12px",
    padding: "10px 16px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.15s",
};

function FieldWrapper({ label, children }) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--text-secondary)" }}
            >
                {label} <span className="text-rose-500">*</span>
            </label>
            {children}
        </div>
    );
}

const PostTaskForm = () => {
    const [loading, setLoading] = useState(false);
    const { data } = useSession();
    const user = data?.user;

    const handleFocus = (e) => { e.currentTarget.style.borderColor = "#8b5cf6"; };
    const handleBlur = (e) => { e.currentTarget.style.borderColor = "var(--border-color)"; };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const currentForm = e.currentTarget;
        const formData = new FormData(currentForm);
        const taskFields = Object.fromEntries(formData.entries());
        if (taskFields.budget) taskFields.budget = Number(taskFields.budget);

        const finalData = {
            ...taskFields,
            clientName: user?.name,
            clientEmail: user?.email,
            clientId: user?.id,
            clientImage: user?.image,
            status: "open",
            deliverable_url: "",
        };

        try {
            const res = await postTask(finalData);
            if (res && res.acknowledged) {
                toast.success('Task Published Successfully!');
                currentForm.reset();
            } else {
                toast.error(res?.error || 'Error publishing your task');
            }
        } catch {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex items-start justify-center">
            <div
                className="w-full max-w-2xl rounded-2xl p-6 md:p-8"
                style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    boxShadow: "var(--shadow-md)",
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center gap-3 pb-6 mb-6"
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                >
                    <div
                        className="p-2.5 rounded-xl"
                        style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                    >
                        <MdAddTask className="text-xl text-emerald-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-heading)" }}>
                            Post a Task
                        </h2>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            Fill in the details below to publish a new project on the platform.
                        </p>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="w-full space-y-5">
                    {/* Title */}
                    <FieldWrapper label="Task Title">
                        <input
                            name="title"
                            required
                            placeholder="e.g. Website Bug Fix, Logo Design..."
                            style={inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </FieldWrapper>

                    {/* Category */}
                    <FieldWrapper label="Category">
                        <Select name="category" isRequired placeholder="Select a category">
                            <Select.Trigger
                                className="rounded-xl text-sm h-[42px]"
                                style={{
                                    background: "var(--bg-input)",
                                    border: "1px solid var(--border-color)",
                                    color: "var(--text-primary)",
                                }}
                            >
                                <Select.Value />
                                <Select.Indicator style={{ color: "var(--text-muted)" }} />
                            </Select.Trigger>
                            <Select.Popover
                                className="rounded-xl shadow-xl"
                                style={{
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border-color)",
                                }}
                            >
                                <ListBox className="p-1">
                                    {['Development', 'Design', 'Marketing', 'Writing', 'Other'].map(cat => (
                                        <ListBox.Item
                                            key={cat}
                                            id={cat}
                                            textValue={cat}
                                            className="rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors hover:bg-purple-500/10 hover:text-purple-500"
                                            style={{ color: "var(--text-primary)" }}
                                        >
                                            {cat}
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </FieldWrapper>

                    {/* Description */}
                    <FieldWrapper label="Description">
                        <textarea
                            name="description"
                            required
                            rows={5}
                            placeholder="Describe the requirements, scope, and expected deliverables..."
                            style={{ ...inputStyle, resize: "none", lineHeight: "1.6" }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </FieldWrapper>

                    {/* Budget + Deadline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FieldWrapper label="Budget (USD)">
                            <div className="relative">
                                <span
                                    className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-sm pointer-events-none"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    $
                                </span>
                                <input
                                    name="budget"
                                    type="number"
                                    min="1"
                                    required
                                    placeholder="50"
                                    style={{ ...inputStyle, paddingLeft: "28px" }}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </FieldWrapper>
                        <FieldWrapper label="Deadline">
                            <input
                                name="deadline"
                                type="date"
                                required
                                style={{ ...inputStyle, colorScheme: "auto" }}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </FieldWrapper>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 rounded-xl text-sm font-bold text-white transition-all mt-2 flex items-center justify-center gap-2"
                        style={{
                            background: "linear-gradient(135deg, #10b981, #059669)",
                            boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Publishing…
                            </>
                        ) : (
                            <>
                                <MdAddTask className="text-lg" />
                                Publish Task
                            </>
                        )}
                    </button>
                </Form>
            </div>
        </div>
    );
};

export default PostTaskForm;
