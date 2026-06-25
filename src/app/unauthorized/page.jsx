'use client';

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiLock, FiHome } from "react-icons/fi";

const Unauthorized = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Lock Icon */}
                <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto border border-rose-500/20">
                    <FiLock className="text-4xl text-rose-500" />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-white">Unauthorized Access</h2>
                    <p className="text-slate-400">
                        You do not have permission to view this page. Please check your credentials or return to the homepage.
                    </p>
                </div>

                {/* Back to Home Button */}
                <Button 
                    onPress={() => router.push('/')}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 h-12 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                    startContent={<FiHome size={18} />}
                >
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

export default Unauthorized;