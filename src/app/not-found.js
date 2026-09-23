import React from 'react';
import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden"
            style={{ background: "var(--bg-primary)" }}
        >
            {/* Ambient glows */}
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)", filter: "blur(40px)" }}
            />
            <div
                className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)", filter: "blur(50px)" }}
            />

            <div className="max-w-md w-full text-center space-y-6 relative z-10">
                {/* 404 number */}
                <div className="relative inline-block">
                    <h1 className="text-9xl font-black tracking-tighter gradient-text-emerald">
                        404
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mt-2 opacity-80" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-heading)" }}>
                        Page Not Found
                    </h2>
                    <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        The page you&apos;re looking for doesn&apos;t exist, has been removed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl transition-all"
                        style={{
                            background: "linear-gradient(135deg, #10b981, #059669)",
                            boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
