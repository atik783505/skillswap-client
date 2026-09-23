'use client';

import { useRouter } from "next/navigation";
import { FiLock, FiHome } from "react-icons/fi";

export default function Unauthorized() {
    const router = useRouter();

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6"
            style={{ background: "var(--bg-primary)" }}
        >
            <div className="max-w-md w-full text-center space-y-6">
                {/* Icon */}
                <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto"
                    style={{
                        background: "rgba(244,63,94,0.08)",
                        border: "1px solid rgba(244,63,94,0.25)",
                    }}
                >
                    <FiLock className="text-4xl text-rose-500" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                        Unauthorized Access
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        You don&apos;t have permission to view this page. Check your credentials or go back to the homepage.
                    </p>
                </div>

                <button
                    onClick={() => router.push('/')}
                    className="inline-flex items-center gap-2 px-8 h-12 rounded-xl text-sm font-bold text-white transition-all"
                    style={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                    }}
                >
                    <FiHome size={16} />
                    Back to Home
                </button>
            </div>
        </div>
    );
}
