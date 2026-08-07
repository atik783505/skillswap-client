import { Spinner } from '@heroui/react';
import React from 'react';

const Loading = () => {
    return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
            <div
                className="flex flex-col items-center gap-4 p-8 rounded-2xl shadow-xl"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
                <Spinner size="lg" color="success" />
                <span className="text-sm font-medium tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Loading...
                </span>
            </div>
        </div>
    );
};

export default Loading;
