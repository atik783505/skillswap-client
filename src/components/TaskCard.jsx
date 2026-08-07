"use client";
import React from "react";
import { Card, Button } from "@heroui/react";
import Link from "next/link";
import { Calendar, CircleDollar, Tag, Person } from "@gravity-ui/icons";
import { motion } from "framer-motion";

const TaskCard = ({ task }) => {
  const dueDate = new Date(task.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <div
        className="rounded-2xl p-5 flex flex-col justify-between h-full transition-all duration-200 group cursor-default"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-sm)",
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}
      >
        <div className="space-y-3.5">
          {/* Category + Budget row */}
          <div className="flex items-center justify-between gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                color: "#10b981",
              }}
            >
              <Tag className="w-3 h-3" />
              {task.category || "General"}
            </span>
            <span className="inline-flex items-center font-bold text-sm tracking-tight gap-1 text-emerald-500">
              <CircleDollar className="w-3.5 h-3.5" />
              {Number(task.budget).toLocaleString()} USD
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-sm font-bold line-clamp-2 leading-snug transition-colors duration-200 group-hover:text-emerald-500"
            style={{ color: "var(--text-heading)" }}
          >
            {task.title}
          </h3>
        </div>

        {/* Footer */}
        <div
          className="mt-5 pt-4 space-y-3"
          style={{ borderTop: "1px solid var(--border-color)" }}
        >
          <div className="flex flex-col gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
            <div className="flex items-center gap-2">
              <Person className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--text-muted)" }} />
              <span className="truncate">
                Client:{" "}
                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
                  {task.clientName || "Anonymous"}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--text-muted)" }} />
              <span>
                Due:{" "}
                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
                  {dueDate}
                </span>
              </span>
            </div>
          </div>

          <Link href={`/all-tasks/${task._id}`} className="w-full block">
            <button
              className="w-full rounded-xl text-xs font-bold h-9 transition-all duration-200 
               bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] 
               hover:!bg-emerald-500 hover:!text-white hover:!border-emerald-500 cursor-pointer"
            >
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
