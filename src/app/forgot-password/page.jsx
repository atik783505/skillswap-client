"use client";
import Link from "next/link";

export default function ForgotPassword() {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-12"
            style={{ background: "var(--bg-primary)" }}
        >
            <div
                className="w-full max-w-md rounded-3xl p-8 sm:p-10 text-center space-y-5"
                style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    boxShadow: "var(--shadow-lg)",
                }}
            >
                {/* Icon */}
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                    style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                    <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </div>

                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                        Forgot Password?
                    </h1>
                    <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                        Password reset is coming soon. For now, please contact support or sign in with Google.
                    </p>
                </div>

                <div className="space-y-3 pt-2">
                    <Link
                        href="/auth/signin"
                        className="block w-full h-11 rounded-xl text-sm font-bold text-white flex items-center justify-center transition-all"
                        style={{
                            background: "linear-gradient(135deg, #10b981, #059669)",
                            boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                        }}
                    >
                        Back to Sign In
                    </Link>
                    <a
                        href="mailto:atik13672@gmail.com"
                        className="block w-full h-11 rounded-xl text-sm font-semibold flex items-center justify-center transition-all"
                        style={{
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border-color)",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
