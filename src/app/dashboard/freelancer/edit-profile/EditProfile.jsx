'use client'
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const EditProfile = ({ user }) => {
    const [userData, setUserData] = useState({
        name: user?.name || "",
        bio: user?.bio || "",
        hourlyRate: user?.hourlyRate || "",
        skills: user?.skills || [],
        image: user?.image || ""
    });

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setUserData({ ...userData, skills: [...userData.skills, e.target.value] });
            e.target.value = "";
        }
    };

    const removeSkill = (index) => {
        setUserData({ ...userData, skills: userData.skills.filter((_, i) => i !== index) });
    };

    const handleUpdate = async () => {
        try {
            const { data, error } = await authClient.updateUser({
                name: userData.name,
                image: userData.image,
                bio: userData.bio,
                hourlyRate: parseFloat(userData.hourlyRate) || 0,
                skills: userData.skills,
            });

            if (error) {
                toast.error(error.message || "Failed to update profile");
            } else {
                toast.success("Profile Updated Successfully!");
                window.location.reload(); 
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    // ইনপুট ফিল্ডের জন্য কমন ক্লাস
    const inputClass = "w-full bg-slate-950/50 p-3 rounded-lg border border-slate-700 focus:border-emerald-500 outline-none transition-colors";

    return (
        <div className="bg-slate-900/40 text-white p-8 rounded-2xl max-w-2xl mx-auto shadow-xl border border-slate-800">
            <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
            <p className="text-gray-400 mb-6">Keep your professional identity updated to attract better tasks.</p>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm mb-2 text-gray-300">Display Name</label>
                    <input className={inputClass} value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm mb-2 text-gray-300">Hourly Rate ($)</label>
                    <input className={inputClass} value={userData.hourlyRate} onChange={(e) => setUserData({ ...userData, hourlyRate: e.target.value })} />
                </div>
            </div>

            <label className="block text-sm mb-2 text-gray-300">Photo Link</label>
            <input className={`${inputClass} mb-6`} value={userData.image} onChange={(e) => setUserData({ ...userData, image: e.target.value })} />

            <label className="block text-sm mb-2 text-gray-300">Skills (Tags)</label>
            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-700 mb-6 flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                    <span key={index} className="bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded flex items-center gap-2 text-sm">
                        {skill} <button onClick={() => removeSkill(index)} className="hover:text-white">x</button>
                    </span>
                ))}
                <input className="bg-transparent outline-none text-sm min-w-[100px] text-white" placeholder="Add skill..." onKeyDown={handleKeyDown} />
            </div>

            <label className="block text-sm mb-2 text-gray-300">Bio</label>
            <textarea className={`${inputClass} h-32 mb-6`} value={userData.bio} onChange={(e) => setUserData({ ...userData, bio: e.target.value })} />

            <button onClick={handleUpdate} className="bg-emerald-500 text-black px-8 py-3 rounded-lg font-bold float-right hover:bg-emerald-400 transition-all">Save Changes</button>
        </div>
    );
};

export default EditProfile;