'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function TaskFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentSearch = searchParams.get('search') || '';
    const currentCategory = searchParams.get('category') || '';

    const updateFilters = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
    
        params.set('page', '1'); 
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        startTransition(() => {
            router.push(`/all-tasks?${params.toString()}`);
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search tasks by title..."
                    defaultValue={currentSearch}
                    onChange={(e) => updateFilters('search', e.target.value)}
                    className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all"
                />
            </div>
            <div className="w-full md:w-64">
                <select
                    defaultValue={currentCategory}
                    onChange={(e) => updateFilters('category', e.target.value)}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                >
                    <option value="">All Categories</option>
                    <option value="Design">Design</option>
                    <option value="Writing">Writing</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            
            {isPending && <span className="text-xs text-blue-400 self-center animate-pulse">Loading...</span>}
        </div>
    );
}