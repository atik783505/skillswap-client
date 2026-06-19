"use client";
import { CirclePlus, Envelope, ShieldCheck } from "@gravity-ui/icons";

export default function WorkflowSteps() {
    const steps = [
        {
            id: 1,
            title: "Post a Task", // 👈 ১ম স্টেপ
            description: "Describe your project requirements, set your budget, and publish it instantly.",
            icon: <CirclePlus className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" />,
            isFilled: false,
        },
        {
            id: 2,
            title: "Get Proposals", // 👈 ২য় স্টেপ (পরিবর্তিত)
            description: "Receive competitive bids from top talented professionals ready to start.",
            icon: <Envelope className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" />,
            isFilled: false,
        },
        {
            id: 3,
            title: "Hire and Pay", // 👈 ৩য় স্টেপ (পরিবর্তিত)
            description: "Choose the perfect expert, collaborate seamlessly, and release payment securely.",
            icon: <ShieldCheck className="h-6 w-6 text-slate-950" />,
            isFilled: true,
        },
    ];

    return (
        <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                
                {/* 🎯 রূপান্তরিত হেডার সেকশন */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-3 uppercase tracking-wide">
                        How It Works
                    </h2>
                    <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-medium">
                        Easy 3-step guide to get your project done by experts.
                    </p>
                </div>

                {/* স্টেপস গ্রিড ও কানেক্টিং লাইন */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
                    
                    {/* ডেক্সটপ ব্যাকগ্রাউন্ড কানেক্টিং লাইন */}
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-emerald-500/10 via-emerald-500/30 to-emerald-500/10 z-0" />

                    {steps.map((step) => (
                        <div key={step.id} className="relative flex flex-col items-center text-center z-10 group">
                            
                            {/* আইকন কন্টেইনার */}
                            <div className="mb-5 transition-transform duration-300 group-hover:scale-105">
                                {step.isFilled ? (
                                    <div className="h-16 w-16 rounded-full bg-emerald-400 flex items-center justify-center border border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                                        {step.icon}
                                    </div>
                                ) : (
                                    <div className="h-16 w-16 rounded-full bg-slate-950 border-2 border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.05)] group-hover:border-emerald-500/60 transition-colors">
                                        {step.icon}
                                    </div>
                                )}
                            </div>

                            {/* টেক্সট সেকশন */}
                            <h3 className="text-lg font-bold text-slate-100 mb-2 tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}