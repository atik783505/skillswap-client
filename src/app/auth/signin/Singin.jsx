"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { authClient, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SkillSwapLogo = () => (
  <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

function InputField({ label, name, type = "text", placeholder, validate, required, extra }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
            {label}
          </label>
          {extra}
        </div>
      )}
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
        style={{
          background: "var(--bg-input)",
          border: "1px solid var(--border-color)",
          color: "var(--text-primary)",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "#10b981"}
        onBlur={e => e.currentTarget.style.borderColor = "var(--border-color)"}
      />
    </div>
  );
}

export default function Signin() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({ email, password });

    if (error) {
      toast.error(error.message || "Sign in failed");
    } else if (data) {
      if (data.user?.isBlocked) {
        await signOut();
        toast.error("Your account has been blocked. Please contact support.");
        return;
      }
      toast.success("Welcome back!");
      const userRole = data.user?.role;
      window.location.href = userRole === 'client' ? '/' : `/dashboard/${userRole}`;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await authClient.signIn.social({ provider: "google", callbackURL: "/" });
      if (error) { toast.error("Google sign-in failed."); return; }
      if (data?.user?.isBlocked) {
        await signOut();
        toast.error("Your account has been blocked.");
        window.location.href = "/auth/signin";
      }
    } catch {
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(16,185,129,0.05) 0%, transparent 100%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div
              className="p-3 rounded-2xl mb-1"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <SkillSwapLogo />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
              Welcome Back
            </h1>
            <p className="text-sm text-center" style={{ color: "var(--text-secondary)" }}>
              Sign in to continue to your SkillSwap account
            </p>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all mb-5"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#10b981"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}
          >
            <FcGoogle className="text-lg shrink-0" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
            <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              or email
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              extra={
                <Link href="/forgot-password" className="text-[11px] text-emerald-500 hover:underline">
                  Forgot password?
                </Link>
              }
            />

            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-xl text-sm font-bold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(16,185,129,0.45)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 14px rgba(16,185,129,0.3)"}
            >
              Sign In →
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-emerald-500 font-semibold hover:underline">
              Sign Up Free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
