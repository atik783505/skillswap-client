"use client";

import { Button, Link } from "@heroui/react";
import { ShieldCheck, CircleDollar, Persons, Briefcase } from "@gravity-ui/icons";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const statItems = [
  { icon: Persons,      value: "12,000+", label: "Freelancers",  color: "text-emerald-500" },
  { icon: Briefcase,    value: "8,500+",  label: "Tasks Posted", color: "text-purple-500" },
  { icon: CircleDollar, value: "$2.4M+",  label: "Paid Out",     color: "text-sky-500" },
  { icon: ShieldCheck,  value: "99.2%",   label: "Satisfaction", color: "text-amber-500" },
];

export default function Hero() {
  const { data } = useSession();
  const sessionUser = data?.user;

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "var(--bg-primary)" }}>

      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[320px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)", filter: "blur(40px)" }}
      />
      <div
        className="absolute top-16 right-0 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      {/* ── Hero text block ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 sm:pt-20 sm:pb-16">
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="flex flex-col items-center text-center gap-5 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider border"
              style={{ background: "rgba(139,92,246,0.08)", borderColor: "rgba(139,92,246,0.2)", color: "#a78bfa" }}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="uppercase">Premium Freelance Marketplace</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.1]"
            style={{ color: "var(--text-heading)" }}
          >
            Get Your Tasks Done by{" "}
            <span className="gradient-text-emerald">Skilled Freelancers</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg max-w-2xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Connect with vetted professionals worldwide. Post tasks, receive proposals,
            and collaborate seamlessly — all on one platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            {(!sessionUser || sessionUser?.role === "client") && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link href="/dashboard/client/manage-task/new" className="w-full">
                  <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 h-11 rounded-xl shadow-lg shadow-emerald-500/25 text-sm">
                    Post a Task — It&apos;s Free
                  </Button>
                </Link>
              </motion.div>
            )}
            {(!sessionUser || sessionUser?.role === "freelancer") && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link href="/all-tasks" className="w-full">
                  <Button
                    variant="bordered"
                    className="w-full sm:w-auto font-bold px-8 h-11 rounded-xl text-sm"
                    style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "var(--bg-secondary)" }}
                  >
                    Browse Tasks →
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Trust */}
          <motion.p variants={fadeInUp} className="text-xs" style={{ color: "var(--text-muted)" }}>
            No setup fees · Cancel anytime · Secure payments via Stripe
          </motion.p>
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <div
        className="relative z-10 border-t border-b"
        style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
          >
            {statItems.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i} variants={fadeInUp}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 sm:gap-3.5"
                >
                  <div
                    className="p-2.5 rounded-xl shrink-0"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className={`text-lg sm:text-xl font-extrabold tracking-tight ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
