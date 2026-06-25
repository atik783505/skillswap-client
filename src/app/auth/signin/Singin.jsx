"use client";
import {
    Button,
    Card,
    FieldError,
    Form,
    Input,
    Label,
    TextField
} from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { authClient, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Signin({ role }) {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        if (error) {
            alert(`Error: ${error.message}`);
        } else if (data) {
            if (data.user?.isBlocked) {
                await signOut();
                toast.error("Your account has been blocked by the admin. Please contact support.");
                return; 
            }

            toast.success("Logged in successfully!");
            const userRole = data.user?.role;
            window.location.href = userRole === 'client' ? '/' : `/dashboard/${userRole}`;
        }
    };

   const handleGoogleSignIn = async () => {
    try {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/", 
        });

        if (error) {
            console.error("Google sign in failed:", error);
            return;
        }
        if (data?.user?.isBlocked) {
            await signOut();
            toast.error("Your account has been blocked by the admin.");
            window.location.href = "/auth/signin";
            return;
        }   
    } catch (error) {
        console.error("Google sign in failed:", error);
    }
};

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl text-white shadow-2xl">

                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400">
                        Sign in to continue to your SkillSwap account.
                    </p>
                </div>
                <Button
                    variant="flat"
                    className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                    onClick={handleGoogleSignIn}
                >
                    <FcGoogle className="text-lg shrink-0" />
                    <span>Sign in with Google</span>
                </Button>
                <div className="flex items-center my-6 w-full">
                    <hr className="flex-1 border-slate-800" />
                    <span className="px-3 text-[10px] font-semibold uppercase text-slate-500 tracking-wider shrink-0">
                        or sign in with email
                    </span>
                    <hr className="flex-1 border-slate-800" />
                </div>
                <Form className="flex flex-col gap-5" onSubmit={onSubmit}>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-xs font-semibold text-slate-300 mb-1 block">Email Address</Label>
                        <Input
                            placeholder="alex@skillswap.com"
                            className="bg-slate-950/50 border border-slate-800 text-white rounded-lg focus-within:border-emerald-500 transition-all text-sm"
                        />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>


                    <TextField
                        isRequired
                        name="password"
                        type="password"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <Label className="text-xs font-semibold text-slate-300 block">Password</Label>
                            {/* পাসওয়ার্ড ভুলে গেলে রিকভারি লিংক (ঐচ্ছিক) */}
                            <Link href="/forgot-password" className="text-[11px] text-emerald-400 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            placeholder="••••••••"
                            className="bg-slate-950/50 border border-slate-800 text-white rounded-lg focus-within:border-emerald-500 transition-all text-sm"
                        />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>
                    <Button
                        className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold h-11 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-emerald-500/10 text-sm"
                        type="submit"
                    >
                        <span>Log In</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Button>
                </Form>

                <div className="text-center mt-6">
                    <p className="text-xs sm:text-sm text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="text-emerald-400 font-semibold hover:underline transition-all">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}