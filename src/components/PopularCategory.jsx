"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Paintbrush, PencilToLine, Code, ChartBar, Plus } from "@gravity-ui/icons";

const categories = [
  { name: "Design",       icon: Paintbrush,   href: "/all-tasks?category=Design",       accent: "#a855f7", accentBg: "rgba(168,85,247,0.08)",  accentBorder: "rgba(168,85,247,0.2)",  hoverBorder: "rgba(168,85,247,0.45)", desc: "UI/UX, Branding, Illustrations" },
  { name: "Writing",      icon: PencilToLine, href: "/all-tasks?category=Writing",      accent: "#3b82f6", accentBg: "rgba(59,130,246,0.08)",   accentBorder: "rgba(59,130,246,0.2)",  hoverBorder: "rgba(59,130,246,0.45)", desc: "Copywriting, Blogs, Editing" },
  { name: "Development",  icon: Code,         href: "/all-tasks?category=Development",  accent: "#10b981", accentBg: "rgba(16,185,129,0.08)",   accentBorder: "rgba(16,185,129,0.2)",  hoverBorder: "rgba(16,185,129,0.45)", desc: "Web, Mobile, APIs" },
  { name: "Marketing",    icon: ChartBar,     href: "/all-tasks?category=Marketing",    accent: "#ec4899", accentBg: "rgba(236,72,153,0.08)",   accentBorder: "rgba(236,72,153,0.2)",  hoverBorder: "rgba(236,72,153,0.45)", desc: "SEO, Ads, Social Media" },
  { name: "Other",        icon: Plus,         href: "/all-tasks?category=Other",        accent: "#f59e0b", accentBg: "rgba(245,158,11,0.08)",   accentBorder: "rgba(245,158,11,0.2)",  hoverBorder: "rgba(245,158,11,0.45)", desc: "Miscellaneous projects" },
];

export default function PopularCategories() {
  return (
    <section
      className="py-16 sm:py-20"
      style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-color)" }}
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
            Browse by Category
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Find tasks that match your expertise and start submitting proposals right away.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.38 } } }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href={cat.href} className="block h-full group">
                  <div
                    className="rounded-2xl p-5 flex flex-col items-center text-center gap-3 h-full transition-all duration-200"
                    style={{ background: "var(--bg-card)", border: `1px solid ${cat.accentBorder}`, boxShadow: "var(--shadow-sm)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = cat.hoverBorder; e.currentTarget.style.boxShadow = `0 8px 24px ${cat.accentBg}`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = cat.accentBorder; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
                  >
                    <div
                      className="p-3 rounded-xl transition-transform duration-200 group-hover:scale-110"
                      style={{ background: cat.accentBg, border: `1px solid ${cat.accentBorder}` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: cat.accent }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: "var(--text-heading)" }}>{cat.name}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>{cat.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
