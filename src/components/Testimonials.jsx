"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Startup Founder",
    avatar: "SM",
    avatarColor: "#10b981",
    text: "SkillSwap completely transformed how we hire. We found a brilliant developer in 24 hours and the work was delivered ahead of schedule. The escrow payment system gave us total peace of mind.",
    rating: 5,
  },
  {
    name: "Amir Hassan",
    role: "Freelance Developer",
    avatar: "AH",
    avatarColor: "#8b5cf6",
    text: "As a freelancer, SkillSwap gives me a steady stream of quality projects. The proposal system is transparent and clients are professional. I&apos;ve tripled my monthly income in 6 months.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "E-commerce Manager",
    avatar: "PS",
    avatarColor: "#3b82f6",
    text: "Needed a brand redesign on a tight deadline — found a designer within hours. The quality was exceptional, and the communication was seamless throughout. Will absolutely use again.",
    rating: 5,
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="py-16 sm:py-20"
      style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10 space-y-2.5"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
            style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)", color: "#f59e0b" }}
          >
            ❤️ Loved by Thousands
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
            What Our Users Say
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Real stories from clients and freelancers who&apos;ve built their success on SkillSwap.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-5 sm:p-6 flex flex-col gap-4 transition-all duration-200"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}
            >
              <Stars count={t.rating} />

              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: t.avatarColor }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--text-heading)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
