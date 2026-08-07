"use client";
import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Briefcase, Person } from "@gravity-ui/icons";
import { authClient, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const SkillSwapLogo = () => (
  <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

function Field({ label, name, type = "text", placeholder, hint, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
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
      {hint && <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{hint}</p>}
    </div>
  );
}

export default function Signup() {
  const [selectedRole, setSelectedRole] = useState('client');
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image");
    const bio = formData.get("bio");
    const hourlyRate = formData.get("hourlyRate");
    const skillsString = formData.get("skills");
    const skills = skillsString ? skillsString.split(",").map(s => s.trim()).filter(Boolean) : [];

    const { data, error } = await signUp.email({
      name, email, password,
      image: image || undefined,
      role: selectedRole,
      ...(selectedRole === 'freelancer' && {
        bio: bio || "",
        skills,
        hourlyRate: hourlyRate ? Number(hourlyRate) : 0,
      }),
    });

    if (error) {
      toast.error(error.message || "Registration failed");
    } else {
      toast.success("Account created! Redirecting…");
      router.push(`/dashboard/${data?.user?.role}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign-in failed.");
    }
  };

  const roles = [
    { id: 'client', label: "I'm a Client", icon: Briefcase, desc: "Post tasks & hire" },
    { id: 'freelancer', label: "I'm a Freelancer", icon: Person, desc: "Find work & earn" },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(16,185,129,0.05) 0%, transparent 100%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div
              className="p-3 rounded-2xl mb-1"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <SkillSwapLogo />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
              Create Account
            </h1>
            <p className="text-sm text-center" style={{ color: "var(--text-secondary)" }}>
              Join the elite network of freelancers and clients today
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
              or register
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* Basic fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" placeholder="Alex Rivers" required />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <Field label="Profile Image URL" name="image" type="url" placeholder="https://…/avatar.jpg" />
            <Field
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              hint="6+ characters, uppercase and lowercase required"
            />

            {/* Role picker */}
            <div className="flex flex-col gap-2 mt-1">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                Choose your role
              </p>
              <div className="grid grid-cols-2 gap-3">
                {roles.map(({ id, label, icon: Icon, desc }) => {
                  const isActive = selectedRole === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedRole(id)}
                      className="flex flex-col items-center gap-1.5 p-3.5 rounded-xl transition-all text-center"
                      style={{
                        background: isActive ? "rgba(16,185,129,0.1)" : "var(--bg-secondary)",
                        border: isActive ? "2px solid #10b981" : "2px solid var(--border-color)",
                        color: isActive ? "#10b981" : "var(--text-secondary)",
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-bold">{label}</span>
                      <span className="text-[10px]" style={{ color: isActive ? "#10b981" : "var(--text-muted)" }}>
                        {desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Freelancer extra fields */}
            <AnimatePresence>
              {selectedRole === 'freelancer' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex flex-col gap-4 p-4 rounded-2xl mt-1"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 rounded-full bg-emerald-500" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                        Freelancer Profile
                      </h3>
                    </div>
                    <Field
                      label="Professional Bio"
                      name="bio"
                      placeholder="e.g. Full Stack MERN Developer with 5 years experience"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field
                        label="Skills"
                        name="skills"
                        placeholder="React, Node.js, Figma"
                        hint="Separate with commas"
                      />
                      <Field
                        label="Hourly Rate ($)"
                        name="hourlyRate"
                        type="number"
                        placeholder="25"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full h-11 mt-1 rounded-xl text-sm font-bold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(16,185,129,0.45)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 14px rgba(16,185,129,0.3)"}
            >
              Create Account →
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-emerald-500 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
