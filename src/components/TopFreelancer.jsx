"use client";
import React from "react";
import { Avatar } from "@heroui/react";
import { Briefcase, CircleDollar } from "@gravity-ui/icons";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TopFreelancersClient({ freelancers }) {
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
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10"
        >
          <div className="space-y-2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
              style={{ background: "rgba(168,85,247,0.08)", borderColor: "rgba(168,85,247,0.2)", color: "#a855f7" }}
            >
              ⭐ Top Performers
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
              Elite Freelancers
            </h2>
            <p className="text-sm max-w-lg" style={{ color: "var(--text-secondary)" }}>
              Our top-rated experts, ranked by completed projects and client reviews.
            </p>
          </div>
          <Link href="/freelancers" className="shrink-0 text-sm font-semibold text-purple-500 hover:text-purple-600 transition-colors flex items-center gap-1.5">
            View all freelancers
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {freelancers?.map((freelancer, index) => (
            <motion.div
              key={freelancer._id}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {/* Rank badge */}
              <div
                className="absolute -top-2.5 -left-2.5 z-10 w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-black"
                style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", color: "#a855f7" }}
              >
                #{index + 1}
              </div>

              <div
                className="rounded-2xl p-5 flex flex-col h-full transition-all duration-300 group cursor-default"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(168,85,247,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
              >
                {/* Avatar + name */}
                <div className="flex items-start gap-3 mb-3.5">
                  <Avatar className="w-11 h-11 rounded-xl shrink-0" style={{ border: "2px solid var(--border-color)" }}>
                    <Avatar.Image alt={freelancer.name} src={freelancer.image} />
                    <Avatar.Fallback>
                      {freelancer.name ? freelancer.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "FL"}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold truncate transition-colors group-hover:text-purple-500" style={{ color: "var(--text-heading)" }}>
                      {freelancer.name}
                    </h2>
                    <p className="text-xs font-semibold text-emerald-500 flex items-center gap-0.5 mt-0.5">
                      <CircleDollar className="w-3 h-3" />
                      {freelancer.hourlyRate || 0}/hr
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: "var(--text-secondary)" }}>
                  {freelancer.bio || "Professional freelancer specializing in modern digital solutions."}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {freelancer.skills?.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide"
                      style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", color: "#a855f7" }}
                    >
                      {skill}
                    </span>
                  ))}
                  {freelancer.skills?.length > 3 && (
                    <span className="text-[10px] font-medium self-center" style={{ color: "var(--text-muted)" }}>
                      +{freelancer.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border-color)" }}>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Briefcase className="w-3.5 h-3.5 text-purple-500" />
                    <span>Completed</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                  >
                    {freelancer.completedTasksCount || 0} jobs
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
