"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "12K+",   label: "Active Freelancers", desc: "Vetted professionals across 50+ countries" },
  { value: "8.5K+",  label: "Tasks Completed",    desc: "Successfully delivered projects every month" },
  { value: "$2.4M+", label: "Total Paid Out",      desc: "Earned by freelancers on our platform" },
  { value: "4.9★",   label: "Average Rating",      desc: "Based on 25,000+ verified client reviews" },
];

export default function PlatformStats() {
  return (
    <section
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-color)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 100%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10 space-y-2.5"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
            Platform by the Numbers
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Real data reflecting the trust thousands of clients and freelancers place in SkillSwap every day.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-200"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}
            >
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight gradient-text-emerald mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-bold mb-1" style={{ color: "var(--text-heading)" }}>{stat.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
