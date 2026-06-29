"use client"; // ফ্রেমার মোশন ব্যবহারের জন্য ক্লায়েন্ট কম্পোনেন্ট করা হলো

import { Button, Link } from "@heroui/react";
import { ShieldCheck } from "@gravity-ui/icons";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";

export default function Hero() {
  
  const {data} = useSession()
  const sessionUser  = data?.user

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full bg-slate-950 text-white min-h-[70vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
      >
        
        <motion.div variants={fadeInUp}>
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider text-purple-400 shadow-inner hover:border-slate-700 transition-colors">
            <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
            <span className="uppercase text-[10px] sm:text-xs">Premium Marketplace</span>
          </div>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.15] text-slate-100"
        >
          Get your tasks done by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 block sm:inline">
            skilled freelancers
          </span>
        </motion.h1>

        <motion.p 
          variants={fadeInUp}
          className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed text-balance"
        >
          Experience the next generation of micro-tasking. Connect with vetted professionals
          globally for high-performance execution of your digital needs.
        </motion.p>

        <motion.div 
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
        >
          {(!sessionUser || sessionUser?.role === 'client') && (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link href="/dashboard/client/manage-task/new" className="w-full">
                <Button
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 h-12 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-sm"
                >
                  Post a Task
                </Button>
              </Link>
            </motion.div>
          )}

          {(!sessionUser || sessionUser?.role === 'freelancer') && (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link href="/all-tasks" className="w-full">
                <Button
                  variant="bordered"
                  className="w-full sm:w-auto border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 text-purple-400 hover:text-purple-300 font-bold px-8 h-12 rounded-xl transition-all text-sm"
                >
                  Browse Tasks
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>

      </motion.div>
    </section>
  );
}