"use client";
import { CirclePlus, Envelope, ShieldCheck } from "@gravity-ui/icons";
import { motion } from "framer-motion";

export default function WorkflowSteps() {
    const steps = [
        {
            id: 1,
            title: "Post a Task",
            description: "Describe your project requirements, set your budget, and publish it instantly.",
            icon: <CirclePlus className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" />,
            isFilled: false,
        },
        {
            id: 2,
            title: "Get Proposals",
            description: "Receive competitive bids from top talented professionals ready to start.",
            icon: <Envelope className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" />,
            isFilled: false,
        },
        {
            id: 3,
            title: "Hire and Pay",
            description: "Choose the perfect expert, collaborate seamlessly, and release payment securely.",
            icon: <ShieldCheck className="h-6 w-6 text-slate-950" />,
            isFilled: true,
        },
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-3 uppercase tracking-wide">
                        How It Works
                    </h2>
                    <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-medium">
                        Easy 3-step guide to get your project done by experts.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6"
                >
                    
                    <motion.div 
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                        className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-emerald-500/10 via-emerald-500/30 to-emerald-500/10 z-0 origin-left" 
                    />

                    {steps.map((step) => (
                        <motion.div 
                            key={step.id} 
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            className="relative flex flex-col items-center text-center z-10 group cursor-default"
                        >
                            
                            <div className="mb-5">
                                {step.isFilled ? (
                                    <motion.div 
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        className="h-16 w-16 rounded-full bg-emerald-400 flex items-center justify-center border border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:shadow-[0_0_25px_rgba(52,211,153,0.6)] transition-shadow duration-300"
                                    >
                                        {step.icon}
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        className="h-16 w-16 rounded-full bg-slate-950 border-2 border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.05)] group-hover:border-emerald-500/80 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300"
                                    >
                                        {step.icon}
                                    </motion.div>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-slate-100 mb-2 tracking-tight group-hover:text-emerald-400 transition-colors duration-200">
                                {step.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed transition-colors duration-200 group-hover:text-slate-300">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );  
}