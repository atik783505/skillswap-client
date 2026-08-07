'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const categories = ['Design', 'Writing', 'Development', 'Marketing', 'Other'];

export default function TaskFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => router.push(`/all-tasks?${params.toString()}`));
  };

  return (
    <div
      className="rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Search input */}
      <div className="relative flex-1 w-full">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: "var(--text-muted)" }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search tasks by title…"
          defaultValue={currentSearch}
          onChange={e => updateFilters('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
          }}
          onFocus={e => e.currentTarget.style.borderColor = "#10b981"}
          onBlur={e => e.currentTarget.style.borderColor = "var(--border-color)"}
        />
      </div>

      {/* Category select */}
      <div className="relative w-full sm:w-56">
        <select
          defaultValue={currentCategory}
          onChange={e => updateFilters('category', e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none appearance-none cursor-pointer transition-all"
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
          }}
          onFocus={e => e.currentTarget.style.borderColor = "#10b981"}
          onBlur={e => e.currentTarget.style.borderColor = "var(--border-color)"}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <svg
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: "var(--text-muted)" }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-500 shrink-0 animate-pulse">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Searching…
        </div>
      )}
    </div>
  );
}
