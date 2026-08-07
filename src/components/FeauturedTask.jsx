"use client";
import React from "react";
import TaskCard from "./TaskCard";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FeaturedTasksClient({ tasks }) {
  return (
    <section className="py-16 sm:py-20" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10"
        >
          <div className="space-y-2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
              style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)", color: "#10b981" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Live Opportunities
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
              style={{ color: "var(--text-heading)" }}
            >
              Featured Tasks
            </h2>
            <p className="text-sm max-w-lg" style={{ color: "var(--text-secondary)" }}>
              Hand-picked projects ready for expert execution. Submit a proposal and start earning today.
            </p>
          </div>
          <Link
            href="/all-tasks"
            className="shrink-0 text-sm font-semibold text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1.5"
          >
            View all tasks
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Task grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
