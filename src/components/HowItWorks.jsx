"use client";
import { CirclePlus, Envelope, ShieldCheck } from "@gravity-ui/icons";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Post a Task",
    description: "Describe your requirements, set a budget, and go live in under 2 minutes.",
    icon: CirclePlus,
    accent: "#10b981",
    accentBg: "rgba(16,185,129,0.08)",
    accentBorder: "rgba(16,185,129,0.25)",
    number: "01",
  },
  {
    id: 2,
    title: "Get Proposals",
    description: "Receive competitive bids from vetted freelancers ready to start immediately.",
    icon: Envelope,
    accent: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.08)",
    accentBorder: "rgba(139,92,246,0.25)",
    number: "02",
  },
  {
    id: 3,
    title: "Hire & Pay Securely",
    description: "Choose the best fit, collaborate seamlessly, and release payment only when satisfied.",
    icon: ShieldCheck,
    accent: "#3b82f6",
    accentBg: "rgba(59,130,246,0.08)",
    accentBorder: "rgba(59,130,246,0.25)",
    number: "03",
  },
];

export default function WorkflowSteps() {
  return (
    <section
      className="py-16 sm:py-20 overflow-hidden"
      style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12 space-y-2.5"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
            style={{ background: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.2)", color: "#3b82f6" }}
          >
            Simple Process
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
            style={{ color: "var(--text-heading)" }}
          >
            How It Works
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Three easy steps to get your project done by the best talent available.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Connector line desktop */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeInOut" }}
            className="hidden md:block absolute top-[38px] left-[20%] right-[20%] h-px origin-left pointer-events-none"
            style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.2), rgba(139,92,246,0.35), rgba(59,130,246,0.2))" }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.13 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center gap-4 group cursor-default relative z-10"
              >
                {/* Icon */}
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.07 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-[76px] h-[76px] rounded-2xl flex items-center justify-center transition-all duration-300"
                    style={{ background: step.accentBg, border: `2px solid ${step.accentBorder}` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: step.accent }} />
                  </motion.div>
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black"
                    style={{ background: step.accentBg, border: `1px solid ${step.accentBorder}`, color: step.accent }}
                  >
                    {step.number}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold" style={{ color: "var(--text-heading)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-[240px]" style={{ color: "var(--text-secondary)" }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
