'use client';
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PersonPencil } from '@gravity-ui/icons';

const EditProfile = ({ user }) => {
    const [userData, setUserData] = useState({
        name: user?.name || "",
        bio: user?.bio || "",
        hourlyRate: user?.hourlyRate || "",
        skills: user?.skills || [],
        image: user?.image || "",
    });

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            setUserData(prev => ({ ...prev, skills: [...prev.skills, e.target.value.trim()] }));
            e.target.value = "";
            e.preventDefault();
        }
    };

    const removeSkill = (index) => {
        setUserData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
    };

    const handleUpdate = async () => {
        try {
            const { error } = await authClient.updateUser({
                name: userData.name,
                image: userData.image,
                bio: userData.bio,
                hourlyRate: parseFloat(userData.hourlyRate) || 0,
                skills: userData.skills,
            });
            if (error) {
                toast.error(error.message || "Failed to update profile");
            } else {
                toast.success("Profile updated successfully!");
                window.location.reload();
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "10px 14px",
        borderRadius: "12px",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.15s",
        background: "var(--bg-input)",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
    };

    const handleFocus = (e) => { e.currentTarget.style.borderColor = "#10b981"; };
    const handleBlur = (e) => { e.currentTarget.style.borderColor = "var(--border-color)"; };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div
                    className="p-2.5 rounded-xl"
                    style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                    <PersonPencil className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                    <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-heading)" }}>
                        Edit Profile
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        Keep your profile updated to attract better opportunities.
                    </p>
                </div>
            </div>

            {/* Form card */}
            <div
                className="rounded-2xl p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                            Display Name
                        </label>
                        <input
                            style={inputStyle}
                            value={userData.name}
                            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                            Hourly Rate ($)
                        </label>
                        <input
                            type="number"
                            min="0"
                            style={inputStyle}
                            value={userData.hourlyRate}
                            onChange={e => setUserData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                        Profile Photo URL
                    </label>
                    <input
                        style={inputStyle}
                        value={userData.image}
                        placeholder="https://example.com/photo.jpg"
                        onChange={e => setUserData(prev => ({ ...prev, image: e.target.value }))}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                {/* Skills tag input */}
                <div className="flex flex-col gap-1.5 mb-5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                        Skills <span className="text-[10px] normal-case font-normal" style={{ color: "var(--text-muted)" }}>(press Enter to add)</span>
                    </label>
                    <div
                        className="flex flex-wrap gap-2 p-3 rounded-xl min-h-[46px]"
                        style={{ background: "var(--bg-input)", border: "1px solid var(--border-color)" }}
                        onClick={e => e.currentTarget.querySelector('input')?.focus()}
                    >
                        {userData.skills.map((skill, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981" }}
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => removeSkill(i)}
                                    className="hover:opacity-70 leading-none text-sm"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        <input
                            className="bg-transparent outline-none text-sm min-w-[100px] flex-1"
                            style={{ color: "var(--text-primary)" }}
                            placeholder="Add skill..."
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-1.5 mb-6">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                        Professional Bio
                    </label>
                    <textarea
                        rows={4}
                        style={{ ...inputStyle, resize: "none", lineHeight: "1.6" }}
                        value={userData.bio}
                        placeholder="Describe your expertise and experience..."
                        onChange={e => setUserData(prev => ({ ...prev, bio: e.target.value }))}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <button
                    onClick={handleUpdate}
                    className="w-full h-11 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2"
                    style={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(16,185,129,0.45)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 14px rgba(16,185,129,0.3)"}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
