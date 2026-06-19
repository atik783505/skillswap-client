"use client";
import { useState } from "react";
import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Briefcase, Person } from "@gravity-ui/icons";
import { authClient, signUp } from "@/lib/auth-client";

export default function Signup() {
    const [selectedRole, setSelectedRole] = useState('client');

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const image = formData.get("image");

        const { data, error } = await signUp.email({
            name,
            email,
            password,
            image: image || undefined, 
            role: selectedRole,
            // bio: '',       
            // skills: []     
        });

        console.log("Sign Up Response:", { data, error });
        if (error) {
            alert(`Error: ${error.message}`);
        } else {
            alert("Account created successfully! Please check your email to verify your account.");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            console.error("Google sign in failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <Card className="w-full max-w-xl bg-slate-900 border border-slate-800 p-8 rounded-2xl text-white shadow-2xl">
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                        Create Account
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400">
                        Join the elite network of freelancers and clients today.
                    </p>
                </div>

                <Button
                    variant="flat"
                    className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                    onClick={handleGoogleSignIn}
                >
                    <FcGoogle className="text-lg shrink-0" />
                    <span>Sign up with Google</span>
                </Button>

                <div className="flex items-center my-6 w-full">
                    <hr className="flex-1 border-slate-800" />
                    <span className="px-3 text-[10px] font-semibold uppercase text-slate-500 tracking-wider shrink-0">
                        or register with email
                    </span>
                    <hr className="flex-1 border-slate-800" />
                </div>

                <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextField isRequired name="name" type="text" className="w-full">
                            <Label className="text-xs font-semibold text-slate-300 mb-1 block">Full Name</Label>
                            <Input
                                name="name"
                                placeholder="Alex Rivers"
                                className="bg-slate-950/50 border border-slate-800 text-white rounded-lg focus-within:border-emerald-500 transition-all text-sm"
                            />
                        </TextField>

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
                                name="email"
                                placeholder="alex@skillswap.com"
                                className="bg-slate-950/50 border border-slate-800 text-white rounded-lg focus-within:border-emerald-500 transition-all text-sm"
                            />
                            <FieldError className="text-xs text-rose-500 mt-1" />
                        </TextField>
                    </div>

                    <TextField name="image" type="url">
                        <Label className="text-xs font-semibold text-slate-300 mb-1 block">Profile Image URL</Label>
                        <Input
                            name="image"
                            placeholder="https://example.com/avatar.jpg"
                            className="bg-slate-950/50 border border-slate-800 text-white rounded-lg focus-within:border-emerald-500 transition-all text-sm"
                        />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={6}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 6) return "Password must be at least 6 characters";
                            if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                            if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
                            return null;
                        }}
                    >
                        <Label className="text-xs font-semibold text-slate-300 mb-1 block">Password</Label>
                        <Input
                            name="password"
                            placeholder="••••••••"
                            className="bg-slate-950/50 border border-slate-800 text-white rounded-lg focus-within:border-emerald-500 transition-all text-sm"
                        />
                        <Description className="text-[11px] text-slate-500 mt-1 block">
                            Must be 6+ characters, with uppercase and lowercase letters.
                        </Description>
                        <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    {/* Role Selection */}
                    <div className="flex flex-col gap-2 mt-2">
                        <Label className="text-xs font-semibold text-slate-300">Choose your primary path</Label>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div
                                onClick={() => setSelectedRole('client')}
                                className={`flex items-center justify-center p-3 rounded-xl border transition-all cursor-pointer w-full text-xs sm:text-sm font-semibold select-none
                                    ${selectedRole === 'client' 
                                        ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2 pointer-events-none">
                                    <Briefcase className="h-4 w-4 shrink-0" />
                                    <span>I'm a Client</span>
                                </div>
                            </div>

                            <div
                                onClick={() => setSelectedRole('freelancer')}
                                className={`flex items-center justify-center p-3 rounded-xl border transition-all cursor-pointer w-full text-xs sm:text-sm font-semibold select-none
                                    ${selectedRole === 'freelancer' 
                                        ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2 pointer-events-none">
                                    <Person className="h-4 w-4 shrink-0" />
                                    <span>I'm a Freelancer</span>
                                </div>
                            </div>
                        </div>

                        <Description className="text-[10px] text-slate-500 text-center mt-1">
                            Role selection is available for standard email registration.
                        </Description>
                    </div>

                    <Button
                        className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold h-11 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-emerald-500/10 text-sm"
                        type="submit"
                    >
                        <span>Create Account</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Button>
                </Form>

                <div className="text-center mt-6">
                    <p className="text-xs sm:text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-emerald-400 font-semibold hover:underline transition-all">
                            Log In
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}